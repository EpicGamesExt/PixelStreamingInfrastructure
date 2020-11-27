import { RtpParameters, RtpCapabilities, MediaKind } from "mediasoup/lib/types";
export declare function sdpToRecvRtpCapabilities(sdpObject: object, localCaps: RtpCapabilities): RtpCapabilities;
export declare function sdpToSendRtpParameters(sdpObject: any, localCaps: RtpCapabilities, kind: MediaKind): RtpParameters;
//# sourceMappingURL=SdpUtils.d.ts.map