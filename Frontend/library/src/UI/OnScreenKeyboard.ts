// Copyright Epic Games, Inc. All Rights Reserved.

import { UnquantizedDenormalizedUnsignedCoord } from '../Util/CoordinateConverter';

/**
 * Class for handling on screen keyboard usage
 */
export class OnScreenKeyboard {
    // If the user focuses on a UE input widget then we show them a button to open
    // the on-screen keyboard. JavaScript security means we can only show the
    // on-screen keyboard in response to a user interaction.
    editTextButton: HTMLButtonElement;

    // A hidden input text box which is used only for focusing and opening the
    // on-screen keyboard.
    hiddenInput: HTMLInputElement;

    /**
     *
     * @param videoElementParent The div element the video player is injected into
     */
    constructor(videoElementParent: HTMLElement) {
        this.editTextButton = null;
        this.hiddenInput = null;

        if ('ontouchstart' in document.documentElement) {
            this.createOnScreenKeyboardHelpers(videoElementParent);
        }
    }

    /**
     * An override for unquantizeAndDenormalizeUnsigned
     * @param x the x axis point
     * @param y the y axis point
     * @returns unquantizeAndDenormalizeUnsigned object
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    unquantizeAndDenormalizeUnsigned(x: number, y: number): UnquantizedDenormalizedUnsignedCoord {
        return null;
    }

    /**
     * Creates on screen keyboard helpers
     * @param videoElementParent The div element the video player i injected into
     */
    createOnScreenKeyboardHelpers(videoElementParent: HTMLElement) {
        if (!this.hiddenInput) {
            this.hiddenInput = document.createElement('input');
            this.hiddenInput.id = 'hiddenInput';
            this.hiddenInput.maxLength = 0;

            // Set inline style so that users not using the UI library
            // will  still have this element display correctly
            this.hiddenInput.style.position = 'absolute';
            this.hiddenInput.style.left = '-10%';
            this.hiddenInput.style.width = '0px';
            this.hiddenInput.style.opacity = '0';

            videoElementParent.appendChild(this.hiddenInput);
        }

        if (!this.editTextButton) {
            this.editTextButton = document.createElement('button');
            this.editTextButton.id = 'editTextButton';
            this.editTextButton.innerHTML = 'edit text';
            videoElementParent.appendChild(this.editTextButton);

            // Hide the 'edit text' button.
            this.editTextButton.style.display = 'none';

            this.editTextButton.addEventListener('touchend', (event: Event) => {
                // Show the on-screen keyboard.
                this.hiddenInput.focus();
                event.preventDefault();
            });
        }
    }

    /**
     * Shows the on screen keyboard
     * @param command the command received via the data channel containing keyboard positions
     */
    showOnScreenKeyboard(command: any) {
        if (command.showOnScreenKeyboard) {
            // Show the 'edit text' button.
            this.editTextButton.style.display = 'default';
            // Place the 'edit text' button near the UE input widget.
            const pos = this.unquantizeAndDenormalizeUnsigned(command.x, command.y);
            this.editTextButton.style.top = pos.y.toString() + 'px';
            this.editTextButton.style.left = (pos.x - 40).toString() + 'px';
        } else {
            // Hide the 'edit text' button.
            this.editTextButton.style.display = 'none';
            // Hide the on-screen keyboard.
            this.hiddenInput.blur();
        }
    }
}
