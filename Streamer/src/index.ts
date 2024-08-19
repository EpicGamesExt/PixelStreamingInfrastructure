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
        else {
            return null;
        }
    }
}


declare global {
    interface Window { startStreaming(): void; }
}

let streamer = null;

document.body.onload = function() {
    window.startStreaming = function() {
        const playback_element = document.getElementById("source_video") as HTMLCaptureableMediaElement;
        const stream = maybeCaptureStream(playback_element);
        if (stream) {
            streamer = new Streamer('MockStreamer');
            streamer.transport.on('close', () => {
                if (playback_element) {
                    playback_element.pause();
                }
            });
            streamer.onEndpointConfirmed = function() {
                playback_element.play();
            }
            streamer.startStreaming(`ws://${window.location.hostname}:8888`, stream);
        }
    }
}

