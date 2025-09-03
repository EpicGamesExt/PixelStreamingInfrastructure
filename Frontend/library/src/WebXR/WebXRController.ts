// Copyright Epic Games, Inc. All Rights Reserved.

import { Logger } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.6';
import { WebRtcPlayerController } from '../WebRtcPlayer/WebRtcPlayerController';
import { XRGamepadController } from '../Inputs/XRGamepadController';
import {
    StatsReceivedEvent,
    XrFrameEvent,
    XrSessionEndedEvent,
    XrSessionStartedEvent
} from '../Util/EventEmitter';
import { Flags } from '../Config/Config';
import WebXRLayersPolyfill from '@epicgames-ps/webxr-layers-polyfill';
import { vec3, quat } from 'gl-matrix';

export class WebXRController {
    private xrSession: XRSession;
    private xrRefSpace: XRReferenceSpace;
    private gl: WebGL2RenderingContext;
    private xrViewerPose: XRViewerPose = null;

    // Media layers polyfill for WebXR
    // This is used to support media layers in browsers that do not support them natively.
    private xrLayersPolyfill: WebXRLayersPolyfill = null;
    private xrGLFactory: XRWebGLBinding;
    private xrMediaFactory: XRMediaBinding;
    private xrProjectionLayer: XRProjectionLayer = null;
    private xrQuadLayer: XRQuadLayer = null;
    private quadDist = 1.0;
    private useMediaLayers: Boolean = false;
    private useMediaFactory: Boolean = false;
    private xrLayers: XRLayer[] = [];

    // Used for comparisons to ensure two numbers are close enough.
    private EPSILON = 0.0000001;

    private positionLocation: number;
    private texcoordLocation: number;
    private uniformXOffsetLocation: WebGLUniformLocation;

    private positionBuffer: WebGLBuffer;
    private texcoordBuffer: WebGLBuffer;

    private videoElement: HTMLVideoElement = null;
    private videoTexture: WebGLTexture = null;
    private hasVideoFrameUpdate: boolean = false;
    private prevVideoWidth: number = 0;
    private prevVideoHeight: number = 0;

    private showDebugInfo: boolean = true;
    private debugCanvas: HTMLCanvasElement = null;
    private debugLastRenderTime: DOMHighResTimeStamp = 0;
    private debugFPS: number = 0;
    private debugNumFrames: number = 0;
    private debugVideoFPS: number = 0;
    private debugStreamFPS: number = 0;
    private debugLastVideoFrameTime: DOMHighResTimeStamp = 0;

    private webRtcController: WebRtcPlayerController;
    private xrGamepadController: XRGamepadController;

    private leftView: XRView = null;
    private rightView: XRView = null;

    // Store the HMD data we have last sent (not all of it is needed every frame unless it changes)
    private lastSentLeftEyeProj: Float32Array = null;
    private lastSentRightEyeProj: Float32Array = null;
    private lastSentRelativeLeftEyePos: DOMPointReadOnly = null;
    private lastSentRelativeRightEyePos: DOMPointReadOnly = null;

    onFrame: EventTarget;
    onVideoFrameEventName: string = 'onVideoFrame';

    constructor(webRtcPlayerController: WebRtcPlayerController) {
        this.xrSession = null;
        this.webRtcController = webRtcPlayerController;
        this.xrGamepadController = new XRGamepadController(this.webRtcController.streamMessageController);
        this.onFrame = new EventTarget();
    }

    public xrClicked() {
        if (!this.xrSession) {
            if (!navigator.xr) {
                Logger.Error('This browser does not support XR.');
                return;
            }

            // Apply the XR Polyfill before we start XR
            if (this.useMediaLayers && this.xrLayersPolyfill == null) {
                this.xrLayersPolyfill = new WebXRLayersPolyfill();
            }

            navigator.xr
                /* Request immersive-vr session with 'media layers' feature if our device supports it.
                 * This will allow us to render smooth video streams in stereo on the XR device.
                 */
                .requestSession('immersive-vr', { optionalFeatures: this.useMediaLayers ? ['layers'] : [] })
                .then((session: XRSession) => {
                    this.onXrSessionStarted(session);
                });
        } else {
            this.xrSession.end();
        }
    }

