import { stringify, beautify } from './Utils';
import { IProtoLogObj } from './LoggingUtils';
import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { TransformableInfo } from 'logform';
import { BaseMessage } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.5';

const { combine, timestamp, printf, colorize, splat } = winston.format;

/**
 * The actual logger object. This is just a winston logger.
 * You can use InitLogging to get a decent result, or you can
 * completely create your own winston logger and assign it.
 */
export let Logger = createDefaultLogger();

export interface IConfig {
    // the directory to store log files
    logDir?: string;

    // if true, every message will be logged to the console in a condensed form
    logMessagesToConsole?: string;

    // the minimum log level for console messages
    logLevelConsole?: string;

    // the minimum log level for file messages
    logLevelFile?: string;
}

/**
 * Call this as early as possible to setup the logging module with your
 * preferred settings.
 * @param config - The settings to init the logger with. See IConfig interface
 */
export function InitLogging(config: IConfig): void {
    const logDir = config.logDir || 'logs';
    const logLevelConsole = config.logLevelConsole || 'info';
    const logLevelFile = config.logLevelFile || 'info';
    logMessagesToConsole = config.logMessagesToConsole || 'none';

    Logger = winston.createLogger({
        transports: [createConsoleTransport(logLevelConsole), createFileTransport(logDir, logLevelFile)]
    });
}

let logMessagesToConsole = 'none';

function createDefaultLogger() {
    return winston.createLogger({
        level: 'info',
        format: winston.format.cli(),
        transports: [new winston.transports.Console()]
    });
}

function createConsoleTransport(logLevel: string) {
    return new winston.transports.Console({
        level: logLevel,
        format: combine(
            createProtoMessageFilter()(),
            timestamp({ format: 'HH:mm:ss.SSS' }),
            colorize(),
            splat(),
            createConsoleFormat()
        )
    });
}

function isLogObject(object: any): object is IProtoLogObj {
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    return (
        'event' in object &&
        object.event == 'proto_message' &&
        'direction' in object &&
        'protoMessage' in object
    );
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
}

function createConsoleFormat() {
    return printf((logObj: TransformableInfo) => {
        const prefix = `[${logObj.timestamp}] ${logObj.level}: `;
        if (typeof logObj.message === 'string') {
            return prefix + logObj.message;
        } else if (isLogObject(logObj.message)) {
            const { direction, receiver, sender, target, protoMessage } = logObj.message;
            switch (direction) {
                case 'incoming':
                    return prefix + `> ${receiver} :: ${formatMessageForConsole(protoMessage)}`;
                case 'outgoing':
                    return prefix + `< ${sender} :: ${formatMessageForConsole(protoMessage)}`;
                case 'forward':
                    return prefix + `${receiver} > ${target} :: ${formatMessageForConsole(protoMessage)}`;
                default:
                    return prefix + `Unknown proto direction: ${direction}`;
            }
        }
        return '';
    });
}

function formatMessageForConsole(message: BaseMessage) {
    switch (logMessagesToConsole) {
        case 'verbose':
            return stringify(message);
        case 'formatted':
            return beautify(message);
        default:
            return `[${message.type}]`;
    }
}

function createProtoMessageFilter() {
    return winston.format((info: TransformableInfo, _opts: any) => {
        if (typeof info.message !== 'string' && isLogObject(info.message) && logMessagesToConsole == 'none') {
            return false;
        }
        return info;
    });
}

function createFileTransport(logDirPath: string, logLevel: string) {
    return new winston.transports.DailyRotateFile({
        level: logLevel,
        filename: path.join(logDirPath, 'server-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        maxFiles: '14d',
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), splat(), createFileFormat())
    });
}

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
function createFileFormat() {
    return printf((logObj: TransformableInfo) => {
        if (typeof logObj.message === 'string') {
            const { timestamp, level, message } = logObj;
            return JSON.stringify({
                timestamp,
                level,
                event: 'message',
                message
            });
        } else if (isLogObject(logObj.message)) {
            const { timestamp, level, message } = logObj;
            return JSON.stringify({
                timestamp,
                level,
                ...message
            });
        }
        return '';
    });
}
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
