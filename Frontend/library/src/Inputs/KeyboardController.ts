// Copyright Epic Games, Inc. All Rights Reserved.

import { SpecialKeyCodes } from './SpecialKeyCodes';
import { Logger } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.5';
import { ActiveKeys } from './InputClassesFactory';
import { StreamMessageController } from '../UeInstanceMessage/StreamMessageController';
import { Config, Flags } from '../Config/Config';

interface ICodeToKeyCode {
    [key: string]: number;
}

/*
 * New browser APIs have moved away from KeyboardEvent.keyCode to KeyboardEvent.Code.
 * For details see: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#constants_for_keycode_value
 * We still use old KeyboardEvent.keyCode integers in the UE C++ side, so we need a way to map the new
 * string-based KeyboardEvent.Code to the old integers.
 */
export const CodeToKeyCode: ICodeToKeyCode = Object.freeze({
    Escape: 27,
    Digit0: 48,
    Digit1: 49,
    Digit2: 50,
    Digit3: 51,
    Digit4: 52,
    Digit5: 53,
    Digit6: 54,
    Digit7: 55,
    Digit8: 56,
    Digit9: 57,
    Minus: 173,
    Equal: 187,
    Backspace: 8,
    Tab: 9,
    KeyQ: 81,
    KeyW: 87,
    KeyE: 69,
    KeyR: 82,
    KeyT: 84,
    KeyY: 89,
    KeyU: 85,
    KeyI: 73,
    KeyO: 79,
    KeyP: 80,
    BracketLeft: 219,
    BracketRight: 221,
    Enter: 13,
    ControlLeft: 17,
    KeyA: 65,
    KeyS: 83,
    KeyD: 68,
    KeyF: 70,
    KeyG: 71,
    KeyH: 72,
    KeyJ: 74,
    KeyK: 75,
    KeyL: 76,
    Semicolon: 186,
    Quote: 222,
    Backquote: 192,
    ShiftLeft: 16,
    Backslash: 220,
    KeyZ: 90,
    KeyX: 88,
    KeyC: 67,
    KeyV: 86,
    KeyB: 66,
    KeyN: 78,
    KeyM: 77,
    Comma: 188,
    Period: 190,
    Slash: 191,
    ShiftRight: 253,
    AltLeft: 18,
    Space: 32,
    CapsLock: 20,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    Pause: 19,
    ScrollLock: 145,
    NumpadDivide: 111,
    NumpadMultiply: 106,
    NumpadSubtract: 109,
    NumpadAdd: 107,
    NumpadDecimal: 110,
    Numpad9: 105,
    Numpad8: 104,
    Numpad7: 103,
    Numpad6: 102,
    Numpad5: 101,
    Numpad4: 100,
    Numpad3: 99,
    Numpad2: 98,
    Numpad1: 97,
    Numpad0: 96,
    NumLock: 144,
    ControlRight: 254,
    AltRight: 255,
    Home: 36,
    End: 35,
    ArrowUp: 38,
    ArrowLeft: 37,
    ArrowRight: 39,
    ArrowDown: 40,
    PageUp: 33,
    PageDown: 34,
    Insert: 45,
    Delete: 46,
    ContextMenu: 93
});

/**
 * Handles the Keyboard Inputs for the document
 */
export class KeyboardController {
    streamMessageController: StreamMessageController;
    activeKeys: ActiveKeys;
    config: Config;

    onKeyDownListener: (event: KeyboardEvent) => void;
    onKeyUpListener: (event: KeyboardEvent) => void;
    onKeyPressListener: (event: KeyboardEvent) => void;
    onCompositionEndListener: (event: KeyboardEvent) => void;

    constructor(streamMessageController: StreamMessageController, config: Config, activeKeys: ActiveKeys) {
        this.streamMessageController = streamMessageController;
        this.config = config;
        this.activeKeys = activeKeys;

        this.onKeyDownListener = this.handleOnKeyDown.bind(this);
        this.onKeyUpListener = this.handleOnKeyUp.bind(this);
        this.onKeyPressListener = this.handleOnKeyPress.bind(this);
        this.onCompositionEndListener = this.handleOnCompositionEnd.bind(this);
    }

    registerKeyBoardEvents() {
        document.addEventListener('compositionend', this.onCompositionEndListener);
        document.addEventListener('keydown', this.onKeyDownListener);
        document.addEventListener('keyup', this.onKeyUpListener);
        //This has been deprecated as at Jun 13 2021
        document.addEventListener('keypress', this.onKeyPressListener);
    }

    unregisterKeyBoardEvents() {
        document.removeEventListener('compositionend', this.onCompositionEndListener);
        document.removeEventListener('keydown', this.onKeyDownListener);
        document.removeEventListener('keyup', this.onKeyUpListener);
        document.removeEventListener('keypress', this.onKeyPressListener);
    }

