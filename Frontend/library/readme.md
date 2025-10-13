## lib-pixelstreamingfrontend

The core library for the browser/client side of Pixel Streaming experiences. **This library contains no UI.**

A good example of using this library (with some custom UI) is the [default Pixel Streaming web player](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/tree/UE5.2/Frontend/implementations/EpicGames).

### Key features
- Create a websocket connection to communicate with the signalling server.
- Create a WebRTC player that displays the Unreal Engine video and audio.
- Handling of input from the user and transmitting it back to Unreal Engine.
- Opens a datachannel connection for sending and receiving custom data (in addition to input).

### Adding it to your project
`npm i @epicgames-ps/lib-pixelstreamingfrontend-ue5.2`

