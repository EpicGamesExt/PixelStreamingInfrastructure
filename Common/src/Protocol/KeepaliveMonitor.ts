import * as Messages from '../Messages/signalling_messages';
import * as MessageHelpers from '../Messages/message_helpers';
import { SignallingProtocol } from './SignallingProtocol';

export class KeepaliveMonitor {
    private protocol: SignallingProtocol;
    private timeout: number;
    private keepalive?: ReturnType<typeof setInterval>;
    private alive: boolean = false;
    private rtt: number = 0;

    private onResponse: (pongMsg: Messages.pong) => void;

    get RTT(): number {
        return this.rtt;
    }

    constructor(protocol: SignallingProtocol, timeout: number) {
        this.protocol = protocol;
        this.timeout = timeout;
        this.onResponse = this.onHeartbeatResponse.bind(this);
        this.protocol.transport.on('close', this.stop.bind(this));
        this.start();
    }

    private start(): void {
        this.alive = true;
        this.protocol.on('pong', this.onResponse);
        this.keepalive = setInterval(this.sendHeartbeat.bind(this), this.timeout);
    }

    private stop(): void {
        clearInterval(this.keepalive);
        this.protocol.off('pong', this.onResponse);
    }

    private sendHeartbeat(): void {
        // if we never got a response from the last heartbeat, assume the connection is dead and timeout
        if (this.alive === false) {
            this.protocol.disconnect();
            this.protocol.transport.emit('timeout');
            return;
        }

        // mark the connection as temporarily dead until we get a response from the ping
        this.alive = false;
        this.protocol.sendMessage(
            MessageHelpers.createMessage(Messages.ping, { time: new Date().getTime() })
        );
    }

    private onHeartbeatResponse(pongMsg: Messages.pong): void {
        // we got a pong response from the other side, the connection is good.
        // we also store the round trip time if anyone is curious
        this.rtt = new Date().getTime() - pongMsg.time;
        this.alive = true;
    }
}
