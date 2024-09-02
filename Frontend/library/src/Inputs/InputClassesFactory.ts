// Copyright Epic Games, Inc. All Rights Reserved.

import { FakeTouchController } from './FakeTouchController';
import { KeyboardController } from './KeyboardController';
import { MouseController } from './MouseController';
import { TouchController } from './TouchController';
import { GamePadController } from './GamepadController';
import { Config, ControlSchemeType } from '../Config/Config';
import { Logger } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.5';
import { CoordinateConverter } from '../Util/CoordinateConverter';
import { StreamMessageController } from '../UeInstanceMessage/StreamMessageController';
import { VideoPlayer } from '../VideoPlayer/VideoPlayer';

/**
 * Class for making and setting up input class types
 */
export class InputClassesFactory {
    toStreamerMessagesProvider: StreamMessageController;
    videoElementProvider: VideoPlayer;
    coordinateConverter: CoordinateConverter;
    activeKeys: ActiveKeys = new ActiveKeys();

    /**
     * @param toStreamerMessagesProvider - Stream message instance
     * @param videoElementProvider - Video Player instance
     * @param coordinateConverter - A coordinateConverter instance
     */
    constructor(
        toStreamerMessagesProvider: StreamMessageController,
        videoElementProvider: VideoPlayer,
        coordinateConverter: CoordinateConverter
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
        const mouseController = new MouseController(
            this.toStreamerMessagesProvider,
            this.videoElementProvider,
            this.coordinateConverter,
            this.activeKeys
        );

        switch (controlScheme) {
            case ControlSchemeType.LockedMouse:
                mouseController.registerLockedMouseEvents(mouseController);
                break;
            case ControlSchemeType.HoveringMouse:
                mouseController.registerHoveringMouseEvents(mouseController);
                break;
            default:
                Logger.Info('unknown Control Scheme Type Defaulting to Locked Mouse Events');
                mouseController.registerLockedMouseEvents(mouseController);
                break;
        }

        return mouseController;
    }

    /**
     * register touch events
     * @param fakeMouseTouch - the faked mouse touch event
     */
    registerTouch(fakeMouseTouch: boolean, videoElementParentClientRect: DOMRect) {
        Logger.Info('Registering Touch');
        if (fakeMouseTouch) {
            const fakeTouchController = new FakeTouchController(
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
        const gamePadController = new GamePadController(this.toStreamerMessagesProvider);
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
