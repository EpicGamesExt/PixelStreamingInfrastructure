import { test } from './fixtures';
import { expect } from './matchers';
import {
    PSEventTypes,
    DataChannelEvent,
    getEventsFor,
} from './extras';
import * as helpers from './helpers';

test('Test resolution changes with match viewport on.', {
    tag: ['@resolution'],
}, async ({ page, streamerPage, streamerId }) => {

    // first with match viewport enabled
    await page.goto(`/?StreamerId=${streamerId}&MatchViewportRes=true`);
    await page.getByText('Click to start').click();
    await helpers.waitForVideo(page);

    const events = await getEventsFor(streamerPage, async () => {
        await page.setViewportSize({ width: 100, height: 100 });
        await helpers.delay(500);
        await page.setViewportSize({ width: 800, height: 600 });
        await helpers.delay(500);
    });

    const first_player_id = Object.keys(events)[0];
    const single_player_events = events[first_player_id];
    const expected_actions: DataChannelEvent[] = [
        { type: PSEventTypes.Command, command: '{\"Resolution.Width\":100,\"Resolution.Height\":100}' },
        { type: PSEventTypes.Command, command: '{\"Resolution.Width\":800,\"Resolution.Height\":600}' },
    ];
    expect(single_player_events).toContainActions(expected_actions);
});


test('Test resolution changes with match viewport off.', {
    tag: ['@resolution'],
}, async ({ page, streamerPage, streamerId }) => {

    // first with match viewport enabled
    await page.goto(`/?StreamerId=${streamerId}&MatchViewportRes=false`);
    await page.getByText('Click to start').click();
    await helpers.waitForVideo(page);

    const events = await getEventsFor(streamerPage, async () => {
        await page.setViewportSize({ width: 100, height: 100 });
        await helpers.delay(500);
        await page.setViewportSize({ width: 800, height: 600 });
        await helpers.delay(500);
    });

    const first_player_id = Object.keys(events)[0];
    const single_player_events = events[first_player_id];
    const expected_actions: DataChannelEvent[] = [
        { type: PSEventTypes.Command, command: '{\"Resolution.Width\":100,\"Resolution.Height\":100}' },
        { type: PSEventTypes.Command, command: '{\"Resolution.Width\":800,\"Resolution.Height\":600}' },
    ];
    expect(single_player_events).not.toContainActions(expected_actions);
});


