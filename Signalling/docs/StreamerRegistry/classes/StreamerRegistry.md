[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [StreamerRegistry](../README.md) / StreamerRegistry

# Class: StreamerRegistry

Defined in: [Signalling/src/StreamerRegistry.ts:48](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L48)

Handles all the streamer connections of a signalling server and
can be used to lookup connections by id etc.
Fires events when streamers are added or removed.
Events:
  'added': (playerId: string) Player was added.
  'removed': (playerId: string) Player was removed.

## Extends

- `EventEmitter`

## Constructors

### new StreamerRegistry()

> **new StreamerRegistry**(): [`StreamerRegistry`](StreamerRegistry.md)

Defined in: [Signalling/src/StreamerRegistry.ts:52](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L52)

#### Returns

[`StreamerRegistry`](StreamerRegistry.md)

#### Overrides

`EventEmitter.constructor`

## Properties

### defaultStreamerIdPrefix

> **defaultStreamerIdPrefix**: `string` = `'UnknownStreamer'`

Defined in: [Signalling/src/StreamerRegistry.ts:50](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L50)

***

### streamers

> **streamers**: [`IStreamer`](../interfaces/IStreamer.md)[]

Defined in: [Signalling/src/StreamerRegistry.ts:49](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L49)

## Methods

### add()

> **add**(`streamer`): `boolean`

Defined in: [Signalling/src/StreamerRegistry.ts:64](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L64)

Adds a streamer to the registry. If the streamer already has an id
it will be sanitized (checked against existing ids and altered if
there are collisions), or if it has no id it will be assigned a
default unique id.

#### Parameters

##### streamer

[`IStreamer`](../interfaces/IStreamer.md)

#### Returns

`boolean`

True if the add was successful.

***

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

### count()

> **count**(): `number`

Defined in: [Signalling/src/StreamerRegistry.ts:133](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L133)

Returns the total number of connected streamers.

#### Returns

`number`

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

### empty()

> **empty**(): `boolean`

Defined in: [Signalling/src/StreamerRegistry.ts:126](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L126)

Returns true when the registry is empty.

#### Returns

`boolean`

***

### find()

> **find**(`streamerId`): `undefined` \| [`IStreamer`](../interfaces/IStreamer.md)

Defined in: [Signalling/src/StreamerRegistry.ts:106](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L106)

Attempts to find the given streamer id in the registry.

#### Parameters

##### streamerId

`string`

#### Returns

`undefined` \| [`IStreamer`](../interfaces/IStreamer.md)

***

### getFirstStreamerId()

> **getFirstStreamerId**(): `null` \| `string`

Defined in: [Signalling/src/StreamerRegistry.ts:116](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L116)

Used by players who haven't subscribed but try to send a message.
This is to cover legacy connections that do not know how to subscribe.
The player will be assigned the first streamer in the list.

#### Returns

`null` \| `string`

The first streamerId in the registry or null if there are none.

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

### remove()

> **remove**(`streamer`): `boolean`

Defined in: [Signalling/src/StreamerRegistry.ts:90](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/StreamerRegistry.ts#L90)

Removes a streamer from the registry. If the streamer isn't found
it does nothing.

#### Parameters

##### streamer

[`IStreamer`](../interfaces/IStreamer.md)

#### Returns

`boolean`

True if the streamer was removed.

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
