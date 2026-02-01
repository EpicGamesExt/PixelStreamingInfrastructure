// Copyright Epic Games, Inc. All Rights Reserved.

import { LatencyTestResults } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.7';
import { Logger } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.7';
import { StatsSections } from './UIConfigurationTypes';

/**
 * Latency test UI elements and results handling.
 */
export class LatencyTest {
    _rootElement: HTMLElement;
    _latencyTestButton: HTMLInputElement;
    _latencyTestResultsElement: HTMLElement;

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
            headingText.innerHTML = StatsSections.LatencyTest;
            heading.appendChild(headingText);
            heading.appendChild(this.latencyTestButton);

            // make test results element
            const resultsParentElem = document.createElement('div');
            resultsParentElem.id = 'latencyTestContainer';
            resultsParentElem.classList.add('d-none');
            this._rootElement.appendChild(resultsParentElem);

            resultsParentElem.appendChild(this.latencyTestResultsElement);
        }
        return this._rootElement;
    }

    public get latencyTestResultsElement(): HTMLElement {
        if (!this._latencyTestResultsElement) {
            this._latencyTestResultsElement = document.createElement('div');
            this._latencyTestResultsElement.id = 'latencyStatsResults';
            this._latencyTestResultsElement.classList.add('StatsResult');
        }
        return this._latencyTestResultsElement;
    }

    public get latencyTestButton(): HTMLInputElement {
        if (!this._latencyTestButton) {
            this._latencyTestButton = document.createElement('input');
            this._latencyTestButton.type = 'button';
            this._latencyTestButton.value = 'Run Test';
            this._latencyTestButton.id = 'btn-start-latency-test';
            this._latencyTestButton.classList.add('streamTools-button');
            this._latencyTestButton.classList.add('btn-flat');
        }
        return this._latencyTestButton;
    }

    /**
     * Populate the UI based on the latency test's results.
     * @param latencyTimings - The latency test results.
     */
    public handleTestResult(latencyTimings: LatencyTestResults) {
        Logger.Info(JSON.stringify(latencyTimings));

        // Clear any previous results
        const resultsElement = this.latencyTestResultsElement;
        resultsElement.innerHTML = '';

        if (latencyTimings.networkLatency !== undefined && latencyTimings.networkLatency > 0) {
            const div = document.createElement('div');
            div.textContent = 'Net latency RTT (ms): ' + latencyTimings.networkLatency;
            resultsElement.appendChild(div);
        }

        if (latencyTimings.EncodeMs !== undefined && latencyTimings.EncodeMs > 0) {
            const div = document.createElement('div');
            div.textContent = 'UE Encode (ms): ' + latencyTimings.EncodeMs;
            resultsElement.appendChild(div);
        }

        if (latencyTimings.CaptureToSendMs !== undefined && latencyTimings.CaptureToSendMs > 0) {
            const div = document.createElement('div');
            div.textContent = 'UE Capture (ms): ' + latencyTimings.CaptureToSendMs;
            resultsElement.appendChild(div);
        }

        if (latencyTimings.browserSendLatency !== undefined && latencyTimings.browserSendLatency > 0) {
            const div = document.createElement('div');
            div.textContent = 'Browser send latency (ms): ' + latencyTimings.browserSendLatency;
            resultsElement.appendChild(div);
        }

        if (
            latencyTimings.frameDisplayDeltaTimeMs !== undefined &&
            latencyTimings.browserReceiptTimeMs !== undefined
        ) {
            if (latencyTimings.frameDisplayDeltaTimeMs && latencyTimings.browserReceiptTimeMs) {
                const div = document.createElement('div');
                div.textContent =
                    'Browser receive latency (ms): ' + latencyTimings.frameDisplayDeltaTimeMs;
                resultsElement.appendChild(div);
            }
        }

        if (latencyTimings.latencyExcludingDecode !== undefined) {
            const div = document.createElement('div');
            div.textContent =
                'Total latency (excluding browser) (ms): ' + latencyTimings.latencyExcludingDecode;
            resultsElement.appendChild(div);
        }

        if (latencyTimings.endToEndLatency !== undefined) {
            if (latencyTimings.endToEndLatency) {
                const div = document.createElement('div');
                div.textContent = 'Total latency (ms): ' + latencyTimings.endToEndLatency;
                resultsElement.appendChild(div);
            }
        }
    }
}
