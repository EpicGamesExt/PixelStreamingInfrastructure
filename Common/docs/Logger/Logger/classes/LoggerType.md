[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Logger/Logger](../README.md) / LoggerType

# Class: LoggerType

A basic console logger utilized by the Pixel Streaming frontend to allow
logging to the browser console.

## Constructors

### new LoggerType()

> **new LoggerType**(): [`LoggerType`](LoggerType.md)

#### Returns

[`LoggerType`](LoggerType.md)

## Properties

### context?

> `optional` **context**: [`LoggerContext`](LoggerContext.md)

#### Defined in

[Logger/Logger.ts:33](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/457a0dc3b3c9a47385d92ffbc69496977cee683b/Common/src/Logger/Logger.ts#L33)

## Methods

### Debug()

> **Debug**(`message`): `void`

Logging output for debugging

#### Parameters

##### message

`string`

the message to be logged

#### Returns

`void`

#### Defined in

[Logger/Logger.ts:48](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/457a0dc3b3c9a47385d92ffbc69496977cee683b/Common/src/Logger/Logger.ts#L48)

***

### Error()

> **Error**(`message`): `void`

Error logging

#### Parameters

##### message

`string`

the message to be logged

#### Returns

`void`

#### Defined in

[Logger/Logger.ts:81](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/457a0dc3b3c9a47385d92ffbc69496977cee683b/Common/src/Logger/Logger.ts#L81)

***

### Info()

> **Info**(`message`): `void`

Basic logging output for standard messages

#### Parameters

##### message

`string`

the message to be logged

#### Returns

`void`

#### Defined in

[Logger/Logger.ts:59](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/457a0dc3b3c9a47385d92ffbc69496977cee683b/Common/src/Logger/Logger.ts#L59)

***

### InitLogging()

> **InitLogging**(`logLevel`, `includeStack`): `void`

Set the log verbosity level

#### Parameters

##### logLevel

`number`

##### includeStack

`boolean`

#### Returns

`void`

#### Defined in

[Logger/Logger.ts:38](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/457a0dc3b3c9a47385d92ffbc69496977cee683b/Common/src/Logger/Logger.ts#L38)

***

### Warning()

> **Warning**(`message`): `void`

Logging for warnings

#### Parameters

##### message

`string`

the message to be logged

#### Returns

`void`

#### Defined in

[Logger/Logger.ts:70](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/457a0dc3b3c9a47385d92ffbc69496977cee683b/Common/src/Logger/Logger.ts#L70)
