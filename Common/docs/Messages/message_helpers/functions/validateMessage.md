[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Messages/message\_helpers](../README.md) / validateMessage

# Function: validateMessage()

> **validateMessage**(`msg`): `null` \| `IMessageType`\<[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)\>

Defined in: [Messages/message\_helpers.ts:29](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/5fb85fd65be1623aae0ff7d1b463a27836d35a34/Common/src/Messages/message_helpers.ts#L29)

Tests that the supplied message is valid. That is contains all expected fields and
doesn't contain any unknown fields.

## Parameters

### msg

[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)

The message object to test.

## Returns

`null` \| `IMessageType`\<[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)\>

The message type from MessageRegistry of the supplied message object if it's valid, or null if invalid.
