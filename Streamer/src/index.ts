import {
    WebSocketTransport,
    SignallingProtocol,
    Messages,
    MessageHelpers,
    BaseMessage
} from '@epicgames-ps/lib-pixelstreamingcommon-ue5.5';
import { DataProtocol } from './protocol';

// TS doesn't like the captureStream method. FF also names it differently
interface HTMLCaptureableMediaElement extends HTMLMediaElement {
    captureStream?(): MediaStream;
    mozCaptureStream?(): MediaStream;
}

// helper just to wrap the naming of captureStream
function maybeCaptureStream(element: HTMLCaptureableMediaElement): MediaStream | null {
    if (element) {
        if (element.captureStream) {
            return element.captureStream();
        } else if (element.mozCaptureStream) {
            return element.mozCaptureStream();
        }
        else {
            return null;
        }
    }
}

const protocol_version = "1.0.0";
let peer_connection_options = null;
let protocol: SignallingProtocol;
let playback_element: HTMLCaptureableMediaElement;
let local_stream: MediaStream;

interface PlayerPeer {
    id: string;
    peer_connection: RTCPeerConnection;
    data_channel: RTCDataChannel;
};

const player_map: Map<string, PlayerPeer> = new Map<string, PlayerPeer>();

function handleConfigMessage(msg: Messages.config) {
    peer_connection_options = msg.peerConnectionOptions;
}

function handleIdentifyMessage(_msg: Messages.identify) {
    const endpointMessage = MessageHelpers.createMessage(Messages.endpointId, { id: "MockStreamer", protocolVersion: protocol_version });
    protocol.sendMessage(endpointMessage);
}


function handleEndpointIdConfirmMessage(_msg: Messages.endpointIdConfirm) {
    playback_element = document.getElementById("source_video") as HTMLCaptureableMediaElement;
    local_stream = maybeCaptureStream(playback_element);
    playback_element.play();
}

async function handlePlayerConnectedMessage(msg: Messages.playerConnected) {
    if (local_stream) {
        const player_id = msg.playerId;
        const peer_connection = new RTCPeerConnection(peer_connection_options);
        
        peer_connection.onicecandidate = (event) => {
            if (event.candidate) {
                protocol.sendMessage(MessageHelpers.createMessage(Messages.iceCandidate, { playerId: player_id, candidate: event.candidate }));
            }
        };

        local_stream.getTracks().forEach((track) => {
            peer_connection.addTrack(track, local_stream);
        });

        const data_channel = peer_connection.createDataChannel("datachannel", { ordered: true, negotiated: false });
        data_channel.binaryType = "arraybuffer";
        data_channel.onopen = () => {
            console.log(`data channel for ${player_id} opened`);
            sendDataProtocol(player_id);
            sendInitialSettings(player_id);
        };
        data_channel.onclose = () => {
            console.log(`data channel for ${player_id} closed`);
        };
        data_channel.onmessage = (e: MessageEvent) => {
            const message = new Uint8Array(e.data)
            handleDataChannelMessage(player_id, message);
        }

        player_map[player_id] = {
            player_id: player_id,
            peer_connection: peer_connection,
            data_channel: data_channel
        };
        
        const offer = await peer_connection.createOffer();
        await peer_connection.setLocalDescription(offer);
        protocol.sendMessage(MessageHelpers.createMessage(Messages.offer, { playerId: msg.playerId, sdp: offer.sdp }));
    }
}

function handlePlayerDisconnectedMessage(msg: Messages.playerDisconnected) {
    const player_id = msg.playerId;
    delete player_map[player_id];
}

function handleAnswerMessage(msg: Messages.answer) {
    const player_id = msg.playerId;
    if (player_id && player_map[player_id]) {
        const player_peer = player_map[player_id];
        const answer = new RTCSessionDescription({ type: 'answer', sdp: msg.sdp });
        player_peer.peer_connection.setRemoteDescription(answer);
    }
}

function handleIceMessage(msg: Messages.iceCandidate) {
    const player_id = msg.playerId;
    if (player_id && player_map[player_id]) {
        const player_peer = player_map[player_id];
        const candidate = new RTCIceCandidate(msg.candidate);
        player_peer.peer_connection.addIceCandidate(candidate);
    }
}

