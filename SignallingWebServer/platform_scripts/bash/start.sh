#!/bin/bash
# Copyright Epic Games, Inc. All Rights Reserved.
SCRIPT_DIR="$(cd -P -- "$(dirname -- "$0")" && pwd -P)"

. "${SCRIPT_DIR}/common.sh"

parse_args $@
setup $@
set_public_ip
setup_turn_stun "bg"

TEST_ARGS=($SERVER_ARGS)
SKIP_PEER_ARGS=false
for arg in "${TEST_ARGS[@]}"; do
    if [[ "$arg" == --peer_options* ]]; then
        SKIP_PEER_ARGS=true
        break;
    fi
done

SERVER_ARGS+=" --serve --https_redirect --console_messages verbose --log_config --public_ip=${PUBLIC_IP}"
if [[ $SKIP_PEER_ARGS == false ]]; then
    if [[ ! -z "$STUN_SERVER" && ! -z "$TURN_SERVER" ]]; then
        PEER_OPTIONS="{\"iceServers\":[{\"urls\":[\"stun:${STUN_SERVER}\",\"turn:${TURN_SERVER}\"],\"username\":\"${TURN_USER}\",\"credential\":\"${TURN_PASS}\"}]}"
    elif [[ ! -z "$STUN_SERVER" ]]; then
        PEER_OPTIONS="{\"iceServers\":[{\"urls\":[\"stun:${STUN_SERVER}\"]}]}"
    elif [[ ! -z "$TURN_SERVER" ]]; then
        PEER_OPTIONS="{\"iceServers\":[{\"urls\":[\"turn:${TURN_SERVER}\"],\"username\":\"${TURN_USER}\",\"credentials\":\"${TURN_PASS}\"}]}"
    fi
fi
if [[ ! -z "$PEER_OPTIONS" ]]; then
    SERVER_ARGS+=" --peer_options='${PEER_OPTIONS}'"
fi
if [[ ! -z "$FRONTEND_DIR" ]]; then
    SERVER_ARGS+=" --http_root='$FRONTEND_DIR'"
fi

build_wilbur
print_config
start_wilbur

