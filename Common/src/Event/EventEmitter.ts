// Copyright Epic Games, Inc. All Rights Reserved.

// To match NodeJS' EventEmitter syntax without downstream code changes we need to use `any`.
// This means we need to disable linting `any` checks on this file.
//
/* eslint-disable @typescript-eslint/no-unsafe-argument */

class PixelStreamingEventListener implements EventListenerObject {
    private _callback: (...args: any[]) => void;
    private _args: any[] = [];

    constructor(callback: (...args: any[]) => void) {
        this._callback = callback;
    }

    handleEvent(_evt: Event): void {
        this._callback(...this._args);
        // Reset storage of args.
        this._args = [];
    }

    setArgs(...args: any[]) {
        this._args = args;
    }
}

interface EventListenerPair {
    callback: (...args: any[]) => void;
    eventListenerWrapper: PixelStreamingEventListener;
}

/**
 * A feature-limited, but _mostly_ drop-in replacement for Node's EventEmitter type that is implemented using EventTarget.
 *
 * For those unfamiliar with Node's EventEmitter, here is some info from the official docs:
 *
 * [In NodeJS] all objects that emit events are instances of the `EventEmitter` class. These
 * objects expose an `eventEmitter.on()` function that allows one or more
 * functions to be attached to named events emitted by the object. Typically,
 * event names are camel-cased strings but any valid JavaScript property key
 * can be used.
 *
 * When the `EventEmitter` object emits an event, all of the functions attached
 * to that specific event are called _synchronously_. Any values returned by the
 * called listeners are _ignored_ and discarded.
 *
 * The following example shows a simple `EventEmitter` instance with a single
 * listener. The `eventEmitter.on()` method is used to register listeners, while
 * the `eventEmitter.emit()` method is used to trigger the event.
 *
 * ```js
 * import { EventEmitter } from 'node:events';
 *
 * class MyEmitter extends EventEmitter {}
 *
 * const myEmitter = new MyEmitter();
 * myEmitter.on('event', () => {
 *   console.log('an event occurred!');
 * });
 * myEmitter.emit('event');
 * ```
 */
export class EventEmitter extends EventTarget {
    private _eventListeners: Map<string, Array<EventListenerPair>>;

    constructor() {
        super();
        this._eventListeners = new Map<string, Array<EventListenerPair>>();
    }