function sendDataProtocol(player_id: string) {
    const player_peer = player_map[player_id];
    if (player_peer) {
        const streamer_proto = {
            Direction: 0,
        };
        for (const [message_name, message_def] of Object.entries(DataProtocol.ToStreamer)) {
            streamer_proto[message_name] = { id: message_def.id, structure: [] };
            for (const struct of message_def.structure) {
                streamer_proto[message_name].structure.push(struct.type);
            }
        }
        const streamer_proto_str = JSON.stringify(streamer_proto);
        const streamer_buffer = constructMessage(DataProtocol.FromStreamer.Protocol, streamer_proto_str);
        player_peer.data_channel.send(streamer_buffer);

        const player_proto = {
            Direction: 1,
        };
        for (const [message_name, message_def] of Object.entries(DataProtocol.FromStreamer)) {
            streamer_proto[message_name] = { id: message_def.id, structure: [] };
            for (const struct of message_def.structure) {
                streamer_proto[message_name].structure.push(struct.type);
            }
        }
        const player_proto_str = JSON.stringify(player_proto);
        const player_buffer = constructMessage(DataProtocol.FromStreamer.Protocol, player_proto_str);
        player_peer.data_channel.send(player_buffer);
    }
}

function sendInitialSettings(player_id: string) {
    const temp_settings = {
        PixelStreaming:
        {
            AllowPixelStreamingCommands: false,
            DisableLatencyTest: false
        },
        Encoder:
        {
            TargetBitrate: -1,
            MaxBitrate: 20000000,
            MinQP: 5,
            MaxQP: 23,
            RateControl: "CBR",
            FillerData: 0,
            MultiPass: "FULL"
        },
        WebRTC:
        {
            DegradationPref: "MAINTAIN_FRAMERATE",
            FPS: 60,
            MinBitrate: 400000,
            MaxBitrate: 678000000,
            LowQP: 25,
            HighQP: 37
        },
        ConfigOptions:
        {}
    }

    const player_peer = player_map[player_id];
    if (player_peer) {
        const settings_str = JSON.stringify(temp_settings);
        console.log(settings_str);
        const settings_buffer = constructMessage(DataProtocol.FromStreamer.InitialSettings, settings_str);
        player_peer.data_channel.send(settings_buffer);
    }
}

function constructMessage(message_def: any, ...args): ArrayBuffer {
    let data_size = 0;
    let arg_index = 0;

    if (message_def.structure.length != args.length) {
        console.log(`Incorrect number of parameters given to constructMessage. Got ${args.length}, expected ${message_def.structure.length}`);
        return null;
    }

    data_size += 1; // message type
    // fields
    message_def.structure.forEach((param: any) => {
        switch (param.type) {
            case "uint8": data_size += 1; break;
            case "uint16": data_size += 2; break;
            case "int16": data_size += 2; break;
            case "float": data_size += 4; break;
            case "double": data_size += 8; break;
            case "string": {
                    // size prepended string
                    const str_val = args[arg_index] as string;
                    data_size += 2;
                    data_size += 2 * str_val.length;
                }
                break;
            case "only_string": {
                    // string takes up the full message
                    const str_val = args[arg_index] as string;
                    data_size += 2 * str_val.length;
                }
                break;
        }
        arg_index += 1;
    });

    const data = new DataView(new ArrayBuffer(data_size));

    data_size = 0;
    arg_index = 0;

    data.setUint8(data_size, message_def.id);
    data_size += 1;
    message_def.structure.forEach((param: any) => {
        switch (param.type) {
            case "uint8":
                data.setUint8(data_size, args[arg_index] as number);
                data_size += 1;
                break;
            case "uint16":
                data.setUint16(data_size, args[arg_index] as number, true);
                data_size += 2;
                break;
            case "int16":
                data.setInt16(data_size, args[arg_index] as number, true);
                data_size += 2;
                break;
            case "float":
                data.setFloat32(data_size, args[arg_index] as number, true);
                data_size += 4;
                break;
            case "double":
                data.setFloat64(data_size, args[arg_index] as number, true);
                data_size += 8;
                break;
            case "string": {
                    const str_val = args[arg_index] as string;
                    data.setUint16(data_size, str_val.length, true);
                    data_size += 2;
                    for (let i = 0; i < str_val.length; ++i) {
                        data.setUint16(data_size, str_val.charCodeAt(i), true);
                        data_size += 2;
                    }
                }
                break;
            case "only_string": {
                    const str_val = args[arg_index] as string;
                    for (let i = 0; i < str_val.length; ++i) {
                        data.setUint16(data_size, str_val.charCodeAt(i), true);
                        data_size += 2;
                    }
                }
                break;
        }
        arg_index += 1;
    });

    return data.buffer;
}

