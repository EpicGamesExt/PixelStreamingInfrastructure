import {
    WebSocketTransport,
    SignallingProtocol,
    Messages,
    MessageHelpers,
    BaseMessage
} from '@epicgames-ps/lib-pixelstreamingcommon-ue5.5';

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

const player_map: Map<string, RTCPeerConnection> = new Map<string, RTCPeerConnection>();

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

        const offer = await peer_connection.createOffer();
        await peer_connection.setLocalDescription(offer);

        protocol.sendMessage(MessageHelpers.createMessage(Messages.offer, { playerId: msg.playerId, sdp: offer.sdp }));
        player_map[player_id] = peer_connection;
    }
}

function handlePlayerDisconnectedMessage(msg: Messages.playerDisconnected) {
    const player_id = msg.playerId;
    delete player_map[player_id];
}

function handleAnswerMessage(msg: Messages.answer) {
    const player_id = msg.playerId;
    if (player_id && player_map[player_id]) {
        const peer_connection = player_map[player_id];
        const answer = new RTCSessionDescription({ type: 'answer', sdp: msg.sdp });
        peer_connection.setRemoteDescription(answer);
    }
}

function handleIceMessage(msg: Messages.iceCandidate) {
    const player_id = msg.playerId;
    if (player_id && player_map[player_id]) {
        const peer_connection = player_map[player_id];
        const candidate = new RTCIceCandidate(msg.candidate);
        peer_connection.addIceCandidate(candidate);
    }
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

    transport.connect(`wss://${window.location.hostname}:8888`);
}

declare global {
    interface Window { startStreaming(): void; }
}

document.body.onload = function() {
    window.startStreaming = startStreaming;
}

