// Copyright Epic Games, Inc. All Rights Reserved.

import { AggregatedStats } from './AggregatedStats';
import { CandidatePairStats } from './CandidatePairStats';

/**
 * Represents either a:
 * - synchronization source: https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpReceiver/getSynchronizationSources
 * - contributing source: https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpReceiver/getContributingSources
 * Which also (if browser supports it) may optionall contain fields for captureTimestamp + senderCaptureTimeOffset
 * if the abs-capture-time RTP header extension is enabled (currently this only works in Chromium based browsers).
 */
class RTCRtpCaptureSource {
    timestamp: number;
    captureTimestamp: number;
    senderCaptureTimeOffset: number;
}

/**
 * FrameTimingInfo is a Chromium-specific set of WebRTC stats useful for latency calculation. It is stored in WebRTC stats as `googTimingFrameInfo`.
 * It is defined as an RTP header extension here: https://webrtc.googlesource.com/src/+/refs/heads/main/docs/native-code/rtp-hdrext/video-timing/README.md
 * It is defined in source code here: https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/api/video/video_timing.cc;l=82;drc=8d399817282e3c12ed54eb23ec42a5e418298ec6
 * It is discussed by its author here: https://github.com/w3c/webrtc-provisional-stats/issues/40#issuecomment-1272916692
 * In summary it a comma-delimited string that contains the following (in this order):
 * 1)  RTP timestamp: the RTP timestamp of the frame
 * 2)  Capture time: timestamp when this frame was captured
 * 3)  Encode start: timestamp when this frame started to be encoded
 * 4)  Encode finish: timestamp when this frame finished encoding
 * 5)  Packetization finish: timestamp when this frame was split into packets and was ready to be sent over the network
 * 6)  Pacer exit: timestamp when last packet of this frame was sent over the network by the sender at this timestamp
 * 7)  Network timestamp1: place for the SFU to mark when the frame started being forwarded. Application specific.
 * 8)  Network timestamp2: place for the SFU to mark when the frame finished being forwarded. Application specific.
 * 9)  Receive start: timestamp when the first packet of this frame was received
 * 10) Receive finish: timestamp when the last packet of this frame was received
 * 11) Decode start:  timestamp when the frame was passed to decoder
 * 12) Decode finish:  timestamp when the frame was decoded
 * 13) Render time:  timestamp of the projected render time for this frame
 * 14) "is outlier": a flag for if this frame is bigger in encoded size than the average frame by at least 5x.
 * 15) "triggered by timer": a flag for if this report was triggered by the timer (The report is sent every 200ms)
 */
export class FrameTimingInfo {
    rtpTimestamp: number;
    captureTimestamp: number;
    encodeStartTimestamp: number;
    encodeFinishTimestamp: number;
    packetizerFinishTimestamp: number;
    pacerExitTimestamp: number;
    networkTimestamp1: number;
    networkTimestamp2: number;
    receiveStart: number;
    receiveFinish: number;
    decodeStart: number;
    decodeFinish: number;
    renderTime: number;
    isOutlier: boolean;
    isTriggeredByTimer: boolean;

    /* Milliseconds between encoder start and finish */
    encoderLatencyMs: number;

    /* Milliseconds between encode end and packetizer finish time */
    packetizeLatencyMs: number;

    /* Milliseconds between packetize finish time and pacer sending the frame */
    pacerLatencyMs: number;

    /* Milliseconds between capture time and pacer exit */
    captureToSendLatencyMs: number;
}

/**
 * Calculates a combination of latency statistics using purely WebRTC API.
 */
export class LatencyCalculator {
    /* Clock offset between peer clocks cannot always be calculated as it relies of latest sender reports.
     * so we store the last time we had a valid clock offset in the assumption that clocks haven't drifted too much since then.
     */
    private latestSenderRecvClockOffset: number | null = null;

