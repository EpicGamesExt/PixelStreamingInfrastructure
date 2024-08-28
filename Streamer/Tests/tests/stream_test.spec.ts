import {
    test,
    expect,
    PSMouseEventTypes,
    setupEventCapture,
    teardownEventCapture,
    getCapturedEvents, 
    attachToConsoleEvents,
    DataChannelEvent } from './fixtures';
import * as helpers from './helpers';
import { Page } from '@playwright/test';

interface BoxSize {
    width: number;
    height: number;
};

interface Coord {
    x: number;
    y: number;
};

class CoordConverter {
    player_size: BoxSize;
    video_size: BoxSize;
    ratio: number;
    player_is_larger: boolean;

    constructor(player_size: BoxSize, video_size: BoxSize) {
        this.player_size = player_size;
        this.video_size = video_size;
        const player_aspect_ratio = this.player_size.height / this.player_size.width;
        const video_aspect_ratio = this.video_size.height / this.video_size.width;
        this.player_is_larger = player_aspect_ratio > video_aspect_ratio;
        if (this.player_is_larger) {
            this.ratio = player_aspect_ratio / video_aspect_ratio;
        } else {
            this.ratio = video_aspect_ratio / player_aspect_ratio;
        }
    }

    public toVideoCoords(x: number, y: number): Coord {
        if (this.player_is_larger) {
            const normalizedX = x / (0.5 * this.player_size.width);
            const normalizedY = (this.ratio * y) / (0.5 * this.player_size.height);
            return {
                x: Math.trunc(normalizedX * 32767),
                y: Math.trunc(normalizedY * 32767)
            };
        } else {
            const normalizedX = (this.ratio * x) / (0.5 * this.player_size.width);
            const normalizedY = y / (0.5 * this.player_size.height);
            return {
                x: Math.trunc(normalizedX * 32767),
                y: Math.trunc(normalizedY * 32767)
            };
        }
    }
};

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

    const playerBox = await page.locator('#videoElementParent').boundingBox();
    if (playerBox) {
        const videoSize = await page.evaluate(()=>{
            let videoElem = document.getElementById('streamingVideo') as HTMLVideoElement;
            return { width: videoElem.videoWidth, height: videoElem.videoHeight };
        });

        const movements = [
            { x: 100, y: 0 },
            { x: 0, y: 100 },
            { x: -200, y: 0 },
            { x: 0, y: -200 },
        ];

        // click on stream to activate pointer lock
        let x = playerBox.x + playerBox.width / 2;
        let y = playerBox.y + playerBox.height / 2;
        await page.mouse.click(x, y);               // click the center of the video

        const coord_converter = new CoordConverter(playerBox, videoSize);
        const translated_movements: Coord[] = [];

        await setupEventCapture(streamerPage);
        // pointer lock snaps the pointer back to the center of the element so
        // we want to make each movement relative to the center
        for (const movement of movements) {
            await page.mouse.move(x + movement.x, y + movement.y);
            translated_movements.push(coord_converter.toVideoCoords(movement.x, movement.y));
        }
        await teardownEventCapture(streamerPage);

        // build the list of expected actions
        const expected_actions: DataChannelEvent[] = [];
        for (const translated of translated_movements) {
            expected_actions.push({ type: PSMouseEventTypes.Move, delta_x: translated.x, delta_y: translated.y });
        }

        // check they were found
        const events = await getCapturedEvents(streamerPage);
        const first_player_id = Object.keys(events)[0];
        const single_player_events = events[first_player_id];
        coord_converter.toVideoCoords(100, 0).x;
        expect(single_player_events).toContainActions(expected_actions);
    }
});

