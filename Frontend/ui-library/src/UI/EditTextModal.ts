// Copyright Epic Games, Inc. All Rights Reserved.

// Event fired when "Confirm" button is clicked
export class EditConfirmedEvent extends CustomEvent<String> {
    confirmedText: string;

    constructor(confirmedText: string) {
        super("EditConfirmed", {
            detail: confirmedText,
            bubbles: true,
            cancelable: true
        });
        this.confirmedText = confirmedText;
    }
}

/**
 * A modal that is shown when a UE widget is touched on mobile.
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
    _editTextHeading: HTMLElement;
    _textArea: HTMLTextAreaElement;
    _modalBtnContainer: HTMLElement;
    _cancelBtn: HTMLButtonElement;
    _confirmBtn: HTMLButtonElement;

    // Bind to this if you want to handle edit confirmed
    onEditConfirmed: EventTarget;

    constructor() {
        this._rootElement = this.rootElement;

        // When cancel is clicked, remove this modal from the DOM
        this.cancelBtn.addEventListener("click", ()=> {
            this.rootElement.remove();
        });

        // When confirm is clicked, send the contents of textarea to UE
        this.confirmBtn.addEventListener("click", ()=> {
            this.onEditConfirmed.dispatchEvent(new EditConfirmedEvent(this.textArea.value))
        });
    }

    /**
     * Get the the button containing the XR icon.
     */
    public get rootElement(): HTMLElement {
        if (!this._rootElement) {
            this._rootElement = document.createElement('div');
            this._rootElement.classList.add('innerModal');
            this._rootElement.appendChild(this.editTextHeading);
            this._rootElement.appendChild(this.textArea);
            this._rootElement.appendChild(this._modalBtnContainer);
        }
        return this._rootElement;
    }

    public get editTextHeading(): HTMLElement {
        if (!this._editTextHeading) {
            this._editTextHeading = document.createElement('h2');
            this._editTextHeading.innerText = "Edit Text";
        }
        return this._editTextHeading;
    }

    public get textArea(): HTMLTextAreaElement {
        if (!this._textArea) {
            this._textArea = document.createElement('textarea');
            this._textArea.classList.add("form-control");
            this._textArea.classList.add("modalTextArea");
            this._textArea.title = "Edit Text Area";
            this._textArea.placeholder = "UE text widget value here...";
        }
        return this._textArea;
    }

    public get modalBtnContainer(): HTMLElement {
        if (!this._modalBtnContainer) {
            this._modalBtnContainer = document.createElement('div');
            this._modalBtnContainer.classList.add("modalBtnContainer");
            this._modalBtnContainer.appendChild(this.cancelBtn);
            this._modalBtnContainer.appendChild(this.confirmBtn);
        }
        return this._modalBtnContainer;
    }

    public get cancelBtn(): HTMLElement {
        if (!this._cancelBtn) {
            this._cancelBtn = document.createElement('button');
            this._cancelBtn.classList.add("btn-flat");
            this._cancelBtn.value = "Cancel";
        }
        return this._cancelBtn;
    }

    public get confirmBtn(): HTMLElement {
        if (!this._confirmBtn) {
            this._confirmBtn = document.createElement('button');
            this._confirmBtn.classList.add("btn-flat");
            this._confirmBtn.value = "Confirm";
        }
        return this._confirmBtn;
    }
}
