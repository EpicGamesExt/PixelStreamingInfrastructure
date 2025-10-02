---
'@epicgames-ps/lib-pixelstreamingfrontend-ue5.7': patch
---

Some versions of Firefox were unable to connect due the changes in PR#694 to overcome this issue and preserve the connectivity fixes from PR#694 we now assume the sdpMLineIndex is always 0 for bundle master media line. This change was tested on many browsers and restores connectivity with FireFox.
