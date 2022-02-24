import * as MsSdpUtils from "mediasoup-client/lib/handlers/sdp/commonUtils";
import { RemoteSdp } from "mediasoup-client/lib/handlers/sdp/RemoteSdp";
import { IceCandidate as ClientIceCandidate } from "mediasoup-client/lib/Transport";

import {
  Consumer,
  MediaKind,
  Producer,
  RtpCapabilities,
  RtpParameters,
  Transport,
  WebRtcTransport,
} from "mediasoup/node/lib/types";

import * as SdpTransform from "sdp-transform";
import { v4 as uuidv4 } from "uuid";

import * as BrowserRtpCapabilities from "./BrowserRtpCapabilities";
import * as SdpUtils from "./SdpUtils";

export class SdpEndpoint {
  // TODO: Currently this only handles WebRTC. At some point the implementation
  // should just use the Transport class and not its subclasses.
  private transport: Transport;
  private webRtcTransport: WebRtcTransport;

  // Local RTP capabilities of this endpoint. Normally set to those of the
  // mediasoup Router.
  private localCaps: RtpCapabilities;

  // Local and remote SDPs, obtained/created from SDP Offer/Answer negotiation.
  private localSdp: string | undefined;
  private remoteSdp: string | undefined;

  private producers: Producer[] = [];
  private producerOfferMedias: object[] = [];
  private producerOfferParams: RtpParameters[] = [];

  private consumers: Consumer[] = [];

  constructor(webRtcTransport: WebRtcTransport, localCaps: RtpCapabilities) {
    this.webRtcTransport = webRtcTransport;
    this.transport = webRtcTransport;

    this.localCaps = localCaps;
  }

  // Receive media into mediasoup
  // ============================
  //
  // * processOffer
  // * createAnswer

  public async processOffer(sdpOffer: string): Promise<Producer[]> {
    if (this.remoteSdp) {
      throw new Error(
        "[SdpEndpoint.processOffer] A remote description was already set"
      );
    }

    this.remoteSdp = sdpOffer;
    const remoteSdpObj = SdpTransform.parse(sdpOffer);

    // DEBUG: Uncomment for details.
    // prettier-ignore
    // {
    //   console.debug(`DEBUG [SdpEndpoint.processOffer] Remote SDP object:\n${JSON.stringify(remoteSdpObj, null, 2)}`);
    // }

    // Use DTLS info from the remote SDP to connect the WebRTC transport.
    await this.webRtcTransport.connect({
      dtlsParameters: MsSdpUtils.extractDtlsParameters({
        sdpObject: remoteSdpObj,
      }),
    });

    // Get a list of media and make Producers for all of them.
    for (const media of remoteSdpObj.media) {
      if (!("rtp" in media)) {
        // Skip media that is not RTP.
        continue;
      }
      if (!("direction" in media)) {
        // Skip media for which the direction is unknown.
        continue;
      }
      if (media.direction !== "sendonly") {
        // Skip media which is not "sendonly", because this is a receive-only
        // SDP endpoint for remote SDP Offers.
        // FIXME: A proper SDP endpoint should be able to handle all directions.
        continue;
      }

      // Generate RtpSendParameters to be used for the new Producer.
      const producerParams = SdpUtils.sdpToProducerRtpParameters(
        remoteSdpObj,
        this.localCaps,
        media.type as MediaKind
      );

      // Add a new Producer for the given media.
      let producer: Producer;
      try {
        producer = await this.transport.produce({
          kind: media.type as MediaKind,
          rtpParameters: producerParams,
          paused: false,
        });
      } catch (error) {
        let message = `mediasoup Producer failed, kind: ${media.type}`;
        if (error instanceof Error) {
          message += `: ${error.message}`;
        }

        console.error(`[SdpEndpoint.processOffer] ERROR: ${message}`);

        throw new Error(message);
      }

      this.producers.push(producer);
      this.producerOfferMedias.push(media);
      this.producerOfferParams.push(producerParams);

      // prettier-ignore
      console.log(`[SdpEndpoint.processOffer] mediasoup Producer created, kind: ${producer.kind}, type: ${producer.type}, paused: ${producer.paused}`);

      // DEBUG: Uncomment for details.
      // prettier-ignore
      // {
      //   console.debug(`DEBUG [SdpEndpoint.processOffer] mediasoup Producer RtpParameters:\n${JSON.stringify(producer.rtpParameters, null, 2)}`);
      // }
    }

    return this.producers;
  }

