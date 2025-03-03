// Copyright Epic Games, Inc. All Rights Reserved.

import { ITransport } from './ITransport';
import { EventEmitter } from '../Event/EventEmitter';
import WebSocket from 'ws';

/**
 * An implementation of WebSocketTransport from pixelstreamingcommon that supports node.js websockets
 * This is needed because of the slight differences between the 'ws' node.js package and the websockets
 * supported in the browsers.
 * Do not use this code in a browser use 'WebSocketTransport' instead.
 */
export class WebSocketTransportNJS extends EventEmitter implements ITransport {
    WS_OPEN_STATE = 1;
    webSocket?: WebSocket;
    protocols?: string | string[];

    /**
     * Constructs a new instance of a WebSocketTransport for node contexts.
     * @param existingSocket - An existing WebSocket to use.
     */
    constructor(existingSocket: WebSocket);

    /**
     * Constructs a new instance of a WebSocketTransport for node contexts.
     * @param protocols - A protocol or list of protocols to pass to the new websocket.
     */
    constructor(protocols: string | string[]);

    /**
     * Constructs a new instance of a WebSocketTransport for node contexts.
     */
    constructor();

    constructor(argument?: WebSocket | string | string[]) {
        super();
        if (argument instanceof WebSocket) {
            this.webSocket = argument;
            this.setupSocketHandlers();
            this.emit('open');
        } else if (argument) {
            this.protocols = argument;
        }
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
     * @param protocols - An optional string or list of strings to pass to the new websocket protocols param
     * @returns If there is a connection
     */
    connect(connectionURL: string): boolean {
        this.webSocket = new WebSocket(connectionURL, this.protocols);
        this.setupSocketHandlers();
        return true;
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
     * Handles what happens when a message is received
     * @param event - Message Received
     */
    handleOnMessage(event: WebSocket.MessageEvent): void {
        if (this.onMessage) {
            this.onMessage(event.data as string);
        }
    }

    /**
     * Handles when the Websocket is opened
     * @param event - Not Used
     */
    handleOnOpen(event: WebSocket.Event): void {
        this.emit('open', event);
    }

    /**
     * Handles when there is an error on the websocket
     * @param event - Error Payload
     */
    handleOnError(event: WebSocket.ErrorEvent): void {
        this.emit('error', event);
    }

    /**
     * Handles when the Websocket is closed
     * @param event - Close Event
     */
    handleOnClose(event: WebSocket.CloseEvent): void {
        this.emit('close', event);
    }

    /**
     * Closes the Websocket connection
     */
    close(): void {
        this.webSocket?.close();
    }

    private setupSocketHandlers(): void {
        if (this.webSocket) {
            this.webSocket.addEventListener('open', this.handleOnOpen.bind(this));
            this.webSocket.addEventListener('error', this.handleOnError.bind(this));
            this.webSocket.addEventListener('close', this.handleOnClose.bind(this));
            this.webSocket.addEventListener('message', this.handleOnMessage.bind(this));
        }
    }
}
