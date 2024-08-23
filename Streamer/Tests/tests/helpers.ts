import { Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

const __dirname = path.dirname(__filename);
const __resultsDirectory = path.join(__dirname, '../results');
const __screenshotDirectory = path.join(__dirname, '../results/screenshots');

if (!fs.existsSync(__resultsDirectory)) {
 fs.mkdirSync(__resultsDirectory, { recursive: true });
}

if (!fs.existsSync(__screenshotDirectory)) {
 fs.mkdirSync(__screenshotDirectory, { recursive: true });
}

export function getResultsDirectory() {
   return __resultsDirectory;
}

export async function takeScreenshot(page: Page, file_name: string) {
   await page.screenshot({
       path: path.join(__screenshotDirectory, file_name),
       fullPage: false
   });
}

export function delay(time: number) {
  return new Promise(function(resolve) { 
    setTimeout(resolve, time)
  });
}


export async function waitForVideo(page: Page) {
    await page.evaluate(()=> {
        return new Promise((resolve) => {
            pixelStreaming.addEventListener('playStream', (event) => {
                return resolve(event);
            });
        });
    });
}

export async function getStreamStats(page: Page) {
    const stats = await page.evaluate(() => {
        return pixelStreaming._webRtcController.peerConnectionController.aggregatedStats;
    });
    return stats;
}

export async function sendSignallingMessage(page: Page, message: any) {
    await page.evaluate((message)=> {
        pixelStreaming.signallingProtocol.sendMessage(message);
    }, message);
}

