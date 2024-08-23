import { FullConfig, firefox, Page } from '@playwright/test';
import * as helpers from './helpers';

async function globalSetup(config: FullConfig) {
    console.log('Global setup...');

    const browser = await firefox.launch();
    if (browser) {
        const page = await browser.newPage();
        await page.goto('http://localhost:4000');
        await page.getByText('Start Streaming').click();
        await helpers.delay(2000);
    }
}

export default globalSetup;

