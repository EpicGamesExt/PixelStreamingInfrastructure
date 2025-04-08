[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [LoggingUtils](../README.md) / createHandlerListener

# Function: createHandlerListener()

> **createHandlerListener**(`obj`, `handler`): (`message`) => `void`

Defined in: [Signalling/src/LoggingUtils.ts:74](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/4dc9339cfc185a91d37d078aa9dd0951dfbae1a5/Signalling/src/LoggingUtils.ts#L74)

We don't want to log every incoming and outgoing messages. This is because some messages are simply
forwarded to other connections. This results in duplicated spam. So we only want to log incoming
messages that we handle internally, and any messages that we forward we only log once for the recv
and send events.
This creation method allows a simple way to enforce this. Any events we handle directly will
be preceded by the logging call.

## Parameters

### obj

[`IMessageLogger`](../interfaces/IMessageLogger.md)

### handler

(`message`) => `void`

## Returns

`Function`

### Parameters

#### message

`BaseMessage`

### Returns

`void`
