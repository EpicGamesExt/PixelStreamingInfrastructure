[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Messages/message\_helpers](../README.md) / createMessage

# Function: createMessage()

> **createMessage**(`messageType`, `params`?): [`BaseMessage`](../../base_message/interfaces/BaseMessage.md)

Defined in: [Messages/message\_helpers.ts:14](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/e5168fb9b95d09ea76d485376bd036403b747ad2/Common/src/Messages/message_helpers.ts#L14)

A helper for creating signalling messages. Takes in optional given parameters and
includes them in a message object with the 'type' field set properly for the message
type supplied.

## Parameters

### messageType

`IMessageType`\<[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)\>

A message type from MessageRegistry that indicates the type of message to create.

### params?

`object`

An optional object whose fields are added to the newly created message.

## Returns

[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)

The resulting message object.
