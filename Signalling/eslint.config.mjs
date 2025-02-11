// Copyright Epic Games, Inc. All Rights Reserved.
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsdocPlugin from 'eslint-plugin-tsdoc';
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
                project: 'tsconfig.cjs.json',
            },
        },
        files: ["src/**/*.ts"],
        plugins: {
            'tsdoc': tsdocPlugin,
        },
        rules: {
            "tsdoc/syntax": "warn",
            "@typescript-eslint/require-array-sort-compare": "error",
            "no-unused-vars": "off",
            "@typescript-eslint/no-misused-promises": "off", // http.createServer(app) is throwing this
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_"
                }
            ]
        }
    }
);
