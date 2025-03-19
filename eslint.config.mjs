// Copyright Epic Games, Inc. All Rights Reserved.

import eslint from '@eslint/js';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import tseslint from 'typescript-eslint';
import checkCopyrightPlugin from '@epicgames-ps/eslint-plugin-check-copyright'

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeCheckedOnly,
    prettierPluginRecommended,
    {
        plugins: {
            'copyright': checkCopyrightPlugin
        },
        rules: {
            "copyright/copyright": [
                "error",
                {
                    notice: "Copyright Epic Games, Inc. All Rights Reserved."
                }
            ]
        }
    }
);
