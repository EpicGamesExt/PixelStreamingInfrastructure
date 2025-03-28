// Copyright Epic Games, Inc. All Rights Reserved.

// Event fired when "Confirm" button is clicked
export class EditConfirmedEvent extends CustomEvent<String> {
    confirmedText: string;

    constructor(confirmedText: string) {
        super('editConfirmed', {
            detail: confirmedText,
            bubbles: true,
            cancelable: true
        });
        this.confirmedText = confirmedText;
    }
}

/**
 * A modal that is shown when a UE widget is touched on mobile.
 * or
 * A hidden (offscreen) input field that is shown on non-touch devices (e.g. Desktop)
 * when a UE widget is clicked. The hidden text field is used so non-latin character
 * input can be composed using IME assistance (which requires an input field).
 *
 * The reason this modal is required is that on mobile typing uses
 * an on-screen keyboard, which requires a valid input text area/input
 * to be focused to summon it. Therefore we show this modal which has
 * the contents of the UE widget, populate its text area with the contents
 * of the UE widget, then focus the text area to finally summon the native
 * on-screen keyboard.
 *
 * The modal also contains:
 * 1) A cancel button - this closes the modal
 * 2) A confirm button - this submits the edit back to the UE side
 */
export class EditTextModal {
    _rootElement: HTMLElement;
    _innerModal: HTMLElement;
    _editTextHeading: HTMLElement;
    _textArea: HTMLTextAreaElement;
    _modalBtnContainer: HTMLElement;
    _cancelBtn: HTMLButtonElement;
    _confirmBtn: HTMLButtonElement;
    _hiddenTextInput: HTMLInputElement;
    _events: EventTarget;
    _isTouchDevice: boolean;

    constructor() {
        this._rootElement = this.rootElement;
        this._events = new EventTarget();
        this._isTouchDevice = 'ontouchstart' in window;
    }

    // Bind to this if you want to handle edit confirmed
    public get events(): EventTarget {
        return this._events;
    }

    public showOnScreenKeyboard(existingTextAreaContents: string, textBoxX: number, textBoxY: number) {
        const editableText: HTMLInputElement | HTMLTextAreaElement = this._isTouchDevice
            ? this.textArea
            : this.hiddenTextInput;

        // Populate input text area with whatever was on the UE side
        editableText.value = existingTextAreaContents;

        // Bring focus to the text area.
        // This will make the on-screen keyboard show if we are
        // a device that has a native on-screen keyboard.
        // If we are on a non-touch device this will give IME a valid
        // input field to work with.
        editableText.focus();

        // Remove the hidden text input when we click on anything else
        if (!this._isTouchDevice) {
            // Position the input text field to roughly match UE
            this._hiddenTextInput.style.top = `${textBoxY}px`;
            this._hiddenTextInput.style.left = `${textBoxX}px`;

            // "Clicked away" is when the user does their next click after the current one
            // e.g. on the next "mousedown" remove the textbox
            const onClickedAway = (event: Event) => {
                if (this._hiddenTextInput && this._hiddenTextInput !== undefined) {
                    if (event.target !== this._hiddenTextInput) {
                        this._rootElement.remove();
                    }
                }
            };

            // Hack: UE x/y returned by this even is often really bad
            // so use the browser mouse position for the box instead
            const onMouseMove = (event: MouseEvent) => {
                this._hiddenTextInput.style.top = `${event.clientY + 40}px`;
                this._hiddenTextInput.style.left = `${event.clientX}px`;
            };

            // Idea: Show modal on composition start?

            // Only fire these events once
            window.addEventListener('mousedown', onClickedAway, { once: true });
            window.addEventListener('mousemove', onMouseMove, { once: true });
        }
    }

