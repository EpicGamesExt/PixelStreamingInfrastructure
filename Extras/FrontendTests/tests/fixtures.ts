import { test as base, Page } from '@playwright/test';

type PSTestFixtures = {
    streamerPage: Page;
    streamerId: string;
    localDescription: RTCSessionDescriptionInit;
};

export const test = base.extend<PSTestFixtures>({
    streamerPage: async ({ context }, use) => {
        const streamerPage = await context.newPage();
        await streamerPage.goto(`${process.env.PIXELSTREAMER_URL || 'http://localhost:4000'}` + `${process.env.STREAMER_SIGNALLING_URL !== undefined ? '?SignallingURL=' + process.env.STREAMER_SIGNALLING_URL : ""}`);
        await use(streamerPage);
    },
    streamerId: async ({ streamerPage }, use) => {

        const idPromise: Promise<string> = new Promise(async (resolve)=> {

            // Expose the resolve function to the browser context
            await streamerPage.exposeFunction('resolveFromIdPromise', resolve);

            // Note: If page.evaluate is passed a promise it will try to await it immediately
            // to avoid this hanging here waiting for endpoint_id_confirmed we instead
            // wrap the page.evaluate in a promise and expose the resolve argument/function into the streamer page
            // to be called when the endpoint_id_confirmed is actually called.
            streamerPage.evaluate(()=> {
                window.streamer.on('endpoint_id_confirmed', () => {
                    window.resolveFromIdPromise(window.streamer.id);
                });
            });
        });

        await streamerPage.getByText('Start Streaming').click();
        const streamerId: string = await idPromise;
        await use(streamerId);
    }
});


// Ensure tests run in serial as we don't want a clash with multiple peers putting things in different states
test.describe.configure({ mode: 'serial' });