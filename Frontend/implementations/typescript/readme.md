## TypeScript Reference Frontend

This is the frontend we ship with the Pixel Streaming plugin. The reference frontend contains:

1. The base `lib-pixelstreamingfrontend` library.
2. The reference ui plugin for the base library `lib-pixelstreamingfrontend-ui`.

Using these two libraries gives a fully functional (and customizable) Pixel Streaming experience.

This package is also a good example of how to include the frontend libraries as dependencies and bundle/minify the final application you ship.

### Key features of the reference frontend
- An info panel (screen right) that provides a UI for displaying live statistics to the user.
- A settings panel (screen right) that provides a UI for all the options inside [config.ts](/Frontend/library/src/Config/Config.ts).
- A set of controls (screen left) to maximize the video, open the settings panel, open the info panel, and enter VR mode.
- Ability to display overlays that present information or errors to the user, or present prompts for the user to interact with.

### Building the reference frontend
```
cd Frontend/implementations/typescript
npm install
npm run build
```

### Using the reference frontend
Building the reference frontend using the commands above will place it in the `SignallingWebServer/www` directory.
```
# Serve the reference frontend
cd SignallingWebServer/platform_scripts/cmd
start.bat
# Navigate to http://localhost in your browser to see the reference frontend
```

***Note:* You can also run `start.bat --build` to build all the dependent libraries.
