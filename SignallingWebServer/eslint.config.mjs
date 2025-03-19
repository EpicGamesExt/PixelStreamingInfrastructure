// Copyright Epic Games, Inc. All Rights Reserved.
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import checkCopyrightPlugin from '@epicgames-ps/eslint-plugin-check-copyright'
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';

export default tseslint.config(
    {
        ignores: [],
    },
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeCheckedOnly,
    prettierPluginRecommended,
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: 'tsconfig.json',
            },
        },
        files: ["src/**/*.ts"],
        plugins: {
            'tsdoc': tsdocPlugin,
            'copyright': checkCopyrightPlugin
        },
        rules: {
            "tsdoc/syntax": "warn",
            "@typescript-eslint/require-array-sort-compare": "error",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_"
                }
            ],
            "copyright/copyright": [
                "error",
                { 
                    notice: "Copyright Epic Games, Inc. All Rights Reserved." 
                }
            ]
        }
    }
);
