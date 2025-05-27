// Copyright Epic Games, Inc. All Rights Reserved.
import { SignallingServer } from '@epicgames-ps/lib-pixelstreamingsignalling-ue5.6';

/* eslint-disable @typescript-eslint/no-unsafe-call,
                  @typescript-eslint/no-unsafe-member-access */

export default function (signallingServer: SignallingServer) {
    const operations = {
        GET
    };

    function GET(req: any, res: any, _next: any) {
        res.status(200).json({
            config: signallingServer.config,
            protocolConfig: signallingServer.protocolConfig
        });
    }

    GET.apiDoc = {
        summary: 'Returns the current configuration of the server.',
        operationId: 'getConfig',
        responses: {
            200: {
                description: 'The current configuration of the server.',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                config: {
                                    type: 'object'
                                },
                                protocol: {
                                    type: 'object'
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    return operations;
}
