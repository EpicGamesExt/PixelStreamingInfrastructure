[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [StreamerRegistry](../README.md) / IStreamer

# Interface: IStreamer

Defined in: [Signalling/src/StreamerRegistry.ts:17](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L17)

An interface that describes a streamer that can be added to the
streamer registry.

## Extends

- `EventEmitter`.[`IMessageLogger`](../../LoggingUtils/interfaces/IMessageLogger.md)

## Properties

### maxSubscribers

> **maxSubscribers**: `number`

Defined in: [Signalling/src/StreamerRegistry.ts:22](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L22)

***

### protocol

> **protocol**: `SignallingProtocol`

Defined in: [Signalling/src/StreamerRegistry.ts:20](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L20)

***

### streamerId

> **streamerId**: `string`

Defined in: [Signalling/src/StreamerRegistry.ts:18](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L18)

***

### streaming

> **streaming**: `boolean`

Defined in: [Signalling/src/StreamerRegistry.ts:21](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L21)

***

### subscribers

> **subscribers**: `Set`\<`string`\>

Defined in: [Signalling/src/StreamerRegistry.ts:23](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L23)

***

### transport

> **transport**: `ITransport`

Defined in: [Signalling/src/StreamerRegistry.ts:19](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L19)

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

#### Inherited from

`EventEmitter.emit`

***

### getReadableIdentifier()

> **getReadableIdentifier**(): `string`

Defined in: [Signalling/src/LoggingUtils.ts:18](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/LoggingUtils.ts#L18)

#### Returns

`string`

#### Inherited from

[`IMessageLogger`](../../LoggingUtils/interfaces/IMessageLogger.md).[`getReadableIdentifier`](../../LoggingUtils/interfaces/IMessageLogger.md#getreadableidentifier)

***

### getStreamerInfo()

> **getStreamerInfo**(): [`IStreamerInfo`](IStreamerInfo.md)

Defined in: [Signalling/src/StreamerRegistry.ts:26](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L26)

#### Returns

[`IStreamerInfo`](IStreamerInfo.md)

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

#### Inherited from

`EventEmitter.removeListener`

***

### sendMessage()

> **sendMessage**(`message`): `void`

Defined in: [Signalling/src/StreamerRegistry.ts:25](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L25)

#### Parameters

##### message

`BaseMessage`

#### Returns

`void`
