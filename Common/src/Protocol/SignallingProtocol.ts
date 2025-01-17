// Copyright Epic Games, Inc. All Rights Reserved.

import { ITransport } from '../Transport/ITransport';
import { EventEmitter } from '../Event/EventEmitter';
import { BaseMessage } from '../Messages/base_message';
import * as Messages from '../Messages/signalling_messages';
import * as MessageHelpers from '../Messages/message_helpers';

/**
 * Signalling protocol for handling messages from the signalling server.
 *
 * Listen on this emitter for messages. Message type is the name of the event to listen for.
 * Example:
 *      signallingProtocol.on('config', (message: Messages.config) =\> console.log(`Got a config message: ${message}`)));
 *
 * The transport in this class will also emit on message events.
 *
 * Events emitted on transport:
 *   message:
 *      Emitted any time a message is received by the transport. Listen on this if
 *      you wish to capture all messages, rather than specific messages on
 *      'messageHandlers'.
 *
 *   out:
 *      Emitted when sending a message out on the transport. Similar to 'message' but
 *      only for when messages are sent from this endpoint. Useful for debugging.
 *
 *   timeout:
 *      Emitted when a ping fails to receive a pong in time and the connection is
 *      assumed to be dead. This is emitted after the connection is closed.
 */
export class SignallingProtocol extends EventEmitter {
    static get SIGNALLING_VERSION(): string {
        return '1.2.1';
    }

    static readonly PING_TIMEOUT: number = 30 * 1000;

    // The transport in use by this protocol object.
    transport: ITransport;

    private _rtt: number = 0;

    /**
     * Get the current RTT time in milliseconds. Only valid for the connection initiator. ie. the
     * end that called "connect".
     */
    get RTT(): number {
        return this._rtt;
    }

    constructor(transport: ITransport) {
        super();
        this.transport = transport;

        this.initHeartbeat();

        transport.onMessage = (msg: BaseMessage) => {
            // auto handle ping messages
            if (msg.type == Messages.ping.typeName) {
                const pingMsg = msg as Messages.ping;
                this.onHeartbeatPing(pingMsg.time);
                return;
            }
            if (msg.type == Messages.pong.typeName) {
                const pongMsg = msg as Messages.pong;
                this.onHeartbeatPong(pongMsg.time);
                return;
            }

            // call the handlers
            transport.emit('message', msg); // emit this for listeners listening to any message
            if (!this.emit(msg.type, msg)) {
                // emit this for listeners listening for specific messages
                // no listeners
                this.emit('unhandled', msg);
            }
        };
    }

    /**
     * Asks the transport to connect to the given URL.
     * @param url - The url to connect to.
     * @returns True if the connection call succeeded.
     */
    connect(url: string): boolean {
        return this.transport.connect(url);
    }

    /**
     * Asks the transport to disconnect from any connection it might have.
     * @param code - An optional disconnection code.
     * @param reason - An optional descriptive string for the disconnect reason.
     */
    disconnect(code?: number, reason?: string): void {
        this.transport.disconnect(code, reason);
        this.stopHeartbeat();
    }

    /**
     * Returns true if the transport is connected and ready to send/receive messages.
     * @returns True if the protocol is connected.
     */
    isConnected(): boolean {
        return this.transport.isConnected();
    }

    /**
     * Passes a message to the transport to send to the other end.
     * @param msg - The message to send.
     */
    sendMessage(msg: BaseMessage): void {
        this.transport.sendMessage(msg);
        this.transport.emit('out', msg); // emit this for listeners listening to outgoing messages
    }

    private keepalive: number;
    private alive: boolean = false;
    private initiator: boolean = false;

    private initHeartbeat(): void {
        // if we're already connected we should receive heartbeats from the initiator
        // otherwise we're the initiator and should start sending heartbeats
        this.initiator = !this.transport.isConnected();
        if (this.initiator) {
            this.transport.on('open', this.startHeartbeat.bind(this));
        } else {
            this.heartbeatWait();
        }
    }

    private startHeartbeat(): void {
        // initiator only.
        // just sets up an interval to send heartbeats
        this.alive = true;
        this.keepalive = setInterval(this.heartbeatInitiate.bind(this), SignallingProtocol.PING_TIMEOUT);
    }

    private stopHeartbeat(): void {
        // stops either the heartbeat or the waiting for a heartbeat
        if (this.initiator) {
            clearInterval(this.keepalive);
        } else {
            clearTimeout(this.keepalive);
        }
    }

    private heartbeatInitiate(): void {
        // initiator only.
        // if we never got a response from the last heartbeat, assume the connection is dead and timeout
        if (this.alive === false) {
            this.disconnect();
            this.transport.emit('timeout');
            return;
        }

        // mark the connection as temporarily dead until we get a response from the ping
        this.alive = false;
        this.sendMessage(MessageHelpers.createMessage(Messages.ping, { time: new Date().getTime() }));
    }

    private heartbeatWait(): void {
        // non-initiator only.
        // starts a timer to wait for heartbeat pings. we give it double the ping time to allow some lag
        this.keepalive = setTimeout(this.heartbeatTimeout.bind(this), SignallingProtocol.PING_TIMEOUT * 2);
    }

    private heartbeatTimeout(): void {
        // non-initiator only.
        // called when we dont cancel the heartbeat timer because we got a ping. times out the connection.
        this.disconnect();
        this.transport.emit('timeout');
    }

    private onHeartbeatPing(time: number): void {
        // non-initiator only.
        // we got a ping from the initiator so mark the connection as live and clear the timeout timer.
        this.alive = true;
        clearTimeout(this.keepalive);

        // respond with a pong
        const pongMessage = MessageHelpers.createMessage(Messages.pong, { time: time });
        this.transport.sendMessage(pongMessage);

        // start waiting for the next one
        this.heartbeatWait();
    }

    private onHeartbeatPong(time: number): void {
        // initiator only
        // we got a pong response from the other side, the connection is good.
        // we also store the round trip time if anyone is curious
        this._rtt = new Date().getTime() - time;
        this.alive = true;
    }
}
