// Copyright Epic Games, Inc. All Rights Reserved.

import { Logger, DataChannelLatencyTestResult } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.7';
import { StatsSections } from './UIConfigurationTypes';

/**
 * DataChannel Latency test UI elements and results handling.
 */
export class DataChannelLatencyTest {
    _rootElement: HTMLElement;
    _latencyTestButton: HTMLInputElement;
    _latencyTestResultsElement: HTMLElement;

    /**
     * Get the button containing the stats icon.
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('section');
            this._rootElement.classList.add('settingsContainer');

            // make heading
            const heading = document.createElement('div');
            heading.id = 'dataChannelLatencyTestHeader';
            heading.classList.add('settings-text');
            heading.classList.add('settingsHeader');
            this._rootElement.appendChild(heading);

            const headingText = document.createElement('div');
            headingText.innerHTML = StatsSections.DataChannelLatencyTest;
            heading.appendChild(headingText);
            heading.appendChild(this.latencyTestButton);

            // make test results element
            const resultsParentElem = document.createElement('div');
            resultsParentElem.id = 'dataChannelLatencyTestContainer';
            resultsParentElem.classList.add('d-none');
            this._rootElement.appendChild(resultsParentElem);

            resultsParentElem.appendChild(this.latencyTestResultsElement);
        }
        return this._rootElement;
    }

    public get latencyTestResultsElement(): HTMLElement {
        if (!this._latencyTestResultsElement) {
            this._latencyTestResultsElement = document.createElement('div');
            this._latencyTestResultsElement.id = 'dataChannelLatencyStatsResults';
            this._latencyTestResultsElement.classList.add('StatsResult');
        }
        return this._latencyTestResultsElement;
    }

    public get latencyTestButton(): HTMLInputElement {
        if (!this._latencyTestButton) {
            this._latencyTestButton = document.createElement('input');
            this._latencyTestButton.type = 'button';
            this._latencyTestButton.value = 'Run Test';
            this._latencyTestButton.id = 'btn-start-data-channel-latency-test';
            this._latencyTestButton.classList.add('streamTools-button');
            this._latencyTestButton.classList.add('btn-flat');
        }
        return this._latencyTestButton;
    }

    /**
     * Populate the UI based on the latency test's results.
     * @param result - The latency test results.
     */
    public handleTestResult(result: DataChannelLatencyTestResult) {
        Logger.Info(JSON.stringify(result));
        /**
         * Check we have results, NaN would mean that UE version we talk to doesn't support our test
         */
        if (isNaN(result.dataChannelRtt)) {
            // Clear any previous content and show a simple "Not supported" message.
            this.latencyTestResultsElement.textContent = '';
            const notSupportedDiv = document.createElement('div');
            notSupportedDiv.textContent = 'Not supported';
            this.latencyTestResultsElement.appendChild(notSupportedDiv);
            return;
        }

        // Clear previous results before showing new ones.
        this.latencyTestResultsElement.textContent = '';

        const rttDiv = document.createElement('div');
        rttDiv.textContent = 'Data channel RTT (ms): ' + result.dataChannelRtt;
        this.latencyTestResultsElement.appendChild(rttDiv);
        /**
         * Separate path time discovery works only when UE and Player clocks have been synchronized.
         */
        if (result.playerToStreamerTime >= 0 && result.streamerToPlayerTime >= 0) {
            const playerToStreamerDiv = document.createElement('div');
            playerToStreamerDiv.textContent =
                'Player to Streamer path (ms): ' + result.playerToStreamerTime;
            this.latencyTestResultsElement.appendChild(playerToStreamerDiv);

            const streamerToPlayerDiv = document.createElement('div');
            streamerToPlayerDiv.textContent =
                'Streamer to Player path (ms): ' + result.streamerToPlayerTime;
            this.latencyTestResultsElement.appendChild(streamerToPlayerDiv);
        }
        //setup button to download the detailed results
        const downloadButton: HTMLInputElement = document.createElement('input');
        downloadButton.type = 'button';
        downloadButton.value = 'Download';
        downloadButton.classList.add('streamTools-button');
        downloadButton.classList.add('btn-flat');
        downloadButton.onclick = () => {
            const file = new Blob([result.exportLatencyAsCSV()], { type: 'text/plain' });
            const a = document.createElement('a');
            const url = URL.createObjectURL(file);
            a.href = url;
            a.download = 'data_channel_latency_test_results.csv';
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        };
        this.latencyTestResultsElement.appendChild(downloadButton);
    }

    public handleTestStart() {
        // Clear any previous results and show a "Test in progress" message.
        this.latencyTestResultsElement.textContent = '';
        const inProgressDiv = document.createElement('div');
        inProgressDiv.textContent = 'Test in progress';
        this.latencyTestResultsElement.appendChild(inProgressDiv);
    }
}
