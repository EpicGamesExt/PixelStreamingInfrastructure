[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../README.md) / [WebServer](../modules/WebServer.md) / WebServer

# Class: WebServer

[WebServer](../modules/WebServer.md).WebServer

An object to manage the initialization of a web server. Used to serve the
pixel streaming frontend.

## Table of contents

### Constructors

- [constructor](WebServer.WebServer.md#constructor)

### Properties

- [httpServer](WebServer.WebServer.md#httpserver)
- [httpsServer](WebServer.WebServer.md#httpsserver)

## Constructors

### constructor

• **new WebServer**(`app`, `config`): [`WebServer`](WebServer.WebServer.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Express` |
| `config` | [`IWebServerConfig`](../interfaces/WebServer.IWebServerConfig.md) |

#### Returns

[`WebServer`](WebServer.WebServer.md)

#### Defined in

[Signalling/src/WebServer.ts:51](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/WebServer.ts#L51)

## Properties

### httpServer

• **httpServer**: `undefined` \| `Server`\<typeof `IncomingMessage`, typeof `ServerResponse`\>

#### Defined in

[Signalling/src/WebServer.ts:48](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/WebServer.ts#L48)

___

### httpsServer

• **httpsServer**: `undefined` \| `Server`\<typeof `IncomingMessage`, typeof `ServerResponse`\>

#### Defined in

[Signalling/src/WebServer.ts:49](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/709d6fe/Signalling/src/WebServer.ts#L49)
