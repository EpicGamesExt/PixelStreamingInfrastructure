## Pixel Streaming sample React application

A minimal sample application that uses the Pixel Streaming library in React.

### Key features
- A minimal React application with a Pixel Streaming wrapper component
  - Starts a Pixel Streaming session on wrapper component mount
  - Disconnects the session on wrapper component unmount e.g. if navigating to another view in a single page app
  - Hooks to `playStreamRejected` event and displays a `Click to play` overlay if the browser rejects video stream auto-play

### Developing

To build and run the React application, run:

- `npm install`
- `npm run build-all`
- `npm run serve`

### Serving via Wilbur

Webpack outputs this bundle to `Frontend/implementations/react/dist/` (rather than `SignallingWebServer/www/`, which is reserved for the TypeScript reference frontend). To have Wilbur serve the React bundle, pass its path via `--http_root`:

```bash
# Build the React bundle, then start Wilbur pointed at it
npm run build --workspace Frontend/implementations/react
./SignallingWebServer/platform_scripts/bash/start.sh \
    --http_root="$(pwd)/Frontend/implementations/react/dist"
```

If you want webpack to write somewhere else (for example, to drop the bundle directly into a deploy directory), set `WEBPACK_OUTPUT_PATH` before running the build.
