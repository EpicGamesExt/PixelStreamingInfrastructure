import { Streamer } from './streamer';

// TS doesn't like the captureStream method. FF also names it differently
interface HTMLCaptureableMediaElement extends HTMLMediaElement {
    captureStream?(): MediaStream;
    mozCaptureStream?(): MediaStream;
}

// helper just to wrap the naming of captureStream
function maybeCaptureStream(element: HTMLCaptureableMediaElement): MediaStream | null {
    if (element) {
        if (element.captureStream) {
            return element.captureStream();
        } else if (element.mozCaptureStream) {
            return element.mozCaptureStream();
        }
    }
    return null;
}

declare global {
    interface Window {
        startStreaming(): void;
        streamer?: Streamer;
    }
}

document.body.onload = function () {
    window.streamer = new Streamer('MockStreamer');
    window.startStreaming = function () {
        const playbackElement = document.getElementById('source_video') as HTMLCaptureableMediaElement;
        const stream = maybeCaptureStream(playbackElement);
        if (stream && window.streamer) {
            window.streamer.on('data_channel_message', (playerId: string, message: object) => {
                console.log(`Data channel msg: (${playerId}) => ${JSON.stringify(message)}`);
            });
            window.streamer.transport.on('close', () => {
                if (playbackElement) {
                    playbackElement.pause();
                }
            });
            window.streamer.on('endpoint_id_confirmed', () => {
                playbackElement.play().catch(() => {});
            });
            let signallingURL = `ws://${window.location.hostname}:8888`;
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.has('SignallingURL')) {
                signallingURL = urlParams.get('SignallingURL')!;
            }
            window.streamer.startStreaming(signallingURL, stream);
        }
    };
};
