[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../README.md) / [SignallingServer](../modules/SignallingServer.md) / SignallingServer

# Class: SignallingServer

[SignallingServer](../modules/SignallingServer.md).SignallingServer

The main signalling server object.
Contains a streamer and player registry and handles setting up of websockets
to listen for incoming connections.

## Table of contents

### Constructors

- [constructor](SignallingServer.SignallingServer.md#constructor)

### Properties

- [config](SignallingServer.SignallingServer.md#config)
- [playerRegistry](SignallingServer.SignallingServer.md#playerregistry)
- [protocolConfig](SignallingServer.SignallingServer.md#protocolconfig)
- [startTime](SignallingServer.SignallingServer.md#starttime)
- [streamerRegistry](SignallingServer.SignallingServer.md#streamerregistry)

## Constructors

### constructor

• **new SignallingServer**(`config`): [`SignallingServer`](SignallingServer.SignallingServer.md)

Initializes the server object and sets up listening sockets for streamers
players and optionally SFU connections.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`IServerConfig`](../interfaces/SignallingServer.IServerConfig.md) | A collection of options for this server. |

#### Returns

[`SignallingServer`](SignallingServer.SignallingServer.md)

#### Defined in

[Signalling/src/SignallingServer.ts:70](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L70)

## Properties

### config

• **config**: [`IServerConfig`](../interfaces/SignallingServer.IServerConfig.md)

#### Defined in

[Signalling/src/SignallingServer.ts:59](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L59)

___

### playerRegistry

• **playerRegistry**: [`PlayerRegistry`](PlayerRegistry.PlayerRegistry.md)

#### Defined in

[Signalling/src/SignallingServer.ts:62](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L62)

___

### protocolConfig

• **protocolConfig**: [`ProtocolConfig`](../modules/SignallingServer.md#protocolconfig)

#### Defined in

[Signalling/src/SignallingServer.ts:60](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L60)

___

### startTime

• **startTime**: `Date`

#### Defined in

[Signalling/src/SignallingServer.ts:63](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L63)

___

### streamerRegistry

• **streamerRegistry**: [`StreamerRegistry`](StreamerRegistry.StreamerRegistry.md)

#### Defined in

[Signalling/src/SignallingServer.ts:61](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L61)