    onXrSessionEnded() {
        Logger.Info('XR Session ended');
        this.xrSession = null;
        this.resetVideoElement();
        this.webRtcController.pixelStreaming.dispatchEvent(new XrSessionEndedEvent());

        if (this.showDebugInfo) {
            this.webRtcController.pixelStreaming.removeEventListener(
                'statsReceived',
                this.storeDebugStreamFPS.bind(this)
            );
        }
    }

    storeDebugStreamFPS(statsEvent: StatsReceivedEvent) {
        this.debugStreamFPS = statsEvent.data.aggregatedStats.inboundVideoStats.framesPerSecond;
    }

    resetVideoElement() {
        this.videoElement = null;
        this.hasVideoFrameUpdate = false;
        // Resume the main video element playback
        this.webRtcController.videoPlayer.getVideoElement().play();
    }

    initVideoElement() {
        // Make an offscreen video element that we can use to playback the video.
        this.videoElement = document.createElement('video');
        this.videoElement.disablePictureInPicture = true;
        this.videoElement.playsInline = true;
        //this.videoElement.srcObject = this.webRtcController.videoPlayer.getVideoElement().srcObject;
        this.videoElement.src = './images/bike_1814x1080@90.mkv';
        this.videoElement.loop = true;
        // Pause the main video element to avoid double playback
        this.webRtcController.videoPlayer.getVideoElement().pause();
        this.videoElement.play();
    }

    initDebugCanvas() {
        if (!this.showDebugInfo) {
            return;
        }

        this.debugCanvas = document.createElement('canvas');

        this.webRtcController.pixelStreaming.addEventListener(
            'statsReceived',
            this.storeDebugStreamFPS.bind(this)
        );
    }

    initGL() {
        if (this.gl) {
            return;
        }
        const canvas = document.createElement('canvas');
        this.gl = canvas.getContext('webgl2', {
            xrCompatible: true
        });

        // Set our clear color and clear depth
        this.gl.clearColor(0.0, 0.0, 0.0, 1);
        this.gl.clearDepth(1.0);
    }

    initLayers() {
        if (!this.xrSession || !this.useMediaLayers) {
            return;
        }

        this.xrGLFactory = new XRWebGLBinding(this.xrSession, this.gl);

        // Projection layer for debug UI
        if (this.showDebugInfo) {
            this.xrProjectionLayer = this.xrGLFactory.createProjectionLayer({
                textureType: 'texture',
                depthFormat: 0
            });
            this.xrLayers.push(this.xrProjectionLayer);
        }

        this.xrSession.updateRenderState({ layers: this.xrLayers });
    }

