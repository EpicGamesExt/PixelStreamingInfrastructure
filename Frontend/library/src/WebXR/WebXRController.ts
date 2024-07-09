// Copyright Epic Games, Inc. All Rights Reserved.

import { Logger } from '../Logger/Logger';
import { WebRtcPlayerController } from '../WebRtcPlayer/WebRtcPlayerController';
import { XRGamepadController } from '../Inputs/XRGamepadController';
import { XrFrameEvent } from '../Util/EventEmitter'
import { Flags } from '../pixelstreamingfrontend';
import WebXRLayersPolyfill from '@epicgames-ps/webxr-layers-polyfill';
import { vec3, quat } from 'gl-matrix';

export class WebXRController {
    private xrSession: XRSession;
    private xrRefSpace: XRReferenceSpace;
    private gl: WebGL2RenderingContext;
    private xrFramebuffer: WebGLFramebuffer;
    private xrGLFactory: XRWebGLBinding;
    private xrMediaFactory: XRMediaBinding;
    private xrProjectionLayer: XRProjectionLayer;
    private xrQuadLayer: XRQuadLayer = null;
    private xrViewerPose : XRViewerPose = null;
    private quadDist = 1.0;
    // Used for comparisons to ensure two numbers are close enough.
    private EPSILON = 0.0000001;

    private positionLocation: number;
    private texcoordLocation: number;
    private textureOffsetUniform: WebGLUniformLocation;

    private positionBuffer: WebGLBuffer;
    private texcoordBuffer: WebGLBuffer;

    private videoTexture: WebGLTexture = null;
    private prevVideoWidth: number = 0;
    private prevVideoHeight: number = 0;

    private webRtcController: WebRtcPlayerController;
    private xrGamepadController: XRGamepadController;

    // Ignore unused, simply initializing this polyfill patches browser API for browser's
    // that do not support the WebXR layers API.
    private xrLayersPolyfill: WebXRLayersPolyfill = null;
    private useMediaLayers: Boolean = false;

    private leftView: XRView = null;
    private rightView: XRView = null;

    // Store the HMD data we have last sent (not all of it is needed every frame unless it changes)
    private lastSentLeftEyeProj: Float32Array = null;
    private lastSentRightEyeProj: Float32Array = null;
    private lastSentRelativeLeftEyePos: DOMPointReadOnly = null;
    private lastSentRelativeRightEyePos: DOMPointReadOnly = null;

    onSessionStarted: EventTarget;
    onSessionEnded: EventTarget;
    onFrame: EventTarget;

    constructor(webRtcPlayerController: WebRtcPlayerController) {
        this.xrSession = null;
        this.webRtcController = webRtcPlayerController;
        this.xrGamepadController = new XRGamepadController(
            this.webRtcController.streamMessageController
        );
        this.onSessionEnded = new EventTarget();
        this.onSessionStarted = new EventTarget();
        this.onFrame = new EventTarget();
    }

    public xrClicked() {
        if (!this.xrSession) {

            if(!navigator.xr){
                Logger.Error(Logger.GetStackTrace(), "This browser does not support XR.");
                return;
            }

            // Apply the XR Polyfill before we start XR
            if(this.xrLayersPolyfill == null){
                this.xrLayersPolyfill = new WebXRLayersPolyfill();
            }

            navigator.xr
                /* Enable WebXR layers as user agent's which support this can optimize rendering path. */
                .requestSession('immersive-vr', { optionalFeatures: ['layers'] })
                .then((session: XRSession) => {
                    this.onXrSessionStarted(session);
                });
        } else {
            this.xrSession.end();
        }
    }

    onXrSessionEnded() {
        Logger.Log(Logger.GetStackTrace(), 'XR Session ended');
        this.xrSession = null;
        this.onSessionEnded.dispatchEvent(new Event('xrSessionEnded'));
    }

    initGL() {
        if (this.gl) { return; }
        const canvas = document.createElement('canvas');
        this.gl = canvas.getContext('webgl2', {
            xrCompatible: true
        });
        this.gl.clearColor(0.0, 0.0, 0.0, 1);
    }

