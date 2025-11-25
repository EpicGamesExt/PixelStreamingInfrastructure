# @epicgames-ps/lib-pixelstreamingfrontend-ue5.5

## 1.2.5

### Patch Changes

- fbbd6a7: [UE5.5] Fix: Streaming in iframe broken due to SecurityError checking if XR is supported (#734)

## 1.2.0

### Minor Changes

- 2d0e139: Changed module type from cjs to node16 for the CommonJS version of the package. This fixes issues with some dependencies and also brings things to be slightly more modern.

### Patch Changes

- Updated dependencies [2d0e139]
    - @epicgames-ps/lib-pixelstreamingcommon-ue5.5@0.3.0

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
