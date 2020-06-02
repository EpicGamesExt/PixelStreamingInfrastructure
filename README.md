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
import { createSdpEndpoint } from 'mediasoup-sdp-bridge';
import { types as mediasoupTypes } from 'mediasoup';
import mySignaling from './my-signaling'; // Our own signaling stuff.

// Create a SdpEndpoint to receive media from the remote endpoint.
const sdpEndpoint = await createSdpEndpoint({
  // A mediasoup WebRtcTransport or PlainTransport.
  transport: transport
});

// Upon receipt of a SDP offer from the remote endpoint, apply it.
mySignaling.on('sdp-offer', async (sdpOffer: string) => {
  // This method will resolve with an array of created mediasoup Producers.
  const producers = await sdpEndpoint.processOffer(sdpOffer);

  // Obtain the corresponding SDP answer and reply the remote endpoint with it.
  const sdpAnswer = sdpEndpoint.createAnswer();
  // or:
  const sdpAnswerObject = sdpEndpoint.createAnswerObject();

  mySignaling.sendAnswer(sdpAnswer);
});
```

#### mediasoup sends media to the remote SDP endpoint

```typescript
import {
  createSdpEndpoint, 
  generateRtpCapabilities
} from 'mediasoup-sdp-bridge';
import { types as mediasoupTypes } from 'mediasoup';
import mySignaling from './my-signaling'; // Our own signaling stuff.

// Create a SdpEndpoint to send media to the remote endpoint.
const sdpEndpoint = await createSdpEndpoint({
  // A mediasoup WebRtcTransport or PlainTransport.
  transport: transport,
});

// Generate remote endpoint's RTP capabilities based on a remote SDP or based
// on handmade capabilities.
const endpointRtpCapabilities =
  generateRtpCapabilities(router.rtpCapabilities, remoteSdp);
// or:
const endpointRtpCapabilities =
  generateRtpCapabilities(router.rtpCapabilities, handmadeRtpCapabilities);

// Listen for 'negotiationneeded' event to send SDPs offers to the remote
// endpoint. This event is emitted when transport.consume() is called or
// when a Producer being consumed is closed or paused/resumed.
sdpEndpoint.on('negotiationneeded', () => {
  const sdpOffer = sdpEndpoint.createOffer();
  // or:
  const sdpOfferObject = sdpEndpoint.createOfferObject();

  // Send the SDP (re-)offer to the remote endpoint and wait for its SDP
  // answer.
  const answerSdp = await mySignaling.sendOffer(sdpOffer);

  // Provide the SdpEndpoint with the SDP answer.
  await sdpEndpoint.processAnswer(answerSdp);
});

// If there were mediasoup Producers already created in the Router, or if a new
// one is created, and we want to consume them in the remote endpoint, tell the
// Transport to consume them. transport.consume() method will trigger
// 'negotiationneeded' event above.
//
// NOTE: By calling consume() method in parallel (without waiting for the
// previous one to complete) we ensure that the 'negotiationneeded' event will
// just be emitted once upon completion of all consume() calls, so a single
// SDP O/A will be needed.
transport
  .consume({
    producerId: producer1.id,
    rtpCapabilities: endpointRtpCapabilities 
  })
  .catch((error) => console.error('transport.consume() failed:', error));

transport
  .consume({
    producerId: producer2.id,
    rtpCapabilities: endpointRtpCapabilities 
  })
  .catch((error) => console.error('transport.consume() failed:', error));
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
