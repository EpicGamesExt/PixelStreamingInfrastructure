[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../README.md) / [StreamerRegistry](../modules/StreamerRegistry.md) / StreamerRegistry

# Class: StreamerRegistry

[StreamerRegistry](../modules/StreamerRegistry.md).StreamerRegistry

Handles all the streamer connections of a signalling server and
can be used to lookup connections by id etc.
Fires events when streamers are added or removed.
Events:
  'added': (playerId: string) Player was added.
  'removed': (playerId: string) Player was removed.

## Hierarchy

- `EventEmitter`

  ↳ **`StreamerRegistry`**

## Table of contents

### Constructors

- [constructor](StreamerRegistry.StreamerRegistry.md#constructor)

### Properties

- [defaultStreamerIdPrefix](StreamerRegistry.StreamerRegistry.md#defaultstreameridprefix)
- [streamers](StreamerRegistry.StreamerRegistry.md#streamers)

### Methods

- [add](StreamerRegistry.StreamerRegistry.md#add)
- [addListener](StreamerRegistry.StreamerRegistry.md#addlistener)
- [count](StreamerRegistry.StreamerRegistry.md#count)
- [emit](StreamerRegistry.StreamerRegistry.md#emit)
- [empty](StreamerRegistry.StreamerRegistry.md#empty)
- [find](StreamerRegistry.StreamerRegistry.md#find)
- [getFirstStreamerId](StreamerRegistry.StreamerRegistry.md#getfirststreamerid)
- [off](StreamerRegistry.StreamerRegistry.md#off)
- [on](StreamerRegistry.StreamerRegistry.md#on)
- [once](StreamerRegistry.StreamerRegistry.md#once)
- [remove](StreamerRegistry.StreamerRegistry.md#remove)
- [removeAllListeners](StreamerRegistry.StreamerRegistry.md#removealllisteners)
- [removeListener](StreamerRegistry.StreamerRegistry.md#removelistener)

## Constructors

### constructor

• **new StreamerRegistry**(): [`StreamerRegistry`](StreamerRegistry.StreamerRegistry.md)

#### Returns

[`StreamerRegistry`](StreamerRegistry.StreamerRegistry.md)

#### Overrides

EventEmitter.constructor

#### Defined in

[Signalling/src/StreamerRegistry.ts:52](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L52)

## Properties

### defaultStreamerIdPrefix

• **defaultStreamerIdPrefix**: `string` = `'UnknownStreamer'`

#### Defined in

[Signalling/src/StreamerRegistry.ts:50](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L50)

___

### streamers

• **streamers**: [`IStreamer`](../interfaces/StreamerRegistry.IStreamer.md)[]

#### Defined in

[Signalling/src/StreamerRegistry.ts:49](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L49)

## Methods

### add

▸ **add**(`streamer`): `boolean`

Adds a streamer to the registry. If the streamer already has an id
it will be sanitized (checked against existing ids and altered if
there are collisions), or if it has no id it will be assigned a
default unique id.

#### Parameters

| Name | Type |
| :------ | :------ |
| `streamer` | [`IStreamer`](../interfaces/StreamerRegistry.IStreamer.md) |

#### Returns

`boolean`

True if the add was successful.

#### Defined in

[Signalling/src/StreamerRegistry.ts:64](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L64)

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

Returns the total number of connected streamers.

#### Returns

`number`

#### Defined in

[Signalling/src/StreamerRegistry.ts:133](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L133)

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

[Signalling/src/StreamerRegistry.ts:126](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L126)

___

### find

▸ **find**(`streamerId`): `undefined` \| [`IStreamer`](../interfaces/StreamerRegistry.IStreamer.md)

Attempts to find the given streamer id in the registry.

#### Parameters

| Name | Type |
| :------ | :------ |
| `streamerId` | `string` |

#### Returns

`undefined` \| [`IStreamer`](../interfaces/StreamerRegistry.IStreamer.md)

#### Defined in

[Signalling/src/StreamerRegistry.ts:106](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L106)

___

### getFirstStreamerId

▸ **getFirstStreamerId**(): ``null`` \| `string`

Used by players who haven't subscribed but try to send a message.
This is to cover legacy connections that do not know how to subscribe.
The player will be assigned the first streamer in the list.

#### Returns

``null`` \| `string`

The first streamerId in the registry or null if there are none.

#### Defined in

[Signalling/src/StreamerRegistry.ts:116](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L116)

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

▸ **remove**(`streamer`): `boolean`

Removes a streamer from the registry. If the streamer isn't found
it does nothing.

#### Parameters

| Name | Type |
| :------ | :------ |
| `streamer` | [`IStreamer`](../interfaces/StreamerRegistry.IStreamer.md) |

#### Returns

`boolean`

True if the streamer was removed.

#### Defined in

[Signalling/src/StreamerRegistry.ts:90](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/StreamerRegistry.ts#L90)

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
