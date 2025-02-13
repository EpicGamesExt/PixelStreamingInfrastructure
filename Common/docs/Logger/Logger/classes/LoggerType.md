[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Logger/Logger](../README.md) / LoggerType

# Class: LoggerType

Defined in: [Logger/Logger.ts:44](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Logger/Logger.ts#L44)

A basic console logger utilized by the Pixel Streaming frontend to allow
logging to the browser console.

## Implements

- [`ILogger`](../interfaces/ILogger.md)

## Constructors

### new LoggerType()

> **new LoggerType**(): [`LoggerType`](LoggerType.md)

#### Returns

[`LoggerType`](LoggerType.md)

## Properties

### context?

> `optional` **context**: [`LoggerContext`](LoggerContext.md)

Defined in: [Logger/Logger.ts:45](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Logger/Logger.ts#L45)

## Methods

### Debug()

> **Debug**(`message`): `void`

Defined in: [Logger/Logger.ts:60](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Logger/Logger.ts#L60)

Logging output for debugging

#### Parameters

##### message

`string`

the message to be logged

#### Returns

`void`

#### Implementation of

[`ILogger`](../interfaces/ILogger.md).[`Debug`](../interfaces/ILogger.md#debug)

***

### Error()

> **Error**(`message`): `void`

Defined in: [Logger/Logger.ts:93](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Logger/Logger.ts#L93)

Error logging

#### Parameters

##### message

`string`

the message to be logged

#### Returns

`void`

#### Implementation of

[`ILogger`](../interfaces/ILogger.md).[`Error`](../interfaces/ILogger.md#error)

***

### Info()

> **Info**(`message`): `void`

Defined in: [Logger/Logger.ts:71](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Logger/Logger.ts#L71)

Basic logging output for standard messages

#### Parameters

##### message

`string`

the message to be logged

#### Returns

`void`

#### Implementation of

[`ILogger`](../interfaces/ILogger.md).[`Info`](../interfaces/ILogger.md#info)

***

### InitLogging()

> **InitLogging**(`logLevel`, `includeStack`): `void`

Defined in: [Logger/Logger.ts:50](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Logger/Logger.ts#L50)

Set the log verbosity level

#### Parameters

##### logLevel

`number`

##### includeStack

`boolean`

#### Returns

`void`

#### Implementation of

[`ILogger`](../interfaces/ILogger.md).[`InitLogging`](../interfaces/ILogger.md#initlogging)

***

### Warning()

> **Warning**(`message`): `void`

Defined in: [Logger/Logger.ts:82](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Logger/Logger.ts#L82)

Logging for warnings

#### Parameters

##### message

`string`

the message to be logged

#### Returns

`void`

#### Implementation of

[`ILogger`](../interfaces/ILogger.md).[`Warning`](../interfaces/ILogger.md#warning)
