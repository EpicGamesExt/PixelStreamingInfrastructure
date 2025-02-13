[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Transport/WebSocketTransportNJS](../README.md) / WebSocketTransportNJS

# Class: WebSocketTransportNJS

Defined in: [Transport/WebSocketTransportNJS.ts:13](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L13)

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

Defined in: [Transport/WebSocketTransportNJS.ts:17](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L17)

#### Parameters

##### existingSocket?

`WebSocket`

#### Returns

[`WebSocketTransportNJS`](WebSocketTransportNJS.md)

#### Overrides

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`constructor`](../../../Event/EventEmitter/classes/EventEmitter.md#constructors)

## Properties

### onMessage()?

> `optional` **onMessage**: (`msg`) => `void`

Defined in: [Transport/WebSocketTransportNJS.ts:37](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L37)

Callback filled in by the SignallingProtocol and should be called by the transport when a new message arrives.

#### Parameters

##### msg

`string`

#### Returns

`void`

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`onMessage`](../../ITransport/interfaces/ITransport.md#onmessage)

***

### webSocket?

> `optional` **webSocket**: `WebSocket`

Defined in: [Transport/WebSocketTransportNJS.ts:15](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L15)

***

### WS\_OPEN\_STATE

> **WS\_OPEN\_STATE**: `number` = `1`

Defined in: [Transport/WebSocketTransportNJS.ts:14](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L14)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`addListener`](../../ITransport/interfaces/ITransport.md#addlistener)

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`addListener`](../../../Event/EventEmitter/classes/EventEmitter.md#addlistener)

***

### close()

> **close**(): `void`

Defined in: [Transport/WebSocketTransportNJS.ts:106](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L106)

Closes the Websocket connection

#### Returns

`void`

***

### connect()

> **connect**(`connectionURL`): `boolean`

Defined in: [Transport/WebSocketTransportNJS.ts:44](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L44)

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

***

### disconnect()

> **disconnect**(`code`?, `reason`?): `void`

Defined in: [Transport/WebSocketTransportNJS.ts:55](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L55)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`emit`](../../ITransport/interfaces/ITransport.md#emit)

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`emit`](../../../Event/EventEmitter/classes/EventEmitter.md#emit)

***

### handleOnClose()

> **handleOnClose**(`event`): `void`

Defined in: [Transport/WebSocketTransportNJS.ts:99](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L99)

Handles when the Websocket is closed

#### Parameters

##### event

`CloseEvent`

Close Event

#### Returns

`void`

***

### handleOnError()

> **handleOnError**(`event`): `void`

Defined in: [Transport/WebSocketTransportNJS.ts:91](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L91)

Handles when there is an error on the websocket

#### Parameters

##### event

`ErrorEvent`

Error Payload

#### Returns

`void`

***

### handleOnMessage()

> **handleOnMessage**(`event`): `void`

Defined in: [Transport/WebSocketTransportNJS.ts:73](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L73)

Handles what happens when a message is received

#### Parameters

##### event

`MessageEvent`

Message Received

#### Returns

`void`

***

### handleOnOpen()

> **handleOnOpen**(`event`): `void`

Defined in: [Transport/WebSocketTransportNJS.ts:83](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L83)

Handles when the Websocket is opened

#### Parameters

##### event

`Event`

Not Used

#### Returns

`void`

***

### isConnected()

> **isConnected**(): `boolean`

Defined in: [Transport/WebSocketTransportNJS.ts:65](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L65)

Should return true when the transport is connected and ready to send/receive messages.

#### Returns

`boolean`

True if the transport is connected.

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`isConnected`](../../ITransport/interfaces/ITransport.md#isconnected)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`off`](../../ITransport/interfaces/ITransport.md#off)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`on`](../../ITransport/interfaces/ITransport.md#on)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`once`](../../ITransport/interfaces/ITransport.md#once)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`removeAllListeners`](../../ITransport/interfaces/ITransport.md#removealllisteners)

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

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`removeListener`](../../ITransport/interfaces/ITransport.md#removelistener)

#### Inherited from

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`removeListener`](../../../Event/EventEmitter/classes/EventEmitter.md#removelistener)

***

### sendMessage()

> **sendMessage**(`msg`): `void`

Defined in: [Transport/WebSocketTransportNJS.ts:30](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Transport/WebSocketTransportNJS.ts#L30)

Sends a message over the websocket.

#### Parameters

##### msg

`string`

The message to send.

#### Returns

`void`

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`sendMessage`](../../ITransport/interfaces/ITransport.md#sendmessage)
