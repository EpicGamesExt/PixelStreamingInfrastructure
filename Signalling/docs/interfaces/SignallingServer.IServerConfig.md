[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../README.md) / [SignallingServer](../modules/SignallingServer.md) / IServerConfig

# Interface: IServerConfig

[SignallingServer](../modules/SignallingServer.md).IServerConfig

An interface describing the possible options to pass when creating
a new SignallingServer object.

## Table of contents

### Properties

- [httpServer](SignallingServer.IServerConfig.md#httpserver)
- [httpsServer](SignallingServer.IServerConfig.md#httpsserver)
- [maxSubscribers](SignallingServer.IServerConfig.md#maxsubscribers)
- [peerOptions](SignallingServer.IServerConfig.md#peeroptions)
- [playerPort](SignallingServer.IServerConfig.md#playerport)
- [playerWsOptions](SignallingServer.IServerConfig.md#playerwsoptions)
- [sfuPort](SignallingServer.IServerConfig.md#sfuport)
- [sfuWsOptions](SignallingServer.IServerConfig.md#sfuwsoptions)
- [streamerPort](SignallingServer.IServerConfig.md#streamerport)
- [streamerWsOptions](SignallingServer.IServerConfig.md#streamerwsoptions)

## Properties

### httpServer

• `Optional` **httpServer**: `Server`\<typeof `IncomingMessage`, typeof `ServerResponse`\>

#### Defined in

[Signalling/src/SignallingServer.ts:19](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L19)

___

### httpsServer

• `Optional` **httpsServer**: `Server`\<typeof `IncomingMessage`, typeof `ServerResponse`\>

#### Defined in

[Signalling/src/SignallingServer.ts:22](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L22)

___

### maxSubscribers

• `Optional` **maxSubscribers**: `number`

#### Defined in

[Signalling/src/SignallingServer.ts:46](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L46)

___

### peerOptions

• **peerOptions**: `unknown`

#### Defined in

[Signalling/src/SignallingServer.ts:34](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L34)

___

### playerPort

• `Optional` **playerPort**: `number`

#### Defined in

[Signalling/src/SignallingServer.ts:28](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L28)

___

### playerWsOptions

• `Optional` **playerWsOptions**: `ServerOptions`\<typeof `WebSocket`, typeof `IncomingMessage`\>

#### Defined in

[Signalling/src/SignallingServer.ts:40](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L40)

___

### sfuPort

• `Optional` **sfuPort**: `number`

#### Defined in

[Signalling/src/SignallingServer.ts:31](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L31)

___

### sfuWsOptions

• `Optional` **sfuWsOptions**: `ServerOptions`\<typeof `WebSocket`, typeof `IncomingMessage`\>

#### Defined in

[Signalling/src/SignallingServer.ts:43](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L43)

___

### streamerPort

• **streamerPort**: `number`

#### Defined in

[Signalling/src/SignallingServer.ts:25](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L25)

___

### streamerWsOptions

• `Optional` **streamerWsOptions**: `ServerOptions`\<typeof `WebSocket`, typeof `IncomingMessage`\>

#### Defined in

[Signalling/src/SignallingServer.ts:37](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SignallingServer.ts#L37)
