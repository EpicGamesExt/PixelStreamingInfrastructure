// Copyright Epic Games, Inc. All Rights Reserved.

module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: { project: './tsconfig.json' },
    plugins: [
        '@typescript-eslint',
        'eslint-plugin-tsdoc'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:prettier/recommended'
    ],
    rules: {
        "tsdoc/syntax": "warn",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-call": "off",
        "@typescript-eslint/no-unsafe-member-access": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "off",
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