  public createAnswer(): string {
    if (this.localSdp) {
      console.error(
        "[SdpEndpoint.createAnswer] ERROR: A local description was already set"
      );
      return "";
    }

    const sdpBuilder: RemoteSdp = new RemoteSdp({
      iceParameters: this.webRtcTransport.iceParameters,
      iceCandidates: this.webRtcTransport.iceCandidates as ClientIceCandidate[],
      dtlsParameters: this.webRtcTransport.dtlsParameters,
      sctpParameters: this.webRtcTransport.sctpParameters,
      planB: false,
    });

    console.log("[SdpEndpoint.createAnswer] Make 'recvonly' SDP Answer");

    for (let i = 0; i < this.producers.length; i++) {
      // Each call to RemoteSdp.send() creates a new AnswerMediaSection,
      // which always assumes an `a=recvonly` direction.
      sdpBuilder.send({
        offerMediaObject: this.producerOfferMedias[i],
        reuseMid: undefined,
        offerRtpParameters: this.producerOfferParams[i],
        answerRtpParameters: this.producers[i].rtpParameters,
        codecOptions: undefined,
        extmapAllowMixed: false,
      });
    }

    this.localSdp = sdpBuilder.getSdp();

    return this.localSdp;
  }

  // Send media from mediasoup
  // =========================
  //
  // * addConsumer
  // * createOffer
  // * processAnswer

  public addConsumer(consumer: Consumer): void {
    this.consumers.push(consumer);
  }

  public createOffer(): string {
    if (this.localSdp) {
      console.error(
        "[SdpEndpoint.createOffer] ERROR: A local description was already set"
      );
      return "";
    }

    const sdpBuilder: RemoteSdp = new RemoteSdp({
      iceParameters: this.webRtcTransport.iceParameters,
      iceCandidates: this.webRtcTransport.iceCandidates as ClientIceCandidate[],
      dtlsParameters: this.webRtcTransport.dtlsParameters,
      sctpParameters: this.webRtcTransport.sctpParameters,
      planB: false,
    });

    // Make an MSID to be used for both "audio" and "video" kinds.
    const sendMsid = uuidv4().substr(0, 8);

    console.log("[SdpEndpoint.createOffer] Make 'sendonly' SDP Offer");

    for (let i = 0; i < this.consumers.length; i++) {
      const mid = this.consumers[i].rtpParameters.mid ?? "nomid";
      const kind = this.consumers[i].kind;
      const sendParams = this.consumers[i].rtpParameters;

      // Each call to RemoteSdp.receive() creates a new OfferMediaSection,
      // which always assumes an `a=sendonly` direction.
      sdpBuilder.receive({
        mid,
        kind,
        offerRtpParameters: sendParams,

        // Parameters used to build the "msid" attribute:
        // a=msid:<streamId> <trackId>
        streamId: sendMsid,
        trackId: `${sendMsid}-${kind}`,
      });
    }

    this.localSdp = sdpBuilder.getSdp();

    return this.localSdp;
  }

  public async processAnswer(sdpAnswer: string): Promise<void> {
    if (this.remoteSdp) {
      console.error(
        "[SdpEndpoint.processAnswer] ERROR: A remote description was already set"
      );
      return;
    }

    this.remoteSdp = sdpAnswer;
    const remoteSdpObj = SdpTransform.parse(sdpAnswer);

    // DEBUG: Uncomment for details.
    // prettier-ignore
    // {
    //   console.debug(`DEBUG [SdpEndpoint.processAnswer] Remote SDP object:\n${JSON.stringify(remoteSdpObj, null, 2)}`);
    // }

    // Use DTLS info from the remote SDP to connect the WebRTC transport.
    await this.webRtcTransport.connect({
      dtlsParameters: MsSdpUtils.extractDtlsParameters({
        sdpObject: remoteSdpObj,
      }),
    });

    // TODO: Normally in a proper SDP endpoint the SDP Answer would be used to
    // match local and remote capabilities, and decide a subset of encodings
    // that can be received by the remote peer. However, for the current
    // implementation we just extract and print the remote capabilities.

    // TODO:
    // * Disable header extensions that are not accepted by the remote peer.

    // DEBUG: Uncomment for details.
    // prettier-ignore
    // {
    //   const remoteCaps = SdpUtils.sdpToConsumerRtpCapabilities(remoteSdpObj, this.localCaps);
    //   console.debug(`DEBUG [SdpEndpoint.processAnswer] Remote RECV RtpCapabilities:\n${JSON.stringify(remoteCaps, null, 2)}`);
    // }
  }
}

export function createSdpEndpoint(
  webRtcTransport: WebRtcTransport,
  localCaps: RtpCapabilities
): SdpEndpoint {
  return new SdpEndpoint(webRtcTransport, localCaps);
}

export function generateRtpCapabilities0(): RtpCapabilities {
  return BrowserRtpCapabilities.chrome;
}

export function generateRtpCapabilities1(
  localCaps: RtpCapabilities,
  remoteSdp: string
): RtpCapabilities {
  // TODO: Use proper SDP Offer/Answer negotiation to obtain capabilities.
  console.error("[SdpEndpoint.generateRtpCapabilities1] BUG: Not implemented");
  process.exit(1);

  let caps: RtpCapabilities;
  return caps;
}

export function generateRtpCapabilities2(
  localCaps: RtpCapabilities,
  remoteCaps: RtpCapabilities
): RtpCapabilities {
  // TODO: Use matching to obtain capabilities.
  console.error("[SdpEndpoint.generateRtpCapabilities2] BUG: Not implemented");
  process.exit(1);

  let caps: RtpCapabilities;
  return caps;
}
