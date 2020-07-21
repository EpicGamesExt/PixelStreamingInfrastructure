import * as MsSdpUtils from "mediasoup-client/lib/handlers/sdp/commonUtils";
import { RemoteSdp } from "mediasoup-client/lib/handlers/sdp/RemoteSdp";

import {
  Consumer,
  MediaKind,
  Producer,
  RtpCapabilities,
  Transport,
  WebRtcTransport,
} from "mediasoup/lib/types";

import * as SdpTransform from "sdp-transform";
import { v4 as uuidv4 } from "uuid";

import * as BrowserRtpCapabilities from "./BrowserRtpCapabilities";
import * as SdpUtils from "./SdpUtils";

// Print whole objects instead of giving up after two levels of nesting.
require("util").inspect.defaultOptions.depth = null;

export class SdpEndpoint {
  // TODO: Currently this only handles WebRTC. At some point the implementation
  // should just use the Transport class and not its subclasses.
  private transport: Transport;
  private webRtcTransport: WebRtcTransport;

  // Local RTP capabilities of this endpoint. Normally set to those of the
  // mediasoup Router.
  private localCaps: RtpCapabilities;

  // Local and remote SDPs, obtained/created from SDP Offer/Answer negotiation.
  private localSdp: any;
  private remoteSdp: any;

  private producers: Producer[];
  private producerMedias: any[];

  private consumers: Consumer[];

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
      console.error(
        "[SdpEndpoint.processOffer] ERROR: A remote description was already set"
      );
      return [];
    }

    console.log("[SdpEndpoint.processOffer] SDP Offer:\n", sdpOffer);

    this.remoteSdp = sdpOffer;
    const remoteSdpObj = SdpTransform.parse(sdpOffer);

    // DEBUG: Uncomment for details.
    // prettier-ignore
    // console.log("[SdpEndpoint.processOffer] Remote SDP object:\n%O", remoteSdpObj);

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
        // Skip media which is not "sendonly", as we are only implementing a
        // receive-only SDP endpoint for remote SDP Offers.
        // FIXME: A proper SDP endpoint should be able to handle all directions.
        continue;
      }

      // Add a new Producer for the given media.
      const sendParams = SdpUtils.sdpToSendRtpParameters(
        remoteSdpObj,
        this.localCaps,
        media.type as MediaKind
      );
      let producer;
      try {
        producer = await this.transport.produce({
          kind: media.type as MediaKind,
          rtpParameters: sendParams,
          paused: false,
        });
      } catch (err) {
        console.error("FIXME BUG:", err);
        process.exit(1);
      }

      this.producers.push(producer);
      this.producerMedias.push(media);
    }

    return this.producers;
  }

  public async createAnswer(): Promise<string> {
    if (this.localSdp) {
      console.error(
        "[SdpEndpoint.createAnswer] ERROR: A local description was already set"
      );
      return "";
    }

    const sdpBuilder: RemoteSdp = new RemoteSdp({
      iceParameters: this.webRtcTransport.iceParameters,
      iceCandidates: this.webRtcTransport.iceCandidates,
      dtlsParameters: this.webRtcTransport.dtlsParameters,
      sctpParameters: this.webRtcTransport.sctpParameters,
      planB: false,
    });

    console.log("[SdpEndpoint.createAnswer] Make 'recvonly' SDP Answer");

    for (let i = 0; i < this.producers.length; i++) {
      const sdpMediaObj = this.producerMedias[i];
      const recvParams = this.producers[i].rtpParameters;

      // Each call to RemoteSdp.send() creates a new AnswerMediaSection,
      // which always assumes an `a=recvonly` direction.
      sdpBuilder.send({
        offerMediaObject: sdpMediaObj,
        reuseMid: undefined,
        offerRtpParameters: recvParams,
        answerRtpParameters: recvParams,
        codecOptions: undefined,
        extmapAllowMixed: false,
      });
    }

    this.localSdp = sdpBuilder.getSdp();

    console.log("[SdpEndpoint.createAnswer] SDP Answer:\n", this.localSdp);

    return this.localSdp;
  }

  // Send media from mediasoup
  // =========================
  //
  // * addConsumer
  // * createOffer
  // * processAnswer

  public async addConsumer(consumer: Consumer): Promise<void> {
    this.consumers.push(consumer);
  }

  public async createOffer(): Promise<string> {
    if (this.localSdp) {
      console.error(
        "[SdpEndpoint.createOffer] ERROR: A local description was already set"
      );
      return "";
    }

    const sdpBuilder: RemoteSdp = new RemoteSdp({
      iceParameters: this.webRtcTransport.iceParameters,
      iceCandidates: this.webRtcTransport.iceCandidates,
      dtlsParameters: this.webRtcTransport.dtlsParameters,
      sctpParameters: this.webRtcTransport.sctpParameters,
      planB: false,
    });

    // Make an MSID to be used for both "audio" and "video" kinds.
    const sendMsid = uuidv4().substr(0, 8);

    console.log("[SdpEndpoint.createOffer] Make 'sendonly' SDP Offer");

    for (let i = 0; i < this.consumers.length; i++) {
      const mid = this.consumers[i].rtpParameters.mid;
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

    console.log("[SdpEndpoint.createOffer] SDP Offer:\n", this.localSdp);

    return this.localSdp;
  }

  public async processAnswer(sdpAnswer: string): Promise<void> {
    if (this.remoteSdp) {
      console.error(
        "[SdpEndpoint.processAnswer] ERROR: A remote description was already set"
      );
      return;
    }

    console.log("[SdpEndpoint.processAnswer] SDP Answer:\n", sdpAnswer);

    this.remoteSdp = sdpAnswer;
    const remoteSdpObj = SdpTransform.parse(sdpAnswer);

    // DEBUG: Uncomment for details.
    // prettier-ignore
    // console.log("[SdpEndpoint.processAnswer] Remote SDP object:\n%O", remoteSdpObj);

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
    const remoteCaps = SdpUtils.sdpToRecvRtpCapabilities(
      remoteSdpObj,
      this.localCaps
    );

    // DEBUG: Uncomment for details.
    // prettier-ignore
    // console.log("[SdpEndpoint.processAnswer] Remote RECV RtpCapabilities:\n%O", remoteCaps);
  }
}

export function createSdpEndpoint(
  webRtcTransport: WebRtcTransport,
  localCaps: RtpCapabilities
): SdpEndpoint {
  return new SdpEndpoint(webRtcTransport, localCaps);
}

export function generateRtpCapabilities1(
  localCaps: RtpCapabilities,
  remoteSdp: string
): RtpCapabilities {
  // TODO: Use proper SDP Offer/Answer method to retrieve remote capabilities.
  return BrowserRtpCapabilities.chrome;
}

export function generateRtpCapabilities2(
  localCaps: RtpCapabilities,
  remoteCaps: RtpCapabilities
): RtpCapabilities {
  console.error("[SdpEndpoint.generateRtpCapabilities2] BUG: Not implemented");
  process.exit(1);

  let caps: RtpCapabilities;
  return caps;
}
