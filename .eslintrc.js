module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/standard',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    'pug',
    'eslint-plugin-vue',
    '@typescript-eslint'
  ],
  rules: {
    semi: 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE === 'production' ? 'never' : 'warn',
    'no-unused-vars': 'warn',
    'vue/no-unused-components': 'warn',
    'vue/multiline-html-element-content-newline': 0,
    'vue/no-multiple-template-root': 'warn',
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'never',
      imports: 'never',
      exports: 'never',
      functions: 'never'
    }],
    'no-useless-constructor': 0
  }
}
