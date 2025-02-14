[**@epicgames-ps/lib-pixelstreamingsignalling-ue5.5**](../../README.md)

***

[@epicgames-ps/lib-pixelstreamingsignalling-ue5.5](../../README.md) / [WebServer](../README.md) / WebServer

# Class: WebServer

Defined in: [Signalling/src/WebServer.ts:47](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/WebServer.ts#L47)

An object to manage the initialization of a web server. Used to serve the
pixel streaming frontend.

## Constructors

### new WebServer()

> **new WebServer**(`app`, `config`): [`WebServer`](WebServer.md)

Defined in: [Signalling/src/WebServer.ts:51](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/WebServer.ts#L51)

#### Parameters

##### app

`Express`

##### config

[`IWebServerConfig`](../interfaces/IWebServerConfig.md)

#### Returns

[`WebServer`](WebServer.md)

## Properties

### httpServer

> **httpServer**: `undefined` \| `Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\>

Defined in: [Signalling/src/WebServer.ts:48](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/WebServer.ts#L48)

***

### httpsServer

> **httpsServer**: `undefined` \| `Server`\<*typeof* `IncomingMessage`, *typeof* `ServerResponse`\>

Defined in: [Signalling/src/WebServer.ts:49](https://github.com/mcottontensor/PixelStreamingInfrastructure/blob/1c2e89b140492a0711bcb88268b18a037a27dc45/Signalling/src/WebServer.ts#L49)
