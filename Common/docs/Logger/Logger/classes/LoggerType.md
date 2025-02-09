[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Logger/Logger](../README.md) / LoggerType

# Class: LoggerType

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

#### Defined in

[Logger/Logger.ts:45](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Logger/Logger.ts#L45)

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

#### Implementation of

[`ILogger`](../interfaces/ILogger.md).[`Debug`](../interfaces/ILogger.md#debug)

#### Defined in

[Logger/Logger.ts:60](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Logger/Logger.ts#L60)

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

#### Implementation of

[`ILogger`](../interfaces/ILogger.md).[`Error`](../interfaces/ILogger.md#error)

#### Defined in

[Logger/Logger.ts:93](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Logger/Logger.ts#L93)

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

#### Implementation of

[`ILogger`](../interfaces/ILogger.md).[`Info`](../interfaces/ILogger.md#info)

#### Defined in

[Logger/Logger.ts:71](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Logger/Logger.ts#L71)

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

#### Implementation of

[`ILogger`](../interfaces/ILogger.md).[`InitLogging`](../interfaces/ILogger.md#initlogging)

#### Defined in

[Logger/Logger.ts:50](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Logger/Logger.ts#L50)

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

#### Implementation of

[`ILogger`](../interfaces/ILogger.md).[`Warning`](../interfaces/ILogger.md#warning)

#### Defined in

[Logger/Logger.ts:82](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/80aa060d880a8c194a04b83f18bd1ee360ab20e1/Common/src/Logger/Logger.ts#L82)
