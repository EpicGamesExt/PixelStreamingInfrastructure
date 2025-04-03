// Copyright Epic Games, Inc. All Rights Reserved.

/**
 * Base class for a setting that has a text label and an arbitrary setting value it stores.
 */
export class SettingBase {
    id: string;
    description: string;
    useUrlParams: boolean;
    _urlParams: Record<string, string>;
    _label: string;
    _value: unknown;
    onChange: (changedValue: unknown, setting: SettingBase) => void;
    onChangeEmit: (changedValue: unknown) => void;

    constructor(
        id: string,
        label: string,
        description: string,
        defaultSettingValue: unknown,

        defaultOnChangeListener: (changedValue: unknown, setting: SettingBase) => void = () => {
            /* Do nothing, to be overridden. */
        }
    ) {
        this.parseURLParams();

        this.onChange = defaultOnChangeListener;

        this.onChangeEmit = () => {
            /* Do nothing, to be overridden. */
        };
        this.id = id;
        this.description = description;
        this.label = label;
        this.value = defaultSettingValue;
    }

    /**
     * Set the label text for the setting.
     * @param label setting label.
     */
    public set label(inLabel: string) {
        this._label = inLabel;
        this.onChangeEmit(this._value);
    }

    /**
     * @returns The label text for the setting.
     */
    public get label(): string {
        return this._label;
    }

    /**
     * @return The setting's value.
     */
    public get value(): unknown {
        return this._value;
    }

    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    public set value(inValue: unknown) {
        this._value = inValue;
        this.onChange(this._value, this);
        this.onChangeEmit(this._value);
    }

    /**
     * Persist the setting value in URL.
     */
    public updateURLParams() {
        if (this.useUrlParams) {
            // set url params
            const urlParams = new URLSearchParams(window.location.search);
            const valueString = this.getValueAsString();
            let set = false;
            for (const [name, _value] of urlParams) {
                if (name.toLowerCase() == this.id.toLowerCase()) {
                    urlParams.set(name, valueString);
                    set = true;
                    break;
                }
            }
            if (!set) {
                urlParams.set(this.id, valueString);
            }
            window.history.replaceState(
                {},
                '',
                urlParams.toString() !== '' ? `${location.pathname}?${urlParams}` : `${location.pathname}`
            );
        }
    }

    /**
     * Allows sub types to provide their value for the url search params.
     */
    protected getValueAsString(): string {
        return '';
    }

    private parseURLParams(): void {
        this._urlParams = {};
        const params = new URLSearchParams(window.location.search);
        for (const [name, value] of params) {
            this._urlParams[name.toLowerCase()] = value;
        }
    }

    protected hasURLParam(name: string): boolean {
        return name.toLowerCase() in this._urlParams;
    }

    protected getURLParam(name: string): string {
        if (this.hasURLParam(name)) {
            return this._urlParams[name.toLowerCase()];
        }
        return '';
    }
}
