// Copyright Epic Games, Inc. All Rights Reserved.

export enum LogLevel {
    Disabled = 0,
    Error,
    Warning,
    Info,
    Debug
}

/**
 * A basic console logger utilized by the Pixel Streaming frontend to allow
 * logging to the browser console.
 */
export class Logger {
    static logLevel: LogLevel = LogLevel.Debug;
    static includeStack: boolean = true;

    /**
     * Set the log verbosity level
     */
    static InitLogging(logLevel: number, includeStack: boolean) {
        this.logLevel = logLevel;
        this.includeStack = includeStack;
    }

    /**
     * Logging output for debugging
     * @param message - the message to be logged
     */
    static Debug(message: string) {
        if (this.logLevel >= LogLevel.Debug) {
            this.CommonLog('Debug', message);
        }
    }

    /**
     * Basic logging output for standard messages
     * @param message - the message to be logged
     */
    static Info(message: string) {
        if (this.logLevel >= LogLevel.Info) {
            this.CommonLog('Info', message);
        }
    }

    /**
     * Logging for warnings
     * @param message - the message to be logged
     */
    static Warning(message: string) {
        if (this.logLevel >= LogLevel.Warning) {
            this.CommonLog('Warning', message);
        }
    }

    /**
     * Error logging
     * @param message - the message to be logged
     */
    static Error(message: string) {
        if (this.logLevel >= LogLevel.Error) {
            this.CommonLog('Error', message);
        }
    }

    /**
     * The common log function that all other log functions call to.
     * @param level - the level of this log message.
     * @param stack - an optional stack trace string from where the log message was called.
     * @param message - the message to be logged.
     */
    static CommonLog(level: string, message: string) {
        let logMessage = `[${level}] - ${message}`;
        if (this.includeStack) {
            logMessage += `\nStack: ${Logger.GetStackTrace()}`;
        }
        console.log(logMessage);
    }

    /**
     * Captures the stack and returns it
     * @returns the current stack
     */
    private static GetStackTrace() {
        const error = new Error();
        let formattedStack = 'No Stack Available for this browser';

        // format the error
        if (error.stack) {
            formattedStack = error.stack.toString().replace(/Error/g, '');
        }

        return formattedStack;
    }
}
