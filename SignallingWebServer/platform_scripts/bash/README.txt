How to use files in this directory:

- setup.sh : Ensures the correct node is installed and builds the frontend if it isn't already
- start.sh : Starts the signalling server with basic settings
- common.sh : Contains a bunch of helper functions for the contained scripts. Shouldn't be run directly.

The following are provided as handy shortcuts but mostly leverage start.bat functionality
- start_turn.sh : Starts the turn server only with basic settings
- start_with_stun.sh : Starts the signalling server with basic STUN settings
- start_with_turn.sh : Starts the TURN server and then the signalling server with STUN and TURN parameters

Tips:

- Please note that scripts intended to run need to be executable:  $ chmod +x *.sh  will do that job.
- You can provide --help to start.sh to get a list of customizable arguments.
- start_with_turn.sh has issues terminating with CTRL+C on Ubuntu 22.04 when run with the default port. Run start_with_stun.sh and start_turn.sh separately instead or set the player port above port 1024 and run with `SERVER_ARGS="player_port=8000" ./start_with_turn.sh --nosudo`.
