import { test } from './fixtures';
import { expect } from './matchers';
import * as helpers from './helpers';
import { Flags, PixelStreaming, WebRtcSdpAnswerEvent } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5';

test('Test abs-capture-time header extension found for streamer', {
    tag: ['@capture-time'],
}, async ({ page, streamerPage, streamerId }) => {

    const localDescription: Promise<RTCSessionDescriptionInit> = new Promise(async (resolve) => {

        // Expose the resolve function to the browser context
        await streamerPage.exposeFunction('resolveFromLocalDescriptionPromise', resolve);

        streamerPage.evaluate(() => {
            window.streamer.on('local_description_set', (localDescription: RTCSessionDescriptionInit) => {
                resolveFromLocalDescriptionPromise(localDescription);
            });
        });
    });

    await page.goto(`/?StreamerId=${streamerId}`);
    await page.getByText('Click to start').click();

    await helpers.waitForVideo(page);
    let localDescSdp: RTCSessionDescriptionInit = await localDescription;

    expect(localDescSdp.sdp).toBeDefined();

    // If this string is found in the sdp we can say we have turned on the capture time header extension on the streamer
    expect(localDescSdp.sdp).toContain("abs-capture-time");
});

test('Test abs-capture-time header extension found in PSInfra frontend', {
    tag: ['@capture-time'],
}, async ({ page, streamerPage, streamerId }) => {

    await page.goto(`/?StreamerId=${streamerId}`);

    await page.waitForLoadState("load");

    // Enable the flag for the capture extension
    await page.evaluate(() => {
        window.pixelStreaming.config.setFlagEnabled("EnableCaptureTimeExt", true);
    });

    // Wait for the sdp answer
    let getSdpAnswer = new Promise<RTCSessionDescriptionInit>(async (resolve) => {

        // Expose the resolve function to the browser context
        await page.exposeFunction('resolveFromSdpAnswerPromise', resolve);

        page.evaluate(() => {
            window.pixelStreaming.addEventListener("webRtcSdpAnswer", (e: WebRtcSdpAnswerEvent) => {
                resolveFromSdpAnswerPromise(e.data.sdp);
            });
        });

    });

    await page.getByText('Click to start').click();

    const answer: RTCSessionDescriptionInit = await getSdpAnswer;

    await helpers.waitForVideo(page);

    expect(answer).toBeDefined();
    expect(answer.sdp).toBeDefined();

    // If this string is found in the sdp we can say we have turned on the capture time header extension on the streamer
    expect(answer.sdp).toContain("abs-capture-time");
});
