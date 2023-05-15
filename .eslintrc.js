module.exports = {
  parser: '@typescript-eslint/parser',
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'prettier/prettier': 'error',
    eqeqeq: ['error', 'smart'],
    "@typescript-eslint/strict-boolean-expressions": [
      "error",
      {
        "allowNullableBoolean": true,
        "allowNullableObject": false
      }
    ]
  },
  env: {
    browser: true,
    node: true,
  },
};
