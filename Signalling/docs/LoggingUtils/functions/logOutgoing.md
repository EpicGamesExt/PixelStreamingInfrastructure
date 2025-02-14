[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [LoggingUtils](../README.md) / logOutgoing

# Function: logOutgoing()

> **logOutgoing**(`sender`, `message`): `void`

Defined in: [Signalling/src/LoggingUtils.ts:41](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/LoggingUtils.ts#L41)

Call to log messages created here at the server and being sent to the connection.
Do not call this for messages being forwarded to this connection.

## Parameters

### sender

[`IMessageLogger`](../interfaces/IMessageLogger.md)

IMessageLogger The connection the message is being sent to.

### message

`BaseMessage`

## Returns

`void`
