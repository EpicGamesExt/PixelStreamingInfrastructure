---
"@epicgames-ps/lib-pixelstreamingfrontend-ue5.7": patch
---

Map the macOS Command (and Windows Meta) keys to UE keycodes 91 (`LeftWindowKey`) and 92 (`RightWindowKey`). `KeyCodes.ts` now contains `MetaLeft`/`MetaRight` (and the legacy `OSLeft`/`OSRight`) entries, and `KeyboardController.getKeycode` normalizes the right-Cmd code so it no longer collides with `ContextMenu` (93) on browsers that report `keyCode === 93` for it, and so Firefox-on-Mac (which reports `keyCode === 224` for both Cmds) is also handled. Frontend portion of issue #276 — UE-side support for these key codes is tracked separately.
