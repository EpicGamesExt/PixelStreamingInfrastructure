[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [SFUConnection](../README.md) / SFUConnection

# Class: SFUConnection

Defined in: [Signalling/src/SFUConnection.ts:32](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L32)

A SFU connection to the signalling server.
An SFU can act as both a streamer and a player. It can subscribe to
streamers like a player, and other players can subscribe to the sfu.
Therefore the SFU will have a streamer id and a player id and be
registered in both streamer registries and player registries.

Interesting internals:
playerId: The player id of this connectiom.
streamerId: The streamer id of this connection.
transport: The ITransport where transport events can be subscribed to
protocol: The SignallingProtocol where signalling messages can be
subscribed to.
streaming: True when the streamer is ready to accept subscriptions.

## Extends

- `EventEmitter`

## Implements

- [`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md)
- [`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md)
- [`IMessageLogger`](../../LoggingUtils/interfaces/IMessageLogger.md)

## Constructors

### new SFUConnection()

> **new SFUConnection**(`server`, `ws`, `remoteAddress`?): [`SFUConnection`](SFUConnection.md)

Defined in: [Signalling/src/SFUConnection.ts:63](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L63)

Construct a new SFU connection.

#### Parameters

##### server

[`SignallingServer`](../../SignallingServer/classes/SignallingServer.md)

The signalling server object that spawned this sfu.

##### ws

`WebSocket`

The websocket coupled to this sfu connection.

##### remoteAddress?

`string`

The remote address of this connection. Only used as display.

#### Returns

[`SFUConnection`](SFUConnection.md)

#### Overrides

`EventEmitter.constructor`

## Properties

### maxSubscribers

> **maxSubscribers**: `number`

Defined in: [Signalling/src/SFUConnection.ts:48](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L48)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`maxSubscribers`](../../StreamerRegistry/interfaces/IStreamer.md#maxsubscribers)

***

### playerId

> **playerId**: `string`

Defined in: [Signalling/src/SFUConnection.ts:34](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L34)

#### Implementation of

[`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md).[`playerId`](../../PlayerRegistry/interfaces/IPlayer.md#playerid)

***

### protocol

> **protocol**: `SignallingProtocol`

Defined in: [Signalling/src/SFUConnection.ts:40](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L40)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`protocol`](../../StreamerRegistry/interfaces/IStreamer.md#protocol)

***

### remoteAddress?

> `optional` **remoteAddress**: `string`

Defined in: [Signalling/src/SFUConnection.ts:46](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L46)

***

### streamerId

> **streamerId**: `string`

Defined in: [Signalling/src/SFUConnection.ts:36](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L36)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`streamerId`](../../StreamerRegistry/interfaces/IStreamer.md#streamerid)

***

### streaming

> **streaming**: `boolean`

Defined in: [Signalling/src/SFUConnection.ts:42](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L42)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`streaming`](../../StreamerRegistry/interfaces/IStreamer.md#streaming)

***

### subscribedStreamer

> **subscribedStreamer**: `null` \| [`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md)

Defined in: [Signalling/src/SFUConnection.ts:44](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L44)

#### Implementation of

[`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md).[`subscribedStreamer`](../../PlayerRegistry/interfaces/IPlayer.md#subscribedstreamer)

***

### subscribers

> **subscribers**: `Set`\<`string`\>

Defined in: [Signalling/src/SFUConnection.ts:50](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L50)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`subscribers`](../../StreamerRegistry/interfaces/IStreamer.md#subscribers)

***

### transport

> **transport**: `ITransport`

Defined in: [Signalling/src/SFUConnection.ts:38](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L38)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`transport`](../../StreamerRegistry/interfaces/IStreamer.md#transport)

## Methods

### addListener()

> **addListener**(`eventName`, `listener`): `this`

Defined in: Common/dist/types/Event/EventEmitter.d.ts:39

Alias for `emitter.on(eventName, listener)`.

#### Parameters

##### eventName

`string`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`addListener`](../../StreamerRegistry/interfaces/IStreamer.md#addlistener)

#### Inherited from

`EventEmitter.addListener`

***

### emit()

> **emit**(`eventName`, ...`args`): `boolean`

Defined in: Common/dist/types/Event/EventEmitter.d.ts:133

Synchronously calls each of the listeners registered for the event named `eventName`, in the order they were registered, passing the supplied arguments
to each.

Returns `true` if the event had listeners, `false` otherwise.

```js
import { EventEmitter } from 'node:events';
const myEmitter = new EventEmitter();

// First listener
myEmitter.on('event', function firstListener() {
  console.log('Helloooo! first listener');
});
// Second listener
myEmitter.on('event', function secondListener(arg1, arg2) {
  console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
});
// Third listener
myEmitter.on('event', function thirdListener(...args) {
  const parameters = args.join(', ');
  console.log(`event with parameters ${parameters} in third listener`);
});

console.log(myEmitter.listeners('event'));

myEmitter.emit('event', 1, 2, 3, 4, 5);

// Prints:
// [
//   [Function: firstListener],
//   [Function: secondListener],
//   [Function: thirdListener]
// ]
// Helloooo! first listener
// event with parameters 1, 2 in second listener
// event with parameters 1, 2, 3, 4, 5 in third listener
```

#### Parameters

##### eventName

`string`

##### args

...`any`[]

#### Returns

`boolean`

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`emit`](../../StreamerRegistry/interfaces/IStreamer.md#emit)

#### Inherited from

`EventEmitter.emit`

***

### getPlayerInfo()

> **getPlayerInfo**(): [`IPlayerInfo`](../../PlayerRegistry/interfaces/IPlayerInfo.md)

Defined in: [Signalling/src/SFUConnection.ts:125](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L125)

Returns a descriptive object for the REST API inspection operations.

#### Returns

[`IPlayerInfo`](../../PlayerRegistry/interfaces/IPlayerInfo.md)

An IPlayerInfo object containing viewable information about this connection.

#### Implementation of

[`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md).[`getPlayerInfo`](../../PlayerRegistry/interfaces/IPlayer.md#getplayerinfo)

***

### getReadableIdentifier()

> **getReadableIdentifier**(): `string`

Defined in: [Signalling/src/SFUConnection.ts:91](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L91)

Returns an identifier that is displayed in logs.

#### Returns

`string`

A string describing this connection.

#### Implementation of

[`IMessageLogger`](../../LoggingUtils/interfaces/IMessageLogger.md).[`getReadableIdentifier`](../../LoggingUtils/interfaces/IMessageLogger.md#getreadableidentifier)

***

### getStreamerInfo()

> **getStreamerInfo**(): [`IStreamerInfo`](../../StreamerRegistry/interfaces/IStreamerInfo.md)

Defined in: [Signalling/src/SFUConnection.ts:108](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L108)

Returns a descriptive object for the REST API inspection operations.

#### Returns

[`IStreamerInfo`](../../StreamerRegistry/interfaces/IStreamerInfo.md)

An IStreamerInfo object containing viewable information about this connection.

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`getStreamerInfo`](../../StreamerRegistry/interfaces/IStreamer.md#getstreamerinfo)

***

### off()

> **off**(`eventName`, `listener`): `this`

Defined in: Common/dist/types/Event/EventEmitter.d.ts:88

Alias for `emitter.removeListener()`.

#### Parameters

##### eventName

`string`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`off`](../../StreamerRegistry/interfaces/IStreamer.md#off)

#### Inherited from

`EventEmitter.off`

***

### on()

> **on**(`eventName`, `listener`): `this`

Defined in: Common/dist/types/Event/EventEmitter.d.ts:55

Adds the `listener` function to the end of the listeners array for the event
named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### eventName

`string`

The name of the event.

##### listener

(...`args`) => `void`

The callback function

#### Returns

`this`

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`on`](../../StreamerRegistry/interfaces/IStreamer.md#on)

#### Inherited from

`EventEmitter.on`

***

### once()

> **once**(`eventName`, `listener`): `this`

Defined in: Common/dist/types/Event/EventEmitter.d.ts:70

Adds a **one-time** `listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### eventName

`string`

The name of the event.

##### listener

(...`args`) => `void`

The callback function

#### Returns

`this`

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`once`](../../StreamerRegistry/interfaces/IStreamer.md#once)

#### Inherited from

`EventEmitter.once`

***

### removeAllListeners()

> **removeAllListeners**(`eventName`): `this`

Defined in: Common/dist/types/Event/EventEmitter.d.ts:93

Removes all listeners, or those of the specified `eventName`.
Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### eventName

`string`

#### Returns

`this`

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`removeAllListeners`](../../StreamerRegistry/interfaces/IStreamer.md#removealllisteners)

#### Inherited from

`EventEmitter.removeAllListeners`

***

### removeListener()

> **removeListener**(`eventName`, `listener`): `this`

Defined in: Common/dist/types/Event/EventEmitter.d.ts:84

Removes the specified `listener` from this EventEmitter.

```js
const callback = (stream) => {
  console.log('someone connected!');
};
server.on('connection', callback);
// ...
server.removeListener('connection', callback);
```
Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### eventName

`string`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`removeListener`](../../StreamerRegistry/interfaces/IStreamer.md#removelistener)

#### Inherited from

`EventEmitter.removeListener`

***

### sendMessage()

> **sendMessage**(`message`): `void`

Defined in: [Signalling/src/SFUConnection.ts:99](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/SFUConnection.ts#L99)

Sends a signalling message to the SFU.

#### Parameters

##### message

`BaseMessage`

The message to send.

#### Returns

`void`

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`sendMessage`](../../StreamerRegistry/interfaces/IStreamer.md#sendmessage)
