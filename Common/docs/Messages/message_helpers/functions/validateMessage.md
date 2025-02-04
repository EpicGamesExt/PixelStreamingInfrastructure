[**@epicgames-ps/lib-pixelstreamingcommon-ue5.5**](../../../README.md)

***

[@epicgames-ps/lib-pixelstreamingcommon-ue5.5](../../../README.md) / [Messages/message\_helpers](../README.md) / validateMessage

# Function: validateMessage()

> **validateMessage**(`msg`): `IMessageType`\<[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)\> \| `null`

Tests that the supplied message is valid. That is contains all expected fields and
doesn't contain any unknown fields.

## Parameters

### msg

[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)

The message object to test.

## Returns

`IMessageType`\<[`BaseMessage`](../../base_message/interfaces/BaseMessage.md)\> \| `null`

The message type from MessageRegistry of the supplied message object if it's valid, or null if invalid.

## Defined in

[Messages/message\_helpers.ts:29](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/a672d2fe0d0173d1eab643bb6d301d286cbbdbb0/Common/src/Messages/message_helpers.ts#L29)
