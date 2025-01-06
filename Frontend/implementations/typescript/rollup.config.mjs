import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import alias from '@rollup/plugin-alias';
import { defineConfig } from 'rollup';
import path from 'path';

export default defineConfig({
  input: ['src/player.ts'],
  output: [
    {
		dir: './dist/',
		preserveModules: true,
		preserveModulesRoot: 'src',
		sourcemap: false,
		format: 'es',
    },
  ],
  context: "window",
  plugins: [
    resolve({
      preferBuiltins: true,
      browser: true,
    }),
    nodePolyfills(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      exclude: [
        'node_modules/**',
      ],
    }),
    alias({
      entries: [
        { find: '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.5', replacement: path.resolve(process.cwd(), '../../../node_modules/@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.5/dist/esm/pixelstreamingfrontend-ui.js') },
      ],
    }),
  ],
});