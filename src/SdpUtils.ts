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

// SDP to RTP Capabilities and Parameters
// ======================================

export function sdpToConsumerRtpCapabilities(
  sdpObject: object,
  localCaps: RtpCapabilities
): RtpCapabilities {
  const caps: RtpCapabilities = MsSdpCommonUtils.extractRtpCapabilities({
    sdpObject,
  });

  try {
    MsOrtc.validateRtpCapabilities(caps);
  } catch (error) {
    let message = "SDP validation failed";
    if (error instanceof Error) {
      message += `: ${error.message}`;
    }
    console.error(`ERROR [SdpUtils.sdpToConsumerRtpCapabilities] ${message}`);
    throw new Error(message);
  }

  const extendedCaps = MsOrtc.getExtendedRtpCapabilities(caps, localCaps);

  const consumerCaps = MsOrtc.getRecvRtpCapabilities(extendedCaps);

  // DEBUG: Uncomment for details.
  // prettier-ignore
  // {
  //   console.debug(`DEBUG [SdpUtils.sdpToConsumerRtpCapabilities] SDP RtpCapabilities:\n${JSON.stringify(caps, null, 2)}`);
  //   console.debug(`DEBUG [SdpUtils.sdpToConsumerRtpCapabilities] SDP Extended RtpCapabilities:\n${JSON.stringify(extendedCaps, null, 2)}`);
  //   console.debug(`DEBUG [SdpUtils.sdpToConsumerRtpCapabilities] Consumer RtpCapabilities:\n${JSON.stringify(consumerCaps, null, 2)}`);
  // }

  return consumerCaps;
}

export function sdpToProducerRtpParameters(
  sdpObject: any,
  localCaps: RtpCapabilities,
  kind: MediaKind
): RtpParameters {
  const caps: RtpCapabilities = MsSdpCommonUtils.extractRtpCapabilities({
    sdpObject,
  });

  try {
    MsOrtc.validateRtpCapabilities(caps);
  } catch (error) {
    let message = "SDP validation failed";
    if (error instanceof Error) {
      message += `: ${error.message}`;
    }
    console.error(`ERROR [SdpUtils.sdpToProducerRtpParameters] ${message}`);
    throw new Error(message);
  }

  const extendedCaps = MsOrtc.getExtendedRtpCapabilities(localCaps, caps);
  const producerParams = MsOrtc.getSendingRtpParameters(kind, extendedCaps);

  const sdpMediaObj: MediaAttributes =
    (sdpObject.media || []).find((m: { type: MediaKind }) => m.type === kind) ||
    {};

  // Fill `RtpParameters.mid`.
  if ("mid" in sdpMediaObj) {
    producerParams.mid = String(sdpMediaObj.mid);
  } else {
    producerParams.mid = kind === "audio" ? "0" : "1";
  }

  // Fill `RtpParameters.encodings`.
  {
    if ("ssrcs" in sdpMediaObj) {
      producerParams.encodings = MsSdpUnifiedPlanUtils.getRtpEncodings({
        offerMediaObject: sdpMediaObj,
      });
    } else {
      producerParams.encodings = [];
    }

    if ("rids" in sdpMediaObj) {
      // FIXME: Maybe mediasoup's getRtpEncodings() should just be improved
      // to include doing this, so we don't need to branch an if() here.
      sdpMediaObj.rids
        ?.filter((rid) => rid.direction === "send")
        .forEach((rid, i) => {
          producerParams.encodings![i] = {
            ...producerParams.encodings![i],

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
  producerParams.rtcp = {
    cname: MsSdpCommonUtils.getCname({ offerMediaObject: sdpMediaObj }),
    reducedSize: (sdpMediaObj.rtcpRsize ?? "") === "rtcp-rsize",
    mux: (sdpMediaObj.rtcpMux ?? "") === "rtcp-mux",
  };

  // FIXME: Use the correct header extension IDs.
  // This is needed because `MsOrtc.getSendingRtpParameters` assumes
  // the sending side, when we really need the receiving side in here.
  for (const producerExt of producerParams.headerExtensions ?? []) {
    const extendedExt = extendedCaps.headerExtensions.find(
      (h: any) => h.kind === kind && h.uri === producerExt.uri
    );

    if (extendedExt) {
      producerExt.id = extendedExt.recvId;
    }
  }

  // DEBUG: Uncomment for details.
  // prettier-ignore
  // {
  //   console.debug(`DEBUG [SdpUtils.sdpToProducerRtpParameters] (${kind}) SDP RtpCapabilities:\n${JSON.stringify(caps, null, 2)}`);
  //   console.debug(`DEBUG [SdpUtils.sdpToProducerRtpParameters] (${kind}) SDP Extended RtpCapabilities:\n${JSON.stringify(extendedCaps, null, 2)}`);
  //   console.debug(`DEBUG [SdpUtils.sdpToProducerRtpParameters] (${kind}) Producer RtpParameters:\n${JSON.stringify(producerParams, null, 2)}`);
  // }

  return producerParams;
}