    private removeListenerInternal(eventName: string, listener: (...args: any[]) => void): this {
        if (this._eventListeners.has(eventName)) {
            const listeners: Array<EventListenerPair> | undefined = this._eventListeners.get(eventName);

            if (listeners === undefined) {
                return this;
            }

            for (let i = 0; i < listeners.length; ++i) {
                const eventPair: EventListenerPair = listeners[i];
                if (eventPair.callback === listener) {
                    // Remove from event target
                    super.removeEventListener(eventName, eventPair.eventListenerWrapper);
                    // Remove from our internal map
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
        return this;
    }

    /**
     * Alias for `emitter.on(eventName, listener)`.
     */
    addListener(eventName: string, listener: (...args: any[]) => void): this {
        return this.on(eventName, listener);
    }

    /**
     * Adds the `listener` function to the end of the listeners array for the event
     * named `eventName`.
     *
     * ```js
     * server.on('connection', (stream) => {
     *   console.log('someone connected!');
     * });
     * ```
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     *
     * @param eventName - The name of the event.
     * @param listener - The callback function
     */
    on(eventName: string, listener: (...args: any[]) => void): this {
        // Wrap our normal JS function in a event listener interface
        // so we can use it with event target.
        const eventListenerWrapper: PixelStreamingEventListener = new PixelStreamingEventListener(listener);

        super.addEventListener(eventName, eventListenerWrapper);

        // Store the event listener/function pair for later removal.
        if (!this._eventListeners.has(eventName)) {
            this._eventListeners.set(eventName, new Array<EventListenerPair>());
        }

        this._eventListeners
            .get(eventName)
            ?.push({ callback: listener, eventListenerWrapper: eventListenerWrapper });

        return this;
    }

    /**
     * Adds a **one-time** `listener` function for the event named `eventName`. The
     * next time `eventName` is triggered, this listener is removed and then invoked.
     *
     * ```js
     * server.once('connection', (stream) => {
     *   console.log('Ah, we have our first user!');
     * });
     * ```
     *
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     * @param eventName - The name of the event.
     * @param listener - The callback function
     */
    once(eventName: string, listener: (...args: any[]) => void): this {
        // Pass options so this event callback is only called once
        const eventListenerOpts: AddEventListenerOptions = { once: true };

        // Wrap our normal JS function in a event listener interface
        // so we can use it with event target and remove it from event target when this function completes.
        const eventListenerWrapper: PixelStreamingEventListener = new PixelStreamingEventListener(
            (...args: any[]) => {
                listener(args);
                this.removeListenerInternal(eventName, listener);
            }
        );

        super.addEventListener(eventName, eventListenerWrapper, eventListenerOpts);

        // Store the event listener/function pair for later removal.
        if (!this._eventListeners.has(eventName)) {
            this._eventListeners.set(eventName, new Array<EventListenerPair>());
        }

        this._eventListeners
            .get(eventName)
            ?.push({ callback: listener, eventListenerWrapper: eventListenerWrapper });

        return this;
    }

    /**
     * Removes the specified `listener` from this EventEmitter.
     *
     * ```js
     * const callback = (stream) => {
     *   console.log('someone connected!');
     * };
     * server.on('connection', callback);
     * // ...
     * server.removeListener('connection', callback);
     * ```
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     */
    removeListener(eventName: string, listener: (...args: any[]) => void): this {
        this.removeListenerInternal(eventName, listener);
        return this;
    }

    /**
     * Alias for `emitter.removeListener()`.
     */
    off(eventName: string, listener: (...args: any[]) => void): this {
        return this.removeListener(eventName, listener);
    }

    /**
     * Removes all listeners, or those of the specified `eventName`.
     * Returns a reference to the `EventEmitter`, so that calls can be chained.
     */
    removeAllListeners(eventName: string): this {
        if (this._eventListeners.has(eventName)) {
            const listeners: Array<EventListenerPair> | undefined = this._eventListeners.get(eventName);

            if (listeners === undefined) {
                return this;
            }

            // Remove each event listener from the event target
            for (const listenerPair of listeners) {
                this.removeEventListener(eventName, listenerPair.eventListenerWrapper);
            }

            // Remove all event listeners mapped to this event from our internal map
            this._eventListeners.delete(eventName);
        }
        return this;
    }

    /**
     * Synchronously calls each of the listeners registered for the event named `eventName`, in the order they were registered, passing the supplied arguments
     * to each.
     *
     * Returns `true` if the event had listeners, `false` otherwise.
     *
     * ```js
     * import { EventEmitter } from 'node:events';
     * const myEmitter = new EventEmitter();
     *
     * // First listener
     * myEmitter.on('event', function firstListener() {
     *   console.log('Helloooo! first listener');
     * });
     * // Second listener
     * myEmitter.on('event', function secondListener(arg1, arg2) {
     *   console.log(`event with parameters ${arg1}, ${arg2} in second listener`);
     * });
     * // Third listener
     * myEmitter.on('event', function thirdListener(...args) {
     *   const parameters = args.join(', ');
     *   console.log(`event with parameters ${parameters} in third listener`);
     * });
     *
     * console.log(myEmitter.listeners('event'));
     *
     * myEmitter.emit('event', 1, 2, 3, 4, 5);
     *
     * // Prints:
     * // [
     * //   [Function: firstListener],
     * //   [Function: secondListener],
     * //   [Function: thirdListener]
     * // ]
     * // Helloooo! first listener
     * // event with parameters 1, 2 in second listener
     * // event with parameters 1, 2, 3, 4, 5 in third listener
     * ```
     */
    emit(eventName: string, ...args: any[]): boolean {
        if (this._eventListeners.has(eventName)) {
            const listeners: Array<EventListenerPair> | undefined = this._eventListeners.get(eventName);

            if (listeners === undefined) {
                return false;
            }

            // Ensure each of our listeners have the args the callback injected
            for (const listenerPair of listeners) {
                listenerPair.eventListenerWrapper.setArgs(...args);
            }

            // Fire off the actual event
            super.dispatchEvent(new Event(eventName));

            return true;
        }
        return false;
    }
}
