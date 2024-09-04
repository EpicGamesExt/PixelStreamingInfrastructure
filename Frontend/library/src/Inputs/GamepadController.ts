// Copyright Epic Games, Inc. All Rights Reserved.

import { StreamMessageController } from '../UeInstanceMessage/StreamMessageController';
import { Controller } from './GamepadTypes';

/**
 * Additional types for Window and Navigator
 */
declare global {
    interface Window {
        mozRequestAnimationFrame(callback: FrameRequestCallback): number;
        webkitRequestAnimationFrame(callback: FrameRequestCallback): number;
    }

    interface Navigator {
        webkitGetGamepads(): Gamepad[];
    }
}

/**
 * Gamepad layout codes enum
 */
/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export enum GamepadLayout {
    RightClusterBottomButton = 0,
    RightClusterRightButton = 1,
    RightClusterLeftButton = 2,
    RightClusterTopButton = 3,
    LeftShoulder = 4,
    RightShoulder = 5,
    LeftTrigger = 6,
    RightTrigger = 7,
    SelectOrBack = 8,
    StartOrForward = 9,
    LeftAnalogPress = 10,
    RightAnalogPress = 11,
    LeftClusterTopButton = 12,
    LeftClusterBottomButton = 13,
    LeftClusterLeftButton = 14,
    LeftClusterRightButton = 15,
    CentreButton = 16,
    // Axes
    LeftStickHorizontal = 0,
    LeftStickVertical = 1,
    RightStickHorizontal = 2,
    RightStickVertical = 3
}
/* eslint-enable @typescript-eslint/no-duplicate-enum-values */

export class GamePadController {
    controllers: Array<Controller>;
    streamMessageController: StreamMessageController;

    onGamepadConnectedListener: (event: GamepadEvent) => void;
    onGamepadDisconnectedListener: (event: GamepadEvent) => void;
    beforeUnloadListener: (event: Event) => void;
    requestAnimationFrame: (callback: FrameRequestCallback) => number;

    /**
     * @param streamMessageController - Stream message instance
     */
    constructor(streamMessageController: StreamMessageController) {
        this.streamMessageController = streamMessageController;

        this.onGamepadConnectedListener = this.gamePadConnectHandler.bind(this);
        this.onGamepadDisconnectedListener = this.gamePadDisconnectHandler.bind(this);
        this.beforeUnloadListener = this.onBeforeUnload.bind(this);
        this.requestAnimationFrame = (
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.requestAnimationFrame
        ).bind(window);

        window.addEventListener('beforeunload', this.beforeUnloadListener);

        const browserWindow = window as Window;
        if ('GamepadEvent' in browserWindow) {
            window.addEventListener('gamepadconnected', this.onGamepadConnectedListener);
            window.addEventListener('gamepaddisconnected', this.onGamepadDisconnectedListener);
        } else if ('WebKitGamepadEvent' in browserWindow) {
            window.addEventListener('webkitgamepadconnected', this.onGamepadConnectedListener);
            window.addEventListener('webkitgamepaddisconnected', this.onGamepadDisconnectedListener);
        }
        this.controllers = [];
        if (navigator.getGamepads) {
            for (const gamepad of navigator.getGamepads()) {
                if (gamepad) {
                    this.gamePadConnectHandler(new GamepadEvent('gamepadconnected', { gamepad }));
                }
            }
        }
    }

    unregisterGamePadEvents() {
        window.removeEventListener('gamepadconnected', this.onGamepadConnectedListener);
        window.removeEventListener('gamepaddisconnected', this.onGamepadDisconnectedListener);
        window.removeEventListener('webkitgamepadconnected', this.onGamepadConnectedListener);
        window.removeEventListener('webkitgamepaddisconnected', this.onGamepadDisconnectedListener);
        for (const controller of this.controllers) {
            if (controller.id !== undefined) {
                this.streamMessageController.toStreamerHandlers.get('GamepadDisconnected')([controller.id]);
            }
        }
        this.controllers = [];
    }

    private gamePadConnectHandler(gamePadEvent: GamepadEvent) {
        const gamepad = gamePadEvent.gamepad;

        const temp: Controller = {
            currentState: gamepad,
            prevState: gamepad,
            id: undefined
        };

        this.controllers.push(temp);
        this.controllers[gamepad.index].currentState = gamepad;
        this.controllers[gamepad.index].prevState = gamepad;
        window.requestAnimationFrame(() => this.updateStatus());
        this.streamMessageController.toStreamerHandlers.get('GamepadConnected')();
    }

