import { test } from './fixtures';
import { expect } from './matchers';
import {
    PSEventTypes,
    DataChannelEvent,
    getEventsFor,
} from './extras';
import * as helpers from './helpers';

test('Test keyboard events', {
    tag: ['@keyboard'],
}, async ({ page, streamerPage, streamerId }) => {

    await page.goto(`/?StreamerId=${streamerId}&MatchViewportRes=true`);
    await page.getByText('Click to start').click();
    await helpers.waitForVideo(page);

    const player_box = await page.locator('#videoElementParent').boundingBox();
    expect(player_box).not.toBeNull();

    if (player_box) {
        // click on stream to activate pointer lock
        await page.mouse.click(player_box.x, player_box.y);

        // perform the actions
        // ideally we would loop through the codes in KeyboardController but in that attempt there was a lot
        // of codes that varied per browser and other odd behaviour. If we DO want to do that we will need
        // to figure out how to unify what the browser sends and what we're looking for.
        const expected_actions: DataChannelEvent[] = [];
        const events = await getEventsFor(streamerPage, async () => {
            const start_code = 'A'.charCodeAt(0);
            const end_code = 'Z'.charCodeAt(0);
            for (let c = start_code; c <= end_code; c++) {
                await page.keyboard.press(String.fromCharCode(c));
                expected_actions.push({ type: PSEventTypes.KeyDown, key_code: c });
                expected_actions.push({ type: PSEventTypes.KeyPress, char_code: c });
                expected_actions.push({ type: PSEventTypes.KeyUp, key_code: c });
            }
        });

        // check we got the expected events
        const first_player_id = Object.keys(events)[0];
        const single_player_events = events[first_player_id];
        expect(single_player_events).toContainActions(expected_actions);
    }
});



