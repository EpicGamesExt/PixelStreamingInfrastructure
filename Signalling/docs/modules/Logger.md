[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../README.md) / Logger

# Module: Logger

## Table of contents

### Interfaces

- [IConfig](../interfaces/Logger.IConfig.md)

### Variables

- [Logger](Logger.md#logger)

### Functions

- [InitLogging](Logger.md#initlogging)

## Variables

### Logger

• **Logger**: `Logger`

The actual logger object. This is just a winston logger.
You can use InitLogging to get a decent result, or you can
completely create your own winston logger and assign it.

#### Defined in

[Signalling/src/Logger.ts:18](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/Logger.ts#L18)

## Functions

### InitLogging

▸ **InitLogging**(`config`): `void`

Call this as early as possible to setup the logging module with your
preferred settings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `config` | [`IConfig`](../interfaces/Logger.IConfig.md) | The settings to init the logger with. See IConfig interface |

#### Returns

`void`

#### Defined in

[Signalling/src/Logger.ts:68](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/Logger.ts#L68)