    private gamePadDisconnectHandler(gamePadEvent: GamepadEvent) {
        const deletedController = this.controllers[gamePadEvent.gamepad.index];
        delete this.controllers[gamePadEvent.gamepad.index];
        this.controllers = this.controllers.filter((controller) => controller !== undefined);
        this.streamMessageController.toStreamerHandlers.get('GamepadDisconnected')([deletedController.id]);
    }

    private scanGamePads() {
        const gamepads = navigator.getGamepads
            ? navigator.getGamepads()
            : navigator.webkitGetGamepads
              ? navigator.webkitGetGamepads()
              : [];
        for (let i = 0; i < gamepads.length; i++) {
            if (gamepads[i] && gamepads[i].index in this.controllers) {
                this.controllers[gamepads[i].index].currentState = gamepads[i];
            }
        }
    }

    private updateStatus() {
        this.scanGamePads();
        const toStreamerHandlers = this.streamMessageController.toStreamerHandlers;

        // Iterate over multiple controllers in the case the multiple gamepads are connected
        for (const controller of this.controllers) {
            // If we haven't received an id (possible if using an older version of UE), return to original functionality
            const controllerIndex =
                controller.id === undefined ? this.controllers.indexOf(controller) : controller.id;
            const currentState = controller.currentState;
            for (let i = 0; i < controller.currentState.buttons.length; i++) {
                const currentButton = controller.currentState.buttons[i];
                const previousButton = controller.prevState.buttons[i];
                if (currentButton.pressed) {
                    // press
                    if (i == GamepadLayout.LeftTrigger) {
                        //                       UEs left analog has a button index of 5
                        toStreamerHandlers.get('GamepadAnalog')([controllerIndex, 5, currentButton.value]);
                    } else if (i == GamepadLayout.RightTrigger) {
                        //                       UEs right analog has a button index of 6
                        toStreamerHandlers.get('GamepadAnalog')([controllerIndex, 6, currentButton.value]);
                    } else {
                        toStreamerHandlers.get('GamepadButtonPressed')([
                            controllerIndex,
                            i,
                            previousButton.pressed ? 1 : 0
                        ]);
                    }
                } else if (!currentButton.pressed && previousButton.pressed) {
                    // release
                    if (i == GamepadLayout.LeftTrigger) {
                        //                       UEs left analog has a button index of 5
                        toStreamerHandlers.get('GamepadAnalog')([controllerIndex, 5, 0]);
                    } else if (i == GamepadLayout.RightTrigger) {
                        //                       UEs right analog has a button index of 6
                        toStreamerHandlers.get('GamepadAnalog')([controllerIndex, 6, 0]);
                    } else {
                        toStreamerHandlers.get('GamepadButtonReleased')([controllerIndex, i, 0]);
                    }
                }
            }
            // Iterate over gamepad axes (we will increment in lots of 2 as there is 2 axes per stick)
            for (let i = 0; i < currentState.axes.length; i += 2) {
                // Horizontal axes are even numbered
                const x = parseFloat(currentState.axes[i].toFixed(4));

                // Vertical axes are odd numbered
                // https://w3c.github.io/gamepad/#remapping Gamepad browser side standard mapping has positive down, negative up. This is downright disgusting. So we fix it.
                const y = -parseFloat(currentState.axes[i + 1].toFixed(4));

                // UE's analog axes follow the same order as the browsers, but start at index 1 so we will offset as such
                toStreamerHandlers.get('GamepadAnalog')([controllerIndex, i + 1, x]); // Horizontal axes, only offset by 1
                toStreamerHandlers.get('GamepadAnalog')([controllerIndex, i + 2, y]); // Vertical axes, offset by two (1 to match UEs axes convention and then another 1 for the vertical axes)
            }
            this.controllers[controllerIndex].prevState = currentState;
        }
        if (this.controllers.length > 0) {
            this.requestAnimationFrame(() => this.updateStatus());
        }
    }

    onGamepadResponseReceived(gamepadId: number) {
        for (const controller of this.controllers) {
            if (controller.id === undefined) {
                controller.id = gamepadId;
                break;
            }
        }
    }

    private onBeforeUnload(_: Event) {
        // When a user navigates away from the page, we need to inform UE of all the disconnecting
        // controllers
        for (const controller of this.controllers) {
            this.streamMessageController.toStreamerHandlers.get('GamepadDisconnected')([controller.id]);
        }
    }
}
