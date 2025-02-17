[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Messages/message\_helpers](../README.md) / validateMessage

# Function: validateMessage()

> **validateMessage**(`msg`): `null` \| `IMessageType`\<[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)\>

Defined in: [Messages/message\_helpers.ts:29](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/e5168fb9b95d09ea76d485376bd036403b747ad2/Common/src/Messages/message_helpers.ts#L29)

Tests that the supplied message is valid. That is contains all expected fields and
doesn't contain any unknown fields.

## Parameters

### msg

[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)

The message object to test.

## Returns

`null` \| `IMessageType`\<[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)\>

The message type from MessageRegistry of the supplied message object if it's valid, or null if invalid.