    private handleOnKeyDown(keyboardEvent: KeyboardEvent) {
        const keyCode = this.getKeycode(keyboardEvent);
        if (!keyCode || keyCode === 229) {
            return;
        }

        const toStreamerHandlers = this.streamMessageController.toStreamerHandlers;
        toStreamerHandlers.get('KeyDown')([this.getKeycode(keyboardEvent), keyboardEvent.repeat ? 1 : 0]);
        const activeKeys = this.activeKeys.getActiveKeys();
        activeKeys.push(keyCode);
        // Backspace is not considered a keypress in JavaScript but we need it
        // to be so characters may be deleted in a UE text entry field.
        if (keyCode === SpecialKeyCodes.backSpace) {
            document.dispatchEvent(
                new KeyboardEvent('keypress', {
                    charCode: SpecialKeyCodes.backSpace
                })
            );
        }

        if (this.config.isFlagEnabled(Flags.SuppressBrowserKeys) && this.isKeyCodeBrowserKey(keyCode)) {
            keyboardEvent.preventDefault();
        }
    }

    private handleOnKeyUp(keyboardEvent: KeyboardEvent) {
        const keyCode = this.getKeycode(keyboardEvent);
        if (!keyCode) {
            return;
        }

        const toStreamerHandlers = this.streamMessageController.toStreamerHandlers;
        toStreamerHandlers.get('KeyUp')([keyCode]);

        if (this.config.isFlagEnabled(Flags.SuppressBrowserKeys) && this.isKeyCodeBrowserKey(keyCode)) {
            keyboardEvent.preventDefault();
        }
    }

    private handleOnKeyPress(keyboardEvent: KeyboardEvent) {
        const keyCode = this.getKeycode(keyboardEvent);
        if (!keyCode) {
            return;
        }

        const toStreamerHandlers = this.streamMessageController.toStreamerHandlers;
        toStreamerHandlers.get('KeyPress')([keyCode]);
    }

    private handleOnCompositionEnd(compositionEvent: CompositionEvent) {
        if (compositionEvent.data && compositionEvent.data.length) {
            compositionEvent.data.split('').forEach((char) => {
                // This keydown, keypress, keyup flow is required to mimic the way characters are
                // normally triggered
                this.handleOnKeyDown(
                    new KeyboardEvent('keydown', {
                        keyCode: char.toUpperCase().charCodeAt(0),
                        charCode: char.charCodeAt(0)
                    })
                );
                this.handleOnKeyPress(
                    new KeyboardEvent('keypress', {
                        keyCode: char.toUpperCase().charCodeAt(0),
                        charCode: char.charCodeAt(0)
                    })
                );
                this.handleOnKeyUp(
                    new KeyboardEvent('keyup', {
                        keyCode: char.toUpperCase().charCodeAt(0),
                        charCode: char.charCodeAt(0)
                    })
                );
            });
        }
    }

    /**
     * Gets the Keycode of the Key pressed
     * @param keyboardEvent - Key board Event
     * @returns - the key code of the Key
     */
    private getKeycode(keyboardEvent: KeyboardEvent) {
        // If we don't have keyCode property because browser API is deprecated then use KeyboardEvent.code instead.
        // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode#constants_for_keycode_value
        if (!('keyCode' in keyboardEvent)) {
            // Convert KeyboardEvent.code string into integer-based key code for backwards compatibility reasons.
            const event = keyboardEvent as KeyboardEvent;
            if (event.code in CodeToKeyCode) {
                return CodeToKeyCode[event.code];
            } else {
                Logger.Warning(
                    `Keyboard code of ${event.code} is not supported in our mapping, ignoring this key.`
                );
                return null;
            }
        }

        // If we made it here KeyboardEvent.keyCode is still supported so we can safely use it.

        if (keyboardEvent.keyCode === SpecialKeyCodes.shift && keyboardEvent.code === 'ShiftRight') {
            return SpecialKeyCodes.rightShift;
        } else if (
            keyboardEvent.keyCode === SpecialKeyCodes.control &&
            keyboardEvent.code === 'ControlRight'
        ) {
            return SpecialKeyCodes.rightControl;
        } else if (keyboardEvent.keyCode === SpecialKeyCodes.alt && keyboardEvent.code === 'AltRight') {
            return SpecialKeyCodes.rightAlt;
        } else {
            return keyboardEvent.keyCode;
        }
    }

    /**
     * Browser keys do not have a charCode so we only need to test keyCode.
     * @param keyCode - the browser keycode number
     */
    private isKeyCodeBrowserKey(keyCode: number) {
        // Function keys or tab key are considered "browser keys" that we may wish to suppress by preventing them being process by browser.
        return (keyCode >= 112 && keyCode <= 123) || keyCode === 9;
    }
}
