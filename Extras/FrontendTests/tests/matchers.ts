import { expect as baseExpect } from '@playwright/test';
import { DataChannelEvent } from './extras';

// tests if event 'match' matches 'target'
function dataChannelActionMatches(target: DataChannelEvent, match: DataChannelEvent): boolean {
    if (target.type != match.type) {
        return false;
    }

    for (const [key,value] of Object.entries(target)) {
        if (!match.hasOwnProperty(key)) {
            return false;
        }
        switch (typeof value) {
            case 'function':
                if (!value(match[key])) return false;
                break;
            default:
                if (match[key] != value) return false;
                break;
        }
    }
    return true;
}

export const expect = baseExpect.extend({
    toContainActions(received: DataChannelEvent[], expected: DataChannelEvent[]) {
        const assertionName = 'toContainActions';
        let pass: boolean = false;
        let actionIndex = 0;
        if (received && expected.length > 0) {
            for (const event of received) {
                if (dataChannelActionMatches(expected[actionIndex], event)) {
                    actionIndex += 1;
                    if (actionIndex == expected.length) {
                        pass = true;
                        break;
                    }
                }
            }
        }

        const message = () => {
            if (!received) {
                return `received null`;
            }
            if (expected.length == 0) {
                return `expected is empty.`;
            }
            if (!pass) {
                return `Could not find action ${actionIndex} : ${JSON.stringify(expected[actionIndex])} in received.
                \r\n Expected: ${JSON.stringify(expected)}
                \r\n Received: ${JSON.stringify(received)};`
            }
            return '';
        };

        return {
            message,
            pass,
            name: assertionName
        };
    },
});

