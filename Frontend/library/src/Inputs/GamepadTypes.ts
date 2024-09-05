// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * The interface for controllers
 */
export interface Controller {
    currentState: Gamepad;
    prevState: Gamepad;
    id: number | undefined;
}

/**
 * Deep copies the values from a gamepad by first converting it to a JSON object and then back to a gamepad
 *
 * @param gamepad the original gamepad
 * @returns a new gamepad object, populated with the original gamepads values
 */
export function deepCopyGamepad(gamepad: Gamepad): Gamepad {
    return JSON.parse(
        JSON.stringify({
            buttons: gamepad.buttons.map((b) =>
                JSON.parse(
                    JSON.stringify({
                        pressed: b.pressed,
                        touched: b.touched,
                        value: b.value
                    })
                )
            ),
            axes: gamepad.axes
        })
    );
}
