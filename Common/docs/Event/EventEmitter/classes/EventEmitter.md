[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Event/EventEmitter](../README.md) / EventEmitter

# Class: EventEmitter

A feature-limited, but _mostly_ drop-in replacement for Node's EventEmitter type that is implemented using EventTarget.

For those unfamiliar with Node's EventEmitter, here is some info from the official docs:

[In NodeJS] all objects that emit events are instances of the `EventEmitter` class. These
objects expose an `eventEmitter.on()` function that allows one or more
functions to be attached to named events emitted by the object. Typically,
event names are camel-cased strings but any valid JavaScript property key
can be used.

When the `EventEmitter` object emits an event, all of the functions attached
to that specific event are called _synchronously_. Any values returned by the
called listeners are _ignored_ and discarded.

The following example shows a simple `EventEmitter` instance with a single
listener. The `eventEmitter.on()` method is used to register listeners, while
the `eventEmitter.emit()` method is used to trigger the event.

```js
import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');
```

## Extends

- `EventTarget`

## Extended by

- [`SignallingProtocol`](../../../Protocol/SignallingProtocol/classes/SignallingProtocol.md)
- [`ITransport`](../../../Transport/ITransport/interfaces/ITransport.md)
- [`WebSocketTransport`](../../../Transport/WebSocketTransport/classes/WebSocketTransport.md)
- [`WebSocketTransportNJS`](../../../Transport/WebSocketTransportNJS/classes/WebSocketTransportNJS.md)

## Constructors

### new EventEmitter()

> **new EventEmitter**(): [`EventEmitter`](EventEmitter.md)

#### Returns

[`EventEmitter`](EventEmitter.md)

#### Overrides

`EventTarget.constructor`

#### Defined in

[Event/EventEmitter.ts:67](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L67)

## Methods

### addListener()

> **addListener**(`eventName`, `listener`): `this`

Alias for `emitter.on(eventName, listener)`.

#### Parameters

##### eventName

`string`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Defined in

[Event/EventEmitter.ts:97](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L97)

***

### emit()

> **emit**(`eventName`, ...`args`): `boolean`

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

#### Defined in

[Event/EventEmitter.ts:263](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L263)

***

### off()

> **off**(`eventName`, `listener`): `this`

Alias for `emitter.removeListener()`.

#### Parameters

##### eventName

`string`

##### listener

(...`args`) => `void`

#### Returns

`this`

#### Defined in

[Event/EventEmitter.ts:197](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L197)

***

### on()

> **on**(`eventName`, `listener`): `this`

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

#### Defined in

[Event/EventEmitter.ts:116](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L116)

***

### once()

> **once**(`eventName`, `listener`): `this`

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

#### Defined in

[Event/EventEmitter.ts:149](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L149)

***

### removeAllListeners()

> **removeAllListeners**(`eventName`): `this`

Removes all listeners, or those of the specified `eventName`.
Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### eventName

`string`

#### Returns

`this`

#### Defined in

[Event/EventEmitter.ts:205](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L205)

***

### removeListener()

> **removeListener**(`eventName`, `listener`): `this`

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

#### Defined in

[Event/EventEmitter.ts:189](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L189)
