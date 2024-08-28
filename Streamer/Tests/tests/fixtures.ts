import { test as base, expect as baseExpect, Page } from '@playwright/test';
import { Streamer } from '../../src/streamer';
import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5';

export function attachToConsoleEvents(page: Page, callback: (...args: any[]) => void) {
    page.on('console', async msg => {
        const values: any[] = [];
        for (const arg of msg.args())
            values.push(await arg.jsonValue());
        callback(...values);
    });
}

export function setupEventCapture(streamerPage: Page) {
    return streamerPage.evaluate(() => {
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

export function teardownEventCapture(streamerPage: Page) {
    return streamerPage.evaluate(() => {
        window.streamer.off('data_channel_message', window.data_message_listener);
    });
}

export function getCapturedEvents(streamerPage: Page): Promise<Record<string, DataChannelEvent[]>> {
    return streamerPage.evaluate(() => {
        return window.data_messages;
    });
}

type PSTestFixtures = {
    streamerPage: Page;
    streamerId: string;
};

// just to silence some TS errors
declare global {
    interface Window {
        pixelStreaming: PixelStreaming;
        streamer: Streamer;
        data_messages: Record<string,DataChannelEvent[]>;
        data_message_listener(player_id: number, message: any): void;
    }
}

export const test = base.extend<PSTestFixtures>({
    streamerPage: async ({ context }, use) => {
        const streamerPage = await context.newPage();
        await streamerPage.goto("http://localhost:4000");
        await use(streamerPage);
    },
    streamerId: async ({ streamerPage }, use) => {
        const id_promise: Promise<string> = streamerPage.evaluate(()=> {
            return new Promise((resolve) => {
                window.streamer.on('endpoint_id_confirmed', () => {
                    resolve(window.streamer.id);
                });
            })
        });
        await streamerPage.getByText('Start Streaming').click();
        const streamerId: string = await id_promise;
        await use(streamerId);
    },
});

export interface DataChannelMouseInput {
    type: number;
    button: number;
    x: number;
    y: number;
    delta_x?: number;
    delta_y?: number;
};

export interface DataChannelKeyboardInput {
    type: number;
};

export type DataChannelEvent = DataChannelMouseInput | DataChannelKeyboardInput;

// tests if event 'match' matches 'target'
function dataChannelActionMatches(target: DataChannelEvent, match: DataChannelEvent): boolean {
    if (target.type != match.type) {
        return false;
    }

    for (const [key,value] of Object.entries(target)) {
        if (!match.hasOwnProperty(key)) {
            return false;
        }
        if (match[key] != value) {
            return false;
        }
    }
    return true;
}

// setup to match StreamMessageController. Would be better if we had some constants to import
export enum PSMouseEventTypes {
    Down = 72,
    Up = 73,
    Move = 74,
    Wheel = 75,
    Double = 76,
};

export const expect = baseExpect.extend({
    toContainActions(received: DataChannelEvent[], expected: DataChannelEvent[]) {
        const assertionName = 'toContainActions';
        let pass: boolean = false;
        let action_index = 0;
        if (expected.length > 0) {
            for (const event of received) {
                if (dataChannelActionMatches(expected[action_index], event)) {
                    action_index += 1;
                    if (action_index == expected.length) {
                        pass = true;
                        break;
                    }
                }
            }
        }

        const message = () => {
            if (expected.length == 0) {
                return `expected is empty.`;
            }
            if (!pass) {
                return `Could not find action ${action_index} : ${JSON.stringify(expected[action_index])} in ${JSON.stringify(received)}`;
            }
            return '';
        };

        return {
            message,
            pass,
            name: assertionName
        };
    },

    toIncludeMouseClick(received: DataChannelEvent[], expected: number, options?: { x?: number, y?: number, delta_x?: number, delta_y?: number }) {
        const assertionName = 'toIncludeMouseClick';
        let pass: boolean = false;
        console.log(`options.x = ${options.x} options.y = ${options.y}`);

        for (const event of received) {
            if (event.input.type == 72) {
                const mouse_input = event.input.message as DataChannelMouseInput;
                if (mouse_input.button == expected) {
                    if (options) {
                        if (options.x != undefined && mouse_input.x != options.x) { continue; }
                        if (options.y != undefined && mouse_input.y != options.y) { continue; }
                        if (options.delta_x != undefined && mouse_input.delta_x != options.delta_x) { continue; }
                        if (options.delta_y != undefined && mouse_input.delta_y != options.delta_y) { continue; }
                    }
                    pass = true;
                    break;
                }
            }
        }

        return {
            message: () => '',
            pass,
            name: assertionName
        };
    },
});


// export { expect } from '@playwright/test';

