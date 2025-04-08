[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [LoggingUtils](../README.md) / IMessageLogger

# Interface: IMessageLogger

Defined in: [Signalling/src/LoggingUtils.ts:17](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/4dc9339cfc185a91d37d078aa9dd0951dfbae1a5/Signalling/src/LoggingUtils.ts#L17)

Most methods in here rely on connections implementing this interface so we can identify
who is sending or receiving etc.

## Extended by

- [`IPlayer`](../../PlayerRegistry/interfaces/IPlayer.md)
- [`IStreamer`](../../StreamerRegistry/interfaces/IStreamer.md)

## Methods

### getReadableIdentifier()

> **getReadableIdentifier**(): `string`

Defined in: [Signalling/src/LoggingUtils.ts:18](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/blob/4dc9339cfc185a91d37d078aa9dd0951dfbae1a5/Signalling/src/LoggingUtils.ts#L18)

#### Returns

`string`
