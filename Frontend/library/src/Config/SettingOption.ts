// Copyright Epic Games, Inc. All Rights Reserved.

import type { OptionParametersIds } from './Config';
import { SettingBase } from './SettingBase';
import { Logger } from '../Logger/Logger';

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
        // A user may not specify the full possible value so we instead use the closest match.
        // eg ?xxx=H264 would select 'H264 level-asymmetry-allowed=1;packetization-mode=1;profile-level-id=42001f'
        if (!value || typeof value !== 'string' || value.trim() === '') {
            Logger.Warning(
                Logger.GetStackTrace(),
                `Invalid argument type for the selected codec, argument type: ${typeof value}, with value: ${value}`
            );
            return;
        }

        let filteredList = this.options.filter((option: string) => {
            return option && value.split(" ")[0] !== undefined && option.indexOf(value.split(' ')[0]) !== -1;
        });

        if (filteredList.length > 0) {
            this.value = filteredList[0];
            return;
        }

        // If no match is found, and value contains parameters, try matching only the codec
        const valueCodec = value.split(' ')[0];
        filteredList = this.options.filter((option: string) => {
            return option && option.indexOf(valueCodec) !== -1;
        });

        if (filteredList.length > 0) {
            this.value = filteredList[0];
            return;
        }

        // If still no match is found
        console.warn('No matching option found for selected value:', value);
    }
}
