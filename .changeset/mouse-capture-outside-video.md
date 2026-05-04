---
"@epicgames-ps/lib-pixelstreamingfrontend-ue5.7": patch
---

Fix mouse-button-held tracking so dragging outside the video element keeps sending move and release events to UE (#349). When a button is pressed on the hovering mouse controller, `mousemove`/`mouseup` are temporarily moved from the video element to `window`, with coordinates re-computed against the video element's bounding rect. When all buttons are released, the listeners switch back to the element. This prevents the engine from being left with a stuck button when the user releases outside the video — common with `DefaultViewportMouseCaptureMode=CaptureDuringMouseDown`.
