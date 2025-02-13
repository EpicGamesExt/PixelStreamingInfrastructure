[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [LoggingUtils](../README.md) / IMessageLogger

# Interface: IMessageLogger

Defined in: [Signalling/src/LoggingUtils.ts:17](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/LoggingUtils.ts#L17)

Most methods in here rely on connections implementing this interface so we can identify
who is sending or receiving etc.

## Extended by

- [`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md)
- [`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md)

## Methods

### getReadableIdentifier()

> **getReadableIdentifier**(): `string`

Defined in: [Signalling/src/LoggingUtils.ts:18](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/LoggingUtils.ts#L18)

#### Returns

`string`
