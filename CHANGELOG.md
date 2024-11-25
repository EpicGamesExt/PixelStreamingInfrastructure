# Pixel Streaming Infrastructure Changelog

The changelog is a summary of commits between releases of Unreal Engine.

As a reminder each UE-X branch/tag in this repository corresponds to a version of Unreal Engine.

## [UE 5.5 (Current)](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/commits/UE5.5)

### Major Note: Pixel Streaming 2 release
- Added migration guide and Pixel Streaming 2 release notice by @DenisTensorWorks in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/305

### Features
- Added bidirectional video support by @Belchy06 in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/251
- Added SVC support to the SFU by @Belchy06 in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/258
- Added JS Streamer and Frontend Tests by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/266
- Added `DataChannel` multiplex support to Pixel Streaming 2 by @gingernaz in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/284
- Added a GH action to run a software streamer to test that the stream can be started by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/205
- Added a GH action for Linux stream testing by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/233
- Removed matchmaker by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/160
- Removed browser send offer support by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/212

### Enhancements
- Updated build GH actions by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/90
- Updated platform scripts to skip build when it is not needed by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/126
- Refactored GH workflows by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/134
- Various script updates by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/151
- Added a hook to handle the `layerPreference` message by forwarding it to the SFU by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/152
- Added a test for `layerPreference message` by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/152
- Added missing websocket close codes and reasons by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/198
- URL parameters are no longer case sensitive by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/199
- Simplified Windows path modification for node by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/210
- Disabled fullscreen button showing on iPhone by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/214
- Updated release archive excludes by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/218
- Set default inline style for hidden input by @Belchy06 in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/238
- Changed `--no-save` argument to `--save` to avoid confusion with overwriting `config.json` and added a default `config.json` file by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/240
- Added logging about streamer disconnecting by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/244
- Added support for configurable countdown value for `AFKTimeout` by @pr0g in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/247
- Enabled displaying flexfec, ulpfec, and any other non-video video codecs by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/248
- Added `prettier` to the linter rules by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/253
- Added `prettier` config to `Common`, `Signalling`, and `SignallingWebServer` by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/261
- Updated keypress to use helper to deal with `charCode` deprecation by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/260
- Refactored `Logger` class by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/263
- Refactored input code by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/275
- Added min and max bitrates to answer message by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/277
- Added the ability to provide no min or max value to a number setting by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/288
- Re-enable preventing unidentified streamers showing up in the streamer list by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/300
- Removed redundant and rigid setting of signaling url in `uiless.html` by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/314
- Fixed duplicated source code in built libraries by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/324
  
### Documentation
- Added documentation for signalling messages protocol by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/124
- Updated branch links in RELEASING.md by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/129

### Bug Fixes
- Updated batch scripts to properly handle paths with spaces and updated peer connection option to properly pass them to signalling server by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/114
- Updated signalling server to properly add the peer connection options to the config message by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/114
- Fixed a number of pathing issues in platform scripts on Windows by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/122
- Fixed issues with scripts not properly launching the TURN server by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/142
- Fixed SFU not working on Firefox due to a `probator` track id by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/148
- Fixed an issue with track stats being set to zero in Firefox by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/149
- Fixed potential NAN value return when using dynamic player aspect ratios by @richardFocus in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/167
- Fixed XR stereo convergence and incomplete XR input handling by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/172
- Restored reading configuration from signalling server from config file, default config logging; added handling checks around SSL by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/177
- Fixed parsing of config file and CLI arguments so that CLI has priority by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/182
- Fixed stream restart message being omitted or appearing incorrectly by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/197
- Fixed VPX streaming on Firefox by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/204
- Fixed mobile UI not scaling correctly when nav bars are present by @lukehb in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/213
- Added missing `track` type option in `RTCStatsTypePS` by @rishi23root in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/235
- Fixed broken reference to `getUniqueLegacyId` by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/243
- Fixed touch with virtual joystick issues by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/271
- Fixed showcase stat buttons on Pixel Streaming 2 by @Belchy06 in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/282
- Fixed SFU not being able reconnect once a streamer has disconnected by @Belchy06 in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/309
- Fixed `TouchControllers` function re-adding the same event listeners instead of removing them by @lucastanger in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/323

