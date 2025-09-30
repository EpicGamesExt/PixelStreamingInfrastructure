---
"@epicgames-ps/pixelstreaming-sfu": patch
---

Fix: SFU crashing due to _sctpStreamIds being null. Code using this member has been removed as the `getNextSctpStreamId()` function provided by MediaSoup provides the same functionality.
