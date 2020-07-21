import * as MsRtpUtils from "mediasoup-client/lib/handlers/sdp/plainRtpUtils";
import * as MsSdpUtils from "mediasoup-client/lib/handlers/sdp/commonUtils";
import * as MsOrtc from "mediasoup-client/lib/ortc";
import {
  RtpParameters,
  RtpCapabilities,
  MediaKind,
} from "mediasoup/lib/types";

// Print whole objects instead of giving up after two levels of nesting.
require("util").inspect.defaultOptions.depth = null;

// SDP to RTP Capabilities and Parameters
// ======================================

export function sdpToRecvRtpCapabilities(
  sdpObject: any,
  routerCaps: RtpCapabilities
): RtpCapabilities {
  const caps: RtpCapabilities = MsSdpUtils.extractRtpCapabilities({
    sdpObject,
  });

  try {
    MsOrtc.validateRtpCapabilities(caps);
  } catch (err) {
    console.error("FIXME BUG:", err);
    process.exit(1);
  }

  const extendedCaps = MsOrtc.getExtendedRtpCapabilities(caps, routerCaps);

  const recvCaps: RtpCapabilities = MsOrtc.getRecvRtpCapabilities(extendedCaps);

  // DEBUG: Uncomment for details.
  // prettier-ignore
  {
    // console.log(`[sdpToRecvRtpCapabilities] RtpCapabilities:\n%O`, caps);
    // console.log(`[sdpToRecvRtpCapabilities] Extended RtpCapabilities:\n%O`, extendedCaps);
    // console.log(`[sdpToRecvRtpCapabilities] RECV RtpCapabilities:\n%O`, recvCaps);
  }

  return recvCaps;
}

export function sdpToSendRtpParameters(
  sdpObject: any,
  routerCaps: RtpCapabilities,
  kind: MediaKind
): RtpParameters {
  const caps: RtpCapabilities = MsSdpUtils.extractRtpCapabilities({
    sdpObject,
  });

  try {
    MsOrtc.validateRtpCapabilities(caps);
  } catch (err) {
    console.error("FIXME BUG:", err);
    process.exit(1);
  }

  const extendedCaps = MsOrtc.getExtendedRtpCapabilities(caps, routerCaps);
  const sendParams = MsOrtc.getSendingRemoteRtpParameters(kind, extendedCaps);

  // Now we have to fill "mid", "encodings", and "rtcp" fields.

  const sdpMediaObj: any =
    (sdpObject.media || []).find((m: { type: string }) => m.type === kind) ||
    {};

  if ("mid" in sdpMediaObj) {
    sendParams.mid = String(sdpMediaObj.mid);
  } else {
    sendParams.mid = kind === "audio" ? "0" : "1";
  }

  sendParams.encodings = MsRtpUtils.getRtpEncodings({
    sdpObject,
    kind,
  });

  sendParams.rtcp = {
    cname: MsSdpUtils.getCname({ offerMediaObject: sdpMediaObj }),

    // These are boolean fields.
    reducedSize: "rtcpRsize" in sdpMediaObj && sdpMediaObj.rtcpRsize,
    mux: "rtcpMux" in sdpMediaObj && sdpMediaObj.rtcpMux,
  };

  // DEBUG: Uncomment for details.
  // prettier-ignore
  {
    // console.log(`[sdpToSendRtpParameters] ${kind} RtpCapabilities:\n%O`, rtpCaps);
    // console.log(`[sdpToSendRtpParameters] ${kind} Extended RtpCapabilities:\n%O`, extendedCaps);
    // console.log(`[sdpToSendRtpParameters] ${kind} SEND RtpParameters:\n%O`, sendParams);
  }

  return sendParams;
}
