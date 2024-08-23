import { test, expect as baseExpect } from '@playwright/test';
import { getComparator } from 'playwright-core/lib/utils';

export { test } from '@playwright/test';

// Can add custom matchers here.
export const expect = baseExpect.extend({
    // A custom matcher that will compare two given image buffers
    toMatchScreenshot(received: Buffer, expected: Buffer, options?: { ratio?: number }) {
        const assertionName = 'toMatchScreenshot';
        let pass: boolean;
        let message: any;

        const mimeType = 'image/png'; // can determine this later if needed
        const comparator = getComparator(mimeType);
        const testInfo = test.info();

        const result = comparator(received, expected);
        if (result) {
            testInfo.attach('expected', { contentType: mimeType, body: expected });
            testInfo.attach('received', { contentType: mimeType, body: received });
            testInfo.attach('diff', { contentType: mimeType, body: result.diff });
            pass = false;
            message = () => result.errorMessage;
        } else {
            pass = true;
            message = () => 'Images match';
        }

        return {
            message,
            pass,
            name: assertionName
        };
    },

    toNotMatchScreenshot(received: Buffer, reference: Buffer, options?: { ratio?: number }) {
        const assertionName = 'toMatchScreenshot';
        let pass: boolean;
        let message: any;

        const mimeType = 'image/png'; // can determine this later if needed
        const comparator = getComparator(mimeType);
        const testInfo = test.info();

        const result = comparator(received, reference);
        if (result) {
            pass = true;
            message = () => 'Images dont match';
        } else {
            testInfo.attach('reference', { contentType: mimeType, body: reference });
            testInfo.attach('received', { contentType: mimeType, body: received });
            pass = false;
            message = () => 'Images match';
        }

        return {
            message,
            pass,
            name: assertionName
        };
    }
});

