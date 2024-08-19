import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import configPrettier from "eslint-config-prettier";

export default tseslint.config(
    {
        files: ["src/**/*.ts"],
        extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            ...configPrettier.rules,
            "prefer-const": ["error", { destructuring: "all" }],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-non-null-assertion": "warn",
            "@typescript-eslint/no-inferrable-types": ["warn", { ignoreProperties: true, ignoreParameters: true }],
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "none",
                    ignoreRestSiblings: true,
                    varsIgnorePattern: "([Ii]gnored)|([Uu]nused)|(_)",
                },
            ],
        },
    },
    {
        files: ["**/*.js"],
        extends: [tseslint.configs.disableTypeChecked],
    },
);
