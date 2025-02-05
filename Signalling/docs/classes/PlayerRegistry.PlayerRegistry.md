[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../README.md) / [PlayerRegistry](../modules/PlayerRegistry.md) / PlayerRegistry

# Class: PlayerRegistry

[PlayerRegistry](../modules/PlayerRegistry.md).PlayerRegistry

Handles all the player connections of a signalling server and
can be used to lookup connections by id etc.
Fires events when players are added or removed.
Events:
  'added': (playerId: string) Player was added.
  'removed': (playerId: string) Player was removed.

## Hierarchy

- `EventEmitter`

  ↳ **`PlayerRegistry`**

## Table of contents

### Constructors

- [constructor](PlayerRegistry.PlayerRegistry.md#constructor)

### Methods

- [add](PlayerRegistry.PlayerRegistry.md#add)
- [addListener](PlayerRegistry.PlayerRegistry.md#addlistener)
- [count](PlayerRegistry.PlayerRegistry.md#count)
- [emit](PlayerRegistry.PlayerRegistry.md#emit)
- [empty](PlayerRegistry.PlayerRegistry.md#empty)
- [get](PlayerRegistry.PlayerRegistry.md#get)
- [has](PlayerRegistry.PlayerRegistry.md#has)
- [listPlayers](PlayerRegistry.PlayerRegistry.md#listplayers)
- [off](PlayerRegistry.PlayerRegistry.md#off)
- [on](PlayerRegistry.PlayerRegistry.md#on)
- [once](PlayerRegistry.PlayerRegistry.md#once)
- [remove](PlayerRegistry.PlayerRegistry.md#remove)
- [removeAllListeners](PlayerRegistry.PlayerRegistry.md#removealllisteners)
- [removeListener](PlayerRegistry.PlayerRegistry.md#removelistener)

## Constructors

### constructor

• **new PlayerRegistry**(): [`PlayerRegistry`](PlayerRegistry.PlayerRegistry.md)

#### Returns

[`PlayerRegistry`](PlayerRegistry.PlayerRegistry.md)

#### Overrides

EventEmitter.constructor

#### Defined in

[Signalling/src/PlayerRegistry.ts:42](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L42)

## Methods

### add

▸ **add**(`player`): `void`

Assigns a unique id to the player and adds it to the registry

#### Parameters

| Name | Type |
| :------ | :------ |
| `player` | [`IPlayer`](../interfaces/PlayerRegistry.IPlayer.md) |

#### Returns

`void`

#### Defined in

[Signalling/src/PlayerRegistry.ts:52](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L52)

___

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

### count

▸ **count**(): `number`

Gets the total number of connected players.

#### Returns

`number`

#### Defined in

[Signalling/src/PlayerRegistry.ts:105](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L105)

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

### empty

▸ **empty**(): `boolean`

Returns true when the registry is empty.

#### Returns

`boolean`

#### Defined in

[Signalling/src/PlayerRegistry.ts:98](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L98)

___

### get

▸ **get**(`playerId`): `undefined` \| [`IPlayer`](../interfaces/PlayerRegistry.IPlayer.md)

Gets a player from the registry using the player id.
Returns undefined if the player doesn't exist.

#### Parameters

| Name | Type |
| :------ | :------ |
| `playerId` | `string` |

#### Returns

`undefined` \| [`IPlayer`](../interfaces/PlayerRegistry.IPlayer.md)

#### Defined in

[Signalling/src/PlayerRegistry.ts:87](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L87)

___

### has

▸ **has**(`playerId`): `boolean`

Tests if a player id exists in the registry.

#### Parameters

| Name | Type |
| :------ | :------ |
| `playerId` | `string` |

#### Returns

`boolean`

#### Defined in

[Signalling/src/PlayerRegistry.ts:79](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L79)

___

### listPlayers

▸ **listPlayers**(): [`IPlayer`](../interfaces/PlayerRegistry.IPlayer.md)[]

#### Returns

[`IPlayer`](../interfaces/PlayerRegistry.IPlayer.md)[]

#### Defined in

[Signalling/src/PlayerRegistry.ts:91](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L91)

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

### remove

▸ **remove**(`player`): `void`

Removes a player from the registry. Does nothing if the id
does not exist.

#### Parameters

| Name | Type |
| :------ | :------ |
| `player` | [`IPlayer`](../interfaces/PlayerRegistry.IPlayer.md) |

#### Returns

`void`

#### Defined in

[Signalling/src/PlayerRegistry.ts:64](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/PlayerRegistry.ts#L64)

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
