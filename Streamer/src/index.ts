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
    interface Window {
        startStreaming(): void;
        streamer?: Streamer;
    }
}

document.body.onload = function() {
    window.streamer = new Streamer('MockStreamer');
    window.startStreaming = function() {
        const playback_element = document.getElementById("source_video") as HTMLCaptureableMediaElement;
        const stream = maybeCaptureStream(playback_element);
        if (stream) {
            window.streamer.on('data_channel_message', (player_id: string, message: object) => {
                console.log(`Data channel msg: (${player_id}) => ${JSON.stringify(message)}`);
            });
            window.streamer.transport.on('close', () => {
                if (playback_element) {
                    playback_element.pause();
                }
            });
            window.streamer.on('endpoint_id_confirmed', () => {
                playback_element.play();
            });
            window.streamer.startStreaming(`ws://${window.location.hostname}:8888`, stream);
        }
    }
}

