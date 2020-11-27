import { Consumer, Producer, RtpCapabilities, WebRtcTransport } from "mediasoup/lib/types";
export declare class SdpEndpoint {
    private transport;
    private webRtcTransport;
    private localCaps;
    private localSdp;
    private remoteSdp;
    private producers;
    private producerMedias;
    private consumers;
    constructor(webRtcTransport: WebRtcTransport, localCaps: RtpCapabilities);
    processOffer(sdpOffer: string): Promise<Producer[]>;
    createAnswer(): string;
    addConsumer(consumer: Consumer): void;
    createOffer(): string;
    processAnswer(sdpAnswer: string): Promise<void>;
}
export declare function createSdpEndpoint(webRtcTransport: WebRtcTransport, localCaps: RtpCapabilities): SdpEndpoint;
export declare function generateRtpCapabilities0(): RtpCapabilities;
export declare function generateRtpCapabilities1(localCaps: RtpCapabilities, remoteSdp: string): RtpCapabilities;
export declare function generateRtpCapabilities2(localCaps: RtpCapabilities, remoteCaps: RtpCapabilities): RtpCapabilities;
//# sourceMappingURL=main.d.ts.map