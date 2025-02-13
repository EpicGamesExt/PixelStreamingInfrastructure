[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [LoggingUtils](../README.md) / logIncoming

# Function: logIncoming()

> **logIncoming**(`recvr`, `message`): `void`

Defined in: [Signalling/src/LoggingUtils.ts:26](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/LoggingUtils.ts#L26)

Call to log messages received on a connection that we will handle here at the server.
Do not call this for messages being forwarded to another connection.

## Parameters

### recvr

[`IMessageLogger`](../interfaces/IMessageLogger.md)

IMessageLogger The connection the message was received on.

### message

`BaseMessage`

## Returns

`void`
