[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [SignallingServer](../README.md) / SignallingServer

# Class: SignallingServer

Defined in: [Signalling/src/SignallingServer.ts:58](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L58)

The main signalling server object.
Contains a streamer and player registry and handles setting up of websockets
to listen for incoming connections.

## Constructors

### new SignallingServer()

> **new SignallingServer**(`config`): [`SignallingServer`](SignallingServer.md)

Defined in: [Signalling/src/SignallingServer.ts:70](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L70)

Initializes the server object and sets up listening sockets for streamers
players and optionally SFU connections.

#### Parameters

##### config

[`IServerConfig`](../interfaces/IServerConfig.md)

A collection of options for this server.

#### Returns

[`SignallingServer`](SignallingServer.md)

## Properties

### config

> **config**: [`IServerConfig`](../interfaces/IServerConfig.md)

Defined in: [Signalling/src/SignallingServer.ts:59](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L59)

***

### playerRegistry

> **playerRegistry**: [`PlayerRegistry`](../../PlayerRegistry/classes/PlayerRegistry.md)

Defined in: [Signalling/src/SignallingServer.ts:62](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L62)

***

### protocolConfig

> **protocolConfig**: [`ProtocolConfig`](../type-aliases/ProtocolConfig.md)

Defined in: [Signalling/src/SignallingServer.ts:60](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L60)

***

### startTime

> **startTime**: `Date`

Defined in: [Signalling/src/SignallingServer.ts:63](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L63)

***

### streamerRegistry

> **streamerRegistry**: [`StreamerRegistry`](../../StreamerRegistry/classes/StreamerRegistry.md)

Defined in: [Signalling/src/SignallingServer.ts:61](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SignallingServer.ts#L61)