    initQuadLayer() {
        if (!this.leftView || !this.rightView) {
            Logger.Error('Left and right views are not initialized. Cannot create quad layer.');
            return;
        }
        if (!this.xrSession) {
            Logger.Error('XR Session is not initialized. Cannot create quad layer.');
            return;
        }
        if (!this.videoElement) {
            Logger.Error('Video element is not initialized. Cannot create quad layer.');
            return;
        }

        const l = vec3.fromValues(
            this.leftView.transform.position.x,
            this.leftView.transform.position.y,
            this.leftView.transform.position.z
        );

        const r = vec3.fromValues(
            this.rightView.transform.position.x,
            this.rightView.transform.position.y,
            this.rightView.transform.position.z
        );

        const IPD = vec3.distance(l, r);

        // Set quad width to 1.0 in XR space, based its height and distance from eyes on this constant
        const quadWidth = 1.0;
        const nearClip = this.leftView.projectionMatrix[14] / (this.leftView.projectionMatrix[10] - 1.0);
        const x = quadWidth * 0.5 - IPD * 0.5;
        const halfHFOVRads = Math.atan(1.0 / this.leftView.projectionMatrix[0]);
        const halfVFOVRads = Math.atan(1.0 / this.leftView.projectionMatrix[5]);

        // Calculate distance the quad layer should be from the eyes so it covers the entire horizontal field of view (account for perspective)
        const screenSpaceWidth = (x * nearClip) / (2.0 * Math.tan(halfHFOVRads));
        this.quadDist = (x * nearClip) / screenSpaceWidth / 2.0;

        // Calculate the height of the quad layer to cover the entire vertical field of view (account for perspective)
        let quadHeight = Math.tan(halfVFOVRads) * this.quadDist * 2.0;
        const screenSpaceHeight = (quadHeight * nearClip) / (2.0 * Math.tan(halfVFOVRads));
        quadHeight = (quadHeight * nearClip) / screenSpaceHeight / 2.0;

        const transform: XRRigidTransform = new XRRigidTransform(
            // Position
            {
                x: 0,
                y: 0,
                z: -this.quadDist,
                w: 1
            },
            // Direction
            {
                x: 0,
                y: 0,
                z: 0,
                w: 1
            }
        );

        if (this.useMediaFactory) {
            this.xrMediaFactory = new XRMediaBinding(this.xrSession);

            this.xrQuadLayer = this.xrMediaFactory.createQuadLayer(this.videoElement, {
                space: this.xrRefSpace,
                layout: 'stereo-left-right',
                transform: transform,
                width: quadWidth,
                height: quadHeight
            });
        } else {
            this.xrQuadLayer = this.xrGLFactory.createQuadLayer({
                space: this.xrRefSpace,
                layout: 'stereo-left-right',
                transform: transform,
                viewPixelWidth: this.videoElement.videoWidth,
                viewPixelHeight: this.videoElement.videoHeight
            });
        }

        this.xrLayers.push(this.xrQuadLayer);

        this.xrSession.updateRenderState({ layers: this.xrLayers });
    }

