[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Transport/ITransport](../README.md) / ITransport

# Interface: ITransport

Defined in: [Transport/ITransport.ts:8](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/ITransport.ts#L8)

An interface to a transport protocol that is in charge of sending and receiving signalling messages.
Implement this interface to support your custom transport. You can then supply an instance of your
transport to the constructor of SignallingProtocol during startup.

## Extends

- [`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md)

## Properties

### onMessage()?

> `optional` **onMessage**: (`msg`) => `void`

Defined in: [Transport/ITransport.ts:18](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/ITransport.ts#L18)

Callback filled in by the SignallingProtocol and should be called by the transport when a new message arrives.

#### Parameters

##### msg

`string`

#### Returns

`void`

## Methods

### addListener()

> **addListener**(`eventName`, `listener`): `this`

Defined in: [Event/EventEmitter.ts:96](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Event/EventEmitter.ts#L96)

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

***

### connect()

> **connect**(`url`): `boolean`

Defined in: [Transport/ITransport.ts:25](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/ITransport.ts#L25)

Connect to a given URL.

#### Parameters

##### url

`string`

The URL for the transport to connect to.

#### Returns

`boolean`

True if the connection was successful.

***

### disconnect()

> **disconnect**(`code`?, `reason`?): `void`

Defined in: [Transport/ITransport.ts:32](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/ITransport.ts#L32)

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

***

### emit()

> **emit**(`eventName`, ...`args`): `boolean`

Defined in: [Event/EventEmitter.ts:262](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Event/EventEmitter.ts#L262)

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

***

### isConnected()

> **isConnected**(): `boolean`

Defined in: [Transport/ITransport.ts:38](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/ITransport.ts#L38)

Should return true when the transport is connected and ready to send/receive messages.

#### Returns

`boolean`

True if the transport is connected.

***

### off()

> **off**(`eventName`, `listener`): `this`

Defined in: [Event/EventEmitter.ts:196](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Event/EventEmitter.ts#L196)

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

***

### on()

> **on**(`eventName`, `listener`): `this`

Defined in: [Event/EventEmitter.ts:115](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Event/EventEmitter.ts#L115)

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

***

### once()

> **once**(`eventName`, `listener`): `this`

Defined in: [Event/EventEmitter.ts:148](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Event/EventEmitter.ts#L148)

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

***

### removeAllListeners()

> **removeAllListeners**(`eventName`): `this`

Defined in: [Event/EventEmitter.ts:204](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Event/EventEmitter.ts#L204)

Removes all listeners, or those of the specified `eventName`.
Returns a reference to the `EventEmitter`, so that calls can be chained.

#### Parameters

##### eventName

`string`

#### Returns

`this`

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`removeAllListeners`](../../../Event/EventEmitter/classes/EventEmitter.md#removealllisteners)

***

### removeListener()

> **removeListener**(`eventName`, `listener`): `this`

Defined in: [Event/EventEmitter.ts:188](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Event/EventEmitter.ts#L188)

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

***

### sendMessage()

> **sendMessage**(`msg`): `void`

Defined in: [Transport/ITransport.ts:13](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/ITransport.ts#L13)

Called when the protocol wants to send a message over the transport.

#### Parameters

##### msg

`string`

The message to send over the transport.

#### Returns

`void`