    public calculate(stats: AggregatedStats, receivers: RTCRtpReceiver[]): LatencyInfo {
        const latencyInfo = new LatencyInfo();

        const rttMS: number | null = this.getRTTMs(stats);

        if (rttMS != null) {
            latencyInfo.rttMs = rttMS;

            // Calculate sender latency using the first valid video ssrc/csrc
            const captureSource: RTCRtpCaptureSource | null = this.getCaptureSource(receivers);
            if (captureSource != null) {
                const senderLatencyMs = this.calculateSenderLatency(stats, captureSource);
                if (senderLatencyMs !== null) {
                    latencyInfo.senderLatencyMs = senderLatencyMs;
                }
            }
        }

        // https://w3c.github.io/webrtc-stats/#dom-rtcinboundrtpstreamstats-totalprocessingdelay
        if (
            stats.inboundVideoStats.totalProcessingDelay !== undefined &&
            stats.inboundVideoStats.framesDecoded !== undefined
        ) {
            latencyInfo.averageProcessingDelayMs =
                (stats.inboundVideoStats.totalProcessingDelay / stats.inboundVideoStats.framesDecoded) * 1000;
        }

        // https://w3c.github.io/webrtc-stats/#dom-rtcinboundrtpstreamstats-jitterbufferminimumdelay
        if (
            stats.inboundVideoStats.jitterBufferDelay !== undefined &&
            stats.inboundVideoStats.jitterBufferEmittedCount !== undefined
        ) {
            latencyInfo.averageJitterBufferDelayMs =
                (stats.inboundVideoStats.jitterBufferDelay /
                    stats.inboundVideoStats.jitterBufferEmittedCount) *
                1000;
        }

        // https://w3c.github.io/webrtc-stats/#dom-rtcinboundrtpstreamstats-totaldecodetime
        if (
            stats.inboundVideoStats.framesDecoded !== undefined &&
            stats.inboundVideoStats.totalDecodeTime !== undefined
        ) {
            latencyInfo.averageDecodeLatencyMs =
                (stats.inboundVideoStats.totalDecodeTime / stats.inboundVideoStats.framesDecoded) * 1000;
        }

        // https://w3c.github.io/webrtc-stats/#dom-rtcinboundrtpstreamstats-framesassembledfrommultiplepackets
        if (
            stats.inboundVideoStats.totalAssemblyTime !== undefined &&
            stats.inboundVideoStats.framesAssembledFromMultiplePackets !== undefined
        ) {
            latencyInfo.averageAssemblyDelayMs =
                (stats.inboundVideoStats.totalAssemblyTime /
                    stats.inboundVideoStats.framesAssembledFromMultiplePackets) *
                1000;
        }

        // Extract extra Chrome-specific stats like encoding latency
        if (
            stats.inboundVideoStats.googTimingFrameInfo !== undefined &&
            stats.inboundVideoStats.googTimingFrameInfo.length > 0
        ) {
            latencyInfo.frameTiming = this.extractFrameTimingInfo(
                stats.inboundVideoStats.googTimingFrameInfo
            );
        }

        // Calculate E2E latency using video-timing capture to send time + one way network latency + receiver-side latency
        if (
            latencyInfo.frameTiming !== undefined &&
            latencyInfo.frameTiming.captureToSendLatencyMs !== undefined &&
            latencyInfo.averageProcessingDelayMs !== undefined &&
            latencyInfo.rttMs !== undefined
        ) {
            latencyInfo.averageE2ELatency =
                latencyInfo.frameTiming.captureToSendLatencyMs +
                latencyInfo.rttMs * 0.5 +
                latencyInfo.averageProcessingDelayMs;
        }

        // Calculate E2E latency as abs-capture-time capture to send latency + one way network latency + receiver-side latency
        if (
            latencyInfo.senderLatencyMs != undefined &&
            latencyInfo.averageProcessingDelayMs !== undefined &&
            latencyInfo.rttMs !== undefined
        ) {
            latencyInfo.averageE2ELatency =
                latencyInfo.senderLatencyMs + latencyInfo.rttMs * 0.5 + latencyInfo.averageProcessingDelayMs;
        }

        return latencyInfo;
    }

