// Copyright Epic Games, Inc. All Rights Reserved.

import { TouchControllerFake } from './TouchControllerFake';
import { KeyboardController } from './KeyboardController';
import { MouseController } from './MouseController';
import { MouseControllerLocked } from './MouseControllerLocked';
import { MouseControllerHovering } from './MouseControllerHovering';
import { TouchController } from './TouchController';
import { GamepadController } from './GamepadController';
import { Config, ControlSchemeType } from '../Config/Config';
import { Logger } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.5';
import { InputCoordTranslator } from '../Util/InputCoordTranslator';
import { StreamMessageController } from '../UeInstanceMessage/StreamMessageController';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

/**
 * Class for making and setting up input class types
 */
export class InputClassesFactory {
    toStreamerMessagesProvider: StreamMessageController;
    videoElementProvider: VideoPlayer;
    coordinateConverter: InputCoordTranslator;
    activeKeys: ActiveKeys = new ActiveKeys();

    /**
     * @param toStreamerMessagesProvider - Stream message instance
     * @param videoElementProvider - Video Player instance
     * @param coordinateConverter - A coordinateConverter instance
     */
    constructor(
        toStreamerMessagesProvider: StreamMessageController,
        videoElementProvider: VideoPlayer,
        coordinateConverter: InputCoordTranslator
    ) {
        this.toStreamerMessagesProvider = toStreamerMessagesProvider;
        this.videoElementProvider = videoElementProvider;
        this.coordinateConverter = coordinateConverter;
    }

    /**
     * Registers browser key events.
     */
    registerKeyBoard(config: Config) {
        Logger.Info('Register Keyboard Events');
        const keyboardController = new KeyboardController(
            this.toStreamerMessagesProvider,
            config,
            this.activeKeys
        );
        keyboardController.registerKeyBoardEvents();
        return keyboardController;
    }

    /**
     * register mouse events based on a control type
     * @param controlScheme - if the mouse is either hovering or locked
     */
    registerMouse(controlScheme: ControlSchemeType) {
        Logger.Info('Register Mouse Events');
        let mouseController: MouseController;
        if (controlScheme == ControlSchemeType.HoveringMouse) {
            mouseController = new MouseControllerHovering(
                this.toStreamerMessagesProvider,
                this.videoElementProvider,
                this.coordinateConverter,
                this.activeKeys
            );
        } else {
            mouseController = new MouseControllerLocked(
                this.toStreamerMessagesProvider,
                this.videoElementProvider,
                this.coordinateConverter,
                this.activeKeys
            );
        }

        mouseController.registerMouseEvents();
        return mouseController;
    }

    /**
     * register touch events
     * @param fakeMouseTouch - the faked mouse touch event
     */
    registerTouch(fakeMouseTouch: boolean, videoElementParentClientRect: DOMRect) {
        Logger.Info('Registering Touch');
        if (fakeMouseTouch) {
            const fakeTouchController = new TouchControllerFake(
                this.toStreamerMessagesProvider,
                this.videoElementProvider,
                this.coordinateConverter
            );
            fakeTouchController.setVideoElementParentClientRect(videoElementParentClientRect);
            return fakeTouchController;
        } else {
            return new TouchController(
                this.toStreamerMessagesProvider,
                this.videoElementProvider,
                this.coordinateConverter
            );
        }
    }

    /**
     * registers a gamepad
     */
    registerGamePad() {
        Logger.Info('Register Game Pad');
        const gamePadController = new GamepadController(this.toStreamerMessagesProvider);
        return gamePadController;
    }
}

/**
 * A class that keeps track of current active keys
 */
export class ActiveKeys {
    activeKeys: Array<number> = [];
    constructor() {
        this.activeKeys = [];
    }

    /**
     * Get the current array of active keys
     * @returns - an array of active keys
     */
    getActiveKeys(): number[] {
        return this.activeKeys;
    }
}
