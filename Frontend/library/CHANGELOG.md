# Frontend library changelog

<!-- BEGIN -->

## [UE5.5-1.0.3](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-frontend-UE5.5-1.0.3)

- [aee8066](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/aee8066) Bumping frontend lib
- [2512cc1](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2512cc1) Adding optional parameters to the websocket transport to describe the websocket subprotocols

## [UE5.5-1.0.2](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-frontend-UE5.5-1.0.2)

- [6f7be7a](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/6f7be7a) Bumping frontend lib
- [4465bf1](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/4465bf1) Fix edit text button not showing and warnings on desktop
- [cdaa1ca](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/cdaa1ca) Fixing the backspace code thats sent to UE
- [db39bae](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/db39bae) Make default value for abs-capture-time flag false to fix compatibility with outdated Chromium clients

## [UE5.5-1.0.1](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-frontend-UE5.5-1.0.1)

- [fb5f8f7](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/fb5f8f7) Bumping frontend lib
- [0e4e4f9](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0e4e4f9) Bumping frontend library version
- [027b4f3](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/027b4f3) Just small dep add for completeness
- [0f4d01c](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0f4d01c) More dep tweaks
- [2bb8dc9](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2bb8dc9) A few more tweaks of dependencies
- [7e66536](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/7e66536) Tweaking deps around a little
- [c98a1a3](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/c98a1a3) Cleaning up frontend lib deps and updating eslint configs
- [e6b1e79](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e6b1e79) Small fix for imports
- [601ffb0](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/601ffb0) Merge pull request #425 from EpicGamesExt/capture-time
- [f87aef7](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f87aef7) Seems in typescript 5 requestPointerLock lost its options. Where is mozRequestPointerLock? Does it even need to be used any more?
- [f69280a](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f69280a) Merge branch 'master' into UE5.5
- [b4a8b9b](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b4a8b9b) Fixing develop/watch scripts for windows
- [92b82ac](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/92b82ac) Fixing develop/watch scripts for windows
- [84b4253](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/84b4253) - Fixed issue with esm and cjs builds not being correctly configured - Adjusting how Protocol and Transport handle protocol BaseMessages. Transport should just handle strings. Protocol should handle messages.
- [a672d2f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/a672d2f) Adding in messaging on the frontend for subscribe failed events.
- [ab03627](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/ab03627) Moving back to es6 instead of nodenext. added clean scripts to all projects. fixing signalling server watch using the incorrect http\_root.
- [1c9cc73](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/1c9cc73) Fixing lint scripts
- [800b5c1](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/800b5c1) oof. finally have something that resembles a dev mode watch for all the libraries. run  in the SignallingWebServer folder
- [23d91b5](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/23d91b5) cleaning up frontend lib build scripts
- [5920c93](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/5920c93) Merge branch 'master' into merge55-master
- [d00f6b3](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/d00f6b3) KeepaliveMonitor now just fires a callback and its up to the owner to handle the timeout event somehow
- [e96b6f6](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e96b6f6) How the hell did this get changed? fixing tests
- [34e0c1f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/34e0c1f) Moving the keepalive pings to the frontend. Implementing it on the protocol level was too troublesome.
- [2440f90](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2440f90) Adding a heartbeat to the protocol level of the signalling code
- [512ce5c](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/512ce5c) Cleaning up lint-staged configs so we can have a global config and a local library config.
- [72a22de](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/72a22de) Prettier rules into repo root. Configured eslint projects with config roots so they work with lint-staged.
- [15734c8](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/15734c8) Add/fix ESM libraries to build in a way that exports types using TS module:ES6
- [b046782](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b046782) Example of building implementation/typescript with rollup
- [e2a556d](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e2a556d) Fix bad id checks
- [b47ac81](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b47ac81) Merge pull request #382 from EpicGamesExt/UE5.5
- [3bd5786](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/3bd5786) Fix gamepad logic to handle the case where the first connected gamepad isn't index 0
- [e129dab](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e129dab) Small tweak to bandwidth calc
- [afd5ab1](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/afd5ab1) Fixing lint
- [3079205](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/3079205) Turns out size was not size and instead chunks
- [c4c4f97](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/c4c4f97) Seems the size calculation was just wrong
- [4591057](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/4591057) Updating some code relating to data message transfers just to add some clarity
- [33cc828](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/33cc828) Cleaning up frontend library exports
- [f2f4964](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f2f4964) Merge branch 'master' into 5.5-fixup
- [d732d4e](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/d732d4e) Fixing erroneous import for Flags
- [a4068ff](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/a4068ff) Merge branch 'master' into more\_ts\_options
- [cd94da4](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/cd94da4) Resettiung the target values after testing it wasnt a needed change.
- [4ccb96d](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/4ccb96d) Fix linting and formatting errors
- [0c37387](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0c37387) Update quality option logic to handle VP9 SVC
- [08c59f5](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/08c59f5) Add ability to select preferred streaming quality (low, med, high) when using the SFU
- [ab4971f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/ab4971f) Fixing linting
- [ac91bef](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/ac91bef) cleanup and small fixes.
- [610e3d0](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/610e3d0) Fix unnecessary warnings about unregistered message handlers
- [8a8d0ec](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/8a8d0ec) Fixing more version issues
- [0d079be](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0d079be) Tweaking jest versions
- [b27c83d](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b27c83d) Upping typescript version to at least 5
- [09db72b](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/09db72b) fixing tests
- [fe47a5f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/fe47a5f) Fixing linting
- [4f2c0c5](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/4f2c0c5) Enabled a few more ts compiler options
- [c5dd4bb](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/c5dd4bb) Merge pull request #354 from EpicGamesExt/UE5.5

