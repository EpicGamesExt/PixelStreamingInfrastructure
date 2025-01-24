// Copyright Epic Games, Inc. All Rights Reserved.

import { Logger } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.5';
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
 * Calculates a combination of latency statistics using purely WebRTC API.
 */
export class LatencyCalculator {
    public calculate(stats: AggregatedStats, receivers: RTCRtpReceiver[]): LatencyInfo {
        const latencyInfo = new LatencyInfo();

        const activeCandidatePair: CandidatePairStats = stats.getActiveCandidatePair();

        if (
            activeCandidatePair !== null &&
            activeCandidatePair.currentRoundTripTime !== undefined &&
            activeCandidatePair.currentRoundTripTime > 0
        ) {
            // Get RTT
            latencyInfo.RTTMs = activeCandidatePair.currentRoundTripTime * 1000;

            // Calculate sender latency using the first valid video ssrc/csrc
            const captureSource: RTCRtpCaptureSource = this.getCaptureSource(receivers);
            if (captureSource !== null) {
                latencyInfo.SenderLatencyMs = this.calculateSenderLatency(stats, captureSource);
            }
        }

        // https://w3c.github.io/webrtc-stats/#dom-rtcinboundrtpstreamstats-totalprocessingdelay
        if (
            stats.inboundVideoStats.totalProcessingDelay !== undefined &&
            stats.inboundVideoStats.framesDecoded !== undefined
        ) {
            latencyInfo.AverageProcessingDelayMs =
                (stats.inboundVideoStats.totalProcessingDelay / stats.inboundVideoStats.framesDecoded) * 1000;
        }

        // https://w3c.github.io/webrtc-stats/#dom-rtcinboundrtpstreamstats-jitterbufferminimumdelay
        if (
            stats.inboundVideoStats.jitterBufferDelay !== undefined &&
            stats.inboundVideoStats.jitterBufferEmittedCount !== undefined
        ) {
            latencyInfo.AverageJitterBufferDelayMs =
                (stats.inboundVideoStats.jitterBufferDelay /
                    stats.inboundVideoStats.jitterBufferEmittedCount) *
                1000;
        }

        // https://w3c.github.io/webrtc-stats/#dom-rtcinboundrtpstreamstats-totaldecodetime
        if (
            stats.inboundVideoStats.framesDecoded !== undefined &&
            stats.inboundVideoStats.totalDecodeTime !== undefined
        ) {
            latencyInfo.AverageDecodeLatencyMs =
                (stats.inboundVideoStats.totalDecodeTime / stats.inboundVideoStats.framesDecoded) * 1000;
        }

        // https://w3c.github.io/webrtc-stats/#dom-rtcinboundrtpstreamstats-framesassembledfrommultiplepackets
        if (
            stats.inboundVideoStats.totalAssemblyTime !== undefined &&
            stats.inboundVideoStats.framesAssembledFromMultiplePackets !== undefined
        ) {
            latencyInfo.AverageAssemblyDelayMs =
                (stats.inboundVideoStats.totalAssemblyTime /
                    stats.inboundVideoStats.framesAssembledFromMultiplePackets) *
                1000;
        }

        // Calculate E2E latency as sender-side latency + network latency + receiver-side latency
        if (
            latencyInfo.AverageProcessingDelayMs !== undefined &&
            latencyInfo.AverageProcessingDelayMs > 0 &&
            latencyInfo.SenderLatencyMs != undefined &&
            latencyInfo.SenderLatencyMs > 0 &&
            latencyInfo.RTTMs != undefined &&
            latencyInfo.RTTMs > 0
        ) {
            latencyInfo.AverageE2ELatency =
                latencyInfo.SenderLatencyMs + latencyInfo.RTTMs * 0.5 + latencyInfo.AverageProcessingDelayMs;
        }

        return latencyInfo;
    }

    private calculateSenderLatency(stats: AggregatedStats, captureSource: RTCRtpCaptureSource): number {
        // The calculation performed in this function is as per the procedure defined here:
        // https://w3c.github.io/webrtc-extensions/#dom-rtcrtpcontributingsource-sendercapturetimeoffset

        // Get the sender capture in the sender's clock
        const senderCaptureTimestamp = captureSource.captureTimestamp + captureSource.senderCaptureTimeOffset;

        const sendRecvClockOffset = this.calculateSenderReceiverClockOffset(stats);

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
    private getCaptureSource(receivers: RTCRtpReceiver[]): RTCRtpCaptureSource {
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

    private calculateSenderReceiverClockOffset(stats: AggregatedStats) {
        // The calculation performed in this function is as per the procedure defined here:
        // https://w3c.github.io/webrtc-extensions/#dom-rtcrtpcontributingsource-sendercapturetimeoffset

        const remoteVideoStatsArrivedTimestamp = stats.outBoundVideoStats.timestamp;
        const remoteVideoStatsSentTimestamp = stats.outBoundVideoStats.remoteTimestamp;

        const activeCandidatePair: CandidatePairStats = stats.getActiveCandidatePair();
        const networkDelay = activeCandidatePair
            ? activeCandidatePair.currentRoundTripTime * 0.5 * 1000
            : 0.0;

        if (
            remoteVideoStatsArrivedTimestamp !== undefined &&
            remoteVideoStatsSentTimestamp !== undefined &&
            networkDelay !== undefined
        ) {
            return remoteVideoStatsArrivedTimestamp - (remoteVideoStatsSentTimestamp + networkDelay);
        }

        Logger.Warning('Could not get stats to calculate sender/receiver clock offset.');
        return 0.0;
    }
}

/**
 * A collection of latency information calculated using the WebRTC API.
 * Most stats are calculated following the spec:
 * https://w3c.github.io/webrtc-stats/#dictionary-rtcinboundrtpstreamstats-members
 */
export class LatencyInfo {
    /**
     * The time taken from sender frame capture to receiver frame receipt.
     * Note: This can only be calculated if both offer and answer contain the
     * the RTP header extension for `abs-capture-time`.
     */
    public SenderLatencyMs: number | undefined = undefined;

    /* The round trip time (milliseconds) between each sender->receiver->sender */
    public RTTMs: number | undefined = undefined;

    /* Average time taken (milliseconds) from video packet receipt to post-decode. */
    public AverageProcessingDelayMs: number | undefined = undefined;

    /* Average time taken (milliseconds) inside the jitter buffer (which is post-receipt but pre-decode). */
    public AverageJitterBufferDelayMs: number | undefined = undefined;

    /* Average time taken (milliseconds) to decode a video frame. */
    public AverageDecodeLatencyMs: number | undefined = undefined;

    /* Average time taken (milliseconds) to between receipt of the first and last video packet of a. */
    public AverageAssemblyDelayMs: number | undefined = undefined;

    /* The sender latency + RTT/2 + processing delay */
    public AverageE2ELatency: number | undefined = undefined;
}
