// Copyright Epic Games, Inc. All Rights Reserved.

import type { NumericParametersIds } from './Config';
import { SettingBase } from './SettingBase';

/**
 * A number setting object with a text label. Min and max limit the range of allowed values.
 */
export class SettingNumber<CustomIds extends string = NumericParametersIds> extends SettingBase {
    _min: number | null;
    _max: number | null;

    override id: NumericParametersIds | CustomIds;
    override onChangeEmit: (changedValue: number) => void;

    constructor(
        id: NumericParametersIds | CustomIds,
        label: string,
        description: string,
        min: number | null,
        max: number | null,
        defaultNumber: number,
        useUrlParams: boolean,

        defaultOnChangeListener: (changedValue: unknown, setting: SettingBase) => void = () => {
            /* Do nothing, to be overridden. */
        }
    ) {
        super(id, label, description, defaultNumber, defaultOnChangeListener);

        this._min = min;
        this._max = max;

        // attempt to read the number from the url params
        if (!useUrlParams || !this.hasURLParam(this.id)) {
            this.number = defaultNumber;
        } else {
            const parsedValue = Number.parseFloat(this.getURLParam(this.id));
            this.number = Number.isNaN(parsedValue) ? defaultNumber : parsedValue;
        }
        this.useUrlParams = useUrlParams;
    }

    protected override getValueAsString(): string {
        return this.number.toString();
    }

    /**
     * Set the number value (will be clamped within range).
     */
    public set number(newNumber: number) {
        this.value = this.clamp(newNumber);
    }

    /**
     * @returns The number stored.
     */
    public get number(): number {
        return this.value as number;
    }

    /**
     * Clamps a number between the min and max values (inclusive).
     * @param inNumber The number to clamp.
     * @returns The clamped number.
     */
    public clamp(inNumber: number): number {
        if (this._min == null && this._max == null) {
            return inNumber;
        } else if (this._min == null) {
            return Math.min(this._max, inNumber);
        } else if (this._max == null) {
            return Math.max(this._min, inNumber);
        } else {
            return Math.max(Math.min(this._max, inNumber), this._min);
        }
    }

    /**
     * Returns the minimum value
     * @returns The minimum value
     */
    public get min(): number {
        return this._min;
    }

    /**
     * Returns the maximum value
     * @returns The maximum value
     */
    public get max(): number {
        return this._max;
    }

    /**
     * Add a change listener to the number object.
     */
    public addOnChangedListener(onChangedFunc: (newNumber: number) => void) {
        this.onChange = onChangedFunc;
    }
}
