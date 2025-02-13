[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [SignallingServer](../README.md) / IServerConfig

# Interface: IServerConfig

Defined in: [Signalling/src/SignallingServer.ts:17](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L17)

An interface describing the possible options to pass when creating
a new SignallingServer object.

## Properties

### httpServer?

> `optional` **httpServer**: `Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\>

Defined in: [Signalling/src/SignallingServer.ts:19](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L19)

***

### httpsServer?

> `optional` **httpsServer**: `Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\>

Defined in: [Signalling/src/SignallingServer.ts:22](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L22)

***

### maxSubscribers?

> `optional` **maxSubscribers**: `number`

Defined in: [Signalling/src/SignallingServer.ts:46](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L46)

***

### peerOptions

> **peerOptions**: `unknown`

Defined in: [Signalling/src/SignallingServer.ts:34](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L34)

***

### playerPort?

> `optional` **playerPort**: `number`

Defined in: [Signalling/src/SignallingServer.ts:28](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L28)

***

### playerWsOptions?

> `optional` **playerWsOptions**: `ServerOptions`\<*typeof* `WebSocket`, *typeof* `IncomingMessage`\>

Defined in: [Signalling/src/SignallingServer.ts:40](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L40)

***

### sfuPort?

> `optional` **sfuPort**: `number`

Defined in: [Signalling/src/SignallingServer.ts:31](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L31)

***

### sfuWsOptions?

> `optional` **sfuWsOptions**: `ServerOptions`\<*typeof* `WebSocket`, *typeof* `IncomingMessage`\>

Defined in: [Signalling/src/SignallingServer.ts:43](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L43)

***

### streamerPort

> **streamerPort**: `number`

Defined in: [Signalling/src/SignallingServer.ts:25](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L25)

***

### streamerWsOptions?

> `optional` **streamerWsOptions**: `ServerOptions`\<*typeof* `WebSocket`, *typeof* `IncomingMessage`\>

Defined in: [Signalling/src/SignallingServer.ts:37](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L37)
