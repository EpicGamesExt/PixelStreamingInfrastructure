// Copyright Epic Games, Inc. All Rights Reserved.
import express from 'express';
import path from 'path';
import fs from 'fs';
import http from 'http';
import https from 'https';
import helmet from 'helmet';
import cors from 'cors';
import { Logger } from './Logger';
import RateLimit from 'express-rate-limit';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const hsts = require('hsts');

/**
 * Options for configuring CORS on the Express app. When `enabled` is true the
 * `cors` middleware is registered so that browser-based clients hosted on a
 * different origin (e.g. a custom frontend) can call the REST API or other
 * routes mounted on the app. Use `allowedOrigins` to restrict which origins
 * are accepted; an empty / unset list means "allow all origins" (`*`).
 */
export interface ICorsConfig {
    // If false (or unset) no CORS headers are added. Defaults to false.
    enabled?: boolean;

    // List of origins to allow. If empty/unset, all origins are allowed.
    allowedOrigins?: string[];

    // List of HTTP methods to allow. Defaults to the `cors` package default
    // (`GET,HEAD,PUT,PATCH,POST,DELETE`).
    allowedMethods?: string[];

    // List of request headers to allow. If unset, the `cors` package mirrors
    // the request's `Access-Control-Request-Headers` header.
    allowedHeaders?: string[];

    // Whether the request can include credentials (cookies, auth headers).
    // Defaults to false.
    credentials?: boolean;
}

/**
 * An interface that describes the possible options to pass to
 * WebServer.
 */
export interface IWebServerConfig {
    // The port to run the webserver on. 80 by default.
    httpPort: number;

    // The root of the serve directory. Current working directory by default.
    root: string;

    // The filename to direct connections to if none suppllied in the url. player.html by default.
    homepageFile: string;

    // An optional rate limit to prevent overloading.
    perMinuteRateLimit?: number;

    // When set an https server will be created
    httpsPort?: number;

    // The ssl key data for https
    ssl_key?: Buffer;

    // The ssl cert data for https
    ssl_cert?: Buffer;

    // If true, connections to http will be redirected to https.
    https_redirect?: boolean;

    // If true, serve static content from `root` and a homepage handler at `/`.
    // Defaults to false. When false, the HTTP listener still runs (so routes
    // registered by other subsystems, such as a REST API, remain reachable),
    // but no static files are served.
    serveStatic?: boolean;

    // Optional CORS configuration. When `cors.enabled` is true the cors
    // middleware is registered before the rate limiter and any route handlers,
    // so that all routes mounted on the app respond with CORS headers.
    cors?: ICorsConfig;
}

/**
 * An object to manage the initialization of a web server. Used to serve the
 * pixel streaming frontend.
 */
export class WebServer {
    httpServer: http.Server | undefined;
    httpsServer: https.Server | undefined;

    constructor(app: express.Express, config: IWebServerConfig) {
        Logger.debug('Starting WebServer with config: %s', config);

        // only listen on the http port if we're not using https or if we want to redirect
        if (!config.httpsPort || config.https_redirect) {
            this.httpServer = http.createServer(app);
            this.httpServer.listen(config.httpPort, () => {
                Logger.info(`Http server listening on port ${config.httpPort}`);
            });
        }

        /* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */

        // if using https listen on the given ports and setup some details
        if (config.httpsPort) {
            const options = { key: config.ssl_key, cert: config.ssl_cert };
            this.httpsServer = https.createServer(options, app);
            this.httpsServer.listen(config.httpsPort, () => {
                Logger.info(`Https server listening on port ${config.httpsPort}`);
            });

            app.use(
                helmet({
                    contentSecurityPolicy: {
                        directives: {
                            'connect-src': ['*', "'self'"]
                        }
                    }
                })
            );

            app.use(
                hsts({
                    maxAge: 15552000 // 180 days in seconds
                })
            );

            // Setup http -> https redirect if requested
            if (config.https_redirect) {
                app.use((req: any, res: any, next: any) => {
                    if (!req.secure) {
                        if (req.get('Host')) {
                            const hostAddressParts: string[] = req.get('Host').split(':') as string[];
                            let hostAddress = hostAddressParts[0];
                            if (config.httpsPort != 443) {
                                hostAddress = `${hostAddress}:${config.httpsPort}`;
                            }

                            return res.redirect(['https://', hostAddress, req.originalUrl].join(''));
                        } else {
                            Logger.error(
                                `Unable to get host name from header. Requestor ${req.ip}, url path: '${req.originalUrl}', available headers ${JSON.stringify(req.headers)}`
                            );

                            return res.status(400).send('Bad Request');
                        }
                    }
                    next();
                });
            }
        }

        if (config.cors?.enabled) {
            const corsOptions: cors.CorsOptions = {};

            if (config.cors.allowedOrigins && config.cors.allowedOrigins.length > 0) {
                corsOptions.origin = config.cors.allowedOrigins;
            }
            if (config.cors.allowedMethods && config.cors.allowedMethods.length > 0) {
                corsOptions.methods = config.cors.allowedMethods;
            }
            if (config.cors.allowedHeaders && config.cors.allowedHeaders.length > 0) {
                corsOptions.allowedHeaders = config.cors.allowedHeaders;
            }
            if (config.cors.credentials) {
                corsOptions.credentials = true;
            }

            // Register cors before the rate limiter so that preflight (OPTIONS)
            // requests are answered with CORS headers even when an origin is
            // close to the rate limit, and before any route handlers so the
            // homepage, static files, and the REST API all respond uniformly.
            app.use(cors(corsOptions));

            Logger.info(
                `CORS enabled. Allowed origins: ${corsOptions.origin ? JSON.stringify(corsOptions.origin) : '*'}`
            );
        }

        const limiter = RateLimit({
            windowMs: 60 * 1000, // 1 minute
            max: config.perMinuteRateLimit ? config.perMinuteRateLimit : 3000
        });

        // apply rate limiter to all requests. Registered before any route
        // handler so that static files, the homepage route, and any routes
        // registered on `app` by downstream code are all subject to it.
        app.use(limiter);

        if (config.serveStatic) {
            app.use(express.static(config.root));

            // Request has been sent to site root, send the homepage file
            app.get('/', function (req: any, res: any) {
                // Try a few paths, see if any resolve to a homepage file the user has set
                const p = path.resolve(path.join(config.root, config.homepageFile));
                if (fs.existsSync(p)) {
                    // Send the file for browser to display it
                    res.sendFile(p);
                    return;
                }

                // Catch file doesn't exist, and send back 404 if not
                const error = 'Unable to locate file ' + config.homepageFile;
                Logger.error(error);
                res.status(404).send(error);
                return;
            });
        }

        /* eslint-enable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
    }
}
