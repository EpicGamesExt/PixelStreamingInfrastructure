---
"@epicgames-ps/lib-pixelstreamingfrontend-ue5.7": minor
---

Add an `AutoEnterVR` config flag (#461). When enabled, the player checks for `immersive-vr` support after the video is initialized and requests the WebXR session automatically. Default is off. Note: browsers may require a user gesture to start a WebXR session; in flows where there is no pending gesture (for example, a fresh-page-load `AutoConnect`) the request can still be rejected and the player will log a warning.
