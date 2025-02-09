[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../README.md) / [StreamerRegistry](../modules/StreamerRegistry.md) / IStreamer

# Interface: IStreamer

[StreamerRegistry](../modules/StreamerRegistry.md).IStreamer

An interface that describes a streamer that can be added to the
streamer registry.

## Hierarchy

- `EventEmitter`

- [`IMessageLogger`](LoggingUtils.IMessageLogger.md)

  ↳ **`IStreamer`**

## Implemented by

- [`SFUConnection`](../classes/SFUConnection.SFUConnection.md)
- [`StreamerConnection`](../classes/StreamerConnection.StreamerConnection.md)

## Table of contents

### Properties

- [maxSubscribers](StreamerRegistry.IStreamer.md#maxsubscribers)
- [protocol](StreamerRegistry.IStreamer.md#protocol)
- [streamerId](StreamerRegistry.IStreamer.md#streamerid)
- [streaming](StreamerRegistry.IStreamer.md#streaming)
- [subscribers](StreamerRegistry.IStreamer.md#subscribers)
- [transport](StreamerRegistry.IStreamer.md#transport)

### Methods

- [addListener](StreamerRegistry.IStreamer.md#addlistener)
- [emit](StreamerRegistry.IStreamer.md#emit)
- [getReadableIdentifier](StreamerRegistry.IStreamer.md#getreadableidentifier)
- [getStreamerInfo](StreamerRegistry.IStreamer.md#getstreamerinfo)
- [off](StreamerRegistry.IStreamer.md#off)
- [on](StreamerRegistry.IStreamer.md#on)
- [once](StreamerRegistry.IStreamer.md#once)
- [removeAllListeners](StreamerRegistry.IStreamer.md#removealllisteners)
- [removeListener](StreamerRegistry.IStreamer.md#removelistener)
- [sendMessage](StreamerRegistry.IStreamer.md#sendmessage)

## Properties

### maxSubscribers

• **maxSubscribers**: `number`

#### Defined in

[Signalling/src/StreamerRegistry.ts:22](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L22)

___

### protocol

• **protocol**: `SignallingProtocol`

#### Defined in

[Signalling/src/StreamerRegistry.ts:20](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L20)

___

### streamerId

• **streamerId**: `string`

#### Defined in

[Signalling/src/StreamerRegistry.ts:18](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L18)

___

### streaming

• **streaming**: `boolean`

#### Defined in

[Signalling/src/StreamerRegistry.ts:21](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L21)

___

### subscribers

• **subscribers**: `Set`\<`string`\>

#### Defined in

[Signalling/src/StreamerRegistry.ts:23](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L23)

___

### transport

• **transport**: `ITransport`

#### Defined in

[Signalling/src/StreamerRegistry.ts:19](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L19)

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

#### Inherited from

EventEmitter.emit

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:133

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

### getStreamerInfo

▸ **getStreamerInfo**(): [`IStreamerInfo`](StreamerRegistry.IStreamerInfo.md)

#### Returns

[`IStreamerInfo`](StreamerRegistry.IStreamerInfo.md)

#### Defined in

[Signalling/src/StreamerRegistry.ts:26](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L26)

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

#### Inherited from

EventEmitter.removeListener

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:84

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

[Signalling/src/StreamerRegistry.ts:25](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L25)
