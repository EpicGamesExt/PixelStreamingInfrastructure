// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * The base interface for all input controllers.
 * Since controllers mostly just register events and handle them the external interface is limited
 * to register/unregister
 */
export interface IInputController {
    /**
     * Tells the controller to register itself to the events it needs to operate.
     */
    register(): void;

    /**
     * Tells the cnotroller to unregister from the events it previously registered to.
     * No behaviour through the controller should happen past this point until register is called again.
     */
    unregister(): void;
}
