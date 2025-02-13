// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Inbound Audio Stats collected from the RTC Stats Report
 */
export class InboundAudioStats {
    audioLevel: number | undefined;
    bytesReceived: number;
    codecId: string;
    concealedSamples: number | undefined;
    concealmentEvents: number | undefined;
    fecPacketsDiscarded: number | undefined;
    fecPacketsReceived: number | undefined;
    headerBytesReceived: number;
    id: string;
    insertedSamplesForDeceleration: number | undefined;
    jitter: number;
    jitterBufferDelay: number;
    jitterBufferEmittedCount: number;
    jitterBufferMinimumDelay: number | undefined;
    jitterBufferTargetDelay: number | undefined;
    kind: string;
    lastPacketReceivedTimestamp: number;
    mediaType: string | undefined;
    mid: string;
    packetsDiscarded: number | undefined;
    packetsLost: number;
    packetsReceived: number;
    removedSamplesForAcceleration: number | undefined;
    silentConcealedSamples: number | undefined;
    ssrc: number;
    timestamp: number;
    totalAudioEnergy: number | undefined;
    totalSamplesDuration: number | undefined;
    totalSamplesReceived: number | undefined;
    trackIdentifier: string | undefined;
    transportId: string | undefined;
    type: string;

    /* additional, custom stats */
    bitrate: number | undefined;
}

/**
 * Inbound Video Stats collected from the RTC Stats Report
 */
export class InboundVideoStats {
    bytesReceived: number;
    codecId: string | undefined;
    firCount: number | undefined;
    frameHeight: number | undefined;
    frameWidth: number | undefined;
    framesAssembledFromMultiplePackets: number | undefined;
    framesDecoded: number | undefined;
    framesDropped: number | undefined;
    framesPerSecond: number | undefined;
    framesReceived: number | undefined;
    freezeCount: number | undefined;
    googTimingFrameInfo: string | undefined;
    headerBytesReceived: number;
    id: string;
    jitter: number;
    jitterBufferDelay: number;
    jitterBufferEmittedCount: number;
    keyFramesDecoded: number | undefined;
    kind: string;
    lastPacketReceivedTimestamp: number | undefined;
    mediaType: string | undefined;
    mid: string;
    nackCount: number | undefined;
    packetsLost: number;
    packetsReceived: number;
    pauseCount: number | undefined;
    pliCount: number | undefined;
    ssrc: number;
    timestamp: number;
    totalAssemblyTime: number | undefined;
    totalDecodeTime: number | undefined;
    totalFreezesDuration: number | undefined;
    totalInterFrameDelay: number | undefined;
    totalPausesDuration: number | undefined;
    totalProcessingDelay: number | undefined;
    totalSquaredInterFrameDelay: number | undefined;
    trackIdentifier: string | undefined;
    transportId: string | undefined;
    type: string;

    /* additional, custom stats */
    bitrate: number | undefined;
}

/**
 * Inbound Stats collected from the RTC Stats Report
 */
export class InboundRTPStats {
    /* common stats */
    bytesReceived: number;
    codecId: string | undefined;
    headerBytesReceived: number;
    id: string;
    jitter: number;
    jitterBufferDelay: number;
    jitterBufferEmittedCount: number;
    kind: string;
    lastPacketReceivedTimestamp: number | undefined;
    mediaType: string | undefined;
    mid: string;
    packetsLost: number;
    packetsReceived: number;
    playoutId: string | undefined;
    qpsum: number | undefined;
    remoteId: string | undefined;
    ssrc: number;
    timestamp: number;
    trackIdentifier: string | undefined;
    transportId: string | undefined;
    type: string;

    /* audio specific stats */
    audioLevel: number | undefined;
    concealedSamples: number | undefined;
    concealmentEvents: number | undefined;
    fecPacketsDiscarded: number | undefined;
    fecPacketsReceived: number | undefined;
    insertedSamplesForDeceleration: number | undefined;
    jitterBufferMinimumDelay: number | undefined;
    jitterBufferTargetDelay: number | undefined;
    packetsDiscarded: number | undefined;
    removedSamplesForAcceleration: number | undefined;
    silentConcealedSamples: number | undefined;
    totalAudioEnergy: number | undefined;
    totalSamplesDuration: number | undefined;
    totalSamplesReceived: number | undefined;

    /* video specific stats */
    firCount: number | undefined;
    frameHeight: number | undefined;
    frameWidth: number | undefined;
    framesAssembledFromMultiplePackets: number | undefined;
    framesDecoded: number | undefined;
    framesDropped: number | undefined;
    framesPerSecond: number | undefined;
    framesReceived: number | undefined;
    freezeCount: number | undefined;
    googTimingFrameInfo: string | undefined;
    keyFramesDecoded: number | undefined;
    nackCount: number | undefined;
    pauseCount: number | undefined;
    pliCount: number | undefined;
    totalAssemblyTime: number | undefined;
    totalDecodeTime: number | undefined;
    totalFreezesDuration: number | undefined;
    totalInterFrameDelay: number | undefined;
    totalPausesDuration: number | undefined;
    totalProcessingDelay: number | undefined;
    totalSquaredInterFrameDelay: number | undefined;
}
