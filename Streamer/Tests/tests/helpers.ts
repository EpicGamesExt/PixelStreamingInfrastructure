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
            window.pixelStreaming.addEventListener('playStream', (event) => {
                return resolve(event);
            });
        });
    });
}

export async function getStreamStats(page: Page) {
    const stats = await page.evaluate(() => {
        return window.pixelStreaming.webRtcController.peerConnectionController.aggregatedStats;
    });
    return stats;
}

export async function sendSignallingMessage(page: Page, message: any) {
    await page.evaluate((message)=> {
        window.pixelStreaming.signallingProtocol.sendMessage(message);
    }, message);
}

export function attachToConsoleEvents(page: Page, callback: (...args: any[]) => void) {
    page.on('console', async msg => {
        const values: any[] = [];
        for (const arg of msg.args())
            values.push(await arg.jsonValue());
        callback(...values);
    });
}

export interface BoxSize {
    width: number;
    height: number;
};

export interface Coord {
    x: number;
    y: number;
};

export class CoordConverter {
    player_size: BoxSize;
    video_size: BoxSize;
    ratio: number;
    player_is_larger: boolean;

    constructor(player_size: BoxSize, video_size: BoxSize) {
        this.player_size = player_size;
        this.video_size = video_size;
        const player_aspect_ratio = this.player_size.height / this.player_size.width;
        const video_aspect_ratio = this.video_size.height / this.video_size.width;
        this.player_is_larger = player_aspect_ratio > video_aspect_ratio;
        if (this.player_is_larger) {
            this.ratio = player_aspect_ratio / video_aspect_ratio;
        } else {
            this.ratio = video_aspect_ratio / player_aspect_ratio;
        }
    }

    public toVideoCoords(x: number, y: number): Coord {
        if (this.player_is_larger) {
            const normalizedX = x / (0.5 * this.player_size.width);
            const normalizedY = (this.ratio * y) / (0.5 * this.player_size.height);
            return {
                x: Math.trunc(normalizedX * 32767),
                y: Math.trunc(normalizedY * 32767)
            };
        } else {
            const normalizedX = (this.ratio * x) / (0.5 * this.player_size.width);
            const normalizedY = y / (0.5 * this.player_size.height);
            return {
                x: Math.trunc(normalizedX * 32767),
                y: Math.trunc(normalizedY * 32767)
            };
        }
    }
};

