import * as MsRtpUtils from "mediasoup-client/lib/handlers/sdp/plainRtpUtils";
import * as MsSdpCommonUtils from "mediasoup-client/lib/handlers/sdp/commonUtils";
import * as MsOrtc from "mediasoup-client/lib/ortc";
import { RtpParameters, RtpCapabilities, MediaKind } from "mediasoup/lib/types";

// Print whole objects instead of giving up after two levels of nesting.
require("util").inspect.defaultOptions.depth = null;

// SDP to RTP Capabilities and Parameters
// ======================================

export function sdpToRecvRtpCapabilities(
  sdpObject: object,
  localCaps: RtpCapabilities
): RtpCapabilities {
  const caps: RtpCapabilities = MsSdpCommonUtils.extractRtpCapabilities({
    sdpObject,
  });

  try {
    MsOrtc.validateRtpCapabilities(caps);
  } catch (err) {
    console.error("FIXME BUG:", err);
    process.exit(1);
  }

  const extendedCaps = MsOrtc.getExtendedRtpCapabilities(caps, localCaps);

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
  localCaps: RtpCapabilities,
  kind: MediaKind
): RtpParameters {
  const caps: RtpCapabilities = MsSdpCommonUtils.extractRtpCapabilities({
    sdpObject,
  });

  try {
    MsOrtc.validateRtpCapabilities(caps);
  } catch (err) {
    console.error("FIXME BUG:", err);
    process.exit(1);
  }

  const extendedCaps = MsOrtc.getExtendedRtpCapabilities(caps, localCaps);
  const sendParams = MsOrtc.getSendingRemoteRtpParameters(kind, extendedCaps);

  // Now we have to fill "mid", "encodings", and "rtcp" fields.

  const sdpMediaObj: any =
    (sdpObject.media || []).find((m: { type: MediaKind }) => m.type === kind) ||
    {};

  if ("mid" in sdpMediaObj) {
    sendParams.mid = String(sdpMediaObj.mid);
  } else {
    sendParams.mid = kind === "audio" ? "0" : "1";
  }

  if ("rids" in sdpMediaObj) {
    for (const mediaRid of sdpMediaObj.rids) {
      // FIXME: Maybe MsRtpUtils.getRtpEncodings() should just be improved
      // to include doing this, so we don't need to branch an if() here.

      // Push an RTCRtpEncodingParameters.
      sendParams.encodings?.push({ rid: mediaRid.id });
    }
  } else {
    sendParams.encodings = MsRtpUtils.getRtpEncodings({
      sdpObject,
      kind,
    });
  }

  sendParams.rtcp = {
    cname: MsSdpCommonUtils.getCname({ offerMediaObject: sdpMediaObj }),

    // These are boolean fields.
    reducedSize: "rtcpRsize" in sdpMediaObj && sdpMediaObj.rtcpRsize,
    mux: "rtcpMux" in sdpMediaObj && sdpMediaObj.rtcpMux,
  };

  // DEBUG: Uncomment for details.
  // prettier-ignore
  {
    // console.log(`[sdpToSendRtpParameters] RtpCapabilities:\n%O`, caps);
    // console.log(`[sdpToSendRtpParameters] Extended RtpCapabilities:\n%O`, extendedCaps);
    // console.log(`[sdpToSendRtpParameters] ${kind} SEND RtpParameters:\n%O`, sendParams);
  }

  return sendParams;
}
