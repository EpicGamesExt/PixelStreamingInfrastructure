[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../README.md) / [PlayerRegistry](../modules/PlayerRegistry.md) / IPlayer

# Interface: IPlayer

[PlayerRegistry](../modules/PlayerRegistry.md).IPlayer

An interface that describes a player that can be added to the
player registry.

## Hierarchy

- [`IMessageLogger`](LoggingUtils.IMessageLogger.md)

  ↳ **`IPlayer`**

## Implemented by

- [`PlayerConnection`](../classes/PlayerConnection.PlayerConnection.md)
- [`SFUConnection`](../classes/SFUConnection.SFUConnection.md)

## Table of contents

### Properties

- [playerId](PlayerRegistry.IPlayer.md#playerid)
- [protocol](PlayerRegistry.IPlayer.md#protocol)
- [subscribedStreamer](PlayerRegistry.IPlayer.md#subscribedstreamer)

### Methods

- [getPlayerInfo](PlayerRegistry.IPlayer.md#getplayerinfo)
- [getReadableIdentifier](PlayerRegistry.IPlayer.md#getreadableidentifier)
- [sendMessage](PlayerRegistry.IPlayer.md#sendmessage)

## Properties

### playerId

• **playerId**: `string`

#### Defined in

[Signalling/src/PlayerRegistry.ts:11](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L11)

___

### protocol

• **protocol**: `SignallingProtocol`

#### Defined in

[Signalling/src/PlayerRegistry.ts:12](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L12)

___

### subscribedStreamer

• **subscribedStreamer**: ``null`` \| [`IStreamer`](StreamerRegistry.IStreamer.md)

#### Defined in

[Signalling/src/PlayerRegistry.ts:13](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L13)

## Methods

### getPlayerInfo

▸ **getPlayerInfo**(): [`IPlayerInfo`](PlayerRegistry.IPlayerInfo.md)

#### Returns

[`IPlayerInfo`](PlayerRegistry.IPlayerInfo.md)

#### Defined in

[Signalling/src/PlayerRegistry.ts:16](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L16)

___

### getReadableIdentifier

▸ **getReadableIdentifier**(): `string`

#### Returns

`string`

#### Inherited from

[IMessageLogger](LoggingUtils.IMessageLogger.md).[getReadableIdentifier](LoggingUtils.IMessageLogger.md#getreadableidentifier)

#### Defined in

[Signalling/src/LoggingUtils.ts:18](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/LoggingUtils.ts#L18)

___

### sendMessage

▸ **sendMessage**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `BaseMessage` |

#### Returns

`void`

#### Defined in

[Signalling/src/PlayerRegistry.ts:15](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L15)
