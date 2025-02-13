[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [PlayerRegistry](../README.md) / PlayerRegistry

# Class: PlayerRegistry

Defined in: [Signalling/src/PlayerRegistry.ts:37](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L37)

Handles all the player connections of a signalling server and
can be used to lookup connections by id etc.
Fires events when players are added or removed.
Events:
  'added': (playerId: string) Player was added.
  'removed': (playerId: string) Player was removed.

## Extends

- `EventEmitter`

## Constructors

### new PlayerRegistry()

> **new PlayerRegistry**(): [`PlayerRegistry`](PlayerRegistry.md)

Defined in: [Signalling/src/PlayerRegistry.ts:42](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L42)

#### Returns

[`PlayerRegistry`](PlayerRegistry.md)

#### Overrides

`EventEmitter.constructor`

## Methods

### add()

> **add**(`player`): `void`

Defined in: [Signalling/src/PlayerRegistry.ts:52](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L52)

Assigns a unique id to the player and adds it to the registry

#### Parameters

##### player

[`IPlayer`](../interfaces/IPlayer.md)

#### Returns

`void`

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

Defined in: [Signalling/src/PlayerRegistry.ts:105](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L105)

Gets the total number of connected players.

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

Defined in: [Signalling/src/PlayerRegistry.ts:98](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L98)

Returns true when the registry is empty.

#### Returns

`boolean`

***

### get()

> **get**(`playerId`): `undefined` \| [`IPlayer`](../interfaces/IPlayer.md)

Defined in: [Signalling/src/PlayerRegistry.ts:87](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L87)

Gets a player from the registry using the player id.
Returns undefined if the player doesn't exist.

#### Parameters

##### playerId

`string`

#### Returns

`undefined` \| [`IPlayer`](../interfaces/IPlayer.md)

***

### has()

> **has**(`playerId`): `boolean`

Defined in: [Signalling/src/PlayerRegistry.ts:79](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L79)

Tests if a player id exists in the registry.

#### Parameters

##### playerId

`string`

#### Returns

`boolean`

***

### listPlayers()

> **listPlayers**(): [`IPlayer`](../interfaces/IPlayer.md)[]

Defined in: [Signalling/src/PlayerRegistry.ts:91](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L91)

#### Returns

[`IPlayer`](../interfaces/IPlayer.md)[]

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

> **remove**(`player`): `void`

Defined in: [Signalling/src/PlayerRegistry.ts:64](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/PlayerRegistry.ts#L64)

Removes a player from the registry. Does nothing if the id
does not exist.

#### Parameters

##### player

[`IPlayer`](../interfaces/IPlayer.md)

#### Returns

`void`

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
