import { test as base, Page } from '@playwright/test';

type PSTestFixtures = {
    streamerPage: Page;
    streamerId: string;
};

export const test = base.extend<PSTestFixtures>({
    streamerPage: async ({ context }, use) => {
        const streamerPage = await context.newPage();
        await streamerPage.goto(`${process.env.PIXELSTREAMER_URL || 'http://localhost:4000'}`);
        await use(streamerPage);
    },
    streamerId: async ({ streamerPage }, use) => {
        const idPromise: Promise<string> = streamerPage.evaluate(()=> {
            return new Promise((resolve) => {
                window.streamer.on('endpoint_id_confirmed', () => {
                    resolve(window.streamer.id);
                });
            })
        });
        await streamerPage.getByText('Start Streaming').click();
        const streamerId: string = await idPromise;
        await use(streamerId);
    },
});

