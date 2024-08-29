import { test } from './fixtures';
import { expect } from './matchers';
import {
    PSEventTypes,
    DataChannelEvent,
    getEventsFor,
} from './extras';
import * as helpers from './helpers';

test('Test mouse enter/leave', {
    tag: ['@mouse'],
}, async ({ page, streamerPage, streamerId }) => {

    // // helps debugging
    // helpers.attachToConsoleEvents(streamerPage, (...args: any[]) => {
    //     console.log("Streamer: ", ...args);
    // });
    //
    // helpers.attachToConsoleEvents(page, (...args: any[]) => {
    //     console.log("Player: ", ...args);
    // });

    await page.goto(`/?StreamerId=${streamerId}&HoveringMouse=true`);
    await page.getByText('Click to start').click();

    await helpers.waitForVideo(page);
    
    // reduce the size of the window so we can leave
    await page.setViewportSize({ width: 100, height: 100 });

    const player_box = await page.locator('#videoElementParent').boundingBox();
    expect(player_box).not.toBeNull();

    if (player_box) {
        // perform the actions
        const events = await getEventsFor(streamerPage, async () => {
            // start outside the view
            await page.mouse.move(200, 200);
            // move to the top left of the video
            await page.mouse.move(player_box.x, player_box.y);
            // move back outside
            await page.mouse.move(150, 150);
        });

        // check we got the expected events
        const first_player_id = Object.keys(events)[0];
        const single_player_events = events[first_player_id];
        const expected_actions: DataChannelEvent[] = [
            { type: PSEventTypes.MouseEnter },
            { type: PSEventTypes.MouseLeave },
        ];
        expect(single_player_events).toContainActions(expected_actions);
    }
});

test('Test locked mouse movement', {
    tag: ['@mouse'],
}, async ({ page, streamerPage, streamerId, browserName }) => {

    // helps debugging
    // helpers.attachToConsoleEvents(streamerPage, (...args: any[]) => {
    //     console.log("Streamer: ", ...args);
    // });
    //
    // helpers.attachToConsoleEvents(page, (...args: any[]) => {
    //     console.log("Player: ", ...args);
    // });

    await page.goto(`/?StreamerId=${streamerId}&HoveringMouse=false`);
    await page.getByText('Click to start').click();

    await helpers.waitForVideo(page);

    const player_box = await page.locator('#videoElementParent').boundingBox();
    expect(player_box).not.toBeNull();

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
        
        // where the pointer anchors in locked mode changes by browser
        const anchor: helpers.Coord = (() => {
            if (browserName == 'firefox') {
                return { x: player_box.x + player_box.width / 2, y: player_box.y + player_box.height / 2 };
            } else {
                return { x: player_box.x, y: player_box.y };
            }
        })();

        // click on stream to activate pointer lock
        await page.mouse.click(anchor.x, anchor.y);

        // perform the actions
        const events = await getEventsFor(streamerPage, async () => {
            for (const movement of movements) {
                await page.mouse.move(anchor.x + movement.x, anchor.y + movement.y);
                const translated = coord_converter.normalizeQuantizeSigned(movement.x, movement.y);
                expected_actions.push({ type: PSEventTypes.MouseMove, delta_x: translated.x, delta_y: translated.y });
            }
        });

        // check we got the expected events
        const first_player_id = Object.keys(events)[0];
        const single_player_events = events[first_player_id];
        expect(single_player_events).toContainActions(expected_actions);
    }
});

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
                expected_actions.push({ type: PSEventTypes.MouseMove, x: translated.x, y: translated.y });
            }
        });

        // check we got the expected events
        const first_player_id = Object.keys(events)[0];
        const single_player_events = events[first_player_id];
        expect(single_player_events).toContainActions(expected_actions);
    }
});

