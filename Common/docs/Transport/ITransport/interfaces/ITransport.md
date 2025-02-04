[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Transport/ITransport](../README.md) / ITransport

# Interface: ITransport

An interface to a transport protocol that is in charge of sending and receiving signalling messages.
Implement this interface to support your custom transport. You can then supply an instance of your
transport to the constructor of SignallingProtocol during startup.

## Extends

- [`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md)

## Properties

### onMessage()?

> `optional` **onMessage**: (`msg`) => `void`

Callback filled in by the SignallingProtocol and should be called by the transport when a new message arrives.

#### Parameters

##### msg

[`BaseMessage`](../../../Messages/base_message/interfaces/BaseMessage.md)

#### Returns

`void`

#### Defined in

[Transport/ITransport.ts:19](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/ITransport.ts#L19)

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

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`addListener`](../../../Event/EventEmitter/classes/EventEmitter.md#addlistener)

#### Defined in

[Event/EventEmitter.ts:97](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L97)

***

### connect()

> **connect**(`url`): `boolean`

Connect to a given URL.

#### Parameters

##### url

`string`

The URL for the transport to connect to.

#### Returns

`boolean`

True if the connection was successful.

#### Defined in

[Transport/ITransport.ts:26](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/ITransport.ts#L26)

***

### disconnect()

> **disconnect**(`code`?, `reason`?): `void`

Disconnect this transport.

#### Parameters

##### code?

`number`

An optional disconnect code.

##### reason?

`string`

A descriptive string for the disconnect reason.

#### Returns

`void`

#### Defined in

[Transport/ITransport.ts:33](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/ITransport.ts#L33)

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

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`emit`](../../../Event/EventEmitter/classes/EventEmitter.md#emit)

#### Defined in

[Event/EventEmitter.ts:263](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L263)

***

### isConnected()

> **isConnected**(): `boolean`

Should return true when the transport is connected and ready to send/receive messages.

#### Returns

`boolean`

True if the transport is connected.

#### Defined in

[Transport/ITransport.ts:39](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/ITransport.ts#L39)

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

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`off`](../../../Event/EventEmitter/classes/EventEmitter.md#off)

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

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`on`](../../../Event/EventEmitter/classes/EventEmitter.md#on)

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

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`once`](../../../Event/EventEmitter/classes/EventEmitter.md#once)

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

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`removeAllListeners`](../../../Event/EventEmitter/classes/EventEmitter.md#removealllisteners)

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

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`removeListener`](../../../Event/EventEmitter/classes/EventEmitter.md#removelistener)

#### Defined in

[Event/EventEmitter.ts:189](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L189)

***

### sendMessage()

> **sendMessage**(`msg`): `void`

Called when the protocol wants to send a message over the transport.

#### Parameters

##### msg

[`BaseMessage`](../../../Messages/base_message/interfaces/BaseMessage.md)

The message to send over the transport.

#### Returns

`void`

#### Defined in

[Transport/ITransport.ts:14](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/ITransport.ts#L14)
