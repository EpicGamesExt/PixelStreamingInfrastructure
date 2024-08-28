import { test } from './fixtures';
import { expect } from './matchers';
import {
    PSMouseEventTypes,
    DataChannelEvent,
    getEventsFor
} from './extras';
import * as helpers from './helpers';

// just quickly test that the default stream is working
test('Test default stream.', {
    tag: ['@basic'],
}, async ({ page, streamerPage, streamerId }) => {

    helpers.attachToConsoleEvents(streamerPage, (...args: any[]) => {
        console.log("Streamer: ", ...args);
    });

    helpers.attachToConsoleEvents(page, (...args: any[]) => {
        console.log("Player: ", ...args);
    });

    await page.goto(`/?StreamerId=${streamerId}`);
    await page.getByText('Click to start').click();

    // let the stream run for a short duration
    await helpers.waitForVideo(page);

    const player_box = await page.locator('#videoElementParent').boundingBox();
    if (player_box) {
        const video_size = await page.evaluate(()=>{
            let video_elem = document.getElementById('streamingVideo') as HTMLVideoElement;
            return { width: video_elem.videoWidth, height: video_elem.videoHeight };
        });

        const coord_converter = new helpers.CoordConverter(player_box, video_size);
        const expected_actions: DataChannelEvent[] = [];
        const movements = [
            { x: 100, y: 0 },
            { x: 0, y: 100 },
            { x: -200, y: 0 },
            { x: 0, y: -200 },
        ];

        // click on stream to activate pointer lock
        let x = player_box.x + player_box.width / 2;
        let y = player_box.y + player_box.height / 2;
        await page.mouse.click(x, y);               // click the center of the video

        // perform the actions
        const events = await getEventsFor(streamerPage, async () => {
            for (const movement of movements) {
                await page.mouse.move(x + movement.x, y + movement.y);
                const translated = coord_converter.toVideoCoords(movement.x, movement.y);
                expected_actions.push({ type: PSMouseEventTypes.Move, delta_x: translated.x, delta_y: translated.y });
            }
        });

        // check we got the expected events
        // const events = await getCapturedEvents(streamerPage);
        const first_player_id = Object.keys(events)[0];
        const single_player_events = events[first_player_id];
        expect(single_player_events).toContainActions(expected_actions);
    }
});

