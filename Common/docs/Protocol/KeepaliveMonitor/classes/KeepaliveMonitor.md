[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Protocol/KeepaliveMonitor](../README.md) / KeepaliveMonitor

# Class: KeepaliveMonitor

Used to regularly ping a protocol connection to make sure the connection is still good and open.
When the pong doesn't come in response to a ping in time a callback is fired that can be handed
by the owner.

## Constructors

### new KeepaliveMonitor()

> **new KeepaliveMonitor**(`protocol`, `timeout`): [`KeepaliveMonitor`](KeepaliveMonitor.md)

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

#### Defined in

[Protocol/KeepaliveMonitor.ts:38](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Protocol/KeepaliveMonitor.ts#L38)

## Properties

### onTimeout()?

> `optional` **onTimeout**: () => `void`

Called when a pong does not come back from a ping.

#### Returns

`void`

#### Defined in

[Protocol/KeepaliveMonitor.ts:23](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Protocol/KeepaliveMonitor.ts#L23)

## Accessors

### RTT

#### Get Signature

> **get** **RTT**(): `number`

Gets the Round Trip Time of the current connection in milliseconds.

##### Returns

`number`

#### Defined in

[Protocol/KeepaliveMonitor.ts:28](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Protocol/KeepaliveMonitor.ts#L28)
