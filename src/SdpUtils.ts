// TODO, FIXME: Here we're assuming that Unified Plan is the correct way to
// handle the SDP messages. For a more robust handling, this should probably
// depend on the actual type of SDP: plain, PlanB, or UnifiedPlan.
import * as MsSdpUnifiedPlanUtils from "mediasoup-client/lib/handlers/sdp/unifiedPlanUtils";

import * as MsSdpCommonUtils from "mediasoup-client/lib/handlers/sdp/commonUtils";
import * as MsOrtc from "mediasoup-client/lib/ortc";
import {
  MediaKind,
  RtpCapabilities,
  RtpParameters,
} from "mediasoup/node/lib/types";
import { MediaAttributes } from "sdp-transform";

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

  const sdpMediaObj: MediaAttributes =
    (sdpObject.media || []).find((m: { type: MediaKind }) => m.type === kind) ||
    {};

  // Fill `RtpParameters.mid`.
  if ("mid" in sdpMediaObj) {
    sendParams.mid = String(sdpMediaObj.mid);
  } else {
    sendParams.mid = kind === "audio" ? "0" : "1";
  }

  // Fill `RtpParameters.encodings`.
  {
    if ("ssrcs" in sdpMediaObj) {
      sendParams.encodings = MsSdpUnifiedPlanUtils.getRtpEncodings({
        offerMediaObject: sdpMediaObj,
      });
    } else {
      sendParams.encodings = [];
    }

    if ("rids" in sdpMediaObj) {
      // FIXME: Maybe mediasoup's getRtpEncodings() should just be improved
      // to include doing this, so we don't need to branch an if() here.
      sdpMediaObj.rids
        ?.filter((rid) => rid.direction === "send")
        .forEach((rid, i) => {
          sendParams.encodings![i] = {
            ...sendParams.encodings![i],

            rid: String(rid.id),

            // If "rid" is in use it means multiple simulcast RTP streams.
            // SDP includes information of the spatial layers in each encoding,
            // but it doesn't tell the amount of temporal layers.
            // Here we asume that all implementations are hardcoded to generate
            // exactly 3 temporal layers (verified with Chrome and Firefox).
            scalabilityMode: "L1T3",
          };
        });
    }
  }

  // Fill `RtpParameters.rtcp`.
  sendParams.rtcp = {
    cname: MsSdpCommonUtils.getCname({ offerMediaObject: sdpMediaObj }),
    reducedSize: (sdpMediaObj.rtcpRsize ?? "") === "rtcp-rsize",
    mux: (sdpMediaObj.rtcpMux ?? "") === "rtcp-mux",
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