    private updateXRQuad(frame: XRFrame) {
        if (!this.xrViewerPose) {
            Logger.Error('XR Viewer Pose is not initialized. Cannot update quad layer.');
            return;
        }

        if (this.xrQuadLayer == null) {
            this.initQuadLayer();
        }

        const quadPos = vec3.create();

        const hmdPos = vec3.fromValues(
            this.xrViewerPose.transform.position.x,
            this.xrViewerPose.transform.position.y,
            this.xrViewerPose.transform.position.z
        );

        // Find the HMD's forward vector
        const hmdRot = quat.fromValues(
            this.xrViewerPose.transform.orientation.x,
            this.xrViewerPose.transform.orientation.y,
            this.xrViewerPose.transform.orientation.z,
            this.xrViewerPose.transform.orientation.w
        );

        const hmdForward = vec3.create();
        vec3.transformQuat(hmdForward, vec3.fromValues(0, 0, 1), hmdRot);

        // Find the HMD's up vector
        const hmdUp = vec3.create();
        vec3.transformQuat(hmdUp, vec3.fromValues(0, 1, 0), hmdRot);

        // Find the new quad position using hmd's forward vector and quad's distance away
        const hmdOffset = vec3.create();
        vec3.scale(hmdOffset, hmdForward, -this.quadDist);
        vec3.add(quadPos, hmdPos, hmdOffset);

        const transform: XRRigidTransform = new XRRigidTransform(
            // position
            {
                x: quadPos[0],
                y: quadPos[1],
                z: quadPos[2],
                w: 1
            },
            // rotation
            {
                x: hmdRot[0],
                y: hmdRot[1],
                z: hmdRot[2],
                w: hmdRot[3]
            }
        );
        this.xrQuadLayer.transform = transform;

        // Update quad with video texture if we are not using the xrMediaFactory
        if (!this.useMediaFactory) {
            const glayer = this.xrGLFactory.getSubImage(this.xrQuadLayer, frame);
            this.videoTexture = glayer.colorTexture;

            this.gl.bindTexture(this.gl.TEXTURE_2D, this.videoTexture);
            this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);
            this.gl.texSubImage2D(
                this.gl.TEXTURE_2D,
                0,
                0,
                0,
                this.videoElement.videoWidth,
                this.videoElement.videoHeight,
                this.gl.RGBA,
                this.gl.UNSIGNED_BYTE,
                this.videoElement
            );

            this.updateDebugText();

            this.gl.bindTexture(this.gl.TEXTURE_2D, null);
        }
    }

    initShaders() {
        // shader source code
        const vertexShaderSource: string = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;

        // varyings
        varying vec2 v_texCoord;

        void main() {
           gl_Position = vec4(a_position.x, a_position.y, 0, 1);
           // pass the texCoord to the fragment shader
           // The GPU will interpolate this value between points.
           v_texCoord = a_texCoord;
        }
        `;

        const fragmentShaderSource: string = `
        precision mediump float;

        // our texture
        uniform sampler2D u_image;

        // xoffset for eye video texture
        uniform float u_xOffset;

        // the texCoords passed in from the vertex shader.
        varying vec2 v_texCoord;

        void main() {
            // Adjust the texture coordinates based on the xOffset
            vec2 adjustedTexCoord = vec2(v_texCoord.x * 0.5 + u_xOffset, v_texCoord.y);
            gl_FragColor = texture2D(u_image, adjustedTexCoord);
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
        this.positionLocation = this.gl.getAttribLocation(shaderProgram, 'a_position');
        this.texcoordLocation = this.gl.getAttribLocation(shaderProgram, 'a_texCoord');
        // look up uniform locations
        this.uniformXOffsetLocation = this.gl.getUniformLocation(shaderProgram, 'u_xOffset');
    }

    updateNewVideoFrameFlag() {
        if (!this.xrSession || !this.videoElement) {
            return;
        }

        // Update the video frame flag to indicate that we have a new video frame
        this.hasVideoFrameUpdate = true;

        if (this.showDebugInfo) {
            const now = performance.now();
            if (this.debugVideoFPS === 0 || this.debugNumFrames % 60 === 0) {
                this.debugVideoFPS = Math.round(1000.0 / (now - this.debugLastVideoFrameTime));
            }
            this.debugLastVideoFrameTime = now;
        }

        this.videoElement.requestVideoFrameCallback(this.updateNewVideoFrameFlag.bind(this));

        this.onFrame.dispatchEvent(new Event(this.onVideoFrameEventName));
    }

    drawDebugText(text: string) {
        if (!this.showDebugInfo || !this.debugCanvas) {
            Logger.Error('Debug canvas is not initialized or debug info is disabled.');
            return;
        }
        if (!this.videoTexture) {
            Logger.Error('Video texture is not initialized. Cannot update debug text.');
            return;
        }

        const ctx = this.debugCanvas.getContext('2d');

        // Set the canvas context for text rendering
        ctx.font = '24px serif';

        const metrics: TextMetrics = ctx.measureText(text);
        this.debugCanvas.width = metrics.width;
        this.debugCanvas.height = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

        // Canvas background
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(0, 0, this.debugCanvas.width, this.debugCanvas.height);

        // Canvas text
        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.font = '24px serif';
        const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        const textVerticalOffset = this.debugCanvas.height - textHeight;
        ctx.fillText(text, 0, textVerticalOffset / 2 + textHeight);

        const yOffset = this.videoElement.videoHeight / 2;
        const xOffset = this.debugCanvas.width / 2;

        // We assume video texture is already created and bound, we will write a sub-region on top of it for left and right eye views.
        this.gl.texSubImage2D(
            this.gl.TEXTURE_2D,
            0,
            xOffset,
            yOffset,
            this.debugCanvas.width,
            this.debugCanvas.height,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            this.debugCanvas
        );

        // Right eye
        this.gl.texSubImage2D(
            this.gl.TEXTURE_2D,
            0,
            xOffset + this.videoElement.videoWidth / 2,
            yOffset,
            this.debugCanvas.width,
            this.debugCanvas.height,
            this.gl.RGBA,
            this.gl.UNSIGNED_BYTE,
            this.debugCanvas
        );
    }

    updateVideoTexture() {
        if (
            !this.xrSession ||
            !this.gl ||
            !this.videoElement ||
            !(this.videoElement.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA)
        ) {
            return;
        }

        if (!this.videoTexture) {
            // Create our texture that we use in our shader
            // and bind it once because we never use any other texture.
            this.videoTexture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.videoTexture);

            // Set the parameters so we can render any size image.
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
        }

        const videoResolutionChanged =
            this.prevVideoWidth !== this.videoElement.videoWidth ||
            this.prevVideoHeight !== this.videoElement.videoHeight;

        if (videoResolutionChanged) {
            // If the video dimensions have changed, we need to recreate the texture
            this.prevVideoWidth = this.videoElement.videoWidth;
            this.prevVideoHeight = this.videoElement.videoHeight;
            this.gl.bindTexture(this.gl.TEXTURE_2D, this.videoTexture);
            // Create a new texture with the new video dimensions
            this.gl.texImage2D(
                this.gl.TEXTURE_2D,
                0, // level
                this.gl.RGBA, // internalFormat
                this.videoElement.videoWidth, // width
                this.videoElement.videoHeight, // height
                0, // border
                this.gl.RGBA, // format
                this.gl.UNSIGNED_BYTE, // type
                this.videoElement
            );
        } else {
            this.gl.texSubImage2D(
                this.gl.TEXTURE_2D,
                0,
                0,
                0,
                this.videoElement.videoWidth,
                this.videoElement.videoHeight,
                this.gl.RGBA,
                this.gl.UNSIGNED_BYTE,
                this.videoElement
            );
        }
    }

    initBuffers() {
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
            // Enable `texcoordLocation` to be used as a vertex shader attribute
            this.gl.enableVertexAttribArray(this.texcoordLocation);

            // The texture coordinates to apply for rectangle we are drawing
            this.gl.bufferData(
                this.gl.ARRAY_BUFFER,
                new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]),
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
        Logger.Info('XR Session started');

        this.xrSession = session;
        this.xrSession.addEventListener('end', () => {
            this.onXrSessionEnded();
        });

        // Initialization
        this.initVideoElement();
        this.initGL();
        this.initLayers();
        this.initShaders();
        this.initBuffers();
        this.initDebugCanvas();

        session.requestReferenceSpace('local').then((refSpace) => {
            this.xrRefSpace = refSpace;

            // If we are not using media layers, we will create a base layer for our XR session.
            if (!this.useMediaLayers) {
                // Set up our base layer (i.e. a projection layer that fills the entire XR viewport).
                const baseLayer = new XRWebGLLayer(this.xrSession, this.gl, {
                    /* Because we render stereo video depth is not helpful to the device */
                    ignoreDepthValues: true,
                    depth: false,
                    stencil: false
                });

                this.xrSession.updateRenderState({
                    baseLayer: baseLayer
                });
            }

            // Update target framerate to 90 fps if 90 fps is supported in this XR device
            if (this.xrSession.supportedFrameRates) {
                for (const frameRate of this.xrSession.supportedFrameRates) {
                    if (frameRate == 90) {
                        session.updateTargetFrameRate(90);
                    }
                }
            }

            // Binding to each new frame to get latest XR updates
            this.videoElement.requestVideoFrameCallback(this.updateNewVideoFrameFlag.bind(this));
            this.xrSession.requestAnimationFrame((time, frame) => {
                this.onXrFrame(time, frame);
            });
        });

        this.webRtcController.pixelStreaming.dispatchEvent(new XrSessionStartedEvent());
    }

    areArraysEqual(a: Float32Array, b: Float32Array): boolean {
        return (
            a.length === b.length && a.every((element, index) => Math.abs(element - b[index]) <= this.EPSILON)
        );
    }

    arePointsEqual(a: DOMPointReadOnly, b: DOMPointReadOnly): boolean {
        return (
            Math.abs(a.x - b.x) >= this.EPSILON &&
            Math.abs(a.y - b.y) >= this.EPSILON &&
            Math.abs(a.z - b.z) >= this.EPSILON
        );
    }

    sendXRDataToUE() {
        if (this.leftView == null || this.rightView == null) {
            return;
        }

        // We selectively send either the `XREyeViews` or `XRHMDTransform`
        // messages over the datachannel. The reason for this selective sending is that
        // the `XREyeViews` is a much larger message and changes infrequently (e.g. only when user changes headset IPD).
        // Therefore, we only need to send it once on startup and then any time it changes.
        // The rest of the time we can send the `XRHMDTransform` message.
        let shouldSendEyeViews =
            this.lastSentLeftEyeProj == null ||
            this.lastSentRightEyeProj == null ||
            this.lastSentRelativeLeftEyePos == null ||
            this.lastSentRelativeRightEyePos == null;

        const leftEyeTrans = this.leftView.transform.matrix;
        const leftEyeProj = this.leftView.projectionMatrix;
        const rightEyeTrans = this.rightView.transform.matrix;
        const rightEyeProj = this.rightView.projectionMatrix;
        const hmdTrans = this.xrViewerPose.transform.matrix;

        // Check if projection matrices have changed
        if (!shouldSendEyeViews && this.lastSentLeftEyeProj != null && this.lastSentRightEyeProj != null) {
            const leftEyeProjUnchanged = this.areArraysEqual(leftEyeProj, this.lastSentLeftEyeProj);
            const rightEyeProjUnchanged = this.areArraysEqual(rightEyeProj, this.lastSentRightEyeProj);
            shouldSendEyeViews = leftEyeProjUnchanged == false || rightEyeProjUnchanged == false;
        }

        const leftEyeRelativePos = new DOMPointReadOnly(
            this.leftView.transform.position.x - this.xrViewerPose.transform.position.x,
            this.leftView.transform.position.y - this.xrViewerPose.transform.position.y,
            this.leftView.transform.position.z - this.xrViewerPose.transform.position.z,
            1.0
        );

        const rightEyeRelativePos = new DOMPointReadOnly(
            this.leftView.transform.position.x - this.xrViewerPose.transform.position.x,
            this.leftView.transform.position.y - this.xrViewerPose.transform.position.y,
            this.leftView.transform.position.z - this.xrViewerPose.transform.position.z,
            1.0
        );

        // Check if relative eye pos has changed (e.g IPD changed)
        if (
            !shouldSendEyeViews &&
            this.lastSentRelativeLeftEyePos != null &&
            this.lastSentRelativeRightEyePos != null
        ) {
            const leftEyePosUnchanged = this.arePointsEqual(
                leftEyeRelativePos,
                this.lastSentRelativeLeftEyePos
            );
            const rightEyePosUnchanged = this.arePointsEqual(
                rightEyeRelativePos,
                this.lastSentRelativeRightEyePos
            );
            shouldSendEyeViews = leftEyePosUnchanged == false || rightEyePosUnchanged == false;
            // Note: We are not checking if EyeView rotation changes (as far as I know no HMD supports changing this value at runtime).
        }

        if (shouldSendEyeViews) {
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
                // Timestamp
                performance.now(),
            ]);
            this.lastSentLeftEyeProj = leftEyeProj;
            this.lastSentRightEyeProj = rightEyeProj;
            this.lastSentRelativeLeftEyePos = leftEyeRelativePos;
            this.lastSentRelativeRightEyePos = rightEyeRelativePos;
        } else {
            // If we don't need to the entire eye views being sent just send the HMD transform
            this.webRtcController.streamMessageController.toStreamerHandlers.get('XRHMDTransform')([
                // HMD 4x4 transform
                hmdTrans[0],
                hmdTrans[4],
                hmdTrans[8],
                hmdTrans[12],
                hmdTrans[1],
                hmdTrans[5],
                hmdTrans[9],
                hmdTrans[13],
                hmdTrans[2],
                hmdTrans[6],
                hmdTrans[10],
                hmdTrans[14],
                hmdTrans[3],
                hmdTrans[7],
                hmdTrans[11],
                hmdTrans[15],
                // Timestamp
                performance.now()
            ]);
        }
    }

    updateDebugTimings() {
        if (this.showDebugInfo) {
            this.debugNumFrames++;
            const now = performance.now();

            if (this.debugLastRenderTime != 0 && this.debugNumFrames % 60 === 0) {
                const deltaTime = now - this.debugLastRenderTime;
                // Convert to FPS
                this.debugFPS = Math.round(1000.0 / deltaTime);
            }

            this.debugLastRenderTime = now;
        }
    }

    updateDebugText() {
        if (!this.showDebugInfo) {
            Logger.Error('Debug info is not enabled. Cannot draw debug text.');
            return;
        }
        if (!this.videoTexture) {
            Logger.Error('Video texture is not initialized. Cannot draw debug text.');
            return;
        }
        this.drawDebugText(
            `WebXR FPS: ${this.debugFPS} | Video FPS: ${this.debugVideoFPS} | Stream FPS: ${this.debugStreamFPS}`
        );
    }

    onXrFrame(time: DOMHighResTimeStamp, frame: XRFrame) {
        this.xrViewerPose = frame.getViewerPose(this.xrRefSpace);
        if (this.xrViewerPose) {
            this.updateViews();
            if (this.leftView == null || this.rightView == null) {
                return;
            }

            if (this.showDebugInfo) {
                this.updateDebugTimings();
            }

            if (this.hasVideoFrameUpdate || (this.useMediaLayers && this.xrQuadLayer.needsRedraw)) {
                this.hasVideoFrameUpdate = false;
                if (this.useMediaLayers) {
                    // Use the quad media layer to show the video
                    this.updateXRQuad(frame);
                } else {
                    // Render the video to each eye ourselves
                    this.updateVideoTexture();
                    this.updateDebugText();
                    this.render();
                }
            }

            this.sendXRDataToUE();
        }

        if (this.webRtcController.config.isFlagEnabled(Flags.XRControllerInput)) {
            this.xrSession.inputSources.forEach(
                (source: XRInputSource, _index: number, _array: XRInputSource[]) => {
                    this.xrGamepadController.updateStatus(source, frame, this.xrRefSpace);
                },
                this
            );
        }

        this.xrSession.requestAnimationFrame((time: DOMHighResTimeStamp, frame: XRFrame) => {
            this.onXrFrame(time, frame);
        });

        this.onFrame.dispatchEvent(new XrFrameEvent({ time, frame }));
    }

    private updateViews() {
        if (!this.xrViewerPose) {
            return;
        }
        for (const view of this.xrViewerPose.views) {
            if (view.eye === 'left') {
                this.leftView = view;
            } else if (view.eye === 'right') {
                this.rightView = view;
            }
        }
    }

    private render() {
        if (!this.gl) {
            return;
        }

        this.gl.disable(this.gl.SCISSOR_TEST);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.disable(this.gl.STENCIL_TEST);
        this.gl.disable(this.gl.CULL_FACE);
        this.gl.disable(this.gl.BLEND);
        this.gl.disable(this.gl.DITHER);
        this.gl.colorMask(true, true, true, true);
        this.gl.depthMask(false);

        // Clear the canvas
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Bind the framebuffer to the base layer's framebuffer
        const glLayer = this.xrSession.renderState.baseLayer;
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, glLayer.framebuffer);
        this.gl.invalidateFramebuffer(this.gl.FRAMEBUFFER, [
            this.gl.COLOR_ATTACHMENT0,
            this.gl.DEPTH_ATTACHMENT
        ]);

        for (const view of this.xrViewerPose.views) {
            if (view.eye === 'none') {
                continue;
            }

            const viewport: XRViewport = glLayer.getViewport(view);

            // Set the relevant portion of clip space
            this.gl.viewport(viewport.x, viewport.y, viewport.width, viewport.height);

            // Set the xOffset based on the eye
            const xOffset = view.eye === 'left' ? 0.0 : 0.5;
            this.gl.uniform1f(this.uniformXOffsetLocation, xOffset);

            // Draw the rectangle we will show the video stream texture on
            this.gl.drawArrays(this.gl.TRIANGLES /*primitiveType*/, 0 /*offset*/, 6 /*count*/);
        }
    }

    static isSessionSupported(mode: XRSessionMode): Promise<boolean> {
        if (location.protocol !== 'https:') {
            Logger.Info('WebXR requires https, if you want WebXR use https.');
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
