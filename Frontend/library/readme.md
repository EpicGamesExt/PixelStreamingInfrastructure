## lib-pixelstreamingfrontend

The core library for the browser/client side of Pixel Streaming experiences. **This library contains no UI.**

See [lib-pixelstreamingfrontend-ui](/Frontend/implementations/typescript) for an example of how to build UI on top of this library.

### Key features
- Create a websocket connection to communicate with the signalling server.
- Create a WebRTC peer connection that displays the Unreal Engine video and audio.
- Handling of input from the user and transmitting it back to Unreal Engine.
- Opens a data channel connection sending and receiving custom data (in addition to input).
- Programmable and url specified settings.

### Adding it to your project
`npm install @epicgames-ps/lib-pixelstreamingfrontend-ue5.5`

### How this library is built
The NPM packages supports:
- ES6 module usage
- CommonJS usage
- Type definitions
- Source maps

**Note:** The NPM package does not contain a minified/bundled output, this is up to the user to do this in their application.
