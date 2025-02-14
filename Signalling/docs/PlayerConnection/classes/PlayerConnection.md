[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [PlayerConnection](../README.md) / PlayerConnection

# Class: PlayerConnection

Defined in: [Signalling/src/PlayerConnection.ts:27](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerConnection.ts#L27)

A connection between the signalling server and a player connection.
This is where messages expected to be handled by the player come in
and where messages are sent to the player.

Interesting internals:
playerId: The unique id string of this player.
transport: The ITransport where transport events can be subscribed to
protocol: The SignallingProtocol where signalling messages can be
subscribed to.

## Implements

- [`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md)
- [`IMessageLogger`](../../LoggingUtils/interfaces/IMessageLogger.md)

## Constructors

### new PlayerConnection()

> **new PlayerConnection**(`server`, `ws`, `remoteAddress`?): [`PlayerConnection`](PlayerConnection.md)

Defined in: [Signalling/src/PlayerConnection.ts:50](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerConnection.ts#L50)

Initializes a new connection with given and sane values. Adds listeners for the
websocket close and error so it can react by unsubscribing and resetting itself.

#### Parameters

##### server

[`SignallingServer`](../../SignallingServer/classes/SignallingServer.md)

The signalling server object that spawned this player.

##### ws

`WebSocket`

The websocket coupled to this player connection.

##### remoteAddress?

`string`

The remote address of this connection. Only used as display.

#### Returns

[`PlayerConnection`](PlayerConnection.md)

## Properties

### playerId

> **playerId**: `string`

Defined in: [Signalling/src/PlayerConnection.ts:29](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerConnection.ts#L29)

#### Implementation of

[`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md).[`playerId`](../../PlayerRegistry/interfaces/IPlayer.md#playerid)

***

### protocol

> **protocol**: `SignallingProtocol`

Defined in: [Signalling/src/PlayerConnection.ts:33](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerConnection.ts#L33)

#### Implementation of

[`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md).[`protocol`](../../PlayerRegistry/interfaces/IPlayer.md#protocol)

***

### remoteAddress?

> `optional` **remoteAddress**: `string`

Defined in: [Signalling/src/PlayerConnection.ts:37](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerConnection.ts#L37)

***

### subscribedStreamer

> **subscribedStreamer**: `null` \| [`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md)

Defined in: [Signalling/src/PlayerConnection.ts:35](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerConnection.ts#L35)

#### Implementation of

[`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md).[`subscribedStreamer`](../../PlayerRegistry/interfaces/IPlayer.md#subscribedstreamer)

***

### transport

> **transport**: `ITransport`

Defined in: [Signalling/src/PlayerConnection.ts:31](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerConnection.ts#L31)

## Methods

### getPlayerInfo()

> **getPlayerInfo**(): [`IPlayerInfo`](../../PlayerRegistry/interfaces/IPlayerInfo.md)

Defined in: [Signalling/src/PlayerConnection.ts:88](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerConnection.ts#L88)

Returns a descriptive object for the REST API inspection operations.

#### Returns

[`IPlayerInfo`](../../PlayerRegistry/interfaces/IPlayerInfo.md)

An IPlayerInfo object containing viewable information about this connection.

#### Implementation of

[`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md).[`getPlayerInfo`](../../PlayerRegistry/interfaces/IPlayer.md#getplayerinfo)

***

### getReadableIdentifier()

> **getReadableIdentifier**(): `string`

Defined in: [Signalling/src/PlayerConnection.ts:71](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerConnection.ts#L71)

Returns an identifier that is displayed in logs.

#### Returns

`string`

A string describing this connection.

#### Implementation of

[`IMessageLogger`](../../LoggingUtils/interfaces/IMessageLogger.md).[`getReadableIdentifier`](../../LoggingUtils/interfaces/IMessageLogger.md#getreadableidentifier)

***

### sendMessage()

> **sendMessage**(`message`): `void`

Defined in: [Signalling/src/PlayerConnection.ts:79](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerConnection.ts#L79)

Sends a signalling message to the player.

#### Parameters

##### message

`BaseMessage`

The message to send.

#### Returns

`void`

#### Implementation of

[`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md).[`sendMessage`](../../PlayerRegistry/interfaces/IPlayer.md#sendmessage)
