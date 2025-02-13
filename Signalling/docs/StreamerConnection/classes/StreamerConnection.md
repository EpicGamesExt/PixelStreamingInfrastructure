[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [StreamerConnection](../README.md) / StreamerConnection

# Class: StreamerConnection

Defined in: [Signalling/src/StreamerConnection.ts:29](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L29)

A connection between the signalling server and a streamer connection.
This is where messages expected to be handled by the streamer come in
and where messages are sent to the streamer.

Interesting internals:
streamerId: The unique id string of this streamer.
transport: The ITransport where transport events can be subscribed to
protocol: The SignallingProtocol where signalling messages can be
subscribed to.
streaming: True when the streamer is ready to accept subscriptions.

## Extends

- `EventEmitter`

## Implements

- [`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md)
- [`IMessageLogger`](../../LoggingUtils/interfaces/IMessageLogger.md)

## Constructors

### new StreamerConnection()

> **new StreamerConnection**(`server`, `ws`, `remoteAddress`?): [`StreamerConnection`](StreamerConnection.md)

Defined in: [Signalling/src/StreamerConnection.ts:54](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L54)

Initializes a new connection with given and sane values. Adds listeners for the
websocket close and error and will emit a disconnected event when disconneted.

#### Parameters

##### server

[`SignallingServer`](../../SignallingServer/classes/SignallingServer.md)

The signalling server object that spawned this streamer.

##### ws

`WebSocket`

The websocket coupled to this streamer connection.

##### remoteAddress?

`string`

The remote address of this connection. Only used as display.

#### Returns

[`StreamerConnection`](StreamerConnection.md)

#### Overrides

`EventEmitter.constructor`

## Properties

### maxSubscribers

> **maxSubscribers**: `number`

Defined in: [Signalling/src/StreamerConnection.ts:41](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L41)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`maxSubscribers`](../../StreamerRegistry/interfaces/IStreamer.md#maxsubscribers)

***

### protocol

> **protocol**: `SignallingProtocol`

Defined in: [Signalling/src/StreamerConnection.ts:35](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L35)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`protocol`](../../StreamerRegistry/interfaces/IStreamer.md#protocol)

***

### remoteAddress?

> `optional` **remoteAddress**: `string`

Defined in: [Signalling/src/StreamerConnection.ts:39](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L39)

***

### streamerId

> **streamerId**: `string`

Defined in: [Signalling/src/StreamerConnection.ts:31](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L31)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`streamerId`](../../StreamerRegistry/interfaces/IStreamer.md#streamerid)

***

### streaming

> **streaming**: `boolean`

Defined in: [Signalling/src/StreamerConnection.ts:37](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L37)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`streaming`](../../StreamerRegistry/interfaces/IStreamer.md#streaming)

***

### subscribers

> **subscribers**: `Set`\<`string`\>

Defined in: [Signalling/src/StreamerConnection.ts:43](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L43)

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`subscribers`](../../StreamerRegistry/interfaces/IStreamer.md#subscribers)

***

### transport

> **transport**: `ITransport`

Defined in: [Signalling/src/StreamerConnection.ts:33](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L33)

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

### getReadableIdentifier()

> **getReadableIdentifier**(): `string`

Defined in: [Signalling/src/StreamerConnection.ts:80](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L80)

Returns an identifier that is displayed in logs.

#### Returns

`string`

A string describing this connection.

#### Implementation of

[`IMessageLogger`](../../LoggingUtils/interfaces/IMessageLogger.md).[`getReadableIdentifier`](../../LoggingUtils/interfaces/IMessageLogger.md#getreadableidentifier)

***

### getStreamerInfo()

> **getStreamerInfo**(): [`IStreamerInfo`](../../StreamerRegistry/interfaces/IStreamerInfo.md)

Defined in: [Signalling/src/StreamerConnection.ts:97](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L97)

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

Defined in: [Signalling/src/StreamerConnection.ts:88](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerConnection.ts#L88)

Sends a signalling message to the player.

#### Parameters

##### message

`BaseMessage`

The message to send.

#### Returns

`void`

#### Implementation of

[`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md).[`sendMessage`](../../StreamerRegistry/interfaces/IStreamer.md#sendmessage)
