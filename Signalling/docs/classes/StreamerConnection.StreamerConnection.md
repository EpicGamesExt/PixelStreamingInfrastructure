[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../README.md) / [StreamerConnection](../modules/StreamerConnection.md) / StreamerConnection

# Class: StreamerConnection

[StreamerConnection](../modules/StreamerConnection.md).StreamerConnection

A connection between the signalling server and a streamer connection.
This is where messages expected to be handled by the streamer come in
and where messages are sent to the streamer.

Interesting internals:
streamerId: The unique id string of this streamer.
transport: The ITransport where transport events can be subscribed to
protocol: The SignallingProtocol where signalling messages can be
subscribed to.
streaming: True when the streamer is ready to accept subscriptions.

## Hierarchy

- `EventEmitter`

  ↳ **`StreamerConnection`**

## Implements

- [`IStreamer`](../interfaces/StreamerRegistry.IStreamer.md)
- [`IMessageLogger`](../interfaces/LoggingUtils.IMessageLogger.md)

## Table of contents

### Constructors

- [constructor](StreamerConnection.StreamerConnection.md#constructor)

### Properties

- [maxSubscribers](StreamerConnection.StreamerConnection.md#maxsubscribers)
- [protocol](StreamerConnection.StreamerConnection.md#protocol)
- [remoteAddress](StreamerConnection.StreamerConnection.md#remoteaddress)
- [streamerId](StreamerConnection.StreamerConnection.md#streamerid)
- [streaming](StreamerConnection.StreamerConnection.md#streaming)
- [subscribers](StreamerConnection.StreamerConnection.md#subscribers)
- [transport](StreamerConnection.StreamerConnection.md#transport)

### Methods

- [addListener](StreamerConnection.StreamerConnection.md#addlistener)
- [emit](StreamerConnection.StreamerConnection.md#emit)
- [getReadableIdentifier](StreamerConnection.StreamerConnection.md#getreadableidentifier)
- [getStreamerInfo](StreamerConnection.StreamerConnection.md#getstreamerinfo)
- [off](StreamerConnection.StreamerConnection.md#off)
- [on](StreamerConnection.StreamerConnection.md#on)
- [once](StreamerConnection.StreamerConnection.md#once)
- [removeAllListeners](StreamerConnection.StreamerConnection.md#removealllisteners)
- [removeListener](StreamerConnection.StreamerConnection.md#removelistener)
- [sendMessage](StreamerConnection.StreamerConnection.md#sendmessage)

## Constructors

### constructor

• **new StreamerConnection**(`server`, `ws`, `remoteAddress?`): [`StreamerConnection`](StreamerConnection.StreamerConnection.md)

Initializes a new connection with given and sane values. Adds listeners for the
websocket close and error and will emit a disconnected event when disconneted.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `server` | [`SignallingServer`](SignallingServer.SignallingServer.md) | The signalling server object that spawned this streamer. |
| `ws` | `WebSocket` | The websocket coupled to this streamer connection. |
| `remoteAddress?` | `string` | The remote address of this connection. Only used as display. |

#### Returns

[`StreamerConnection`](StreamerConnection.StreamerConnection.md)

#### Overrides

EventEmitter.constructor

#### Defined in

[Signalling/src/StreamerConnection.ts:54](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L54)

## Properties

### maxSubscribers

• **maxSubscribers**: `number`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[maxSubscribers](../interfaces/StreamerRegistry.IStreamer.md#maxsubscribers)

#### Defined in

[Signalling/src/StreamerConnection.ts:41](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L41)

___

### protocol

• **protocol**: `SignallingProtocol`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[protocol](../interfaces/StreamerRegistry.IStreamer.md#protocol)

#### Defined in

[Signalling/src/StreamerConnection.ts:35](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L35)

___

### remoteAddress

• `Optional` **remoteAddress**: `string`

#### Defined in

[Signalling/src/StreamerConnection.ts:39](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L39)

___

### streamerId

• **streamerId**: `string`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[streamerId](../interfaces/StreamerRegistry.IStreamer.md#streamerid)

#### Defined in

[Signalling/src/StreamerConnection.ts:31](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L31)

___

### streaming

• **streaming**: `boolean`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[streaming](../interfaces/StreamerRegistry.IStreamer.md#streaming)

#### Defined in

[Signalling/src/StreamerConnection.ts:37](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L37)

___

### subscribers

• **subscribers**: `Set`\<`string`\>

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[subscribers](../interfaces/StreamerRegistry.IStreamer.md#subscribers)

#### Defined in

[Signalling/src/StreamerConnection.ts:43](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L43)

___

### transport

• **transport**: `ITransport`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[transport](../interfaces/StreamerRegistry.IStreamer.md#transport)

#### Defined in

[Signalling/src/StreamerConnection.ts:33](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L33)

## Methods

### addListener

▸ **addListener**(`eventName`, `listener`): `this`

Alias for `emitter.on(eventName, listener)`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[addListener](../interfaces/StreamerRegistry.IStreamer.md#addlistener)

#### Inherited from

EventEmitter.addListener

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:39

___

### emit

▸ **emit**(`eventName`, `...args`): `boolean`

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

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `...args` | `any`[] |

#### Returns

`boolean`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[emit](../interfaces/StreamerRegistry.IStreamer.md#emit)

#### Inherited from

EventEmitter.emit

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:133

___

### getReadableIdentifier

▸ **getReadableIdentifier**(): `string`

Returns an identifier that is displayed in logs.

#### Returns

`string`

A string describing this connection.

#### Implementation of

[IMessageLogger](../interfaces/LoggingUtils.IMessageLogger.md).[getReadableIdentifier](../interfaces/LoggingUtils.IMessageLogger.md#getreadableidentifier)

#### Defined in

[Signalling/src/StreamerConnection.ts:80](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L80)

___

### getStreamerInfo

▸ **getStreamerInfo**(): [`IStreamerInfo`](../interfaces/StreamerRegistry.IStreamerInfo.md)

Returns a descriptive object for the REST API inspection operations.

#### Returns

[`IStreamerInfo`](../interfaces/StreamerRegistry.IStreamerInfo.md)

An IStreamerInfo object containing viewable information about this connection.

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[getStreamerInfo](../interfaces/StreamerRegistry.IStreamer.md#getstreamerinfo)

#### Defined in

[Signalling/src/StreamerConnection.ts:97](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L97)

___

### off

▸ **off**(`eventName`, `listener`): `this`

Alias for `emitter.removeListener()`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[off](../interfaces/StreamerRegistry.IStreamer.md#off)

#### Inherited from

EventEmitter.off

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:88

___

### on

▸ **on**(`eventName`, `listener`): `this`

Adds the `listener` function to the end of the listeners array for the event
named `eventName`.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

`this`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[on](../interfaces/StreamerRegistry.IStreamer.md#on)

#### Inherited from

EventEmitter.on

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:55

___

### once

▸ **once**(`eventName`, `listener`): `this`

Adds a **one-time** `listener` function for the event named `eventName`. The
next time `eventName` is triggered, this listener is removed and then invoked.

```js
server.once('connection', (stream) => {
  console.log('Ah, we have our first user!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

`this`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[once](../interfaces/StreamerRegistry.IStreamer.md#once)

#### Inherited from

EventEmitter.once

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:70

___

### removeAllListeners

▸ **removeAllListeners**(`eventName`): `this`

Removes all listeners, or those of the specified `eventName`.
Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |

#### Returns

`this`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[removeAllListeners](../interfaces/StreamerRegistry.IStreamer.md#removealllisteners)

#### Inherited from

EventEmitter.removeAllListeners

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:93

___

### removeListener

▸ **removeListener**(`eventName`, `listener`): `this`

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

| Name | Type |
| :------ | :------ |
| `eventName` | `string` |
| `listener` | (...`args`: `any`[]) => `void` |

#### Returns

`this`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[removeListener](../interfaces/StreamerRegistry.IStreamer.md#removelistener)

#### Inherited from

EventEmitter.removeListener

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:84

___

### sendMessage

▸ **sendMessage**(`message`): `void`

Sends a signalling message to the player.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `BaseMessage` | The message to send. |

#### Returns

`void`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[sendMessage](../interfaces/StreamerRegistry.IStreamer.md#sendmessage)

#### Defined in

[Signalling/src/StreamerConnection.ts:88](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerConnection.ts#L88)
