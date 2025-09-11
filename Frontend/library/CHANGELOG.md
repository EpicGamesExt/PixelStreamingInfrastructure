# @epicgames-ps/lib-pixelstreamingfrontend-ue5.6

## 0.2.2

### Patch Changes

- 4d8a72f: This change fixes an intermittent WebRTC connection failure where even when the appropriate ICE candidates were present the conection would sometimes fail to be made. This was caused due to the order that ICE candidates were being sent (hence the intermittent nature of the issues) and the fact that ICE candidates sent from Pixel Streaming plugin contain sdpMid and sdpMLineIndex. sdpMid and sdpMLineIndex are only necessary in legacy, non bundle, WebRTC streams; however, Pixel Streaming always assumes bundle is used and these attributes can safely be set to empty strings/omitted (respectively). We perform this modification in the frontend library prior to adding the ICE candidate to the peer connection. This change was tested on a wide range of target devices and browsers to ensure there was no adverse side effects prior.

## 0.2.1

### Patch Changes

- 3a9dd03: GitHub action was failing due to a TypeScript oddity introduced in TS 5.7: https://github.com/microsoft/TypeScript/issues/60579
- d90b39f: When building the frontend library not in this repository it would fail due requiring newer node types, so these were added a dev dep.

## 0.2.0

### Minor Changes

- e9a182a: Changes for regression/latency testing.

    ## Latency Session Test and dump to csv

    Added a new feature to run a variable length latency test session (e.g. a 60s window)
    and dump that stats from the session to two .csv files:

    1. latency.csv - Which contains the video timing stats
    2. stats.csv - Which contains all WebRTC stats the library currently tracks

    To enable the latency session test use the flag/url parameter ?LatencyCSV
    to enable this feature (by default it is disabled and not UI-configurable).

    To use this latency session test feature:

    1. Navigate to http://localhost/?LatencyCSV
    2. Open the stats panel and click the "Run Test" button under the "Session Test" heading.

    ## 4.27 support restored

    Re-shipped UE 4.27 support by restoring the ?BrowserSendOffer flag.
    It was found useful to support running this latency session test against UE 4.27
    for internal historical testing so support for connecting to this version has been restored.

    To connect to a 4.27 project:

    1. Navigate to http://localhost/?BrowserSendOffer
    2. Connect (warning: this option is not compatible with all newer UE versions)

## 1.1.0

### Minor Changes

- 208d100: Add: a html modal for editing text input that is shown on the frontend when user clicks/taps on a streamed UE widget.

    This edit text modal fixes the following:

    - Fix: Users can now input non-latin characters (e.g. Chinese, Japanese, Korean etc.) using IME assistance.
    - Fix: Users on mobile can now type using on-device native on-screen keyboards (which was previously non-functioning).
    - Add: Users can copy/paste from their clipboard into the edit text modal naturally.

    When adding this modal the following was also fixed and extended:

    - Fix: Typing into other frontend widgets (e.g. the settings panel) no longer sends input to the focused UE widget.
    - Add: Exposed a frontend event for when UE sends text input content, meaning customisation of behaviour is now possible.
    - Docs: Added docs explaning this new edit text modal.

    Further details about the edit text modal as mentioned in this PR: https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/564
