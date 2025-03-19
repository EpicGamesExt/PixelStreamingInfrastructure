// Copyright Epic Games, Inc. All Rights Reserved.

import type { FlagsIds } from './Config';
import { SettingBase } from './SettingBase';

/**
 * A boolean flag setting object with a text label.
 */
export class SettingFlag<CustomIds extends string = FlagsIds> extends SettingBase {
    override id: FlagsIds | CustomIds;
    override onChangeEmit: (changedValue: boolean) => void;

    constructor(
        id: FlagsIds | CustomIds,
        label: string,
        description: string,
        defaultFlagValue: boolean,
        useUrlParams: boolean,

        defaultOnChangeListener: (changedValue: unknown, setting: SettingBase) => void = () => {
            /* Do nothing, to be overridden. */
        }
    ) {
        super(id, label, description, defaultFlagValue, defaultOnChangeListener);

        if (!useUrlParams || !this.hasURLParam(this.id)) {
            this.flag = defaultFlagValue;
        } else {
            // parse flag from url parameters
            const urlParamFlag = this.getURLParam(this.id);
            this.flag = urlParamFlag.toLowerCase() != 'false';
        }
        this.useUrlParams = useUrlParams;
    }

    protected override getValueAsString(): string {
        return this.flag ? 'true' : 'false';
    }

    /**
     * Enables this flag.
     */
    public enable(): void {
        this.flag = true;
    }

    /**
     * @return The setting's value.
     */
    public get flag(): boolean {
        return !!this.value;
    }

    /**
     * Update the setting's stored value.
     * @param inValue The new value for the setting.
     */
    public set flag(inValue: boolean) {
        this.value = inValue;
    }
}
