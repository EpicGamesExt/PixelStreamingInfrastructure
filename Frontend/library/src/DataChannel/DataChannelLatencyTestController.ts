// Copyright Epic Games, Inc. All Rights Reserved.

import { Logger } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.6';
import {
    DataChannelLatencyTestRecord,
    DataChannelLatencyTestRequest,
    DataChannelLatencyTestResponse,
    DataChannelLatencyTestResult,
    DataChannelLatencyTestSeq,
    DataChannelLatencyTestTimestamp
} from './DataChannelLatencyTestResults';

export type DataChannelLatencyTestConfig = {
    // test duration in milliseconds
    duration: number;
    //requests per second
    rps: number;
    //request filler size
    requestSize: number;
    //response filler size
    responseSize: number;
};

export type DataChannelLatencyTestSink = (request: DataChannelLatencyTestRequest) => void;
export type DataChannelLatencyTestResultCallback = (result: DataChannelLatencyTestResult) => void;

export class DataChannelLatencyTestController {
    startTime: DataChannelLatencyTestTimestamp;
    sink: DataChannelLatencyTestSink;
    callback: DataChannelLatencyTestResultCallback;
    records: Map<DataChannelLatencyTestSeq, DataChannelLatencyTestRecord>;
    seq: DataChannelLatencyTestSeq;
    intervalHandle: number = undefined;

    constructor(sink: DataChannelLatencyTestSink, callback: DataChannelLatencyTestResultCallback) {
        this.sink = sink;
        this.callback = callback;
        this.records = new Map();
        this.seq = 0;
    }

    start(config: DataChannelLatencyTestConfig) {
        if (this.isRunning()) {
            return false;
        }
        this.startTime = Date.now();
        this.records.clear();
        this.intervalHandle = window.setInterval(
            (() => {
                if (Date.now() - this.startTime >= config.duration) {
                    this.stop();
                } else {
                    this.sendRequest(config.requestSize, config.responseSize);
                }
            }).bind(this),
            Math.floor(1000 / config.rps)
        );
        return true;
    }

    stop() {
        if (this.intervalHandle) {
            window.clearInterval(this.intervalHandle);
            this.intervalHandle = undefined;
            this.callback(this.produceResult());
        }
    }

    produceResult(): DataChannelLatencyTestResult {
        const resultRecords = new Map(this.records);
        return {
            records: resultRecords,
            dataChannelRtt: Math.ceil(
                Array.from(this.records.values()).reduce((acc, next) => {
                    return acc + (next.playerReceivedTimestamp - next.playerSentTimestamp);
                }, 0) / this.records.size
            ),
            playerToStreamerTime: Math.ceil(
                Array.from(this.records.values()).reduce((acc, next) => {
                    return acc + (next.streamerReceivedTimestamp - next.playerSentTimestamp);
                }, 0) / this.records.size
            ),
            streamerToPlayerTime: Math.ceil(
                Array.from(this.records.values()).reduce((acc, next) => {
                    return acc + (next.playerReceivedTimestamp - next.streamerSentTimestamp);
                }, 0) / this.records.size
            ),
            exportLatencyAsCSV: () => {
                let csv = 'Timestamp;RTT;PlayerToStreamer;StreamerToPlayer;\n';
                resultRecords.forEach((record) => {
                    csv += record.playerSentTimestamp + ';';
                    csv += record.playerReceivedTimestamp - record.playerSentTimestamp + ';';
                    csv += record.streamerReceivedTimestamp - record.playerSentTimestamp + ';';
                    csv += record.playerReceivedTimestamp - record.streamerSentTimestamp + ';';
                    csv += '\n';
                });
                return csv;
            }
        };
    }

    isRunning() {
        return !!this.intervalHandle;
    }

    receive(response: DataChannelLatencyTestResponse) {
        if (!this.isRunning()) {
            return;
        }
        if (!response) {
            Logger.Error('Undefined response from server');
            return;
        }
        const record = this.records.get(response.Seq);
        if (record) {
            record.update(response);
        }
    }

    sendRequest(requestSize: number, responseSize: number) {
        const request = this.createRequest(requestSize, responseSize);
        const record = new DataChannelLatencyTestRecord(request);
        this.records.set(record.seq, record);
        this.sink(request);
    }

    createRequest(requestSize: number, responseSize: number): DataChannelLatencyTestRequest {
        return {
            Seq: this.seq++,
            FillResponseSize: responseSize,
            Filler: requestSize ? 'A'.repeat(requestSize) : ''
        };
    }
}
