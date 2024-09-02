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

    const playerBox = await page.locator('#videoElementParent').boundingBox();
    expect(playerBox).not.toBeNull();

    if (playerBox) {
        // perform the actions
        const events = await getEventsFor(streamerPage, async () => {
            // start outside the view
            await page.mouse.move(200, 200);
            // move to the top left of the video
            await page.mouse.move(playerBox.x, playerBox.y);
            // move back outside
            await page.mouse.move(150, 150);
        });

        // check we got the expected events
        const firstPlayerId = Object.keys(events)[0];
        const singlePlayerEvents = events[firstPlayerId];
        const expectedActions: DataChannelEvent[] = [
            { type: PSEventTypes.MouseEnter },
            { type: PSEventTypes.MouseLeave },
        ];
        expect(singlePlayerEvents).toContainActions(expectedActions);
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

    const playerBox = await page.locator('#videoElementParent').boundingBox();
    expect(playerBox).not.toBeNull();

    if (playerBox) {
        const videoSize = await page.evaluate(()=>{
            let videoElem = document.getElementById('streamingVideo') as HTMLVideoElement;
            return { width: videoElem.videoWidth, height: videoElem.videoHeight };
        });

        const coordConverter = new helpers.CoordConverter(playerBox, videoSize);
        const expectedActions: DataChannelEvent[] = [];
        const movements = [
            { x: 100, y: 0 },
            { x: 0, y: 100 },
            { x: -200, y: 0 },
            { x: 0, y: -200 },
        ];
        
        // where the pointer anchors in locked mode changes by browser
        const anchor: helpers.Coord = (() => {
            if (browserName == 'firefox') {
                return { x: playerBox.x + playerBox.width / 2, y: playerBox.y + playerBox.height / 2 };
            } else {
                return { x: playerBox.x, y: playerBox.y };
            }
        })();

        // click on stream to activate pointer lock
        await page.mouse.click(anchor.x, anchor.y);

        // perform the actions
        const events = await getEventsFor(streamerPage, async () => {
            for (const movement of movements) {
                await page.mouse.move(anchor.x + movement.x, anchor.y + movement.y);
                const translated = coordConverter.normalizeQuantizeSigned(movement.x, movement.y);
                expectedActions.push({ type: PSEventTypes.MouseMove, deltaX: translated.x, deltaY: translated.y });
            }
        });

        // check we got the expected events
        const firstPlayerId = Object.keys(events)[0];
        const singlePlayerEvents = events[firstPlayerId];
        expect(singlePlayerEvents).toContainActions(expectedActions);
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

    const playerBox = await page.locator('#videoElementParent').boundingBox();
    expect(playerBox).not.toBeNull();

    if (playerBox) {
        const videoSize = await page.evaluate(()=>{
            let videoElem = document.getElementById('streamingVideo') as HTMLVideoElement;
            return { width: videoElem.videoWidth, height: videoElem.videoHeight };
        });

        // where the pointer anchors in locked mode changes by browser
        const anchor = { x: playerBox.x, y: playerBox.y };
        const coordConverter = new helpers.CoordConverter(playerBox, videoSize);
        const expectedActions: DataChannelEvent[] = [];
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
                const translated = coordConverter.normalizeQuantizeUnsigned(movement.x, movement.y);
                expectedActions.push({ type: PSEventTypes.MouseMove, x: translated.x, y: translated.y });
            }
        });

        // check we got the expected events
        const firstPlayerId = Object.keys(events)[0];
        const singlePlayerEvents = events[firstPlayerId];
        expect(singlePlayerEvents).toContainActions(expectedActions);
    }
});

