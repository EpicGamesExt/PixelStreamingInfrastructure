[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [LoggingUtils](../README.md) / logOutgoing

# Function: logOutgoing()

> **logOutgoing**(`sender`, `message`): `void`

Defined in: [Signalling/src/LoggingUtils.ts:41](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/4dc9339cfc185a91d37d078aa9dd0951dfbae1a5/Signalling/src/LoggingUtils.ts#L41)

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
