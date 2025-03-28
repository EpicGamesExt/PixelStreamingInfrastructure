# Common library changelog

<!-- BEGIN -->

## [UE5.5-0.2.9](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-common-UE5.5-0.2.9)

- [278ad03](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/278ad03) Bumping common library version
- [2512cc1](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2512cc1) Adding optional parameters to the websocket transport to describe the websocket subprotocols

## [UE5.5-0.2.8](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-common-UE5.5-0.2.8)

- [fef75b5](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/fef75b5) dealing with dependency nonsense

## [UE5.5-0.2.7](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-common-UE5.5-0.2.7)

- [a509f5c](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/a509f5c) Bumping common library version
- [2b06a7a](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2b06a7a) Rebuilt common docs
- [5ccad34](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/5ccad34) Small dep tweaks again
- [0f4d01c](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0f4d01c) More dep tweaks
- [0568c19](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0568c19) protoc broke on mac devices after 1.0.4 apparently
- [9d7c4c4](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/9d7c4c4) Cleaning up Common deps and updating eslint configs
- [601ffb0](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/601ffb0) Merge pull request #425 from EpicGamesExt/capture-time
- [f69280a](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f69280a) Merge branch 'master' into UE5.5
- [b4a8b9b](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b4a8b9b) Fixing develop/watch scripts for windows
- [92b82ac](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/92b82ac) Fixing develop/watch scripts for windows
- [709d6fe](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/709d6fe) Rebuilt common docs
- [80aa060](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/80aa060) Moved signalling protocol documentation
- [60a8f22](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/60a8f22) Fixing up logging from Common in signalling lib
- [84b4253](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/84b4253) - Fixed issue with esm and cjs builds not being correctly configured - Adjusting how Protocol and Transport handle protocol BaseMessages. Transport should just handle strings. Protocol should handle messages.
- [156cdfc](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/156cdfc) Bumping signalling protocol version due to new message. Removed player limit on npm script.
- [d4d5205](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/d4d5205) Trying to improve the documentation by exporting some logging classes
- [457a0dc](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/457a0dc) Rebuilt common docs to update with new subscribe failed message
- [a672d2f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/a672d2f) Adding in messaging on the frontend for subscribe failed events.
- [dc2f6b0](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/dc2f6b0) Adding concurrently to common deps
- [ab03627](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/ab03627) Moving back to es6 instead of nodenext. added clean scripts to all projects. fixing signalling server watch using the incorrect http\_root.
- [737554b](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/737554b) Fixing lint errors
- [800b5c1](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/800b5c1) oof. finally have something that resembles a dev mode watch for all the libraries. run  in the SignallingWebServer folder
- [4922c5e](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/4922c5e) reordered scrips slightly
- [77ee7fa](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/77ee7fa) Cleaning up common lib build setup
- [5920c93](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/5920c93) Merge branch 'master' into merge55-master
- [cf0d93f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/cf0d93f) Just removing some old commented code
- [240afb7](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/240afb7) Removed comment no longer relevant
- [d00f6b3](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/d00f6b3) KeepaliveMonitor now just fires a callback and its up to the owner to handle the timeout event somehow
- [34e0c1f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/34e0c1f) Moving the keepalive pings to the frontend. Implementing it on the protocol level was too troublesome.
- [dfd1443](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/dfd1443) Allowed the ping and pong messages to be passed to listeners if needed.
- [1f776e2](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/1f776e2) Fixing up some small issues
- [2440f90](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2440f90) Adding a heartbeat to the protocol level of the signalling code
- [0ddead5](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0ddead5) Removed lint-staged config from common package json
- [512ce5c](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/512ce5c) Cleaning up lint-staged configs so we can have a global config and a local library config.
- [72a22de](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/72a22de) Prettier rules into repo root. Configured eslint projects with config roots so they work with lint-staged.
- [cd6eebb](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/cd6eebb) Adding lint-staged for precommit linting
- [15734c8](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/15734c8) Add/fix ESM libraries to build in a way that exports types using TS module:ES6
- [f2f4964](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f2f4964) Merge branch 'master' into 5.5-fixup
- [a4068ff](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/a4068ff) Merge branch 'master' into more\_ts\_options
- [08c59f5](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/08c59f5) Add ability to select preferred streaming quality (low, med, high) when using the SFU
- [ac91bef](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/ac91bef) cleanup and small fixes.
- [8a8d0ec](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/8a8d0ec) Fixing more version issues
- [33de4d2](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/33de4d2) Tweaking versions
- [b27c83d](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b27c83d) Upping typescript version to at least 5
- [4f2c0c5](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/4f2c0c5) Enabled a few more ts compiler options
- [c5dd4bb](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/c5dd4bb) Merge pull request #354 from EpicGamesExt/UE5.5