## [UE5.5-0.4.8](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-frontend-UE5.5-0.4.8)

- [47ac60f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/47ac60f) Bumping frontend library version
- [1154893](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/1154893) Cleaning up lint-staged configs so we can have a global config and a local library config.
- [bc552ac](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/bc552ac) - Fixed issue with esm and cjs builds not being correctly configured - Adjusting how Protocol and Transport handle protocol BaseMessages. Transport should just handle strings. Protocol should handle messages.
- [b9d9a3c](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b9d9a3c) Adding in messaging on the frontend for subscribe failed events.
- [e246b59](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e246b59) Moving back to es6 instead of nodenext. added clean scripts to all projects. fixing signalling server watch using the incorrect http\_root.
- [645bb81](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/645bb81) Fixing lint scripts
- [fce22fa](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/fce22fa) oof. finally have something that resembles a dev mode watch for all the libraries. run  in the SignallingWebServer folder
- [3fe2887](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/3fe2887) cleaning up frontend lib build scripts
- [77099cf](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/77099cf) KeepaliveMonitor now just fires a callback and its up to the owner to handle the timeout event somehow
- [0722987](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0722987) How the hell did this get changed? fixing tests
- [9f40ece](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/9f40ece) Moving the keepalive pings to the frontend. Implementing it on the protocol level was too troublesome.
- [2a96eb4](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2a96eb4) Adding a heartbeat to the protocol level of the signalling code

## [UE5.5-0.4.7](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-frontend-UE5.5-0.4.7)

- [18eb794](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/18eb794) Bumping frontend library version
- [ec01869](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/ec01869) Merge pull request #403 from EpicGamesExt/backport/UE5.5/pr-398
- [7623558](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/7623558) Add/fix ESM libraries to build in a way that exports types using TS module:ES6

## [UE5.5-0.4.6](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-frontend-UE5.5-0.4.6)

- [7d06890](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/7d06890) Bumping frontend library version
- [a0d8484](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/a0d8484) Example of building implementation/typescript with rollup
- [88b3301](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/88b3301) Fix bad id checks

## [UE5.5-0.4.5](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-frontend-UE5.5-0.4.5)

- [e63cd9e](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e63cd9e) Bumping frontend library version
- [868fc89](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/868fc89) Fix gamepad logic to handle the case where the first connected gamepad isn't index 0
- [8f9fcc1](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/8f9fcc1) Small tweak to bandwidth calc
- [e89b28b](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e89b28b) Fixing lint
- [4250926](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/4250926) Turns out size was not size and instead chunks
- [b86b04e](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b86b04e) Seems the size calculation was just wrong
- [0c3a5ff](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0c3a5ff) Updating some code relating to data message transfers just to add some clarity

## [UE5.5-0.4.4](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-frontend-UE5.5-0.4.4)

- [06df0ab](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/06df0ab) Bumping frontend library version
- [56c33ef](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/56c33ef) Cleaning up frontend library exports

## [UE5.5-0.4.3](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-frontend-UE5.5-0.4.3)

- [0206f4f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0206f4f) Bumping frontend library version
- [881207a](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/881207a) Fixing erroneous import for Flags
- [cb11fb2](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/cb11fb2) Merge pull request #355 from mcottontensor/more\_ts\_options
- [303f375](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/303f375) Resettiung the target values after testing it wasnt a needed change.
- [cacb219](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/cacb219) Fix linting and formatting errors
- [6c5be33](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/6c5be33) Update quality option logic to handle VP9 SVC
- [047d6d8](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/047d6d8) Add ability to select preferred streaming quality (low, med, high) when using the SFU
- [45cd75a](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/45cd75a) Fixing linting
- [8808919](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/8808919) Fix unnecessary warnings about unregistered message handlers