    private extractFrameTimingInfo(googTimingFrameInfo: string): FrameTimingInfo {
        const timingInfo: FrameTimingInfo = new FrameTimingInfo();

        const timingInfoArr: string[] = googTimingFrameInfo.split(',');

        // Should have exactly 15 elements according to:
        // https://source.chromium.org/chromium/chromium/src/+/main:third_party/webrtc/api/video/video_timing.cc;l=82;drc=8d399817282e3c12ed54eb23ec42a5e418298ec6
        if (timingInfoArr.length === 15) {
            timingInfo.rtpTimestamp = Number.parseInt(timingInfoArr[0]);
            timingInfo.captureTimestamp = Number.parseInt(timingInfoArr[1]);
            timingInfo.encodeStartTimestamp = Number.parseInt(timingInfoArr[2]);
            timingInfo.encodeFinishTimestamp = Number.parseInt(timingInfoArr[3]);
            timingInfo.packetizerFinishTimestamp = Number.parseInt(timingInfoArr[4]);
            timingInfo.pacerExitTimestamp = Number.parseInt(timingInfoArr[5]);
            timingInfo.networkTimestamp1 = Number.parseInt(timingInfoArr[6]);
            timingInfo.networkTimestamp2 = Number.parseInt(timingInfoArr[7]);
            timingInfo.receiveStart = Number.parseInt(timingInfoArr[8]);
            timingInfo.receiveFinish = Number.parseInt(timingInfoArr[9]);
            timingInfo.decodeStart = Number.parseInt(timingInfoArr[10]);
            timingInfo.decodeFinish = Number.parseInt(timingInfoArr[11]);
            timingInfo.renderTime = Number.parseInt(timingInfoArr[12]);
            timingInfo.isOutlier = Number.parseInt(timingInfoArr[13]) > 0;
            timingInfo.isTriggeredByTimer = Number.parseInt(timingInfoArr[14]) > 0;

            // Calculate some latency stats
            timingInfo.encoderLatencyMs = timingInfo.encodeFinishTimestamp - timingInfo.encodeStartTimestamp;
            timingInfo.packetizeLatencyMs =
                timingInfo.packetizerFinishTimestamp - timingInfo.encodeFinishTimestamp;
            timingInfo.pacerLatencyMs = timingInfo.pacerExitTimestamp - timingInfo.packetizerFinishTimestamp;
            timingInfo.captureToSendLatencyMs = timingInfo.pacerExitTimestamp - timingInfo.captureTimestamp;
        }

        return timingInfo;
    }

    private calculateSenderLatency(
        stats: AggregatedStats,
        captureSource: RTCRtpCaptureSource
    ): number | null {
        // The calculation performed in this function is as per the procedure defined here:
        // https://w3c.github.io/webrtc-extensions/#dom-rtcrtpcontributingsource-sendercapturetimeoffset

        // Get the sender capture in the sender's clock
        const senderCaptureTimestamp = captureSource.captureTimestamp + captureSource.senderCaptureTimeOffset;

        let sendRecvClockOffset: number | null = this.calculateSenderReceiverClockOffset(stats);

        // Use latest clock offset if we couldn't calculate one now
        if (sendRecvClockOffset == null) {
            if (this.latestSenderRecvClockOffset != null) {
                sendRecvClockOffset = this.latestSenderRecvClockOffset;
            } else {
                return null;
            }
        } else {
            this.latestSenderRecvClockOffset = sendRecvClockOffset;
        }

        // This brings sender clock roughly inline with recv clock
        const recvCaptureTimestampNTP = senderCaptureTimestamp + sendRecvClockOffset;

        // As defined in Chrome source: https://chromium.googlesource.com/external/webrtc/+/master/system_wrappers/include/clock.h#26
        const ntp1970 = 2208988800000;

        const recvCaptureTimestamp = recvCaptureTimestampNTP - ntp1970;

        const senderLatency = captureSource.timestamp - recvCaptureTimestamp;

        return senderLatency;
    }

    /**
     * Find the first valid ssrc or csrc that has capture time fields present from abs-capture-time header extension.
     * @param receivers The RTP receviers this peer connection has.
     * @returns A single valid ssrc or csrc that has capture time fields or null if there is none (e.g. in non-chromium browsers it will be null).
     */
    private getCaptureSource(receivers: RTCRtpReceiver[]): RTCRtpCaptureSource | null {
        // We only want video receivers
        receivers = receivers.filter((receiver) => receiver.track.kind === 'video');

        for (const receiver of receivers) {
            // Go through all ssrc and csrc to check for capture timestamp
            // Note: Conversion to `any` here is because TS does not have captureTimestamp etc defined in the types
            // these fields only exist in Chromium currently.
            const sources: any[] = receiver
                .getSynchronizationSources()
                .concat(receiver.getContributingSources());

            for (const src of sources) {
                if (
                    src.captureTimestamp !== undefined &&
                    src.senderCaptureTimeOffset !== undefined &&
                    src.timestamp !== undefined
                ) {
                    const captureSrc = new RTCRtpCaptureSource();
                    captureSrc.timestamp = src.timestamp;
                    captureSrc.captureTimestamp = src.captureTimestamp;
                    captureSrc.senderCaptureTimeOffset = src.senderCaptureTimeOffset;
                    return captureSrc;
                }
            }
        }

        return null;
    }

