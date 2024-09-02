import { Page } from 'playwright';
import { Streamer, DataProtocol } from '@epicgames-ps/js-streamer';
import { PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.5';

declare global {
    interface Window {
        pixelStreaming: PixelStreaming;
        streamer: Streamer;
        data_messages: Record<string,DataChannelEvent[]>;
        data_message_listener(player_id: number, message: any): void;
    }
}

export enum PSEventTypes {
    MouseDown = DataProtocol.ToStreamer.MouseDown.id,
    MouseUp = DataProtocol.ToStreamer.MouseUp.id,
    MouseMove = DataProtocol.ToStreamer.MouseMove.id,
    MouseWheel = DataProtocol.ToStreamer.MouseWheel.id,
    MouseDouble = DataProtocol.ToStreamer.MouseDouble.id,
    MouseEnter = DataProtocol.ToStreamer.MouseEnter.id,
    MouseLeave = DataProtocol.ToStreamer.MouseLeave.id,
    KeyDown = DataProtocol.ToStreamer.KeyDown.id,
    KeyUp = DataProtocol.ToStreamer.KeyUp.id,
    KeyPress = DataProtocol.ToStreamer.KeyPress.id,
    Command = DataProtocol.ToStreamer.Command.id,
};

// mouse input events captured by the streamer
export interface DataChannelMouseInput {
    type: number;
    button?: number;
    x?: number;
    y?: number;
    delta_x?: number;
    delta_y?: number;
};

// keyboard input events captured by the streamer
export interface DataChannelKeyboardInput {
    type: number;
    key_code: number;
};

export interface DataChannelCommandInput {
    type: number;
    command: string;
};

// a generic type for inputs captured by the streamer
export type DataChannelEvent = DataChannelMouseInput | DataChannelKeyboardInput | DataChannelCommandInput;

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

