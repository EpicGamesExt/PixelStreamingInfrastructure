// Copyright Epic Games, Inc. All Rights Reserved.

import tseslint from 'typescript-eslint';
import baseConfig from '../../eslint.config.mjs'

export default tseslint.config(
    baseConfig,
    {
        ignores: ["src/__test__/**/*.ts", "**/*.test.ts"],
    },
    {
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: 'tsconfig.json',
                tsconfigRootDir: import.meta.dirname,
            },
        },
        files: ["src/**/*.ts"],
        rules: {
            // TODO: when updating eslint a lot of issues suddently popped up
            // these ignores should be turned off slowly and new issues should
            // be addressed
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/restrict-plus-operands": "off",
            "@typescript-eslint/unbound-method": "off",
            "@typescript-eslint/restrict-template-expressions": "off",
            "no-unused-vars": "off",
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

