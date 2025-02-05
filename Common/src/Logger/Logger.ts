// Copyright Epic Games, Inc. All Rights Reserved.

declare global {
    interface Window {
        loggerContext: LoggerContext;
    }
}

export enum LogLevel {
    Disabled = 0,
    Error,
    Warning,
    Info,
    Debug
}

/**
 * The global context for the logger configuration.
 * This cannot be stored statically in the Logger class because we sometimes have multiple execution
 * contexts, such as stats reporting. Instead we store the logger config context on the window object
 * to be shared with any Logger instances.
 */
export class LoggerContext {
    logLevel: LogLevel = LogLevel.Debug;
    includeStack: boolean = true;
}

export interface ILogger {
    InitLogging(logLevel: number, includeStack: boolean): void;
    Debug(message: string): void;
    Info(message: string): void;
    Warning(message: string): void;
    Error(message: string): void;
}

export function overrideLogger(logger: ILogger) {
    Logger = logger;
}

/**
 * A basic console logger utilized by the Pixel Streaming frontend to allow
 * logging to the browser console.
 */
export class LoggerType implements ILogger {
    context?: LoggerContext;

    /**
     * Set the log verbosity level
     */
    InitLogging(logLevel: number, includeStack: boolean) {
        this.ValidateContext();
        this.context!.logLevel = logLevel;
        this.context!.includeStack = includeStack;
    }

    /**
     * Logging output for debugging
     * @param message - the message to be logged
     */
    Debug(message: string) {
        this.ValidateContext();
        if (this.context!.logLevel >= LogLevel.Debug) {
            this.CommonLog('Debug', message);
        }
    }

    /**
     * Basic logging output for standard messages
     * @param message - the message to be logged
     */
    Info(message: string) {
        this.ValidateContext();
        if (this.context!.logLevel >= LogLevel.Info) {
            this.CommonLog('Info', message);
        }
    }

    /**
     * Logging for warnings
     * @param message - the message to be logged
     */
    Warning(message: string) {
        this.ValidateContext();
        if (this.context!.logLevel >= LogLevel.Warning) {
            this.CommonLog('Warning', message);
        }
    }

    /**
     * Error logging
     * @param message - the message to be logged
     */
    Error(message: string) {
        this.ValidateContext();
        if (this.context!.logLevel >= LogLevel.Error) {
            this.CommonLog('Error', message);
        }
    }

    /**
     * The common log function that all other log functions call to.
     * @param level - the level of this log message.
     * @param stack - an optional stack trace string from where the log message was called.
     * @param message - the message to be logged.
     */
    private CommonLog(level: string, message: string) {
        let logMessage = `[${level}] - ${message}`;
        if (this.context!.includeStack) {
            logMessage += `\nStack: ${this.GetStackTrace()}`;
        }
        if (level === 'Error') {
            console.error(logMessage);
        } else if (level === 'Warning') {
            console.warn(logMessage);
        } else {
            console.log(logMessage);
        }
    }

    /**
     * Captures the stack and returns it
     * @returns the current stack
     */
    private GetStackTrace() {
        const error = new Error();
        let formattedStack = 'No Stack Available for this browser';

        // format the error
        if (error.stack) {
            formattedStack = error.stack.toString().replace(/Error/g, '');
        }

        return formattedStack;
    }

    /**
     * Since there can be multiple execution contexts, (stats reporting and some webxr logging comes from
     * different execution contexts we can end up with multiple static Logger instances. Here we try to
     * work around it by storing the context on the window object.
     */
    private ValidateContext() {
        if (!this.context) {
            if (typeof window == 'undefined' || !window) {
                // no window object so we can only store a local context.
                this.context = new LoggerContext();
            } else if (!window.loggerContext) {
                this.context = new LoggerContext();
                window.loggerContext = this.context;
            } else {
                this.context = window.loggerContext;
            }
        }
    }
}

export let Logger: ILogger = new LoggerType();
