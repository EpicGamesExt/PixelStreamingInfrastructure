import { test } from './fixtures';
import { expect } from './matchers';
import * as helpers from './helpers';

// NOTE: add a new test to check qp values

// just quickly test that the default stream is working
test('Test default stream.', {
    tag: ['@basic'],
}, async ({ page, streamerId }) => {

    await page.goto(`/?StreamerId=${streamerId}`);
    await page.getByText('Click to start').click();

    // let the stream run for a short duration
    await helpers.waitForVideo(page);
    await helpers.delay(1000);

    // query the frontend for its calculated stats
    const frame_count:number = await page.evaluate(()=> {
        let videoStats = pixelStreaming._webRtcController.peerConnectionController.aggregatedStats.inboundVideoStats;
        return videoStats.framesReceived;
    });

    // pass the test if we recorded any frames
    expect(frame_count).toBeGreaterThan(0);
});