### Security
- Bumped the npm_and_yarn group across a number of directories by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/144
- Bumped the npm_and_yarn group across a number of directories by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/147
- Bumped the npm_and_yarn group across a number of directories by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/154
- Bumped the npm_and_yarn group across a number of directories by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/262
- Bumped the npm_and_yarn group across a number of directories by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/279
- Bumped the npm_and_yarn group across a number of directories by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/283
- Bumped the npm_and_yarn group across a number of directories by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/285
- Bumped the npm_and_yarn group across a number of directories by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/302
- Bumped the npm_and_yarn group across a number of directories by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/303
- Bumped webpack from 5.93.0 to 5.94.0 in /Extras/JSStreamer in the npm_and_yarn group across a number of directories by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/267
- Bumped React version and its dependencies by @Belchy06 in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/237

## [UE 5.4](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/commits/UE5.4)
### Features
- Add support for non-latin characters by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/452
- Adding an option to hide the UI. by @mcottontensor in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/88

### Enhancements
- Updating NPM libs to 5.4 by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/362
- Update SignallingWebServer platform scripts to support Mac by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/389
- Expose JSS InsertionPoint (#390) by @timbotimbo in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/397
- Fix/allow video autoplay without click by @bramford in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/409
- Removing authentication features. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/414
- Fixes for Streamers changing IDs when connecting & Updates to SFU behaviour relating to multi streamer changes. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/416
- Rewriting a bunch of reconnect and disconnect handling. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/419
- Exposing the pixelstreaming interface to the browser. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/420
- Bitrate negotiation on stream startup by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/425
- Dockerfile for SFU by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/431
- Remove auto-assigned prop by @evenstensberg in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/434
- Update cirrus.js - More informative error messages - Fixes #184 by @alien299 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/441
- Re-order settings order by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/471
- Add TCP+Relay detection event by @david-macpherson in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/485

### Documentation
- Shift of Matchmaker and SFU pages to Infra by @MWillWallT in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/361
- New docs by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/429
- Update CONTRIBUTING.md - Added Verified Commits as a Requirement - Closes#445 by @alien299 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/448
- Update copyright/license year by @DenisTensorWorks in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/474
- Fix typo readme by @Ahhj93 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/488

### Bug Fixes
- Bug fix to retrieve the correct selected ice candidate pair by @david-macpherson in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/25
- Added SDP for probator by @zuvola in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/86
- Remove unit conversion for bitrate from URL. URL is already in kbps (#369) by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/372
- Handle statsPanel or settingsPanel being undefined. (#392) by @timbotimbo in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/394
- Allowing the Matchmaker to run on linux by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/406
- Fixing missed function rename. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/427
- Update platform scripts so that the BASH_LOCATION works on Mac as well by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/428
- Fixing left behind streamer IDs when they're late to ID themselves. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/432
- Fixing handling of StreamerId in the initial config settings. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/438
- Small signalling server fixes. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/443
- Fix warnings about GamepadButtonReleased by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/451
- Fix for build-all script dependencies by @kroecks in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/453
- Export NO_SUDO so it's available for use in launched processes by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/472
- Fix touch events not working on iOS by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/486
- Bug Fix TCP Relay event to only be emitted once by @david-macpherson in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/490

### Security
- Bump webpack-dev-middleware from 5.3.3 to 5.3.4 in /Frontend/implementations/typescript by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/37
- Bump webpack-dev-middleware from 5.3.3 to 5.3.4 in /Frontend/implementations/react by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/39
- Bump follow-redirects from 1.15.4 to 1.15.6 in /Frontend/implementations/typescript by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/41
- Bump follow-redirects from 1.15.4 to 1.15.6 in /Frontend/implementations/react by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/43
- Bump express from 4.18.2 to 4.19.2 in /SignallingWebServer by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/65
- Bump express from 4.18.2 to 4.19.2 in /Matchmaker by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/70
- Bump express in from 4.18.2 to 4.19.2 /Frontend/implementations/typescript by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/73
- Bump express from 4.18.2 to 4.19.2 in /Frontend/implementations/react by @dependabot in https://github.com/EpicGamesExt/PixelStreamingInfrastructure/pull/79
- Bump postcss from 8.4.21 to 8.4.31 in /Frontend/implementations/typescript (#380) by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/383
- Bump postcss from 8.4.21 to 8.4.31 in /Frontend/implementations/react (#379) by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/386
- Bump @babel/traverse from 7.21.3 to 7.23.2 in /Frontend/library (#384) by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/388
- Bump follow-redirects from 1.15.2 to 1.15.4 in /Frontend/implementations/typescript by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/465
- Bump follow-redirects from 1.15.2 to 1.15.4 in /Frontend/implementations/react by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/464

## [UE 5.3](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/commits/UE5.3)

### Features
- Protocol structures can now contain strings by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/336
- Added the ability for the frontend peer to auto connect when a new streamer is available by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/358

### Enhancements
- Upgrade 5.2 to 5.3 in libraries, docs, log messages, build pipelines by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/262
- Include create, reconnect, and update events (with associated tests) by @jibranabsarulislam in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/273
- Add github action for PR and Issue management by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/304
- Update stale.yml by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/305
- Update stale workflow to also auto close stale issues and PRs by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/306
- Show player count in stats panel by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/303
- Change implementations/EpicGames to implementations/typescript #166 by @gunsha in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/177
- Refactor SignallingWebServer to a single docker file by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/337
- Update LatencyTest handler to accept input data by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/340
- Add contribution guideline `CONTRIBUTING.md` by @DenisTensorWorks in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/352
- New matchmaker queue screen with easy customization by @kasp1 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/211
- Updated CONTRIBUTING.md with backport rules by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/357

### Documentation
- Signaling message reference doc by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/271
- Update SignallingProtocol.md by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/288

### Bug fixes
- Fixed auto reconnect to not reconnect when the page is refreshed. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/285
- Fixed iOS touch when settings panel is open by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/274
- Fixed Firefox console errors `TypeError: this.preferredCodec.split is not a function` by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/310
- Fixed ensuring touch is relative to absolute location of parent rect by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/316
- Fixed injecting new params into SDP to get stereo back on Chrome by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/332
- Fixed matchmaker asking for OS authentication instead of erroring out with EACCESS by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/333
- Fixed consuming the context menu event instead of sending a mouse up by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/354

### Security
- Bump tough-cookie from 4.1.2 to 4.1.3 in /Frontend/library by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/290
- Bump word-wrap from 1.2.3 to 1.2.4 in /Frontend/library by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/320
- Bump word-wrap from 1.2.3 to 1.2.5 in /Frontend/ui-library by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/327
- Bump Node.js to latest LTS by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/321

## [UE 5.2](https://github.com/EpicGames/PixelStreamingInfrastructure/commits/UE5.2)

### Features
- Added minimal sample React implementation by @hmuurine in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/159
- Added a new frontend for the Pixel Streaming Demo showcase project by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/158
- Added multiple streamer support by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/74
- Added `DefaultToHover` being parsed as a config option in `InitialSettings` message by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/68
- Added indication to the signalling server when the browser intends to send the offer by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/75
- Added experimental support for WebXR based experiences by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/85

### Docs
- New general docs page/ToC + new security page. by @MWillWallT in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/254
- Update README to mention container images require being part of Epic's Github org by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/248
- Update platform_scripts readme.md to explain the different scripts by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/224
- Improve signalling Server readme @DenisTensorWorks in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/223
- Adding microphone feature documentation for UE5.2 by @DenisTensorWorks in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/228
- Adding microphone feature documentation by @DenisTensorWorks in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/208
- Added new general docs page/ToC + new security page. by @MWillWallT in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/254
- Settings Panel Documentation by @MWillWallT in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/135
- Customised Pixel Streaming Player Page by @MWillWallT in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/90
- Updated Signalling Server docs by @DenisTensorWorks in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/223
- Updated docs for frontend for settings and TURN by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/224
- Adding docs for microphone feature by @DenisTensorWorks in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/228
- Updated README to mention container images require being part of Epic's Github org by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/248
- Updated the Frontend Docs to move some material from UE docs official to this repo by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/152
- Update Docs to remove broken links by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/122

### Enhancements
- Add repository health status in the form of Github badges table on readme.md by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/265
- Re-enable iOS and iPadOS fullscreen by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/266
- Changed forwarded logs to Cyan, added warning for missing playerId by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/253
- Added "media-playout" to prevent spam in Aggregated Stats by @chasse20 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/232
- Added 'stat PixelStreamingGraphs' to showcase frontend #229 by @devrajgadhvi in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/238
- Bump socket.io-parser from 4.2.2 to 4.2.4 in /Matchmaker by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/244
- Bump engine.io from 6.4.0 to 6.4.2 in /Matchmaker by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/220
- Allow inheritance of webrtcPlayerController and webXrController by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/209
- Pass command line args when calling run_local.bat by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/109
- Customize frontend styles through UI API by @hmuurine in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/133
- Force URL param settings when receiving initial application settings by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/134
- Added ability to pass HTTPS certificate locations via Cirrus configuration by @marcinbiegun in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/149
- Added unit tests for library by @hmuurine in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/156
- Converted frontend javascript to typescript and refactor. by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/63
- Removed useless code, make code style more consistent by @Senseme in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/59
- Multi-streamer QOL improvements by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/88
- Removing the player id from forwarded messages by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/91
- Added a QOL message when multiple streamers are detected by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/94
- Added dev and prod configs to webpack by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/102
- Added github actions to create an NPM package for frontend library and make a release for the repo by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/103
- Neaten up install scripts by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/106
- Added 'stat PixelStreamingGraphs' to showcase frontend #229 by @devrajgadhvi in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/238
- Changed forwarded logs to Cyan, added warning for missing playerId by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/253
- Allow inheritance of webrtcPlayerController and webXrController by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/209
- Alter reconnection flow to request streamer message list and fail out after N attempts. by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/195
- Added exports for UI configuration types by @kass-kass in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/193
- Added ability to optionally disable certain frontend elements by @kass-kass in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/161
- Added support for programmatically changing peer layers when using the SFU by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/179
- Improved frontend API support for UE communication by @hmuurine in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/132
- Added ability in frontend to Enable/disable user input devices by @hmuurine in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/136
- Exposed websocketController and webXRController to public API by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/124
- Added XR events: xrSessionStarted, xrSessionEnded, xrFrame by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/125
- Decouple UI from the frontend library by @hmuurine in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/110
- Replaced hardcoded log path with given parameter path by @Mirmidion in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/39

### Bug fixes
- Fixed viewport resizing not always working due to improperly calling timer. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/247
- Fixed hovering mouse mode set in URL being overridden on refresh. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/246
- Fixed matchmaker directing users to http when the signalling server is using https by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/245
- Fixed reconnects will be attempted even when a disconnect is triggered by afk timeout by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/215
- Fixed datachannels not working when using the SFU by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/137
- Fixed SFU having clashing datachannel/stream ids, now using mediasoup's internal stream ids for SCTP by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/129
- Fixed controller indices from multiple peers would clash by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/165
- Fixed Connecting to Unreal 5.1 app with the 5.2 frontend crashes on connect by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/180
- Fixed sfu player would try subscribing when sfu disconnected by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/172
- Fixed bug where stress tester would leave orphaned Pixel Streaming connections by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/185
- Fixed bug where reconnects were being attempted even when a disconnect is triggered by afk timeout by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/215
- Fixed viewport resizing not always working due to improperly calling timer. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/247
- Fixed log spam caused by missing "media-playout" in Aggregated Stats by @chasse20 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/232
- Fixed hovering mouse mode set in URL being overridden on refresh. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/246
- Fixed matchmaker directing users to http when the signalling server is using https by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/245
- Fixed frontend library not building on Linux due to incorrect casing by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/96
- Fixed SFU peer datachannels aren't being created by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/95 and https://github.com/EpicGames/PixelStreamingInfrastructure/pull/97
- Fixed crash on browsers where the xr object wasn't on the navigator by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/93
- Fixed Preferred codec selector causes no stream if application launched without `-PixelStreamingNegotiateCodecs` by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/83
- Fixed adding the rest of the browsers supported codecs after setting the preferred codec (#83) by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/84
- Fixed delayed mic input  by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/77 and @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/78
- Fixed syntax error by @mcianni in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/44
- Fixed check if KeyboardEvent.keyCode deprecated then use KeyboardEvent.code + mapping instead. by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/48
- Fixed bug when negating property in and removing duplicate property  by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/49
- Fixed incorrect login page path when using authentication by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/55
- Fixed handling of "defaultToHover" field in offer by @StomyPX in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/60
- Fixed Pixel Streaming session disconnecting entirely when using the new frontend by @hmuurine in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/141
- Fixed input would not entirely unregister when using the new frontend by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/144
- Fixed frontend not working with older NodeJS versions due ts-jest and jest by @hmuurine in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/168
- Fixed webpack was double bundling frontend lib into the final bundle (#117) by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/118 @hmuurine in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/117
- Fixed cirrus Dockerfile that resulting in a non-functional signalling server by @Belchy06 in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/123

### Security
- Various security updates by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/220
- Security updates for default turn server configuration. by @gingernaz in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/196
- Bumped qs and express in /SignallingWebServer by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/69
- Bumped qs and express in /Matchmaker by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/70
- Bumped passport from 0.4.1 to 0.6.0 in /SignallingWebServer by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/71
- Bumped engine.io and socket.io in /Matchmaker by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/72
- Bumped socket.io-parser from 4.2.2 to 4.2.4 in /Matchmaker by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/244
- Fixed insufficient validation when decoding a Socket packet by @iot-defcon
- @ CVE-2022-25896 by @mik-patient in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/35
- Bump webpack from 5.75.0 to 5.76.0 in /Frontend/library by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/153
- Bump webpack from 5.75.0 to 5.76.0 in /Frontend/ui-library by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/155
- Bump webpack from 5.75.0 to 5.76.0 in /Frontend/implementations/EpicGames by @dependabot in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/154
- Fixing security warnings. by @mcottontensor in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/163
- Moved all package.json under @epicgames-ps scope to avoid package confusion by @lukehb in https://github.com/EpicGames/PixelStreamingInfrastructure/pull/187

## [UE 5.1](https://github.com/EpicGames/PixelStreamingInfrastructure/commits/UE5.1)

### Bug fixes
- 3b1b84 Fix black screen flickering when receiving freeze frames.
- 853625 Fix CSS to show AFK overlay.
- c897e1 Fix `pointerlock` errors on platforms like iOS where it doesn't exist.

### Features
- 980208 Add handling for mouse double click.
- 6b8f31 Expose freeze frame delay as a configurable option.
- fe5c4c Added Dockerfile for the 5.1 Signalling Server container.

## [UE 5.0](https://github.com/EpicGames/PixelStreamingInfrastructure/commits/UE5.0)

### Bug fixes
- 3d641a Fixed `MatchViewportWidth` not working if toggled repeatedly.
- ca6644 Fix controller button messages not being sent.
- bb4063 Fix missing `let` in loops.
- b59bfb Fix `removeResponseEventListener` using remove instead of delete.
- 4fee8a Fix missing initialization for unquantizeAndDenormalizeUnsigned.
- 42fa91 Move to standardized `onwheel` browser event.

### Features
- b23cba Added a `MaxPlayerCount` configuration option to the signalling server to restrict participant numbers (default -1: no upper limit).
- e46c4d Added support for handling websocket messages sent as binary.
- 616f07 Added `offerToReceive` toggle/flag to indicate browser should/or should not make the SDP offer.
- 845ab1 Added ability to send handle a "input protocol", which is a protocol specification for data channel messages sent by the UE side. This allows the frontend need no extra handling to support custom data channel messages (of course the user must still bind a handler if they wish to do anything with the message). 
- 1c1fe0 Added ability to request keyframes on the frontend.

## [UE 4.27 (End of life)](https://github.com/EpicGames/PixelStreamingInfrastructure/commits/UE4.27)

Backported 5.0 frontend to support 4.27:
- Removed SFU support as this is not supported in 4.27.
- Ignore playerConnected message as not supported in 4.27.
- Force frontend to generate the WebRTC offer as 4.27 expects this.

## [UE 4.26 (Unsupported)](https://github.com/EpicGames/PixelStreamingInfrastructure/commits/UE4.26)

Backported 5.0 frontend to support 4.26:
- Removed SFU support as this is not supported in 4.26.
- Ignore playerConnected message as not supported in 4.26.
- Force frontend to generate the WebRTC offer as 4.26 expects this.
- Remove Linux scripts as Linux Pixel Streaming was not supported in 4.26.
- Force the removal of `extmap-allow-mixed` from the SDP as WebRTC version UE used in 4.26 did not support it.

## Previous versions
Versions prior to UE 4.26 are not tracked here as this repository has never supported those versions.
