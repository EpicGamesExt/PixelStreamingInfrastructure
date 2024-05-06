// Copyright Epic Games, Inc. All Rights Reserved.

import { Logger } from '../Logger/Logger';
import { WebRtcPlayerController } from '../WebRtcPlayer/WebRtcPlayerController';
import { WebGLUtils } from '../Util/WebGLUtils';
import { XRGamepadController } from '../Inputs/XRGamepadController';
import { XrFrameEvent } from '../Util/EventEmitter'
import { Flags } from '../pixelstreamingfrontend';
import WebXRLayersPolyfill from '@epicgames-ps/webxr-layers-polyfill';
import { vec3, mat4, quat } from 'gl-matrix';

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

    private positionLocation: number;
    private texcoordLocation: number;
    private textureOffsetUniform: WebGLUniformLocation;

    private positionBuffer: WebGLBuffer;
    private texcoordBuffer: WebGLBuffer;

    private webRtcController: WebRtcPlayerController;
    private xrGamepadController: XRGamepadController;

    // Ignore unused, simply initializing this polyfill patches browser API for browser's
    // that do not support the WebXR layers API.
    private xrLayersPolyfill: WebXRLayersPolyfill;

    private leftView: XRView = null;
    private rightView: XRView = null;

    onSessionStarted: EventTarget;
    onSessionEnded: EventTarget;
    onFrame: EventTarget;

    constructor(webRtcPlayerController: WebRtcPlayerController) {
        this.xrLayersPolyfill = new WebXRLayersPolyfill();
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
        // setup vertex shader
        const vertexShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertexShader, WebGLUtils.vertexShader());
        this.gl.compileShader(vertexShader);

        // setup fragment shader
        const fragmentShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragmentShader, WebGLUtils.fragmentShader());
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

    initTexture(){
        // Create our texture that we use in our shader
        // and bind it once because we never use any other texture.

        const texture: WebGLTexture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        // Create initial texture first time, use glTexSubImage to update
        this.gl.texImage2D(
            this.gl.TEXTURE_2D,
            0,
            this.gl.RGBA,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            this.webRtcController.videoPlayer.getVideoElement()
        );

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
        this.initShaders();
        this.initBuffers();
        this.initTexture();

        this.xrGLFactory = new XRWebGLBinding(this.xrSession, this.gl);
        this.xrMediaFactory = new XRMediaBinding(this.xrSession);

        session.requestReferenceSpace('local').then((refSpace) => {
            this.xrRefSpace = refSpace;

            // Set up the projection layer, this fills the entire XR viewport.
            this.xrProjectionLayer = this.xrGLFactory.createProjectionLayer({ textureType: "texture", depthFormat: 0 });
            this.xrSession.updateRenderState({ layers: [this.xrProjectionLayer] });

            if(this.xrSession.supportedFrameRates) {
                session.updateTargetFrameRate(90);
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

    sendXRDataToUE() {
        // Note: no longer send the `XRHMDTransform` message to UE as the below `XREyeViews` contains all the relevant information.

        // Send each view (eye) in the XRViewerPose.Views[] and send to UE
        if(this.leftView == null || this.rightView == null) {
            return;
        }

        const leftEyeTrans = this.leftView.transform.matrix;
        const leftEyeProj = this.leftView.projectionMatrix;
        const rightEyeTrans = this.rightView.transform.matrix;
        const rightEyeProj = this.rightView.projectionMatrix;

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
        ]);
    }

    onXrFrame(time: DOMHighResTimeStamp, frame: XRFrame) {
        this.xrViewerPose = frame.getViewerPose(this.xrRefSpace);
        if (this.xrViewerPose) {
            this.updateViews();
            this.sendXRDataToUE();
            this.updateXRQuad();

            // Uncomment if we are not tying rendering to video fps
            //this.renderEyes();
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

        this.onFrame.dispatchEvent(new XrFrameEvent({
            time,
            frame
        }));
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

        // Texture for video is still bound.
        // Update the texture using the video.
        this.gl.texSubImage2D(
            this.gl.TEXTURE_2D,
            0,
            0,
            0,
            this.webRtcController.videoPlayer.getVideoElement().videoWidth,
            this.webRtcController.videoPlayer.getVideoElement().videoHeight,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            this.webRtcController.videoPlayer.getVideoElement()
        );

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
        if (navigator.xr) {
            return navigator.xr.isSessionSupported(mode);
        } else {
            return new Promise<boolean>(() => {
                return false;
            });
        }
    }
}
