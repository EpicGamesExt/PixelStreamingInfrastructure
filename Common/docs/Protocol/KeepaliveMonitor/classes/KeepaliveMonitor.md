[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Protocol/KeepaliveMonitor](../README.md) / KeepaliveMonitor

# Class: KeepaliveMonitor

Defined in: [Protocol/KeepaliveMonitor.ts:10](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/KeepaliveMonitor.ts#L10)

Used to regularly ping a protocol connection to make sure the connection is still good and open.
When the pong doesn't come in response to a ping in time a callback is fired that can be handed
by the owner.

## Constructors

### new KeepaliveMonitor()

> **new KeepaliveMonitor**(`protocol`, `timeout`): [`KeepaliveMonitor`](KeepaliveMonitor.md)

Defined in: [Protocol/KeepaliveMonitor.ts:38](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/KeepaliveMonitor.ts#L38)

Creates a new monitor and starts the ping timer. If a pong does not come back by the time we want
to send a second ping then the connection is considered dead and the onTimeout callback is fired.

#### Parameters

##### protocol

[`SignallingProtocol`](../../SignallingProtocol/classes/SignallingProtocol.md)

The connection that we want to monitor.

##### timeout

`number`

The time in milliseconds between ping messages.

#### Returns

[`KeepaliveMonitor`](KeepaliveMonitor.md)

## Properties

### onTimeout()?

> `optional` **onTimeout**: () => `void`

Defined in: [Protocol/KeepaliveMonitor.ts:23](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/KeepaliveMonitor.ts#L23)

Called when a pong does not come back from a ping.

#### Returns

`void`

## Accessors

### RTT

#### Get Signature

> **get** **RTT**(): `number`

Defined in: [Protocol/KeepaliveMonitor.ts:28](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/KeepaliveMonitor.ts#L28)

Gets the Round Trip Time of the current connection in milliseconds.

##### Returns

`number`
