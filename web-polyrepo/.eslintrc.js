module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['react-hooks', 'dirs'],
  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'dirs/dirnames': ['error', { pattern: '^([a-z0-9\\-]+)|__tests__$' }],
    'dirs/filenames': [
      'error',
      {
        '**/*.md/*': '.*',
        '**/*': '^[a-z0-9\\-\\.]+$',
      },
    ],
    'import/order': 'off',
  },
}
