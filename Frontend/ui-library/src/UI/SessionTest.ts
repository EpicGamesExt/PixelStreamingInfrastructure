// Copyright Epic Games, Inc. All Rights Reserved.

import {
    AggregatedStats,
    InboundVideoStats,
    InboundAudioStats,
    Logger,
    SettingNumber,
    CandidatePairStats,
    DataChannelStats,
    OutboundRTPStats,
    CandidateStat,
    RemoteOutboundRTPStats
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5';
import { StatsSections } from './UIConfigurationTypes';
import { SettingUINumber } from '../Config/SettingUINumber';
import { InboundRTPStats } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5/dist/types/PeerConnectionController/InboundRTPStats';

type InboundRTPStatsKeys = Exclude<keyof typeof InboundRTPStats, 'prototype'>;
type InboundRTPStatsIds = (typeof InboundRTPStats)[InboundRTPStatsKeys];

type InboundVideoStatsKeys = Exclude<keyof typeof InboundVideoStats, 'prototype'>;
type InboundVideoStatsIds = (typeof InboundVideoStats)[InboundVideoStatsKeys];

type InboundAudioStatsKeys = Exclude<keyof typeof InboundAudioStats, 'prototype'>;
type InboundAudioStatsIds = (typeof InboundAudioStats)[InboundAudioStatsKeys];

type CandidatePairStatsKeys = Exclude<keyof typeof CandidatePairStats, 'prototype'>;
type CandidatePairStatsIds = (typeof CandidatePairStats)[CandidatePairStatsKeys];

type DataChannelStatsKeys = Exclude<keyof typeof DataChannelStats, 'prototype'>;
type DataChannelStatsIds = (typeof DataChannelStats)[DataChannelStatsKeys];

type CandidateStatKeys = Exclude<keyof typeof CandidateStat, 'prototype'>;
type CandidateStatKeysIds = (typeof CandidateStat)[CandidateStatKeys];

type OutboundRTPStatsKeys = Exclude<keyof typeof OutboundRTPStats, 'prototype'>;
type OutboundRTPStatsIds = (typeof OutboundRTPStats)[OutboundRTPStatsKeys];

type RemoteOutboundRTPStatsKeys = Exclude<keyof typeof RemoteOutboundRTPStats, 'prototype'>;
type RemoteOutboundRTPStatsIds = (typeof RemoteOutboundRTPStats)[RemoteOutboundRTPStatsKeys];

type StatsIds =
    | InboundRTPStatsIds
    | InboundVideoStatsIds
    | InboundAudioStatsIds
    | CandidatePairStatsIds
    | DataChannelStatsIds
    | OutboundRTPStatsIds
    | CandidateStatKeysIds
    | RemoteOutboundRTPStatsIds;

type AggregatedStatsKeys = Exclude<keyof typeof AggregatedStats, 'prototype'>;
type AggregatedStatsIds = (typeof AggregatedStats)[AggregatedStatsKeys];

type TempIds = AggregatedStatsIds | StatsIds;

type ElementType<T extends Iterable<any>> = T extends Iterable<infer E> ? E : never;
/**
 * Session test UI elements and results handling.
 */
export class SessionTest {
    _rootElement: HTMLElement;
    _latencyTestButton: HTMLInputElement;
    _testTimeFrameSetting: SettingNumber<'TestTimeFrame'>;

    isCollectingStats: boolean;

    records: AggregatedStats[];

    constructor() {
        this.isCollectingStats = false;
    }

    /**
     * Get the the button containing the stats icon.
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('section');
            this._rootElement.classList.add('settingsContainer');

            // make heading
            const heading = document.createElement('div');
            heading.id = 'latencyTestHeader';
            heading.classList.add('settings-text');
            heading.classList.add('settingsHeader');
            this._rootElement.appendChild(heading);

            const headingText = document.createElement('div');
            headingText.innerHTML = 'Session Test';
            heading.appendChild(headingText);

            // make test results element
            const resultsParentElem = document.createElement('div');
            resultsParentElem.id = 'latencyTestContainer';
            resultsParentElem.classList.add('d-none');
            this._rootElement.appendChild(resultsParentElem);

            this._testTimeFrameSetting = new SettingNumber(
                'TestTimeFrame',
                'Test Time Frame',
                'How long the test runs for (seconds)',
                0 /*min*/,
                3600 /*max*/,
                1 /*default*/,
                false
            );
            const testTimeFrameSetting = new SettingUINumber(this._testTimeFrameSetting);
            resultsParentElem.appendChild(testTimeFrameSetting.rootElement);
            resultsParentElem.appendChild(this.latencyTestButton);
        }
        return this._rootElement;
    }

    public get latencyTestButton(): HTMLInputElement {
        if (!this._latencyTestButton) {
            this._latencyTestButton = document.createElement('input');
            this._latencyTestButton.type = 'button';
            this._latencyTestButton.value = 'Run Test';
            this._latencyTestButton.id = 'btn-start-latency-test';
            this._latencyTestButton.classList.add('streamTools-button');
            this._latencyTestButton.classList.add('btn-flat');

            this._latencyTestButton.onclick = () => {
                this.records = [];
                this.isCollectingStats = true;
                Logger.Warning(`Starting session test. Duration: [${this._testTimeFrameSetting.number}]`);
                setTimeout(() => {
                    this.onCollectingFinished();
                }, this._testTimeFrameSetting.number * 1000);
            };
        }
        return this._latencyTestButton;
    }

    public handleStats(stats: AggregatedStats) {
        if (!this.isCollectingStats) {
            return;
        }

        const statsCopy = structuredClone(stats);
        this.records.push(statsCopy);
    }

    private onCollectingFinished() {
        this.isCollectingStats = false;
        Logger.Warning(`Finished session test`);

        const csvHeader: string[] = [];
        let csvBody = '';

        this.records.forEach((record) => {
            for (const i in record) {
                const obj: {} = record[i as AggregatedStatsIds];

                if (Array.isArray(obj)) {
                    for (const j in obj) {
                        const arrayVal = obj[j];
                        for (const k in arrayVal) {
                            if (csvHeader.indexOf(`${i}.${j}.${k}`) === -1) {
                                csvHeader.push(`${i}.${j}.${k}`);
                            }

                            csvBody += `"${arrayVal[k]}",`;
                        }
                    }
                } else if (obj instanceof Map) {
                    for (const j in obj.keys()) {
                        const mapVal = obj.get(j);
                        for (const k in mapVal) {
                            if (csvHeader.indexOf(`${i}.${j}.${k}`) === -1) {
                                csvHeader.push(`${i}.${j}.${k}`);
                            }

                            csvBody += `"${mapVal[k]}",`;
                        }
                    }
                } else {
                    for (const j in obj) {
                        if (csvHeader.indexOf(`${i}.${j}`) === -1) {
                            csvHeader.push(`${i}.${j}`);
                        }

                        csvBody += `"${obj[j as StatsIds]}",`;
                    }
                }
            }
            csvBody += '\n';
        });

        const file = new Blob([`${csvHeader.join(',')}\n${csvBody}`], { type: 'text/plain' });
        const a = document.createElement('a');
        const url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'test_results.csv';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}
