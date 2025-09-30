# @epicgames-ps/pixelstreaming-sfu

## 1.1.1

### Patch Changes

- 514511a: Fix: SFU crashing due to \_sctpStreamIds being null. Code using this member has been removed as the `getNextSctpStreamId()` function provided by MediaSoup provides the same functionality.

## 1.1.0

### Minor Changes

- 9627f8c: No longer using custom prebuilt mediasoup binaries and instead using the provided binaries from mediasoup.
