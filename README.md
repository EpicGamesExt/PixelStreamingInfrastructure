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
  // A mediasoup Router instance.
  router: router,
  // Can be 'webrtc' or 'plain'.
  type: 'webrtc',
  // Options for the WebRtcTransport or PlainTransport.
  transportOptions: {
    listenIps: [ { ip: '10.10.0.123', announcedIp: '1.2.3.4' } ],
    enableTcp: false,
  }
});

// Can access the created mediasoup WebRtcTransport.
console.log('created transport:', sdpSendEndpoint.transport);
// => "created transport: <WebRtcTransport>"

// Listen for 'transportclose' event (triggered by WebRtcTransport or Router
// closure).
sdpSendEndpoint.on('transportclose', () => {
  console.log('sdpSendEndpoint.closed:', sdpSendEndpoint.closed);
  // => "sdpSendEndpoint.closed: true"
});

// Listen for 'newproducer' event.
sdpSendEndpoint.on('newproducer', (producer: mediasoupTypes.Producer) => {
  console.log('new producer created:', producer);
  // => "new producer created: <Producer>"
});

// Listen for 'negotiationneeded' event to send SDPs answers to the remote
// endpoint. `type` is always 'answer' for SdpSendEndpoint.
sdpSendEndpoint.on('negotiationneeded', (type: 'offer' | 'answer') => {
  const sdpAnswer = sdpSendEndpoint.createAnswer();

  mySignaling.sendAnswer(sdpAnswer);
});

// Upon receipt of a SDP offer from the remote endpoint, apply it.
mySignaling.on('sdp-offer', async (sdpOffer: string) => {
  // This will trigger 'negotiationneeded' event and may also trigger N
  // 'newproducer' events.
  await sdpSendEndpoint.receiveOffer(sdpOffer);

  // Once the SDP offer is applied, we can obtain the created Producers.
  console.log('created producers:', sdpSendEndpoint.producers);
  // => "created producers: [<Producer>, <Producer>]"
});
```

#### mediasoup sends media to the remote SDP endpoint

```typescript
import { sdpBridge } from 'mediasoup-sdp-bridge';
import { types as mediasoupTypes } from 'mediasoup';
import mySignaling from './my-signaling'; // Our own signaling stuff.

// Create a WebRTC SdpRecvEndpoint to send media to the remote endpoint.
const sdpRecvEndpoint = await sdpBridge.createSdpSendEndpoint({
  // A mediasoup Router instance.
  router: router,
  // Can be 'webrtc' or 'plain'.
  type: 'webrtc',
  // Options for the WebRtcTransport or PlainTransport.
  transportOptions: {
    listenIps: [ { ip: '10.10.0.123', announcedIp: '1.2.3.4' } ],
    enableTcp: false,
  },
  // RTP capabilities of the remote endpoint. Must be a subseet of the
  // router.rtpCapabilities with matching codec payload types and header
  // extensions ids.
  // NOTE: mediasoup-sdp-bridge will provide a helper to generate them.
  rtpCapabilities: {
    codecs: [...],
    headerExtensions: [...]
  }
});

// Can access the created mediasoup WebRtcTransport.
console.log('created transport:', sdpRecvEndpoint.transport);
// => "created transport: <WebRtcTransport>"

// Listen for 'transportclose' event (triggered by WebRtcTransport or Router
// closure).
sdpRecvEndpoint.on('transportclose', () => {
  console.log('sdpRecvEndpoint.closed:', sdpRecvEndpoint.closed);
  // => "sdpRecvEndpoint.closed: true"
});

// Listen for 'newconsumer' event.
sdpRecvEndpoint.on('newconsumer', (consumer: mediasoupTypes.Consumer) => {
  console.log('new consumer created:', consumer);
  // => "new consumer created: <consumer>"
});

// Listen for 'negotiationneeded' event to send SDPs offers to the remote
// endpoint. `type` is always 'offer' for SdpRecvEndpoint.
sdpRecvEndpoint.on('negotiationneeded', (type: 'offer' | 'answer') => {
  const sdpOffer = sdpRecvEndpoint.createOffer();

  // Send the SDP (re-)offer to the remote endpoint and wait for its SDP
  // answer.
  const answerSdp = await mySignaling.sendOffer(sdpOffer);

  // Provide the SdpRecvEndpoint with the SDP answer.
  await sdpRecvEndpoint.receiveAnswer(answerSdp);
});

// If there were mediasoup Producers already created in the Router, or if a new
// one is created, and we want to consume them in the remote endpoint, tell the
// SdpRecvEndpoint to consume them. consume() method will trigger
// 'negotiationneeded' and 'newconsumer' events.
//
// NOTE: By calling consume() method in parallel (without waiting for the previous
// one to complete) we ensure that the 'negotiationneeded' event will just be
// emitted once upon completion of all consume() calls.
await Promise.all([
  sdpRecvEndpoint
    .consume({ producer: producer1 })
    .catch((error) => console.error('sdpRecvEndpoint.consume() failed:', error)),
  sdpRecvEndpoint
    .consume({ producer: producer2 })
    .catch((error) => console.error('sdpRecvEndpoint.consume() failed:', error)),
]);

// We can now obtain the created Consumers.
console.log('created consumers:', sdpRecvEndpoint.consumers);
// => "created consumers: [<Consumer>, <Consumer>]"
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
