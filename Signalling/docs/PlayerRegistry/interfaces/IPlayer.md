[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [PlayerRegistry](../README.md) / IPlayer

# Interface: IPlayer

Defined in: [Signalling/src/PlayerRegistry.ts:10](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L10)

An interface that describes a player that can be added to the
player registry.

## Extends

- [`IMessageLogger`](../../LoggingUtils/interfaces/IMessageLogger.md)

## Properties

### playerId

> **playerId**: `string`

Defined in: [Signalling/src/PlayerRegistry.ts:11](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L11)

***

### protocol

> **protocol**: `SignallingProtocol`

Defined in: [Signalling/src/PlayerRegistry.ts:12](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L12)

***

### subscribedStreamer

> **subscribedStreamer**: `null` \| [`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md)

Defined in: [Signalling/src/PlayerRegistry.ts:13](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L13)

## Methods

### getPlayerInfo()

> **getPlayerInfo**(): [`IPlayerInfo`](IPlayerInfo.md)

Defined in: [Signalling/src/PlayerRegistry.ts:16](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L16)

#### Returns

[`IPlayerInfo`](IPlayerInfo.md)

***

### getReadableIdentifier()

> **getReadableIdentifier**(): `string`

Defined in: [Signalling/src/LoggingUtils.ts:18](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/LoggingUtils.ts#L18)

#### Returns

`string`

#### Inherited from

[`IMessageLogger`](../../LoggingUtils/interfaces/IMessageLogger.md).[`getReadableIdentifier`](../../LoggingUtils/interfaces/IMessageLogger.md#getreadableidentifier)

***

### sendMessage()

> **sendMessage**(`message`): `void`

Defined in: [Signalling/src/PlayerRegistry.ts:15](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L15)

#### Parameters

##### message

`BaseMessage`

#### Returns

`void`
