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

