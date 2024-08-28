import { expect as baseExpect } from '@playwright/test';
import { DataChannelEvent, DataChannelMouseInput } from './extras';

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

        for (const event of received) {
            if (event.type == 72) {
                const mouse_input = event as DataChannelMouseInput;
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

