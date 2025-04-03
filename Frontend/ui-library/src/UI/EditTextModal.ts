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
    _events: EventTarget;

    constructor() {
        this._rootElement = this.rootElement;
        this._events = new EventTarget();
    }

    // Bind to this if you want to handle edit confirmed
    public get events(): EventTarget {
        return this._events;
    }

    public showModal(existingTextAreaContents: string) {
        if (existingTextAreaContents) {
            // Remove any null terminators from the string
            existingTextAreaContents = existingTextAreaContents.replace(/\0/g, '');
            this.textArea.value = existingTextAreaContents;
        }

        // Bring focus to the text area.
        // This will make the on-screen keyboard show if we are
        // a device that has a native on-screen keyboard.
        // If we are on a non-touch device this will give IME a valid
        // input field to work with.
        this.textArea.focus();

        // Put cursor to the end of the textarea
        this.textArea.selectionStart = this.textArea.value.length;
    }

    /**
     * Get the root element that contains either the modal (mobile) or hidden text input (desktop)
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.classList.add('modal');
            this._rootElement.appendChild(this.innerModal);
        }
        return this._rootElement;
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

            // When keyboard is typed into we want to ensure keys are not sent back to UE until we confirm.
            this.textArea.addEventListener('keypress', (event) => {
                event.stopPropagation();
            });
            this.textArea.addEventListener('keyup', (event) => {
                event.stopPropagation();
            });
            this.textArea.addEventListener('keydown', (event) => {
                event.stopPropagation();
            });
            this.textArea.addEventListener('compositionend', (event) => {
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