    private calculateSenderReceiverClockOffset(stats: AggregatedStats): number | null {
        // The calculation performed in this function is as per the procedure defined here:
        // https://w3c.github.io/webrtc-extensions/#dom-rtcrtpcontributingsource-sendercapturetimeoffset

        const hasRemoteOutboundVideoStats =
            stats.remoteOutboundVideoStats !== undefined &&
            stats.remoteOutboundVideoStats.timestamp !== undefined &&
            stats.remoteOutboundVideoStats.remoteTimestamp !== undefined;

        // Note: As of Chrome 132, remote-outbound-rtp stats for video are not yet implemented (audio works).
        // This codepath should activate once they do begin to work.
        if (!hasRemoteOutboundVideoStats) {
            return null;
        }

        const remoteStatsArrivedTimestamp = stats.remoteOutboundVideoStats.timestamp;
        const remoteStatsSentTimestamp = stats.remoteOutboundVideoStats.remoteTimestamp;

        const rttMs: number | null = this.getRTTMs(stats);

        if (
            remoteStatsArrivedTimestamp !== undefined &&
            remoteStatsSentTimestamp !== undefined &&
            rttMs !== null
        ) {
            const onewayDelay = rttMs * 0.5;
            return remoteStatsArrivedTimestamp - (remoteStatsSentTimestamp + onewayDelay);
        }
        // Could not get stats to calculate sender/receiver clock offset
        else {
            return null;
        }
    }

    private getRTTMs(stats: AggregatedStats): number | null {
        // Try to get it from the active candidate pair
        const activeCandidatePair: CandidatePairStats | null = stats.getActiveCandidatePair();
        if (!!activeCandidatePair && activeCandidatePair.currentRoundTripTime !== undefined) {
            const curRTTSeconds = activeCandidatePair.currentRoundTripTime;
            return curRTTSeconds * 1000;
        }

        // Next try to get it from remote-outbound-rtp video stats
        if (
            !!stats.remoteOutboundVideoStats &&
            stats.remoteOutboundVideoStats.totalRoundTripTime !== undefined &&
            stats.remoteOutboundVideoStats.roundTripTimeMeasurements !== undefined &&
            stats.remoteOutboundVideoStats.roundTripTimeMeasurements > 0
        ) {
            const avgRttSeconds =
                stats.remoteOutboundVideoStats.totalRoundTripTime /
                stats.remoteOutboundVideoStats.roundTripTimeMeasurements;
            return avgRttSeconds * 1000;
        }

        // Next try to get it from remote-outbound-rtp audio stats
        if (
            !!stats.remoteOutboundAudioStats &&
            stats.remoteOutboundAudioStats.totalRoundTripTime !== undefined &&
            stats.remoteOutboundAudioStats.roundTripTimeMeasurements !== undefined &&
            stats.remoteOutboundAudioStats.roundTripTimeMeasurements > 0
        ) {
            const avgRttSeconds =
                stats.remoteOutboundAudioStats.totalRoundTripTime /
                stats.remoteOutboundAudioStats.roundTripTimeMeasurements;
            return avgRttSeconds * 1000;
        }

        return null;
    }
}

/**
 * A collection of latency information calculated using the WebRTC API.
 * Most stats are calculated following the spec:
 * https://w3c.github.io/webrtc-stats/#dictionary-rtcinboundrtpstreamstats-members
 */
export class LatencyInfo {
    /**
     * The time taken from the moment a frame is done capturing to the moment it is sent over the network.
     * Note: This can only be calculated if both offer and answer contain the
     * the RTP header extension for `video-timing` (Chrome only for now)
     */
    public senderLatencyMs: number | undefined = undefined;

    /**
     * The time taken from the moment a frame is done capturing to the moment it is sent over the network.
     * Note: This can only be calculated if both offer and answer contain the
     * the RTP header extension for `abs-capture-time` (Chrome only for now)
     */
    public senderLatencyAbsCaptureTimeMs: number | undefined = undefined;

    /* The round trip time (milliseconds) between each sender->receiver->sender */
    public rttMs: number | undefined = undefined;

    /* Average time taken (milliseconds) from video packet receipt to post-decode. */
    public averageProcessingDelayMs: number | undefined = undefined;

    /* Average time taken (milliseconds) inside the jitter buffer (which is post-receipt but pre-decode). */
    public averageJitterBufferDelayMs: number | undefined = undefined;

    /* Average time taken (milliseconds) to decode a video frame. */
    public averageDecodeLatencyMs: number | undefined = undefined;

    /* Average time taken (milliseconds) to between receipt of the first and last video packet of a. */
    public averageAssemblyDelayMs: number | undefined = undefined;

    /* The sender latency + RTT/2 + processing delay */
    public averageE2ELatency: number | undefined = undefined;

    /* Timing information about the worst performing frame since the last getStats call (only works on Chrome) */
    public frameTiming: FrameTimingInfo | undefined = undefined;
}