function deconstructMessage(message: Uint8Array) {
    const data = new DataView(message.buffer);
    let data_offset = 0;

    // read the message type
    const message_type = data.getUint8(data_offset);
    data_offset += 1;

    // get the message definition
    const message_def = (() => {
        for (const def of Object.values(DataProtocol.ToStreamer)) {
            if (def.id == message_type) {
                return def;
            }
        }
        return null;
    })();

    if (!message_def) {
        console.log(`Unknown message from player: ${message_type}`);
        return null;
    }

    const result_message = {};
    message_def.structure.forEach((param: any) => {
        let value: any;
        switch (param.type) {
            case "uint8":
                value = data.getUint8(data_offset);
                data_offset += 1;
                break;
            case "uint16":
                value = data.getUint16(data_offset);
                data_offset += 2;
                break;
            case "int16":
                value = data.getInt16(data_offset);
                data_offset += 2;
                break;
            case "float":
                value = data.getFloat32(data_offset);
                data_offset += 4;
                break;
            case "double":
                value = data.getFloat64(data_offset);
                data_offset += 8;
                break;
            case "string": {
                    const str_len = data.getUint16(data_offset);
                    data_offset += 2;
                    const text_decoder = new TextDecoder('utf-16');
                    value = text_decoder.decode(data.buffer.slice(data_offset, data_offset + str_len));
                    data_offset += str_len;
                }
                break;
            case "only_string": {
                    const text_decoder = new TextDecoder('utf-16');
                    value = text_decoder.decode(data.buffer.slice(1));
                }
                break;
        }
        result_message[param.name] = value;
    });

    return { type: message_type, message: result_message };
}

function handleDataChannelMessage(player_id: string, message: Uint8Array) {
    const result = deconstructMessage(message);
    console.log(`Got message: ${JSON.stringify(result)}`);
}

function startStreaming() {
    const transport = new WebSocketTransport();
    protocol = new SignallingProtocol(transport);
    protocol.addListener(Messages.config.typeName, (msg: BaseMessage) =>
        handleConfigMessage(msg as Messages.config)
    );

    protocol.addListener(Messages.identify.typeName, (msg: BaseMessage) =>
        handleIdentifyMessage(msg as Messages.identify)
    );

    protocol.addListener(Messages.endpointIdConfirm.typeName, (msg: BaseMessage) =>
        handleEndpointIdConfirmMessage(msg as Messages.endpointIdConfirm)
    );

    protocol.addListener(Messages.playerConnected.typeName, (msg: BaseMessage) =>
        handlePlayerConnectedMessage(msg as Messages.playerConnected)
    );

    protocol.addListener(Messages.playerDisconnected.typeName, (msg: BaseMessage) =>
        handlePlayerDisconnectedMessage(msg as Messages.playerDisconnected)
    );

    protocol.addListener(Messages.answer.typeName, (msg: BaseMessage) =>
        handleAnswerMessage(msg as Messages.answer)
    );

    protocol.addListener(Messages.iceCandidate.typeName, (msg: BaseMessage) =>
        handleIceMessage(msg as Messages.iceCandidate)
    );

    transport.on('close', () => {
        if (playback_element) {
            playback_element.pause();
        }
    });

    transport.connect(`ws://${window.location.hostname}:8888`);
}

declare global {
    interface Window { startStreaming(): void; }
}

document.body.onload = function() {
    window.startStreaming = startStreaming;
}

