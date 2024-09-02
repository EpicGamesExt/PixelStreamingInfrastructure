// Copyright Epic Games, Inc. All Rights Reserved.

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: { project: './tsconfig.esm.json' },
    plugins: [
        '@typescript-eslint',
        'eslint-plugin-tsdoc',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        "plugin:prettier/recommended",
    ],
    rules: {
        "tsdoc/syntax": "warn",
        "@typescript-eslint/require-array-sort-compare": "error",
        "@typescript-eslint/no-unused-vars": [
            "error",
            {
                "argsIgnorePattern": "^_",
                "varsIgnorePattern": "^_",
                "caughtErrorsIgnorePattern": "^_"
            }
        ]
    }
};