## [UE5.5-0.1.7](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-common-UE5.5-0.1.7)

- [cfe245e](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/cfe245e) Bumping common library version
- [1154893](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/1154893) Cleaning up lint-staged configs so we can have a global config and a local library config.
- [55c549a](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/55c549a) Rebuilt common docs
- [b3850bc](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b3850bc) Moved signalling protocol documentation
- [f3d07cc](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f3d07cc) Fixing up logging from Common in signalling lib
- [bc552ac](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/bc552ac) - Fixed issue with esm and cjs builds not being correctly configured - Adjusting how Protocol and Transport handle protocol BaseMessages. Transport should just handle strings. Protocol should handle messages.
- [684bd3e](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/684bd3e) Bumping signalling protocol version due to new message. Removed player limit on npm script.
- [0359eef](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0359eef) Trying to improve the documentation by exporting some logging classes
- [14e4914](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/14e4914) Rebuilt common docs to update with new subscribe failed message
- [b9d9a3c](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b9d9a3c) Adding in messaging on the frontend for subscribe failed events.
- [7e3d511](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/7e3d511) Adding concurrently to common deps
- [e246b59](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e246b59) Moving back to es6 instead of nodenext. added clean scripts to all projects. fixing signalling server watch using the incorrect http\_root.
- [820fe9a](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/820fe9a) Fixing lint errors
- [fce22fa](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/fce22fa) oof. finally have something that resembles a dev mode watch for all the libraries. run  in the SignallingWebServer folder
- [41db328](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/41db328) reordered scrips slightly
- [bfff86f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/bfff86f) Cleaning up common lib build setup
- [e1a5f80](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e1a5f80) Just removing some old commented code
- [b44a6db](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b44a6db) Removed comment no longer relevant
- [77099cf](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/77099cf) KeepaliveMonitor now just fires a callback and its up to the owner to handle the timeout event somehow
- [9f40ece](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/9f40ece) Moving the keepalive pings to the frontend. Implementing it on the protocol level was too troublesome.
- [638514a](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/638514a) Allowed the ping and pong messages to be passed to listeners if needed.
- [57538da](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/57538da) Fixing up some small issues
- [2a96eb4](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2a96eb4) Adding a heartbeat to the protocol level of the signalling code

## [UE5.5-0.1.6](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-common-UE5.5-0.1.6)

- [0a8a285](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0a8a285) Bumping common library version
- [ec01869](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/ec01869) Merge pull request #403 from EpicGamesExt/backport/UE5.5/pr-398
- [7623558](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/7623558) Add/fix ESM libraries to build in a way that exports types using TS module:ES6

## [UE5.5-0.1.5](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-common-UE5.5-0.1.5)

- [a25ea39](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/a25ea39) Bumping common library version

## [UE5.5-0.1.4](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-common-UE5.5-0.1.4)

- [c6e550e](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/c6e550e) Bumping common lib version
- [cb11fb2](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/cb11fb2) Merge pull request #355 from mcottontensor/more\_ts\_options
- [047d6d8](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/047d6d8) Add ability to select preferred streaming quality (low, med, high) when using the SFU
