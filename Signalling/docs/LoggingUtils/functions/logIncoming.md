[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [LoggingUtils](../README.md) / logIncoming

# Function: logIncoming()

> **logIncoming**(`recvr`, `message`): `void`

Defined in: [Signalling/src/LoggingUtils.ts:26](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/4dc9339cfc185a91d37d078aa9dd0951dfbae1a5/Signalling/src/LoggingUtils.ts#L26)

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
