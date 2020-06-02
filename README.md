# mediasoup-sdp-bridge v3

[![][npm-shield-mediasoup-sdp-bridge]][npm-mediasoup-sdp-bridge]
[![][travis-ci-shield-mediasoup-sdp-bridge]][travis-ci-mediasoup-sdp-bridge]

Node.js library to allow integration of SDP based clients with [mediasoup][mediasoup-website].


## Website and Documentation

* [mediasoup.org][mediasoup-website]


## Support Forum

* [mediasoup.discourse.group][mediasoup-discourse]


## Usage Example

Within the Node.js server app running mediasoup:

#### Remote SDP endpoint sends media to mediasoup

```typescript
import { sdpBridge } from 'mediasoup-sdp-bridge';
import { types as mediasoupTypes } from 'mediasoup';
import mySignaling from './my-signaling'; // Our own signaling stuff.

// Create a WebRTC SdpSendEndpoint to receive media from the remote endpoint.
const sdpSendEndpoint = await sdpBridge.createSdpSendEndpoint({
  // A mediasoup WebRtcTransport or PlainTransport.
  transport: transport
});

// Upon receipt of a SDP offer from the remote endpoint, apply it.
mySignaling.on('sdp-offer', async (sdpOffer: string) => {
  // This method will resolve with an array of created mediasoup Producers.
  const producers = await sdpSendEndpoint.processOffer(sdpOffer);

  // Obtain the corresponding SDP answer and reply the remote endpoint with it.
  const sdpAnswer = sdpSendEndpoint.createAnswer();

  mySignaling.sendAnswer(sdpAnswer);
});
```

#### mediasoup sends media to the remote SDP endpoint

```typescript
import { sdpBridge, generateCapabilities } from 'mediasoup-sdp-bridge';
import { types as mediasoupTypes } from 'mediasoup';
import mySignaling from './my-signaling'; // Our own signaling stuff.

// Create a WebRTC SdpRecvEndpoint to send media to the remote endpoint.
const sdpRecvEndpoint = await sdpBridge.createSdpRecvEndpoint({
  // A mediasoup WebRtcTransport or PlainTransport.
  transport: transport,
  // RTP capabilities of the remote endpoint. Must be a subseet of the
  // router.rtpCapabilities with matching codec payload types and header
  // extensions ids.
  // TODO: Document this.
  rtpCapabilities: generateCapabilities(remoteSdp);
});

// Listen for 'negotiationneeded' event to send SDPs offers to the remote
// endpoint. This event is emitted when sdpRecvEndpoint.consume() is called or
// when a Producer being consumed is closed or paused/resumed.
sdpRecvEndpoint.on('negotiationneeded', () => {
  const sdpOffer = sdpRecvEndpoint.createOffer();

  // Send the SDP (re-)offer to the remote endpoint and wait for its SDP
  // answer.
  const answerSdp = await mySignaling.sendOffer(sdpOffer);

  // Provide the SdpRecvEndpoint with the SDP answer.
  await sdpRecvEndpoint.processAnswer(answerSdp);
});

// If there were mediasoup Producers already created in the Router, or if a new
// one is created, and we want to consume them in the remote endpoint, tell the
// SdpRecvEndpoint to consume them. consume() method will trigger
// 'negotiationneeded' and will resolve with the created mediasoup Consumer.
//
// NOTE: By calling consume() method in parallel (without waiting for the
// previous one to complete) we ensure that the 'negotiationneeded' event will
// just be emitted once upon completion of all consume() calls, so a single
// SDP O/A will be needed.
await Promise.all([
  sdpRecvEndpoint
    .consume({ producer: producer1 })
    .catch((error) => console.error('sdpRecvEndpoint.consume() failed:', error)),
  sdpRecvEndpoint
    .consume({ producer: producer2 })
    .catch((error) => console.error('sdpRecvEndpoint.consume() failed:', error)),
]);
```


## Author

* Iñaki Baz Castillo [[website](https://inakibaz.me)|[github](https://github.com/ibc/)]


## License

[ISC](./LICENSE)




[mediasoup-website]: https://mediasoup.org
[mediasoup-discourse]: https://mediasoup.discourse.group
[npm-shield-mediasoup-sdp-bridge]: https://img.shields.io/npm/v/mediasoup-sdp-bridge.svg
[npm-mediasoup-sdp-bridge]: https://npmjs.org/package/mediasoup-sdp-bridge
[travis-ci-shield-mediasoup-sdp-bridge]: https://travis-ci.com/versatica/mediasoup-sdp-bridge.svg?branch=master
[travis-ci-mediasoup-sdp-bridge]: https://travis-ci.com/versatica/mediasoup-sdp-bridge
