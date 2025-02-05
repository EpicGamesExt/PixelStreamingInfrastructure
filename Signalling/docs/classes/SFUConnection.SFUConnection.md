[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../README.md) / [SFUConnection](../modules/SFUConnection.md) / SFUConnection

# Class: SFUConnection

[SFUConnection](../modules/SFUConnection.md).SFUConnection

A SFU connection to the signalling server.
An SFU can act as both a streamer and a player. It can subscribe to
streamers like a player, and other players can subscribe to the sfu.
Therefore the SFU will have a streamer id and a player id and be
registered in both streamer registries and player registries.

Interesting internals:
playerId: The player id of this connectiom.
streamerId: The streamer id of this connection.
transport: The ITransport where transport events can be subscribed to
protocol: The SignallingProtocol where signalling messages can be
subscribed to.
streaming: True when the streamer is ready to accept subscriptions.

## Hierarchy

- `EventEmitter`

  ↳ **`SFUConnection`**

## Implements

- [`IPlayer`](../interfaces/PlayerRegistry.IPlayer.md)
- [`IStreamer`](../interfaces/StreamerRegistry.IStreamer.md)
- [`IMessageLogger`](../interfaces/LoggingUtils.IMessageLogger.md)

## Table of contents

### Constructors

- [constructor](SFUConnection.SFUConnection.md#constructor)

### Properties

- [maxSubscribers](SFUConnection.SFUConnection.md#maxsubscribers)
- [playerId](SFUConnection.SFUConnection.md#playerid)
- [protocol](SFUConnection.SFUConnection.md#protocol)
- [remoteAddress](SFUConnection.SFUConnection.md#remoteaddress)
- [streamerId](SFUConnection.SFUConnection.md#streamerid)
- [streaming](SFUConnection.SFUConnection.md#streaming)
- [subscribedStreamer](SFUConnection.SFUConnection.md#subscribedstreamer)
- [subscribers](SFUConnection.SFUConnection.md#subscribers)
- [transport](SFUConnection.SFUConnection.md#transport)

### Methods

- [addListener](SFUConnection.SFUConnection.md#addlistener)
- [emit](SFUConnection.SFUConnection.md#emit)
- [getPlayerInfo](SFUConnection.SFUConnection.md#getplayerinfo)
- [getReadableIdentifier](SFUConnection.SFUConnection.md#getreadableidentifier)
- [getStreamerInfo](SFUConnection.SFUConnection.md#getstreamerinfo)
- [off](SFUConnection.SFUConnection.md#off)
- [on](SFUConnection.SFUConnection.md#on)
- [once](SFUConnection.SFUConnection.md#once)
- [removeAllListeners](SFUConnection.SFUConnection.md#removealllisteners)
- [removeListener](SFUConnection.SFUConnection.md#removelistener)
- [sendMessage](SFUConnection.SFUConnection.md#sendmessage)

## Constructors

### constructor

• **new SFUConnection**(`server`, `ws`, `remoteAddress?`): [`SFUConnection`](SFUConnection.SFUConnection.md)

Construct a new SFU connection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `server` | [`SignallingServer`](SignallingServer.SignallingServer.md) | The signalling server object that spawned this sfu. |
| `ws` | `WebSocket` | The websocket coupled to this sfu connection. |
| `remoteAddress?` | `string` | The remote address of this connection. Only used as display. |

#### Returns

[`SFUConnection`](SFUConnection.SFUConnection.md)

#### Overrides

EventEmitter.constructor

#### Defined in

[Signalling/src/SFUConnection.ts:63](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L63)

## Properties

### maxSubscribers

• **maxSubscribers**: `number`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[maxSubscribers](../interfaces/StreamerRegistry.IStreamer.md#maxsubscribers)

#### Defined in

[Signalling/src/SFUConnection.ts:48](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L48)

___

### playerId

• **playerId**: `string`

#### Implementation of

[IPlayer](../interfaces/PlayerRegistry.IPlayer.md).[playerId](../interfaces/PlayerRegistry.IPlayer.md#playerid)

#### Defined in

[Signalling/src/SFUConnection.ts:34](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L34)

___

### protocol

• **protocol**: `SignallingProtocol`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[protocol](../interfaces/StreamerRegistry.IStreamer.md#protocol)

#### Defined in

[Signalling/src/SFUConnection.ts:40](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L40)

___

### remoteAddress

• `Optional` **remoteAddress**: `string`

#### Defined in

[Signalling/src/SFUConnection.ts:46](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L46)

___

### streamerId

• **streamerId**: `string`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[streamerId](../interfaces/StreamerRegistry.IStreamer.md#streamerid)

#### Defined in

[Signalling/src/SFUConnection.ts:36](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L36)

___

### streaming

• **streaming**: `boolean`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[streaming](../interfaces/StreamerRegistry.IStreamer.md#streaming)

#### Defined in

[Signalling/src/SFUConnection.ts:42](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L42)

___

### subscribedStreamer

• **subscribedStreamer**: ``null`` \| [`IStreamer`](../interfaces/StreamerRegistry.IStreamer.md)

#### Implementation of

[IPlayer](../interfaces/PlayerRegistry.IPlayer.md).[subscribedStreamer](../interfaces/PlayerRegistry.IPlayer.md#subscribedstreamer)

#### Defined in

[Signalling/src/SFUConnection.ts:44](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L44)

___

### subscribers

• **subscribers**: `Set`\<`string`\>

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[subscribers](../interfaces/StreamerRegistry.IStreamer.md#subscribers)

#### Defined in

[Signalling/src/SFUConnection.ts:50](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L50)

___

### transport

• **transport**: `ITransport`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[transport](../interfaces/StreamerRegistry.IStreamer.md#transport)

#### Defined in

[Signalling/src/SFUConnection.ts:38](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L38)

## Methods

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

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[addListener](../interfaces/StreamerRegistry.IStreamer.md#addlistener)

#### Inherited from

EventEmitter.addListener

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:39

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

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[emit](../interfaces/StreamerRegistry.IStreamer.md#emit)

#### Inherited from

EventEmitter.emit

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:133

___

### getPlayerInfo

▸ **getPlayerInfo**(): [`IPlayerInfo`](../interfaces/PlayerRegistry.IPlayerInfo.md)

Returns a descriptive object for the REST API inspection operations.

#### Returns

[`IPlayerInfo`](../interfaces/PlayerRegistry.IPlayerInfo.md)

An IPlayerInfo object containing viewable information about this connection.

#### Implementation of

[IPlayer](../interfaces/PlayerRegistry.IPlayer.md).[getPlayerInfo](../interfaces/PlayerRegistry.IPlayer.md#getplayerinfo)

#### Defined in

[Signalling/src/SFUConnection.ts:125](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L125)

___

### getReadableIdentifier

▸ **getReadableIdentifier**(): `string`

Returns an identifier that is displayed in logs.

#### Returns

`string`

A string describing this connection.

#### Implementation of

[IMessageLogger](../interfaces/LoggingUtils.IMessageLogger.md).[getReadableIdentifier](../interfaces/LoggingUtils.IMessageLogger.md#getreadableidentifier)

#### Defined in

[Signalling/src/SFUConnection.ts:91](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L91)

___

### getStreamerInfo

▸ **getStreamerInfo**(): [`IStreamerInfo`](../interfaces/StreamerRegistry.IStreamerInfo.md)

Returns a descriptive object for the REST API inspection operations.

#### Returns

[`IStreamerInfo`](../interfaces/StreamerRegistry.IStreamerInfo.md)

An IStreamerInfo object containing viewable information about this connection.

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[getStreamerInfo](../interfaces/StreamerRegistry.IStreamer.md#getstreamerinfo)

#### Defined in

[Signalling/src/SFUConnection.ts:108](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L108)

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

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[off](../interfaces/StreamerRegistry.IStreamer.md#off)

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

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[on](../interfaces/StreamerRegistry.IStreamer.md#on)

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

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[once](../interfaces/StreamerRegistry.IStreamer.md#once)

#### Inherited from

EventEmitter.once

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:70

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

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[removeAllListeners](../interfaces/StreamerRegistry.IStreamer.md#removealllisteners)

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

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[removeListener](../interfaces/StreamerRegistry.IStreamer.md#removelistener)

#### Inherited from

EventEmitter.removeListener

#### Defined in

Common/dist/types/Event/EventEmitter.d.ts:84

___

### sendMessage

▸ **sendMessage**(`message`): `void`

Sends a signalling message to the SFU.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message` | `BaseMessage` | The message to send. |

#### Returns

`void`

#### Implementation of

[IStreamer](../interfaces/StreamerRegistry.IStreamer.md).[sendMessage](../interfaces/StreamerRegistry.IStreamer.md#sendmessage)

#### Defined in

[Signalling/src/SFUConnection.ts:99](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/SFUConnection.ts#L99)
