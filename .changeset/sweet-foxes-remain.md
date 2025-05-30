---
'@epicgames-ps/wilbur': minor
---

Updates to platform_scripts to fix argument passing to Wilbur.

- Added separator between script parameters and signalling server parameters when using platform scripts
  - From now on, anything after the `--` marker on the command line is passed directly to Wilbur.
  - Parameters before this marker are intended for the scripts. These parameters are validated and unknown parameters will cause an error.
- Added the new `--peer_options_file` parameter to the signalling server.
  - JSON data is problematic to pass on the command line.
  - This new parameter allows you to use a JSON file as your peer options for the server.
  - Using `--peer_options` is now discouraged.
- Fixed issue with passing peer_options while using platform scripts.

