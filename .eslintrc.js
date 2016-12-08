const path = require('path');

module.exports = {
  extends: [
    "plugin:flowtype/recommended",
    'airbnb',
  ],
  globals: {},
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: [
    'react',
    'flowtype'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      },
      node: {
        paths: [
          path.resolve(__dirname),
        ],
      },
    },
  },
  // See ESLint Rules: http://eslint.org/docs/rules/
  rules: {
    'no-console': 'off', // @todo Reinstate this after dev is nearly complete.
    'linebreak-style': 'off',
    'import/prefer-default-export': 0,
    'import/no-named-as-default': 'off',
    'import/no-extraneous-dependencies': 'off',
    'jsx-a11y/no-static-element-interactions': 0,
    'class-methods-use-this': 0,
    'arrow-parens': 0,
    'comma-dangle': ['error', {
      'arrays': 'only-multiline',
      'objects': 'only-multiline',
      'imports': 'only-multiline',
      'exports': 'only-multiline',
      'functions': 'never',
    }],
    'react/forbid-prop-types': 'off',
    'react/sort-comp': [2, {
      order: [
        'type-annotations',
        'static-methods',
        'lifecycle',
        'everything-else',
        'render'
      ]
    }],
  }
};