// Copyright Epic Games, Inc. All Rights Reserved.

import type { TextParametersIds } from './Config';
import { SettingBase } from './SettingBase';

/**
 * A text setting object with a text label.
 */
export class SettingText<CustomIds extends string = TextParametersIds> extends SettingBase {
    id: TextParametersIds | CustomIds;
    onChangeEmit: (changedValue: string) => void;
    useUrlParams: boolean;

    constructor(
        id: TextParametersIds | CustomIds,
        label: string,
        description: string,
        defaultTextValue: string,
        useUrlParams: boolean,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        defaultOnChangeListener: (changedValue: unknown, setting: SettingBase) => void = () => {
            /* Do nothing, to be overridden. */
        }
    ) {
        super(id, label, description, defaultTextValue, defaultOnChangeListener);

        if (!useUrlParams || !this.hasURLParam(this.id)) {
            this.text = defaultTextValue;
        } else {
            // parse flag from url parameters
            this.text = this.getURLParam(this.id);
        }
        this.useUrlParams = useUrlParams;
    }

    protected getValueAsString(): string {
        return this.text;
    }

    /**
     * @return The setting's value.
     */
    public get text(): string {
        return this.value as string;
    }

    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    public set text(inValue: string) {
        this.value = inValue;
    }
}
