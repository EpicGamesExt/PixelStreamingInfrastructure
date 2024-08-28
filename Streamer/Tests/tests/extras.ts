import { Page } from 'playwright';
import { Streamer } from '../../src/streamer';
import { DataProtocol } from '../../src/protocol';
import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5';

declare global {
    interface Window {
        pixelStreaming: PixelStreaming;
        streamer: Streamer;
        data_messages: Record<string,DataChannelEvent[]>;
        data_message_listener(player_id: number, message: any): void;
    }
}

export enum PSMouseEventTypes {
    Down = DataProtocol.ToStreamer.MouseDown.id,
    Up = DataProtocol.ToStreamer.MouseUp.id,
    Move = DataProtocol.ToStreamer.MouseMove.id,
    Wheel = DataProtocol.ToStreamer.MouseWheel.id,
    Double = DataProtocol.ToStreamer.MouseDouble.id,
};

// mouse input events captured by the streamer
export interface DataChannelMouseInput {
    type: number;
    button: number;
    x: number;
    y: number;
    delta_x?: number;
    delta_y?: number;
};

// keyboard input events captured by the streamer
export interface DataChannelKeyboardInput {
    type: number;
};

// a generic type for inputs captured by the streamer
export type DataChannelEvent = DataChannelMouseInput | DataChannelKeyboardInput;

// sets up the streamer page to capture data channel messages
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

// turns off the data channel capturing on the streamer page
export function teardownEventCapture(streamerPage: Page) {
    return streamerPage.evaluate(() => {
        window.streamer.off('data_channel_message', window.data_message_listener);
    });
}

// gets all the captured data channel messages between setup/teardownEventCapture
export function getCapturedEvents(streamerPage: Page): Promise<Record<string, DataChannelEvent[]>> {
    return streamerPage.evaluate(() => {
        return window.data_messages;
    });
}

export async function getEventsFor(streamerPage: Page, perform_action: () => Promise<void>): Promise<Record<string, DataChannelEvent[]>> {
    await setupEventCapture(streamerPage);
    await perform_action();
    await teardownEventCapture(streamerPage);
    return await getCapturedEvents(streamerPage);
}