    initShaders() {

        // shader source code
        const vertexShaderSource: string =
        `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;

        // input
        uniform vec4 u_texOffset;

        // varyings
        varying vec2 v_texCoord;

        void main() {
           gl_Position = vec4(a_position.x, a_position.y, 0, 1);
           // pass the texCoord to the fragment shader
           // The GPU will interpolate this value between points.
           v_texCoord = (a_texCoord * u_texOffset.xy) + u_texOffset.zw;
        }
        `;

        const fragmentShaderSource: string =
        `
        precision mediump float;

        // our texture
        uniform sampler2D u_image;

        // the texCoords passed in from the vertex shader.
        varying vec2 v_texCoord;

        void main() {
           gl_FragColor = texture2D(u_image, v_texCoord);
        }
        `;

        // setup vertex shader
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, vertexShaderSource);
        this.gl.compileShader(vertexShader);

        // setup fragment shader
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, fragmentShaderSource);
        this.gl.compileShader(fragmentShader);

        // setup GLSL program
        const shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);
        this.gl.useProgram(shaderProgram);

        // look up where vertex data needs to go
        this.positionLocation = this.gl.getAttribLocation(
            shaderProgram,
            'a_position'
        );
        this.texcoordLocation = this.gl.getAttribLocation(
            shaderProgram,
            'a_texCoord'
        );
        // lookup uniforms
        this.textureOffsetUniform = this.gl.getUniformLocation(
            shaderProgram,
            'u_texOffset'
        );
    }

    updateVideoTexture(){

        if(!this.videoTexture){
            // Create our texture that we use in our shader
            // and bind it once because we never use any other texture.
            this.videoTexture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.videoTexture);

            // Set the parameters so we can render any size image.
            this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_S,
                this.gl.CLAMP_TO_EDGE
            );
            this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_WRAP_T,
                this.gl.CLAMP_TO_EDGE
            );
            this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_MIN_FILTER,
                this.gl.LINEAR
            );
            this.gl.texParameteri(
                this.gl.TEXTURE_2D,
                this.gl.TEXTURE_MAG_FILTER,
                this.gl.LINEAR
            );
        }

        let videoHeight = this.webRtcController.videoPlayer.getVideoElement().videoHeight;
        let videoWidth = this.webRtcController.videoPlayer.getVideoElement().videoWidth;

        if(this.prevVideoHeight != videoHeight || this.prevVideoWidth != videoWidth){
            // Do full update of texture if dimensions do not match
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RGBA,
                videoWidth,
                videoHeight,
                0,
                this.gl.RGBA,
                this.gl.UNSIGNED_BYTE,
                this.webRtcController.videoPlayer.getVideoElement()
            );
        } else {
            // If dimensions match just update the sub region
            this.gl.texSubImage2D(
                this.gl.TEXTURE_2D,
                0,
                0,
                0,
                videoWidth,
                videoHeight,
                this.gl.RGBA,
                this.gl.UNSIGNED_BYTE,
                this.webRtcController.videoPlayer.getVideoElement()
            );
        }

        // Update prev video width/height
        this.prevVideoHeight = videoHeight;
        this.prevVideoWidth = videoWidth;
    }

    initBuffers(){
        // Bind the frame buffer we want to draw into.
        // Only need to bind it once as we reuse it for each eye.
        this.xrFramebuffer = this.gl.createFramebuffer();
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.xrFramebuffer);

        // Create out position buffer and its vertex shader attribute
        {
            // Create a buffer to put the the vertices of the plane we will draw the video stream onto
            this.positionBuffer = this.gl.createBuffer();
            // Bind the position buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
            // Enable `positionLocation` to be used as vertex shader attribute
            this.gl.enableVertexAttribArray(this.positionLocation);

            // Note: positions are passed in clip-space coordinates [-1..1] so no need to convert in-shader
            // prettier-ignore
            this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                new Float32Array([
                    -1.0,  1.0,
                     1.0,  1.0,
                    -1.0, -1.0,
                    -1.0, -1.0,
                     1.0,  1.0,
                     1.0, -1.0
                ]),
                this.gl.STATIC_DRAW
            );

            // Tell position attribute of the vertex shader how to get data out of the bound buffer (the positionBuffer)
            this.gl.vertexAttribPointer(
                this.positionLocation,
                2 /*size*/,
                this.gl.FLOAT /*type*/,
                false /*normalize*/,
                0 /*stride*/,
                0 /*offset*/
            );
        }

        // Create our texture coordinate buffers for accessing our texture
        {
            this.texcoordBuffer = this.gl.createBuffer();
            // Bind the texture coordinate buffer
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texcoordBuffer);
            // Enable `texcoordLocation` to be used as a vertext shader attribute
            this.gl.enableVertexAttribArray(this.texcoordLocation);

            // The texture coordinates to apply for rectangle we are drawing
            this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                new Float32Array([
                    0.0, 0.0,
                    1.0, 0.0,
                    0.0, 1.0,
                    0.0, 1.0,
                    1.0, 0.0,
                    1.0, 1.0
                ]),
                this.gl.STATIC_DRAW
            );

            // Tell texture coordinate attribute of the vertex shader how to get data out of the bound buffer (the texcoordBuffer)
            this.gl.vertexAttribPointer(
                this.texcoordLocation,
                2 /*size*/,
                this.gl.FLOAT /*type*/,
                false /*normalize*/,
                0 /*stride*/,
                0 /*offset*/
            );
        }
    }

    onXrSessionStarted(session: XRSession) {
        Logger.Log(Logger.GetStackTrace(), 'XR Session started');

        this.xrSession = session;
        this.xrSession.addEventListener('end', () => {
            this.onXrSessionEnded();
        });

        // Initialization
        this.initGL();

        // If we are not using media layers and rendering everything ourselves init shaders, buffers, textures
        if(!this.useMediaLayers){
            this.initShaders();
            this.initBuffers();
        }

        this.xrGLFactory = new XRWebGLBinding(this.xrSession, this.gl);

        session.requestReferenceSpace('local').then((refSpace) => {
            this.xrRefSpace = refSpace;

            // Set up the projection layer, this fills the entire XR viewport.
            this.xrProjectionLayer = this.xrGLFactory.createProjectionLayer({ textureType: "texture", depthFormat: 0 });
            this.xrSession.updateRenderState({ layers: [this.xrProjectionLayer] });

            // Update target framerate to 90 fps if 90 fps is supported in this XR device
            if(this.xrSession.supportedFrameRates) {
                for (let frameRate of this.xrSession.supportedFrameRates) {
                    if(frameRate == 90){
                        session.updateTargetFrameRate(90);
                    }
                }
            }

            // Binding to each new frame to get latest XR updates
            this.xrSession.requestAnimationFrame(this.onXrFrame.bind(this));
        });

        this.onSessionStarted.dispatchEvent(new Event('xrSessionStarted'));

        // Tie frame submission to video FPS.
        // When WebXR "layers" mode is turned on requesting frames this way will still allow timewarp on devices that support it.
        // See: https://developer.oculus.com/blog/achieve-better-rendering-and-performance-with-webxr-layers-in-oculus-browser/
        // const sendFrameToXR = () => {
        //     // Now we have the new frame, send request to XR to do the next frame
        //     this.renderEyes();

        //     // Re-register the callback to be notified about the next frame.
        //     this.webRtcController.videoPlayer.getVideoElement().requestVideoFrameCallback(sendFrameToXR);
        // };

        // // When new video frames comes, send it to XR
        // this.webRtcController.videoPlayer.getVideoElement().requestVideoFrameCallback(sendFrameToXR);

    }

    areArraysEqual(a: Float32Array, b: Float32Array) : boolean {
        return a.length === b.length && a.every((element, index) => Math.abs(element - b[index]) <= this.EPSILON);
    }

    arePointsEqual(a: DOMPointReadOnly, b: DOMPointReadOnly) : boolean {
        return Math.abs(a.x - b.x) >= this.EPSILON && Math.abs(a.y - b.y) >= this.EPSILON && Math.abs(a.z - b.z) >= this.EPSILON;
    }

    sendXRDataToUE() {
        if(this.leftView == null || this.rightView == null) {
            return;
        }

        // We selectively send either the `XREyeViews` or `XRHMDTransform`
        // messages over the datachannel. The reason for this selective sending is that
        // the `XREyeViews` is a much larger message and changes infrequently (e.g. only when user changes headset IPD).
        // Therefore, we only need to send it once on startup and then any time it changes.
        // The rest of the time we can send the `XRHMDTransform` message.
        let shouldSendEyeViews = this.lastSentLeftEyeProj == null ||
                                 this.lastSentRightEyeProj == null ||
                                 this.lastSentRelativeLeftEyePos == null ||
                                 this.lastSentRelativeRightEyePos == null;

        const leftEyeTrans = this.leftView.transform.matrix;
        const leftEyeProj = this.leftView.projectionMatrix;
        const rightEyeTrans = this.rightView.transform.matrix;
        const rightEyeProj = this.rightView.projectionMatrix;
        const hmdTrans = this.xrViewerPose.transform.matrix;

        // Check if projection matrices have changed
        if(!shouldSendEyeViews && this.lastSentLeftEyeProj != null && this.lastSentRightEyeProj != null) {
            let leftEyeProjUnchanged = this.areArraysEqual(leftEyeProj, this.lastSentLeftEyeProj);
            let rightEyeProjUnchanged = this.areArraysEqual(rightEyeProj, this.lastSentRightEyeProj);
            shouldSendEyeViews = leftEyeProjUnchanged == false || rightEyeProjUnchanged == false;
        }

        let leftEyeRelativePos = new DOMPointReadOnly(
            this.leftView.transform.position.x - this.xrViewerPose.transform.position.x,
            this.leftView.transform.position.y - this.xrViewerPose.transform.position.y,
            this.leftView.transform.position.z - this.xrViewerPose.transform.position.z,
            1.0
        );

        let rightEyeRelativePos = new DOMPointReadOnly(
            this.leftView.transform.position.x - this.xrViewerPose.transform.position.x,
            this.leftView.transform.position.y - this.xrViewerPose.transform.position.y,
            this.leftView.transform.position.z - this.xrViewerPose.transform.position.z,
            1.0
        );

        // Check if relative eye pos has changed (e.g IPD changed)
        if(!shouldSendEyeViews && this.lastSentRelativeLeftEyePos != null && this.lastSentRelativeRightEyePos != null) {
            let leftEyePosUnchanged = this.arePointsEqual(leftEyeRelativePos, this.lastSentRelativeLeftEyePos);
            let rightEyePosUnchanged = this.arePointsEqual(rightEyeRelativePos, this.lastSentRelativeRightEyePos);
            shouldSendEyeViews = leftEyePosUnchanged == false || rightEyePosUnchanged == false;
            // Note: We are not checking if EyeView rotation changes (afaict no HMD's support changing this value at runtime).
        }

        if(shouldSendEyeViews) {
            // send transform (4x4) and projection matrix (4x4) data for each eye (left first, then right)
            // prettier-ignore
            this.webRtcController.streamMessageController.toStreamerHandlers.get('XREyeViews')([
                // Left eye 4x4 transform matrix
                leftEyeTrans[0], leftEyeTrans[4], leftEyeTrans[8],  leftEyeTrans[12],
                leftEyeTrans[1], leftEyeTrans[5], leftEyeTrans[9],  leftEyeTrans[13],
                leftEyeTrans[2], leftEyeTrans[6], leftEyeTrans[10], leftEyeTrans[14],
                leftEyeTrans[3], leftEyeTrans[7], leftEyeTrans[11], leftEyeTrans[15],
                // Left eye 4x4 projection matrix
                leftEyeProj[0], leftEyeProj[4], leftEyeProj[8],  leftEyeProj[12],
                leftEyeProj[1], leftEyeProj[5], leftEyeProj[9],  leftEyeProj[13],
                leftEyeProj[2], leftEyeProj[6], leftEyeProj[10], leftEyeProj[14],
                leftEyeProj[3], leftEyeProj[7], leftEyeProj[11], leftEyeProj[15],
                // Right eye 4x4 transform matrix
                rightEyeTrans[0], rightEyeTrans[4], rightEyeTrans[8],  rightEyeTrans[12],
                rightEyeTrans[1], rightEyeTrans[5], rightEyeTrans[9],  rightEyeTrans[13],
                rightEyeTrans[2], rightEyeTrans[6], rightEyeTrans[10], rightEyeTrans[14],
                rightEyeTrans[3], rightEyeTrans[7], rightEyeTrans[11], rightEyeTrans[15],
                // right eye 4x4 projection matrix
                rightEyeProj[0], rightEyeProj[4], rightEyeProj[8],  rightEyeProj[12],
                rightEyeProj[1], rightEyeProj[5], rightEyeProj[9],  rightEyeProj[13],
                rightEyeProj[2], rightEyeProj[6], rightEyeProj[10], rightEyeProj[14],
                rightEyeProj[3], rightEyeProj[7], rightEyeProj[11], rightEyeProj[15],
                // HMD 4x4 transform
                hmdTrans[0], hmdTrans[4], hmdTrans[8],  hmdTrans[12],
                hmdTrans[1], hmdTrans[5], hmdTrans[9],  hmdTrans[13],
                hmdTrans[2], hmdTrans[6], hmdTrans[10], hmdTrans[14],
                hmdTrans[3], hmdTrans[7], hmdTrans[11], hmdTrans[15],
            ]);
            this.lastSentLeftEyeProj = leftEyeProj;
            this.lastSentRightEyeProj = rightEyeProj;
            this.lastSentRelativeLeftEyePos = leftEyeRelativePos;
            this.lastSentRelativeRightEyePos = rightEyeRelativePos;
        }
        else {
            // If we don't need to the entire eye views being sent just send the HMD transform
            this.webRtcController.streamMessageController.toStreamerHandlers.get('XRHMDTransform')([
                // HMD 4x4 transform
                hmdTrans[0], hmdTrans[4], hmdTrans[8],  hmdTrans[12],
                hmdTrans[1], hmdTrans[5], hmdTrans[9],  hmdTrans[13],
                hmdTrans[2], hmdTrans[6], hmdTrans[10], hmdTrans[14],
                hmdTrans[3], hmdTrans[7], hmdTrans[11], hmdTrans[15],
            ]);
        }
    }

    onXrFrame(time: DOMHighResTimeStamp, frame: XRFrame) {
        this.xrViewerPose = frame.getViewerPose(this.xrRefSpace);
        if (this.xrViewerPose) {
            this.updateViews();
            this.sendXRDataToUE();

            if(this.useMediaLayers){
                // Use the quad media layer to show the video
                this.updateXRQuad();
            } else {
                // Render the video to each eye ourselves
                this.renderEyes();
            }
        }

        if (this.webRtcController.config.isFlagEnabled(Flags.XRControllerInput)) {
            this.xrSession.inputSources.forEach(
                (source: XRInputSource, index: number, array: XRInputSource[]) => {
                    this.xrGamepadController.updateStatus(
                        source,
                        frame,
                        this.xrRefSpace
                    );
                },
                this
            );
        }

        this.xrSession.requestAnimationFrame(
            (time: DOMHighResTimeStamp, frame: XRFrame) =>
                this.onXrFrame(time, frame)
        );

        this.onFrame.dispatchEvent(new XrFrameEvent({ time, frame }));
    }

    private updateViews() {
        if(!this.xrViewerPose) {
            return;
        }
        for (const view of this.xrViewerPose.views) {
            if (view.eye === "left") {
                this.leftView = view;
            }
            else if(view.eye === "right") {
                this.rightView = view;
            }
        }
    }

    private createQuadLayer() {

        if(this.leftView == null || this.rightView == null) {
            return;
        }

        let l = vec3.fromValues(this.leftView.transform.position.x, this.leftView.transform.position.y, this.leftView.transform.position.z);
        let r = vec3.fromValues(this.rightView.transform.position.x, this.rightView.transform.position.y, this.rightView.transform.position.z);
        let IPD = vec3.distance(l,r);

        // Set quad width to 1.0 in XR space, based its height and distance from eyes on this constant
        const quadWidth = 1.0;
        const nearClip = this.leftView.projectionMatrix[14] / (this.leftView.projectionMatrix[10] - 1.0);
        const x = (quadWidth  * 0.5) - (IPD * 0.5);
        const halfHFOVRads = Math.atan(1.0 / this.leftView.projectionMatrix[0]);
        const halfVFOVRads = Math.atan(1.0 / this.leftView.projectionMatrix[5]);

        // Calculate distance the quad layer should be from the eyes so it covers the entire horizontal field of view (account for perspective)
        const screenSpaceWidth = (x * nearClip) / (2.0 * Math.tan(halfHFOVRads));
        this.quadDist =  (x * nearClip) / screenSpaceWidth / 2.0;

        // Calculate the height of the quad layer to cover the entire vertical field of view (account for perspective)
        let quadHeight = Math.tan(halfVFOVRads) * this.quadDist * 2.0;
        const screenSpaceHeight = (quadHeight * nearClip) / (2.0 * Math.tan(halfVFOVRads));
        quadHeight = (quadHeight * nearClip) / screenSpaceHeight / 2.0

        let transform : XRRigidTransform = new XRRigidTransform({x: 0, y: 0, z: -this.quadDist, w: 1}, {x: 0, y: 0, z: 0, w: 1});

        this.xrMediaFactory = new XRMediaBinding(this.xrSession);

        this.xrQuadLayer = this.xrMediaFactory.createQuadLayer(this.webRtcController.videoPlayer.getVideoElement(), {
            space: this.xrRefSpace,
            layout: "stereo-left-right",
            transform: transform,
            width: quadWidth,
            height: quadHeight
        });

        this.xrSession.updateRenderState({ layers: [this.xrQuadLayer] });
    }

    private updateXRQuad() {

        if(this.xrQuadLayer == null) {
            this.createQuadLayer();
        }

        let quadPos = vec3.create();

        let hmdPos = vec3.fromValues(this.xrViewerPose.transform.position.x,
                                     this.xrViewerPose.transform.position.y,
                                     this.xrViewerPose.transform.position.z);

        // Find the HMD's forward vector
        let hmdRot = quat.fromValues(this.xrViewerPose.transform.orientation.x, this.xrViewerPose.transform.orientation.y, this.xrViewerPose.transform.orientation.z, this.xrViewerPose.transform.orientation.w);
        let hmdForward = vec3.create();
        vec3.transformQuat(hmdForward, vec3.fromValues(0,0,1), hmdRot);

        // Find the HMD's up vector
        let hmdUp = vec3.create();
        vec3.transformQuat(hmdUp, vec3.fromValues(0,1,0), hmdRot);

        // Find the new quad position using hmd's forward vector and quad's distance away
        let hmdOffset = vec3.create();
        vec3.scale(hmdOffset, hmdForward, -this.quadDist);
        vec3.add(quadPos, hmdPos, hmdOffset);

        let transform : XRRigidTransform = new XRRigidTransform(
            {x: quadPos[0], y: quadPos[1], z: quadPos[2], w: 1}, // position
            {x: hmdRot[0], y: hmdRot[1], z: hmdRot[2], w: hmdRot[3]} // rotation
        );
        this.xrQuadLayer.transform = transform;

    }

    private renderEyes() {
        if (!this.gl) {
            return;
        }

        if(this.leftView == null || this.rightView == null) {
            return;
        }

        this.updateVideoTexture();
        this.renderEye(this.leftView);
        this.renderEye(this.rightView);
    }

    private renderEye(eyeView: XRView) {
        if (!this.gl) {
            return;
        }
        if(eyeView.eye === 'none') {
            // monoscopic rendering not implemented.
            return;
        }

        // set framebuffer's color buffer to be the eye's color buffer
        const eyeSubImage: XRWebGLSubImage = this.xrGLFactory.getViewSubImage(this.xrProjectionLayer, eyeView);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, eyeSubImage.colorTexture, 0);

        // Set the relevant portion of clip space
        this.gl.viewport(
            eyeSubImage.viewport.x,
            eyeSubImage.viewport.y,
            eyeSubImage.viewport.width,
            eyeSubImage.viewport.height
        );

        const uTexOffset = eyeView.eye === "left" ? 0.0 : 0.5;

        // Set uniform to offset the texture based on which eye we are rendering
        this.gl.uniform4f(this.textureOffsetUniform, 0.5, 1.0, uTexOffset, 0.0);

        // Draw the rectangle we will show the video stream texture on
        this.gl.drawArrays(this.gl.TRIANGLES /*primitiveType*/, 0 /*offset*/, 6 /*count*/);
    }

    static isSessionSupported(mode: XRSessionMode): Promise<boolean> {
        if (location.protocol !== "https:") {
            Logger.Info(null, "WebXR requires https, if you want WebXR use https.");
        }

        if (navigator.xr) {
            return navigator.xr.isSessionSupported(mode);
        } else {
            return new Promise<boolean>(() => {
                return false;
            });
        }
    }
}
