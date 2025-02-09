[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Transport/WebSocketTransport](../README.md) / WebSocketTransport

# Class: WebSocketTransport

The controller for the WebSocket and all associated methods

## Extends

- [`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md)

## Implements

- [`ITransport`](../../ITransport/interfaces/ITransport.md)

## Constructors

### new WebSocketTransport()

> **new WebSocketTransport**(): [`WebSocketTransport`](WebSocketTransport.md)

#### Returns

[`WebSocketTransport`](WebSocketTransport.md)

#### Overrides

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`constructor`](../../../Event/EventEmitter/classes/EventEmitter.md#constructors)

#### Defined in

[Transport/WebSocketTransport.ts:21](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L21)

## Properties

### onMessage()?

> `optional` **onMessage**: (`msg`) => `void`

Callback filled in by the SignallingProtocol and should be called by the transport when a new message arrives.

#### Parameters

##### msg

`string`

#### Returns

`void`

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`onMessage`](../../ITransport/interfaces/ITransport.md#onmessage)

#### Defined in

[Transport/WebSocketTransport.ts:36](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L36)

***

### webSocket?

> `optional` **webSocket**: `WebSocket`

#### Defined in

[Transport/WebSocketTransport.ts:19](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L19)

***

### WS\_OPEN\_STATE

> **WS\_OPEN\_STATE**: `number` = `1`

#### Defined in

[Transport/WebSocketTransport.ts:18](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L18)

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

[Event/EventEmitter.ts:97](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Event/EventEmitter.ts#L97)

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

[Transport/WebSocketTransport.ts:43](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L43)

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

[Transport/WebSocketTransport.ts:64](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L64)

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

[Event/EventEmitter.ts:263](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Event/EventEmitter.ts#L263)

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

[Transport/WebSocketTransport.ts:141](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L141)

***

### handleOnError()

> **handleOnError**(): `void`

Handles when there is an error on the websocket

#### Returns

`void`

#### Defined in

[Transport/WebSocketTransport.ts:132](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L132)

***

### handleOnMessage()

> **handleOnMessage**(`event`): `void`

Handles what happens when a message is received

#### Parameters

##### event

`MessageEvent`\<`any`\>

Message Received

#### Returns

`void`

#### Defined in

[Transport/WebSocketTransport.ts:109](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L109)

***

### handleOnMessageBinary()

> **handleOnMessageBinary**(`event`): `void`

Handles what happens when a message is received in binary form

#### Parameters

##### event

`MessageEvent`\<`Blob`\>

Message Received

#### Returns

`void`

#### Defined in

[Transport/WebSocketTransport.ts:82](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L82)

***

### handleOnOpen()

> **handleOnOpen**(): `void`

Handles when the Websocket is opened

#### Returns

`void`

#### Defined in

[Transport/WebSocketTransport.ts:124](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L124)

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

[Transport/WebSocketTransport.ts:74](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L74)

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

[Event/EventEmitter.ts:197](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Event/EventEmitter.ts#L197)

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

[Event/EventEmitter.ts:116](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Event/EventEmitter.ts#L116)

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

[Event/EventEmitter.ts:149](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Event/EventEmitter.ts#L149)

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

[Event/EventEmitter.ts:205](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Event/EventEmitter.ts#L205)

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

[Event/EventEmitter.ts:189](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Event/EventEmitter.ts#L189)

***

### sendMessage()

> **sendMessage**(`msg`): `void`

Sends a message over the websocket.

#### Parameters

##### msg

`string`

The message to send.

#### Returns

`void`

#### Implementation of

[`ITransport`](../../ITransport/interfaces/ITransport.md).[`sendMessage`](../../ITransport/interfaces/ITransport.md#sendmessage)

#### Defined in

[Transport/WebSocketTransport.ts:29](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Transport/WebSocketTransport.ts#L29)
