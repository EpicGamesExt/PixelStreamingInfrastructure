// Copyright Epic Games, Inc. All Rights Reserved.

import { Logger } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.5';

/**
 * Utility function for populate file information from byte buffers.
 */
export class FileUtil {
    /**
     * Processes a files extension when received over data channel
     * @param view - the file extension data
     */
    static setExtensionFromBytes(view: Uint8Array, file: FileTemplate) {
        // Reset file if we got a file message and we are not "receiving" it yet
        if (!file.receiving) {
            file.mimetype = '';
            file.extension = '';
            file.receiving = true;
            file.valid = false;
            file.size = 0;
            file.data = [];
            file.timestampStart = new Date().getTime();
            Logger.Info('Received first chunk of file');
        }

        const extensionAsString = new TextDecoder('utf-16').decode(view.slice(1));
        Logger.Info(extensionAsString);
        file.extension = extensionAsString;
    }

    /**
     * Processes a files mime type when received over data channel
     * @param view - the file mime type data
     */
    static setMimeTypeFromBytes(view: Uint8Array, file: FileTemplate) {
        // Reset file if we got a file message and we are not "receiving" it yet
        if (!file.receiving) {
            file.mimetype = '';
            file.extension = '';
            file.receiving = true;
            file.valid = false;
            file.size = 0;
            file.data = [];
            file.timestampStart = new Date().getTime();
            Logger.Info('Received first chunk of file');
        }

        const mimeAsString = new TextDecoder('utf-16').decode(view.slice(1));
        Logger.Info(mimeAsString);
        file.mimetype = mimeAsString;
    }

    /**
     * Processes a files contents when received over data channel
     * @param view - the file contents data
     */
    static setContentsFromBytes(view: Uint8Array, file: FileTemplate) {
        // If we haven't received the initial setup instructions, return
        if (!file.receiving) return;

        // Extract the total size of the file (across all chunks)
        file.size = Math.ceil(
            new DataView(view.slice(1, 5).buffer).getInt32(0, true) /
                (16 * 1024) /* The maximum number of payload bits per message*/
        );

        // Get the file part of the payload
        const fileBytes = view.slice(1 + 4);

        // Append to existing data that holds the file
        file.data.push(fileBytes);

        // Uncomment for debug
        Logger.Info(`Received file chunk: ${file.data.length}/${file.size}`);

        if (file.data.length === file.size) {
            file.receiving = false;
            file.valid = true;
            Logger.Info('Received complete file');
            const transferDuration = new Date().getTime() - file.timestampStart;
            const transferBitrate = Math.round((file.size * 16 * 1024) / transferDuration);
            Logger.Info(
                `Average transfer bitrate: ${transferBitrate}kb/s over ${transferDuration / 1000} seconds`
            );

            // File reconstruction
            /**
             * Example code to reconstruct the file
             *
             * This code reconstructs the received data into the original file based on the mime type and extension provided and then downloads the reconstructed file
             */
            const received = new Blob(file.data, { type: file.mimetype });
            const a = document.createElement('a');
            a.setAttribute('href', URL.createObjectURL(received));
            a.setAttribute('download', `transfer.${file.extension}`);
            document.body.append(a);
            // if you are so inclined to make it auto-download, do something like: a.click();
            a.remove();
        } else if (file.data.length > file.size) {
            file.receiving = false;
            Logger.Error(`Received bigger file than advertised: ${file.data.length}/${file.size}`);
        }
    }
}

/**
 * A class that represents a template for a downloaded file
 */
export class FileTemplate {
    mimetype = '';
    extension = '';
    receiving = false;
    size = 0;
    data: Array<Uint8Array> = [];
    valid = false;
    timestampStart: number;
}
