// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Outbound RTP stats collected from the RTC Stats Report under `outbound-rtp`.
 * Wrapper around: https://developer.mozilla.org/en-US/docs/Web/API/RTCOutboundRtpStreamStats
 * These are stats for video we are sending to a remote peer.
 */
export class OutboundRTPStats {
    active: boolean | undefined;
    codecId: string | undefined;
    bytesSent: number;
    frameHeight: number | undefined;
    frameWidth: number | undefined;
    framesEncoded: number | undefined;
    framesPerSecond: number | undefined;
    framesSent: number | undefined;
    headerBytesSent: number;
    id: string;
    keyFramesEncoded: number | undefined;
    kind: string;
    mediaSourceId: string | undefined;
    mid: string | undefined;
    nackCount: number | undefined;
    packetsSent: number;
    qpSum: number | undefined;
    qualityLimitationDurations: number | undefined;
    qualityLimitationReason: string | undefined;
    remoteId: string | undefined;
    retransmittedBytesSent: number;
    rid: string | undefined;
    scalabilityMode: string | undefined;
    ssrc: string;
    targetBitrate: number | undefined;
    timestamp: number;
    totalEncodeTime: number | undefined;
    totalEncodeBytesTarget: number | undefined;
    totalPacketSendDelay: number | undefined;
    transportId: string | undefined;
}

/**
 * Remote outbound stats collected from the RTC Stats Report under `remote-outbound-rtp`.
 * Wrapper around: https://developer.mozilla.org/en-US/docs/Web/API/RTCRemoteOutboundRtpStreamStats
 * These are stats for media we are receiving from a remote peer.
 */
export class RemoteOutboundRTPStats {
    bytesSent: number | undefined;
    codecId: string;
    id: string | undefined;
    kind: string;
    localId: string | undefined;
    packetsSent: number | undefined;
    remoteTimestamp: number | undefined;
    reportsSent: number | undefined;
    roundTripTimeMeasurements: number | undefined;
    ssrc: string;
    timestamp: number | undefined;
    totalRoundTripTime: number | undefined;
    transportId: string | undefined;
}
