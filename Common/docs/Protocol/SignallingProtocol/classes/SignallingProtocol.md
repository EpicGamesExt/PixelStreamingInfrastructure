[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Protocol/SignallingProtocol](../README.md) / SignallingProtocol

# Class: SignallingProtocol

Defined in: [Protocol/SignallingProtocol.ts:27](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/SignallingProtocol.ts#L27)

Signalling protocol for handling messages from the signalling server.

Listen on this emitter for messages. Message type is the name of the event to listen for.
Example:
     signallingProtocol.on('config', (message: Messages.config) =\> console.log(`Got a config message: ${message}`)));

The transport in this class will also emit on message events.

Events emitted on transport:
  message:
     Emitted any time a message is received by the transport. Listen on this if
     you wish to capture all messages, rather than specific messages on
     'messageHandlers'.

  out:
     Emitted when sending a message out on the transport. Similar to 'message' but
     only for when messages are sent from this endpoint. Useful for debugging.

## Extends

- [`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md)

## Constructors

### new SignallingProtocol()

> **new SignallingProtocol**(`transport`): [`SignallingProtocol`](SignallingProtocol.md)

Defined in: [Protocol/SignallingProtocol.ts:35](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/SignallingProtocol.ts#L35)

#### Parameters

##### transport

[`ITransport`](../../../Transport/ITransport/interfaces/ITransport.md)

#### Returns

[`SignallingProtocol`](SignallingProtocol.md)

#### Overrides

[`EventEmitter`](../../../Event/EventEmitter/classes/EventEmitter.md).[`constructor`](../../../Event/EventEmitter/classes/EventEmitter.md#constructors)

## Properties

### transport

> **transport**: [`ITransport`](../../../Transport/ITransport/interfaces/ITransport.md)

Defined in: [Protocol/SignallingProtocol.ts:33](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/SignallingProtocol.ts#L33)

## Accessors

### SIGNALLING\_VERSION

#### Get Signature

> **get** `static` **SIGNALLING\_VERSION**(): `string`

Defined in: [Protocol/SignallingProtocol.ts:28](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/SignallingProtocol.ts#L28)

##### Returns

`string`

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

Defined in: [Protocol/SignallingProtocol.ts:70](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/SignallingProtocol.ts#L70)

Asks the transport to connect to the given URL.

#### Parameters

##### url

`string`

The url to connect to.

#### Returns

`boolean`

True if the connection call succeeded.

***

### disconnect()

> **disconnect**(`code`?, `reason`?): `void`

Defined in: [Protocol/SignallingProtocol.ts:79](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/SignallingProtocol.ts#L79)

Asks the transport to disconnect from any connection it might have.

#### Parameters

##### code?

`number`

An optional disconnection code.

##### reason?

`string`

An optional descriptive string for the disconnect reason.

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

Defined in: [Protocol/SignallingProtocol.ts:87](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/SignallingProtocol.ts#L87)

Returns true if the transport is connected and ready to send/receive messages.

#### Returns

`boolean`

True if the protocol is connected.

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

Defined in: [Protocol/SignallingProtocol.ts:95](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Protocol/SignallingProtocol.ts#L95)

Passes a message to the transport to send to the other end.

#### Parameters

##### msg

[`BaseMessage`](../../../Messages/base_message/interfaces/BaseMessage.md)

The message to send.

#### Returns

`void`
