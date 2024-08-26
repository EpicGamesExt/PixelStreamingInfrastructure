import {
    test,
    expect,
    PSMouseEventTypes,
    setupEventCapture,
    teardownEventCapture,
    getCapturedEvents, 
    attachToConsoleEvents} from './fixtures';
import * as helpers from './helpers';
import { Page } from '@playwright/test';

// just quickly test that the default stream is working
test('Test default stream.', {
    tag: ['@basic'],
}, async ({ page, streamerPage, streamerId }) => {

    attachToConsoleEvents(streamerPage, (...args: any[]) => {
        console.log("Streamer: ", ...args);
    });

    attachToConsoleEvents(page, (...args: any[]) => {
        console.log("Player: ", ...args);
    });

    await page.goto(`/?StreamerId=${streamerId}`);
    await page.getByText('Click to start').click();

    // let the stream run for a short duration
    await helpers.waitForVideo(page);
    await helpers.delay(5000);

    // query the frontend for its calculated stats
    const frame_count:number = await page.evaluate(()=> {
        let videoStats = window.pixelStreaming.webRtcController.peerConnectionController.aggregatedStats.inboundVideoStats;
        return videoStats.framesReceived;
    });

    // pass the test if we recorded any frames
    expect(frame_count).toBeGreaterThan(0);


    const videoBox = await page.locator('#videoElementParent').boundingBox();
    if (videoBox) {
        await setupEventCapture(streamerPage);
        // await page.mouse.move(videoBox.x, videoBox.y);
        await page.mouse.click(videoBox.x, videoBox.y);
        // await helpers.delay(500);
        await page.mouse.click(videoBox.x + videoBox.width - 1, videoBox.y + videoBox.height - 1);
        // await page.mouse.click(videoBox.x, videoBox.y);
        // await page.mouse.dblclick(videoBox.x, videoBox.y);
        // await page.mouse.move(videoBox.x + 100, videoBox.y + 100);
        await teardownEventCapture(streamerPage);
        const events = await getCapturedEvents(streamerPage);
        const first_player_id = Object.keys(events)[0];
        const single_player_events = events[first_player_id];
        expect(single_player_events).toContainActions([
            { type: PSMouseEventTypes.Down, button: 0 }, 
            { type: PSMouseEventTypes.Up, button: 0 }, 
            // { type: PSMouseEventTypes.Double, button: 0 },
            // { type: PSMouseEventTypes.Move },
        ]);
    }
});

