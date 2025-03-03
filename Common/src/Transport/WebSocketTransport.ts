// Copyright Epic Games, Inc. All Rights Reserved.

import { Logger } from '../Logger/Logger';
import { ITransport } from './ITransport';
import { EventEmitter } from '../Event/EventEmitter';

// declare the new method for the websocket interface
declare global {
    interface WebSocket {
        onmessagebinary?(event?: MessageEvent): void;
    }
}

/**
 * The controller for the WebSocket and all associated methods
 */
export class WebSocketTransport extends EventEmitter implements ITransport {
    WS_OPEN_STATE = 1;
    webSocket?: WebSocket;
    protocols?: string | string[];

    /**
     * Constructs a new WebSocketTransport for browser contexts.
     * @param protocols - An optional string or list of strings to pass to the new websocket protocols param
     */
    constructor(protocols?: string | string[]) {
        super();
        this.protocols = protocols;
    }

    /**
     * Sends a message over the websocket.
     * @param msg - The message to send.
     */
    sendMessage(msg: string): void {
        if (this.webSocket) {
            this.webSocket.send(msg);
        }
    }

    // A handler for when messages are received.
    onMessage?: (msg: string) => void;

    /**
     * Connect to the signaling server
     * @param connectionURL - The Address of the signaling server
     * @returns If there is a connection
     */
    connect(connectionURL: string): boolean {
        Logger.Info(connectionURL);
        try {
            this.webSocket = new WebSocket(connectionURL, this.protocols);
            this.webSocket.onopen = (_: Event) => this.handleOnOpen();
            this.webSocket.onerror = (_: Event) => this.handleOnError();
            this.webSocket.onclose = (event: CloseEvent) => this.handleOnClose(event);
            this.webSocket.onmessage = (event: MessageEvent) => this.handleOnMessage(event);
            this.webSocket.onmessagebinary = (event: MessageEvent<Blob>) => this.handleOnMessageBinary(event);
            return true;
        } catch (error) {
            Logger.Error(error as string);
            return false;
        }
    }

    /**
     * Disconnect this transport.
     * @param code - An optional disconnect code.
     * @param reason - A descriptive string for the disconnect reason.
     */
    disconnect(code?: number, reason?: string): void {
        if (this.webSocket) {
            this.webSocket.close(code, reason);
        }
    }

    /**
     * Should return true when the transport is connected and ready to send/receive messages.
     * @returns True if the transport is connected.
     */
    isConnected(): boolean {
        return !!this.webSocket && this.webSocket.readyState != WebSocket.CLOSED;
    }

    /**
     * Handles what happens when a message is received in binary form
     * @param event - Message Received
     */
    handleOnMessageBinary(event: MessageEvent<Blob>): void {
        // if the event is empty return
        if (!event || !event.data) {
            return;
        }

        // handle the binary and then handle the message
        event.data
            .text()
            .then((messageString: unknown) => {
                // build a new message
                const constructedMessage = new MessageEvent('messageFromBinary', {
                    data: messageString
                });

                // send the new stringified event back into `onmessage`
                this.handleOnMessage(constructedMessage);
            })
            .catch((error: Error) => {
                Logger.Error(`Failed to parse binary blob from websocket, reason: ${error.message}`);
            });
    }

    /**
     * Handles what happens when a message is received
     * @param event - Message Received
     */
    handleOnMessage(event: MessageEvent): void {
        // Check if websocket message is binary, if so, stringify it.
        if (event.data && event.data instanceof Blob) {
            this.handleOnMessageBinary(event as MessageEvent<Blob>);
            return;
        }

        if (this.onMessage) {
            this.onMessage(event.data as string);
        }
    }

    /**
     * Handles when the Websocket is opened
     */
    handleOnOpen(): void {
        Logger.Info('Connected to the signalling server via WebSocket');
        this.emit('open');
    }

    /**
     * Handles when there is an error on the websocket
     */
    handleOnError(): void {
        //Logger.Error(Logger.GetStackTrace(), 'WebSocket error');
        this.emit('error');
    }

    /**
     * Handles when the Websocket is closed
     * @param event - Close Event
     */
    handleOnClose(event: CloseEvent): void {
        Logger.Info(
            'Disconnected to the signalling server via WebSocket: ' +
                JSON.stringify(event.code) +
                ' - ' +
                event.reason
        );
        this.emit('close', event);
    }
}