    /**
     * Get the root element that contains either the modal (mobile) or hidden text input (desktop)
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            // Mobile/touch device
            if (this._isTouchDevice) {
                this._rootElement = document.createElement('div');
                this._rootElement.classList.add('modal');
                this._rootElement.appendChild(this.innerModal);
            }
            // Desktop/non-touch device
            else {
                this._rootElement = this.hiddenTextInput;
            }
        }
        return this._rootElement;
    }

    public get hiddenTextInput(): HTMLInputElement {
        if (!this._hiddenTextInput) {
            this._hiddenTextInput = document.createElement('input');
            this._hiddenTextInput.type = 'text';

            // Set inline style as this is not a styling choice
            // that should be customized, but is rather a functional
            // choice to hide this input element offscreen
            this._hiddenTextInput.style.position = 'absolute';

            // Ensure "Enter" key ends the text input
            this._hiddenTextInput.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    this._rootElement.remove();
                }
            });
        }
        return this._hiddenTextInput;
    }

    public get innerModal(): HTMLElement {
        if (!this._innerModal) {
            this._innerModal = document.createElement('div');
            this._innerModal.classList.add('innerModal');
            this._innerModal.appendChild(this.editTextHeading);
            this._innerModal.appendChild(this.textArea);
            this._innerModal.appendChild(this.modalBtnContainer);
        }
        return this._innerModal;
    }

    public get editTextHeading(): HTMLElement {
        if (!this._editTextHeading) {
            this._editTextHeading = document.createElement('h2');
            this._editTextHeading.innerText = 'Edit Text';
        }
        return this._editTextHeading;
    }

    public get textArea(): HTMLTextAreaElement {
        if (!this._textArea) {
            this._textArea = document.createElement('textarea');
            this._textArea.classList.add('form-control');
            this._textArea.classList.add('modalTextArea');
            this._textArea.title = 'Edit Text Area';
            this._textArea.placeholder = 'UE text widget value here...';

            // When keyboard is typed into we want to ensure keys are not sent back to UE until we confirm
            // Most keys are not sent back to UE on mobile keyboard anyway, but backspace is so we should
            // prevent it from bubbling to our global keyboard input controller.
            this.textArea.addEventListener('keypress', (event) => {
                event.stopPropagation();
            });
            this.textArea.addEventListener('keyup', (event) => {
                event.stopPropagation();
            });
            this.textArea.addEventListener('keydown', (event) => {
                event.stopPropagation();
            });
        }
        return this._textArea;
    }

    public get modalBtnContainer(): HTMLElement {
        if (!this._modalBtnContainer) {
            this._modalBtnContainer = document.createElement('div');
            this._modalBtnContainer.classList.add('modalBtnContainer');
            this._modalBtnContainer.appendChild(this.cancelBtn);
            this._modalBtnContainer.appendChild(this.confirmBtn);
        }
        return this._modalBtnContainer;
    }

    public get cancelBtn(): HTMLElement {
        if (!this._cancelBtn) {
            this._cancelBtn = document.createElement('button');
            this._cancelBtn.classList.add('btn-flat');
            this._cancelBtn.innerText = 'Cancel';

            // When cancel is clicked, remove this modal from the DOM
            this._cancelBtn.addEventListener('click', (event) => {
                this.rootElement.remove();

                // Ensure the click/tap does not go back to UE
                event.stopPropagation();
            });
        }
        return this._cancelBtn;
    }

    public get confirmBtn(): HTMLElement {
        if (!this._confirmBtn) {
            this._confirmBtn = document.createElement('button');
            this._confirmBtn.classList.add('btn-flat');
            this._confirmBtn.innerText = 'Confirm';

            // When confirm is clicked, remove from DOM and send the contents of textarea to UE
            this._confirmBtn.addEventListener('click', (event) => {
                this.events.dispatchEvent(new EditConfirmedEvent(this.textArea.value));
                this.rootElement.remove();

                // Ensure the click/tap does not go back to UE
                event.stopPropagation();
            });
        }
        return this._confirmBtn;
    }
}
