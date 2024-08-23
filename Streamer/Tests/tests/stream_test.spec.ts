import { test, expect, DataChannelEvent, PSMouseEventTypes } from './fixtures';
import * as helpers from './helpers';
import { Page } from '@playwright/test';

declare global {
    interface Window {
        data_messages: Record<string,DataChannelEvent[]>;
        data_message_listener(player_id: number, message: any): void;
    }
}

function setupEventCapture(page: Page) {
    return page.evaluate(() => {
        window.data_messages = {};
        window.data_message_listener = (player_id, message) => {
            if (window.data_messages[player_id] == undefined) {
                window.data_messages[player_id] = [];
            }
            window.data_messages[player_id].push({ type: message.type, ...message.message });
        };
        window.streamer.on('data_channel_message', window.data_message_listener);
    });
}

function teardownEventCapture(page: Page) {
    return page.evaluate(() => {
        window.streamer.off('data_channel_message', window.data_message_listener);
    });
}

function getCapturedEvents(page: Page): Promise<Record<string, DataChannelEvent[]>> {
    return page.evaluate(() => {
        return window.data_messages;
    });
}

async function validateMouseClick(streamerPage: Page, page: Page, x: number, y: number, options?: object) {
    await setupEventCapture(streamerPage);
    await page.mouse.click(x, y, options);
    await teardownEventCapture(streamerPage);
    const events = await getCapturedEvents(streamerPage);
    const first_player_id = Object.keys(events)[0];
    const single_player_events = events[first_player_id];
    expect(single_player_events).toContainActions([
        { type: PSMouseEventTypes.Down, button: 0 }, 
        { type: PSMouseEventTypes.Up, button: 0 }, 
    ]);
}

// just quickly test that the default stream is working
test('Test default stream.', {
    tag: ['@basic'],
}, async ({ page, streamerPage, streamerId }) => {

    streamerPage.on('console', async msg => {
        const values: any[] = [];
        for (const arg of msg.args())
            values.push(await arg.jsonValue());
        console.log(...values);
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
        await validateMouseClick(streamerPage, page, videoBox.x, videoBox.y);
    }
});

