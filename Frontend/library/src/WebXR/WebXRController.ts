// Copyright Epic Games, Inc. All Rights Reserved.

import { Logger } from '../Logger/Logger';
import { WebRtcPlayerController } from '../WebRtcPlayer/WebRtcPlayerController';
import { WebGLUtils } from '../Util/WebGLUtils';
import { XRGamepadController } from '../Inputs/XRGamepadController';
import { XrFrameEvent } from '../Util/EventEmitter'
import { Flags } from '../pixelstreamingfrontend';
import WebXRLayersPolyfill from '@epicgames-ps/webxr-layers-polyfill';

export class WebXRController {
    private xrSession: XRSession;
    private xrRefSpace: XRReferenceSpace;
    private gl: WebGL2RenderingContext;
    private xrFramebuffer: WebGLFramebuffer;
    private xrGLFactory: XRWebGLBinding;
    private xrProjectionLayer: XRProjectionLayer;

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
            this.gl.NEAREST
        );
        this.gl.texParameteri(
            this.gl.TEXTURE_2D,
            this.gl.TEXTURE_MAG_FILTER,
            this.gl.NEAREST
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

        session.requestReferenceSpace('local').then((refSpace) => {
            this.xrRefSpace = refSpace;

            // Set up the projection layer, this fills the entire XR viewport.
            this.xrProjectionLayer = this.xrGLFactory.createProjectionLayer({ textureType: "texture" });
            this.xrSession.updateRenderState({ layers: [this.xrProjectionLayer] });

            // When WebXR "layers" mode is turned on requesting frames this way will still allow timewarp on devices that support it.
            // See: https://developer.oculus.com/blog/achieve-better-rendering-and-performance-with-webxr-layers-in-oculus-browser/
            this.xrSession.requestAnimationFrame(this.onXrFrame.bind(this));
        });

        this.onSessionStarted.dispatchEvent(new Event('xrSessionStarted'));
    }

    sendXRDataToUE(pose: XRViewerPose) {
        // Extract HMD transform matrix and convert from row-major to column-major before sending
        const mat = pose.transform.matrix;

        // No longer send the XRHMDTransform as the below `XREyeViews` contains all the relevant information.
        // this.webRtcController.streamMessageController.toStreamerHandlers.get('XRHMDTransform')([
        //     mat[0], mat[4], mat[8], mat[12],
        //     mat[1], mat[5], mat[9], mat[13],
        //     mat[2], mat[6], mat[10], mat[14],
        //     mat[3], mat[7], mat[11], mat[15]
        // ]);

        let leftView: XRView = null;
        let rightView: XRView = null;

        // iterate through each view (eye) in the XRViewerPose.Views[] and send to UE
        for (const view of pose.views) {
            if (view.eye === "left") {
                leftView = view;
            }
            else if(view.eye === "right") {
                rightView = view;
            }
        }

        if(leftView == null || rightView == null) {
            return;
        }

        const leftEyeTrans = leftView.transform.matrix;
        const leftEyeProj = leftView.projectionMatrix;
        const rightEyeTrans = rightView.transform.matrix;
        const rightEyeProj = rightView.projectionMatrix;

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
        const pose = frame.getViewerPose(this.xrRefSpace);
        if (pose) {
            this.sendXRDataToUE(pose);

            // Make video texture available to shader
            // Only need to make the texture available once as same shader is used each eye
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0,
                this.gl.RGBA,
                this.gl.RGBA,
                this.gl.UNSIGNED_BYTE,
                this.webRtcController.videoPlayer.getVideoElement()
            );

            // Go through each eye and render to the layer's "subimage" color buffer
            for(let view of pose.views){
                // Draw each half the video element's texture to each eye.
                this.render(view);
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

        this.onFrame.dispatchEvent(new XrFrameEvent({
            time,
            frame
        }));
    }

    private render(eyeView: XRView) {
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
