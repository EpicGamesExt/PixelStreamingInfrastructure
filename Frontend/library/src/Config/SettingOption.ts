// Copyright Epic Games, Inc. All Rights Reserved.

import { Logger } from '@epicgames-ps/lib-pixelstreamingcommon-ue5.5';
import type { OptionParametersIds } from './Config';
import { SettingBase } from './SettingBase';

/**
 * An Option setting object with a text label. Allows you to specify an array of options and select one of them.
 */
export class SettingOption<CustomIds extends string = OptionParametersIds> extends SettingBase {
    id: OptionParametersIds | CustomIds;
    onChangeEmit: (changedValue: string) => void;
    _options: Array<string>;

    constructor(
        id: OptionParametersIds | CustomIds,
        label: string,
        description: string,
        defaultTextValue: string,
        options: Array<string>,
        useUrlParams: boolean,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        defaultOnChangeListener: (changedValue: unknown, setting: SettingBase) => void = () => {
            /* Do nothing, to be overridden. */
        }
    ) {
        super(id, label, description, defaultTextValue, defaultOnChangeListener);

        this.options = options;
        const stringToMatch: string = this.hasURLParam(this.id)
            ? this.getURLParam(this.id)
            : defaultTextValue;
        this.selected = stringToMatch;
        this.useUrlParams = useUrlParams;
    }

    protected getValueAsString(): string {
        return this.selected;
    }

    /**
     * Add a change listener to the select element.
     */
    public addOnChangedListener(onChangedFunc: (newValue: string) => void) {
        this.onChange = onChangedFunc;
    }

    /**
     * @returns All available options as an array
     */
    public get options(): Array<string> {
        return this._options;
    }

    /**
     * Set options
     * @param values Array of options
     */
    public set options(values: Array<string>) {
        this._options = values;
        this.onChangeEmit(this.selected);
    }

    /**
     * @returns Selected option as a string
     */
    public get selected(): string {
        return this.value as string;
    }

    /**
     * Set selected option if it matches one of the available options
     * @param value Selected option
     */
    public set selected(value: string) {
        if(value === undefined) {
            return;
        }

        // If options contains the value, then set that as selected
        if(this.options.includes(value)) {
            this.value = value;
        }
        else {
            Logger.Error(`Could not set "${value}" as the selected option for ${this.id} because it wasn't one of the options.`)
        }
    }
}
