# Common library changelog.

<!-- BEGIN -->

## UE5.5-0.2.9

- Bumping common library version
- Adding optional parameters to the websocket transport to describe the websocket subprotocols

## UE5.5-0.2.8

- dealing with dependency nonsense

## UE5.5-0.2.7

- Bumping common library version
- Rebuilt common docs
- Small dep tweaks again
- More dep tweaks
- protoc broke on mac devices after 1.0.4 apparently
- Cleaning up Common deps and updating eslint configs
- Merge pull request #425 from EpicGamesExt/capture-time
- Merge branch 'master' into UE5.5
- Fixing develop/watch scripts for windows
- Fixing develop/watch scripts for windows
- Rebuilt common docs
- Moved signalling protocol documentation
- Fixing up logging from Common in signalling lib
- \- Fixed issue with esm and cjs builds not being correctly configured - Adjusting how Protocol and Transport handle protocol BaseMessages. Transport should just handle strings. Protocol should handle messages.
- Bumping signalling protocol version due to new message. Removed player limit on npm script.
- Trying to improve the documentation by exporting some logging classes
- Rebuilt common docs to update with new subscribe failed message
- Adding in messaging on the frontend for subscribe failed events.
- Adding concurrently to common deps
- Moving back to es6 instead of nodenext. added clean scripts to all projects. fixing signalling server watch using the incorrect http\_root.
- Fixing lint errors
- oof. finally have something that resembles a dev mode watch for all the libraries. run  in the SignallingWebServer folder
- reordered scrips slightly
- Cleaning up common lib build setup
- Merge branch 'master' into merge55-master
- Just removing some old commented code
- Removed comment no longer relevant
- KeepaliveMonitor now just fires a callback and its up to the owner to handle the timeout event somehow
- Moving the keepalive pings to the frontend. Implementing it on the protocol level was too troublesome.
- Allowed the ping and pong messages to be passed to listeners if needed.
- Fixing up some small issues
- Adding a heartbeat to the protocol level of the signalling code
- Removed lint-staged config from common package json
- Cleaning up lint-staged configs so we can have a global config and a local library config.
- Prettier rules into repo root. Configured eslint projects with config roots so they work with lint-staged.
- Adding lint-staged for precommit linting
- Add/fix ESM libraries to build in a way that exports types using TS module:ES6
- Merge branch 'master' into 5.5-fixup
- Merge branch 'master' into more\_ts\_options
- Add ability to select preferred streaming quality (low, med, high) when using the SFU
- cleanup and small fixes.
- Fixing more version issues
- Tweaking versions
- Upping typescript version to at least 5
- Enabled a few more ts compiler options
- Merge pull request #354 from EpicGamesExt/UE5.5

## UE5.5-0.1.7

- Bumping common library version
- Cleaning up lint-staged configs so we can have a global config and a local library config.
- Rebuilt common docs
- Moved signalling protocol documentation
- Fixing up logging from Common in signalling lib
- \- Fixed issue with esm and cjs builds not being correctly configured - Adjusting how Protocol and Transport handle protocol BaseMessages. Transport should just handle strings. Protocol should handle messages.
- Bumping signalling protocol version due to new message. Removed player limit on npm script.
- Trying to improve the documentation by exporting some logging classes
- Rebuilt common docs to update with new subscribe failed message
- Adding in messaging on the frontend for subscribe failed events.
- Adding concurrently to common deps
- Moving back to es6 instead of nodenext. added clean scripts to all projects. fixing signalling server watch using the incorrect http\_root.
- Fixing lint errors
- oof. finally have something that resembles a dev mode watch for all the libraries. run  in the SignallingWebServer folder
- reordered scrips slightly
- Cleaning up common lib build setup
- Just removing some old commented code
- Removed comment no longer relevant
- KeepaliveMonitor now just fires a callback and its up to the owner to handle the timeout event somehow
- Moving the keepalive pings to the frontend. Implementing it on the protocol level was too troublesome.
- Allowed the ping and pong messages to be passed to listeners if needed.
- Fixing up some small issues
- Adding a heartbeat to the protocol level of the signalling code

## UE5.5-0.1.6

- Bumping common library version
- Merge pull request #403 from EpicGamesExt/backport/UE5.5/pr-398
- Add/fix ESM libraries to build in a way that exports types using TS module:ES6

## UE5.5-0.1.5

- Bumping common library version

## UE5.5-0.1.4

- Bumping common lib version
- Merge pull request #355 from mcottontensor/more\_ts\_options
- Add ability to select preferred streaming quality (low, med, high) when using the SFU
