module.exports = {
    parser: "@typescript-eslint/parser",
    root: true,
    env: {
      browser: true,
      commonjs: true,
      es6: true,
      jest: true
    },
    extends: [
      "plugin:@typescript-eslint/recommended",
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "prettier",
      "prettier/@typescript-eslint",
    ],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      ecmaFeatures: {
        "jsx": true
      }
    },
    rules: {
      "indent": "off",
      "camelcase": "off",
      "semi": "off",
      "quotes": "off",
      "no-shadow": "off",
      "no-use-before-define": "off",
      "no-unused-vars": "off",
      "no-console": "off",
      "no-magic-numbers": "off",
      "no-redeclare": "off",
      "no-array-constructor": "off",
      "no-dupe-class-members": "off",
      "no-extra-semi": "off",
      "no-empty-function": "off",
      "linebreak-style": "off",
      "prettier/prettier": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "import/extensions": "off",
      "import/no-unresolved": "off",
      "import/no-extraneous-dependencies": "off",
      "import/prefer-default-export": "off",
      "import/no-named-as-default": "off",
      /* react options */
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
      "react/destructuring-assignment": "off",
      "react/no-array-index-key": "off",
      "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx", ".ts", ".tsx"] }],
      "react/function-component-definition": 2,
      /* typescript-eslint options */
      "@typescript-eslint/no-empty-interface": "warn",
      "@typescript-eslint/adjacent-overload-signatures": "warn",
      "@typescript-eslint/no-dupe-class-members": "warn",
      "@typescript-eslint/no-misused-new": "warn",
      "@typescript-eslint/no-redeclare": "warn",
      "@typescript-eslint/no-array-constructor": "warn",
      "@typescript-eslint/no-namespace": "warn",
      "@typescript-eslint/no-var-requires": "warn",
      "@typescript-eslint/prefer-namespace-keyword": "warn",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/type-annotation-spacing": "off",
      "@typescript-eslint/no-extra-semi": "off",
      "@typescript-eslint/member-ordering": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/semi": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/indent": "off",
      "@typescript-eslint/member-delimiter-style": "off",
      "@typescript-eslint/quotes": "off",
      "@typescript-eslint/consistent-type-assertions": "off",
      "@typescript-eslint/triple-slash-reference": "warn",
      "@typescript-eslint/no-magic-numbers": "off"
      },
      ignorePatterns: ["node_modules/"],
      settings: {
      react: {
        version: "detect"
      }
    }
  };