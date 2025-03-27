# Signalling library changelog

<!-- BEGIN -->

## [UE5.5-2.1.9](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-signalling-UE5.5-2.1.9)

- [793aad4](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/793aad4) Bumping signalling version
- [5b0a9a9](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/5b0a9a9) Rebuilt signalling docs
- [23ad87e](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/23ad87e) Adjusting signalling deps
- [f83700c](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f83700c) jsonc moved to actual dep
- [7e66536](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/7e66536) Tweaking deps around a little
- [a60fe8e](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/a60fe8e) Tweaking linting rules
- [6a242ca](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/6a242ca) Cleaning up Signalling deps and updating eslint configs
- [f69280a](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f69280a) Merge branch 'master' into UE5.5
- [b4a8b9b](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b4a8b9b) Fixing develop/watch scripts for windows
- [92b82ac](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/92b82ac) Fixing develop/watch scripts for windows
- [127c7c6](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/127c7c6) Rebuilt signalling docs
- [80aa060](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/80aa060) Moved signalling protocol documentation
- [60a8f22](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/60a8f22) Fixing up logging from Common in signalling lib
- [84b4253](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/84b4253) - Fixed issue with esm and cjs builds not being correctly configured - Adjusting how Protocol and Transport handle protocol BaseMessages. Transport should just handle strings. Protocol should handle messages.
- [ce752b4](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/ce752b4) Adding extra info to new max subscribers variable
- [a672d2f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/a672d2f) Adding in messaging on the frontend for subscribe failed events.
- [268a4c4](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/268a4c4) Adding a limit per streamer.
- [f258c54](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f258c54) Bumping openapi-typescript version to fix issues with undici
- [ab03627](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/ab03627) Moving back to es6 instead of nodenext. added clean scripts to all projects. fixing signalling server watch using the incorrect http\_root.
- [1c9cc73](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/1c9cc73) Fixing lint scripts
- [800b5c1](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/800b5c1) oof. finally have something that resembles a dev mode watch for all the libraries. run  in the SignallingWebServer folder
- [333dd7e](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/333dd7e) missed updated output dir for cjs
- [e20ced9](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e20ced9) Cleaning up signalling build scripts
- [5920c93](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/5920c93) Merge branch 'master' into merge55-master
- [34e0c1f](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/34e0c1f) Moving the keepalive pings to the frontend. Implementing it on the protocol level was too troublesome.
- [2440f90](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2440f90) Adding a heartbeat to the protocol level of the signalling code
- [512ce5c](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/512ce5c) Cleaning up lint-staged configs so we can have a global config and a local library config.
- [72a22de](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/72a22de) Prettier rules into repo root. Configured eslint projects with config roots so they work with lint-staged.
- [15734c8](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/15734c8) Add/fix ESM libraries to build in a way that exports types using TS module:ES6
- [f2f4964](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f2f4964) Merge branch 'master' into 5.5-fixup
- [a4068ff](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/a4068ff) Merge branch 'master' into more\_ts\_options
- [08c59f5](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/08c59f5) Add ability to select preferred streaming quality (low, med, high) when using the SFU
- [b27c83d](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b27c83d) Upping typescript version to at least 5
- [4f2c0c5](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/4f2c0c5) Enabled a few more ts compiler options
- [c5dd4bb](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/c5dd4bb) Merge pull request #354 from EpicGamesExt/UE5.5

## [UE5.5-2.1.8](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-signalling-UE5.5-2.1.8)

- [2ecf0fb](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2ecf0fb) Fixing issues with types/ws. 8.5.14 seems to have changed things up. sticking with 8.5.13 for now.
- [9208490](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/9208490) Bumping signalling version
- [bd37ecb](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/bd37ecb) Trying to fix errors with websocket that only show up on CI
- [7d01287](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/7d01287) Bumping signalling version
- [1154893](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/1154893) Cleaning up lint-staged configs so we can have a global config and a local library config.
- [1fa4d19](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/1fa4d19) Rebuilt signalling docs
- [b3850bc](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b3850bc) Moved signalling protocol documentation
- [f3d07cc](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/f3d07cc) Fixing up logging from Common in signalling lib
- [bc552ac](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/bc552ac) - Fixed issue with esm and cjs builds not being correctly configured - Adjusting how Protocol and Transport handle protocol BaseMessages. Transport should just handle strings. Protocol should handle messages.
- [b19cf42](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b19cf42) Adding extra info to new max subscribers variable
- [b9d9a3c](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/b9d9a3c) Adding in messaging on the frontend for subscribe failed events.
- [5d97134](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/5d97134) Adding a limit per streamer.
- [3b38088](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/3b38088) Bumping openapi-typescript version to fix issues with undici
- [e246b59](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e246b59) Moving back to es6 instead of nodenext. added clean scripts to all projects. fixing signalling server watch using the incorrect http\_root.
- [645bb81](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/645bb81) Fixing lint scripts
- [fce22fa](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/fce22fa) oof. finally have something that resembles a dev mode watch for all the libraries. run  in the SignallingWebServer folder
- [479e8e2](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/479e8e2) missed updated output dir for cjs
- [3d839e0](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/3d839e0) Cleaning up signalling build scripts
- [9f40ece](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/9f40ece) Moving the keepalive pings to the frontend. Implementing it on the protocol level was too troublesome.
- [2a96eb4](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/2a96eb4) Adding a heartbeat to the protocol level of the signalling code

## [UE5.5-2.1.7](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-signalling-UE5.5-2.1.7)

- [24633ca](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/24633ca) Bumping signalling version
- [ec01869](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/ec01869) Merge pull request #403 from EpicGamesExt/backport/UE5.5/pr-398
- [7623558](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/7623558) Add/fix ESM libraries to build in a way that exports types using TS module:ES6

## [UE5.5-2.1.6](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-signalling-UE5.5-2.1.6)

- [72ecf73](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/72ecf73) Bumping signalling version

## [UE5.5-2.1.5](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-signalling-UE5.5-2.1.5)

- [8a19ebd](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/8a19ebd) Bumping signalling library version
- [cb11fb2](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/cb11fb2) Merge pull request #355 from mcottontensor/more\_ts\_options
- [047d6d8](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/047d6d8) Add ability to select preferred streaming quality (low, med, high) when using the SFU

## [UE5.5-2.1.4](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-signalling-UE5.5-2.1.4)

-

## [UE5.5-2.1.11](github-work:mcottontensor/PixelStreamingInfrastructure.git/releases/tag/lib-signalling-UE5.5-2.1.11)

- [0e86c46](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/0e86c46) Bumping signalling version
- [e122032](github-work:mcottontensor/PixelStreamingInfrastructure.git/commit/e122032) Update helmet Content Security Policy to allow websocket connections to sources other than the location where the frontend is hosted (#513)
