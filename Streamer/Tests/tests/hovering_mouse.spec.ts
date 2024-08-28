import { test } from './fixtures';
import { expect } from './matchers';
import {
    PSMouseEventTypes,
    DataChannelEvent,
    getEventsFor,
} from './extras';
import * as helpers from './helpers';

test('Test hovering mouse movement', {
    tag: ['@mouse'],
}, async ({ page, streamerPage, streamerId }) => {

    // helps debugging
    // helpers.attachToConsoleEvents(streamerPage, (...args: any[]) => {
    //     console.log("Streamer: ", ...args);
    // });
    //
    // helpers.attachToConsoleEvents(page, (...args: any[]) => {
    //     console.log("Player: ", ...args);
    // });

    await page.goto(`/?StreamerId=${streamerId}&HoveringMouse=true`);
    await page.getByText('Click to start').click();

    // let the stream run for a short duration
    await helpers.waitForVideo(page);

    const player_box = await page.locator('#videoElementParent').boundingBox();
    expect(player_box).not.toBeNull();

    if (player_box) {
        const video_size = await page.evaluate(()=>{
            let video_elem = document.getElementById('streamingVideo') as HTMLVideoElement;
            return { width: video_elem.videoWidth, height: video_elem.videoHeight };
        });

        // where the pointer anchors in locked mode changes by browser
        const anchor = { x: player_box.x, y: player_box.y };
        const coord_converter = new helpers.CoordConverter(player_box, video_size);
        const expected_actions: DataChannelEvent[] = [];
        const movements = [
            { x: anchor.x + 300, y: anchor.y + 0 },
            { x: anchor.x + 300, y: anchor.y + 200 },
            { x: anchor.x + 200, y: anchor.y + 200 },
            { x: anchor.x + 200, y: anchor.y + 100 },
        ];

        // click on stream to activate pointer lock
        await page.mouse.click(anchor.x, anchor.y);

        // perform the actions
        const events = await getEventsFor(streamerPage, async () => {
            for (const movement of movements) {
                await page.mouse.move(movement.x, movement.y);
                const translated = coord_converter.normalizeQuantizeUnsigned(movement.x, movement.y);
                expected_actions.push({ type: PSMouseEventTypes.Move, x: translated.x, y: translated.y });
            }
        });

        // check we got the expected events
        const first_player_id = Object.keys(events)[0];
        const single_player_events = events[first_player_id];
        expect(single_player_events).toContainActions(expected_actions);
    }
});


