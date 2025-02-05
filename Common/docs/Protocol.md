# Pixel Streaming Signalling Protocol

The following is a complete reference to the current signalling server messaging protocol. These messages are sent as stringified JSON packets. Some parameters are JSON strings themselves and require escape sequences to be contained in the string parameter.

## Terms<a name="terms"></a>

### Signalling Server<a name="term-signallingserver"></a>

>The server that is responsible for routing messageas and controlling new connections.

### Streamer<a name="term-streamer"></a>

> The entity that is streaming the media.

### Player<a name="term-player"></a>

> A consumer of the stream. Could be passive or active with the use of data streams.

### SFU<a name="term-sfu"></a>

> Selective Forwarding Unit. This is a special type of Player that consumes the stream and then can forward the stream to new connected Players. This is useful when many users need to be consuming the stream and encoding resources on the Streamer are not adequate to keep up with the demand.
> Additionally allows the use of simulcast which allows the Streamer to stream a handful of different quality streams that the SFU can selectively forward to individual Players based on their connection quality.

### SDP<a name="term-sdp"></a>

> Session Description Protocol. A message format that is used to negotiate a media connection between two endpoints. There are many resources for further details such as [here](https://www.tutorialspoint.com/webrtc/webrtc_session_description_protocol.htm) or [here](https://webrtchacks.com/sdp-anatomy/)

### ICE Candidate<a name="term-icecandidate"></a>

> Interactive Connectivity Establishment. Describes protocols and routing needed for WebRTC to be able to communicate with a remote device. Further details can be read [here](https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate)

## Example Streaming Message Sequence<a name="example-message-sequence"></a>

```mermaid
sequenceDiagram
Streamer->>Signalling: Open Connection
Signalling->>Streamer: config
Signalling->>Streamer: identify
Streamer->>Signalling: endpointId
Signalling->>Streamer: endpointIdConfirm
Player->>Signalling: Open Connection
Signalling->>Player: config
Signalling->>Player: playerCount
Player->>Signalling: listStreamers
Signalling->>Player: streamerList
Player->>Signalling: subscribe
Signalling->>Streamer: playerConnected
Streamer->>Signalling: offer
Signalling->>Player: offer
Player->>Signalling: answer
Signalling->>Streamer: answer
Streamer->Player: WebRTC negotiation
Note over Streamer, Player: Streaming Session
opt Player Disconnect
	Player->>Signalling: Close Connection
	Signalling->>Streamer: playerDisconnected
end
opt Streamer Disconnect
	Streamer->>Signalling: Close Connection
	Signalling->>Player: streamerDisconnected
end
```

