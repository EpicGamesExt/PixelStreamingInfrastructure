import { test } from './fixtures';
import { expect } from './matchers';
import {
    PSEventTypes,
    DataChannelEvent,
    getEventSetFrom,
} from './extras';
import * as helpers from './helpers';

test('Test keyboard events', {
    tag: ['@keyboard'],
}, async ({ page, streamerPage, streamerId }) => {

    await page.goto(`/?StreamerId=${streamerId}&MatchViewportRes=true`);

    await helpers.startAndWaitForVideo(page);

    const playerBox = await page.locator('#videoElementParent').boundingBox();
    expect(playerBox).not.toBeNull();

    if (playerBox) {
        // click on stream to activate pointer lock
        await page.mouse.click(playerBox.x, playerBox.y);

        // perform the actions
        // ideally we would loop through the codes in KeyboardController but in that attempt there was a lot
        // of codes that varied per browser and other odd behaviour. If we DO want to do that we will need
        // to figure out how to unify what the browser sends and what we're looking for.
        const expectedActions: DataChannelEvent[] = [];
        const events = await getEventSetFrom(streamerPage, async () => {
            const startCode = 'A'.charCodeAt(0);
            const endCode = 'Z'.charCodeAt(0);
            for (let c = startCode; c <= endCode; c++) {
                await page.keyboard.press(String.fromCharCode(c));
                expectedActions.push({ type: PSEventTypes.KeyDown, keyCode: c });
                expectedActions.push({ type: PSEventTypes.KeyPress, keyCode: c });
                expectedActions.push({ type: PSEventTypes.KeyUp, keyCode: c });
            }
        });

        // check we got the expected events
        const firstPlayerId = Object.keys(events)[0];
        const singlePlayerEvents = events[firstPlayerId];
        expect(singlePlayerEvents).toContainActions(expectedActions);
    }
});



