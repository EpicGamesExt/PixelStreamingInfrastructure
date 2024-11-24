# JavaScript Streamer

The JavaScript Streamer is a functional drop-in for an instance of a Unreal Engine Pixel Streaming application
except it can run in the browser, requires no GPU, and has zero dependencies on Unreal Engine.

Its purpose is as follows:
- A mock of Unreal Engine Pixel Streaming for testing the various Pixel Streaming Infrastructure components in CI without requiring UE.
- A reference to demonstrate how to implement your own Pixel Streaming source (yes, you _could_ stream from things other than UE).

## Running
- `npm install`
- `npm run build`
- `npm run develop`
- Visit http://localhost:4000 in your browser