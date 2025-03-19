// Copyright Epic Games, Inc. All Rights Reserved.
/**
 * A case insensitive, partial implementation of URLSearchParams
 */
export class IURLSearchParams {
    _urlParams: Record<string, string>;

    constructor(search: string) {
        this._urlParams = {};
        const urlParams = new URLSearchParams(search);
        for (const [name, value] of urlParams) {
            this._urlParams[name.toLowerCase()] = value;
        }
    }

    public has(name: string): boolean {
        return name.toLowerCase() in this._urlParams;
    }

    public get(name: string): string | null {
        if (this.has(name)) {
            return this._urlParams[name.toLowerCase()];
        }
        return null;
    }
}
