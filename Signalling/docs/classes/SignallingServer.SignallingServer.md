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

[SignallingServer.ts:90](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/e96d9c6/Signalling/src/SignallingServer.ts#L90)

## Properties

### config

• **config**: [`IServerConfig`](../interfaces/SignallingServer.IServerConfig.md)

#### Defined in

[SignallingServer.ts:79](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/e96d9c6/Signalling/src/SignallingServer.ts#L79)

___

### playerRegistry

• **playerRegistry**: [`PlayerRegistry`](PlayerRegistry.PlayerRegistry.md)

#### Defined in

[SignallingServer.ts:82](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/e96d9c6/Signalling/src/SignallingServer.ts#L82)

___

### protocolConfig

• **protocolConfig**: `ProtocolConfig`

#### Defined in

[SignallingServer.ts:80](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/e96d9c6/Signalling/src/SignallingServer.ts#L80)

___

### startTime

• **startTime**: `Date`

#### Defined in

[SignallingServer.ts:83](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/e96d9c6/Signalling/src/SignallingServer.ts#L83)

___

### streamerRegistry

• **streamerRegistry**: [`StreamerRegistry`](StreamerRegistry.StreamerRegistry.md)

#### Defined in

[SignallingServer.ts:81](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/e96d9c6/Signalling/src/SignallingServer.ts#L81)
