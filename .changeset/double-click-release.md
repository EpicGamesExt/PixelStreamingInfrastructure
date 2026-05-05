---
"@epicgames-ps/lib-pixelstreamingfrontend-ue5.7": patch
"@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.7": patch
---

Synthesize a `MouseUp` after `MouseDouble` in both mouse controllers so the streamer's pressed-button state stays balanced after a double-click (#10). The plugin treats `MouseDouble` as a press-class event (`RoutePointerDoubleClickEvent` / `IGenericApplicationMessageHandler::OnMouseDoubleClick`) but never synthesizes a release; the browser's preceding `mouseup` was already consumed by the prior `MouseUp`, so UE was left thinking the button was still held — manifesting, for example, as camera pans that latched on after a double-click. Behaviour is gated on the new `MouseDoubleClickAutoRelease` flag (default on); disable it via `?MouseDoubleClickAutoRelease=false` or the settings panel to restore pre-fix behaviour for projects that handle the doubleclick release themselves.
