[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Transport/WebSocketTransportNJS](../README.md) / WebSocketTransportNJS

# Class: WebSocketTransportNJS

An implementation of WebSocketTransport from pixelstreamingcommon that supports node.js websockets
This is needed because of the slight differences between the 'ws' node.js package and the websockets
supported in the browsers.
Do not use this code in a browser use 'WebSocketTransport' instead.

## Extends

- [`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md)

## Implements

- [`ITransport`](../../ITransport/interfaces/ITransport.md)

## Constructors

### new WebSocketTransportNJS()

> **new WebSocketTransportNJS**(`existingSocket`?): [`WebSocketTransportNJS`](WebSocketTransportNJS.md)

#### Parameters

##### existingSocket?

`WebSocket`

#### Returns

[`WebSocketTransportNJS`](WebSocketTransportNJS.md)

#### Overrides

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`constructor`](../../../Event/EventEmitter/classes/EventEmitter.md#constructors)

#### Defined in

[Transport/WebSocketTransportNJS.ts:18](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L18)

## Properties

### onMessage()?

> `optional` **onMessage**: (`msg`) => `void`

Callback filled in by the SignallingProtocol and should be called by the transport when a new message arrives.

#### Parameters

##### msg

[`BaseMessage`](../../../Messages/base_message/interfaces/BaseMessage.md)

#### Returns

`void`

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`onMessage`](../../ITransport/interfaces/ITransport.md#onmessage)

#### Defined in

[Transport/WebSocketTransportNJS.ts:38](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L38)

***

### webSocket?

> `optional` **webSocket**: `WebSocket`

#### Defined in

[Transport/WebSocketTransportNJS.ts:16](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L16)

***

### WS\_OPEN\_STATE

> **WS\_OPEN\_STATE**: `number` = `1`

#### Defined in

[Transport/WebSocketTransportNJS.ts:15](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L15)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`addListener`](../../ITransport/interfaces/ITransport.md#addlistener)

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`addListener`](../../../Event/EventEmitter/classes/EventEmitter.md#addlistener)

#### Defined in

[Event/EventEmitter.ts:97](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L97)

***

### close()

> **close**(): `void`

Closes the Websocket connection

#### Returns

`void`

#### Defined in

[Transport/WebSocketTransportNJS.ts:114](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L114)

***

### connect()

> **connect**(`connectionURL`): `boolean`

Connect to the signaling server

#### Parameters

##### connectionURL

`string`

The Address of the signaling server

#### Returns

`boolean`

If there is a connection

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`connect`](../../ITransport/interfaces/ITransport.md#connect)

#### Defined in

[Transport/WebSocketTransportNJS.ts:45](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L45)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`disconnect`](../../ITransport/interfaces/ITransport.md#disconnect)

#### Defined in

[Transport/WebSocketTransportNJS.ts:56](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L56)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`emit`](../../ITransport/interfaces/ITransport.md#emit)

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`emit`](../../../Event/EventEmitter/classes/EventEmitter.md#emit)

#### Defined in

[Event/EventEmitter.ts:263](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L263)

***

### handleOnClose()

> **handleOnClose**(`event`): `void`

Handles when the Websocket is closed

#### Parameters

##### event

`CloseEvent`

Close Event

#### Returns

`void`

#### Defined in

[Transport/WebSocketTransportNJS.ts:107](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L107)

***

### handleOnError()

> **handleOnError**(`event`): `void`

Handles when there is an error on the websocket

#### Parameters

##### event

`ErrorEvent`

Error Payload

#### Returns

`void`

#### Defined in

[Transport/WebSocketTransportNJS.ts:99](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L99)

***

### handleOnMessage()

> **handleOnMessage**(`event`): `void`

Handles what happens when a message is received

#### Parameters

##### event

`MessageEvent`

Message Received

#### Returns

`void`

#### Defined in

[Transport/WebSocketTransportNJS.ts:74](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L74)

***

### handleOnOpen()

> **handleOnOpen**(`event`): `void`

Handles when the Websocket is opened

#### Parameters

##### event

`Event`

Not Used

#### Returns

`void`

#### Defined in

[Transport/WebSocketTransportNJS.ts:91](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L91)

***

### isConnected()

> **isConnected**(): `boolean`

Should return true when the transport is connected and ready to send/receive messages.

#### Returns

`boolean`

True if the transport is connected.

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`isConnected`](../../ITransport/interfaces/ITransport.md#isconnected)

#### Defined in

[Transport/WebSocketTransportNJS.ts:66](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L66)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`off`](../../ITransport/interfaces/ITransport.md#off)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`on`](../../ITransport/interfaces/ITransport.md#on)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`once`](../../ITransport/interfaces/ITransport.md#once)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`removeAllListeners`](../../ITransport/interfaces/ITransport.md#removealllisteners)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`removeListener`](../../ITransport/interfaces/ITransport.md#removelistener)

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`removeListener`](../../../Event/EventEmitter/classes/EventEmitter.md#removelistener)

#### Defined in

[Event/EventEmitter.ts:189](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Event/EventEmitter.ts#L189)

***

### sendMessage()

> **sendMessage**(`msg`): `void`

Sends a message over the websocket.

#### Parameters

##### msg

[`BaseMessage`](../../../Messages/base_message/interfaces/BaseMessage.md)

The message to send.

#### Returns

`void`

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`sendMessage`](../../ITransport/interfaces/ITransport.md#sendmessage)

#### Defined in

[Transport/WebSocketTransportNJS.ts:31](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Transport/WebSocketTransportNJS.ts#L31)
