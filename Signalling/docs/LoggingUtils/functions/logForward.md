[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [LoggingUtils](../README.md) / logForward

# Function: logForward()

> **logForward**(`recvr`, `target`, `message`): `void`

Defined in: [Signalling/src/LoggingUtils.ts:56](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/4dc9339cfc185a91d37d078aa9dd0951dfbae1a5/Signalling/src/LoggingUtils.ts#L56)

Call this for messages being forwarded to this connection. That is messages received on
one connection and being sent to another with only minor changes being made.

## Parameters

### recvr

[`IMessageLogger`](../interfaces/IMessageLogger.md)

The connection the message was received on.

### target

[`IMessageLogger`](../interfaces/IMessageLogger.md)

The connection the message is being sent to.

### message

`BaseMessage`

## Returns

`void`
