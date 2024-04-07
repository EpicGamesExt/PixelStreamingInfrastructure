// Copyright Epic Games, Inc. All Rights Reserved.

export class WebGLUtils {
    static vertexShader(): string {
        return `
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
    }

    static fragmentShader(): string {
        return `
		precision mediump float;

		// our texture
		uniform sampler2D u_image;

		// the texCoords passed in from the vertex shader.
		varying vec2 v_texCoord;

		void main() {
		   gl_FragColor = texture2D(u_image, v_texCoord);
		}
		`;
    }
}
