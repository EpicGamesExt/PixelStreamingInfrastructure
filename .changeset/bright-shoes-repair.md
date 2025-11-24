---
"@epicgames-ps/lib-pixelstreamingfrontend-ue5.7": minor
"@epicgames-ps/lib-pixelstreamingsignalling-ue5.7": minor
---

Add: Ability to access player id on the frontend.
QoL: Remove player id stripping from the signalling library.

It is useful to be able to use the player id as a unique identifier that is common between UE side stats and frontend side stats; however, the player id is not actually exposed to TS/JS because the SS strips it out of signalling messages.

This change is a backport of "Exposed playerid" (#728)
