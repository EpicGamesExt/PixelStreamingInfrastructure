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
        await helpers.delay(1000);
        await page.setViewportSize({ width: 800, height: 600 });
        await helpers.delay(1000);
    });

    const firstPlayerId = Object.keys(events)[0];
    const singlePlayerEvents = events[firstPlayerId];
    const expectedActions: DataChannelEvent[] = [
        { type: PSEventTypes.Command, command: '{\"Resolution.Width\":100,\"Resolution.Height\":100}' },
        { type: PSEventTypes.Command, command: '{\"Resolution.Width\":800,\"Resolution.Height\":600}' },
    ];
    expect(singlePlayerEvents).toContainActions(expectedActions);
});


test('Test resolution changes with match viewport off.', {
    tag: ['@resolution'],
}, async ({ page, streamerPage, streamerId }) => {

    // first with match viewport enabled
    await page.goto(`/?StreamerId=${streamerId}&MatchViewportRes=false`);
    await page.getByText('Click to start').click();
    await helpers.waitForVideo(page);
    await page.click("#streamingVideo");

    const events = await getEventsFor(streamerPage, async () => {
        await page.setViewportSize({ width: 100, height: 100 });
        await helpers.delay(1000);
        await page.setViewportSize({ width: 800, height: 600 });
        await helpers.delay(1000);
    });

    const firstPlayerId = Object.keys(events)[0];
    const singlePlayerEvents = events[firstPlayerId];
    const expectedActions: DataChannelEvent[] = [
        { type: PSEventTypes.Command, command: '{\"Resolution.Width\":100,\"Resolution.Height\":100}' },
        { type: PSEventTypes.Command, command: '{\"Resolution.Width\":800,\"Resolution.Height\":600}' },
    ];
    expect(singlePlayerEvents).not.toContainActions(expectedActions);
});


