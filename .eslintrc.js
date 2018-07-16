const path = require('path')

module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
   "rules": {
     "object-property-newline": "warn",
     "no-restricted-globals": 0,
     "function-paren-newline": 0,
     "object-curly-newline": 0,
     "prefer-destructuring": "warn",
     "computed-property-spacing": "warn",
     "no-plusplus": 0,
     "prefer-const": "warn",
     "space-in-parens": "warn",
     "keyword-spacing": "warn",
     "camelcase": 0,
     "import/first": 0,
     "import/no-extraneous-dependencies": 0,
     "import/prefer-default-export": 0,
     "class-methods-use-this": 0,
     "import/extensions": 0,
     "jsx-a11y/href-no-hash": "off",
     "jsx-a11y/anchor-is-valid": 0,
     "jsx-a11y/label-has-for": 0,
     "arrow-parens": 0,
     "key-spacing": "warn",
     "arrow-body-style": 0,
     "block-spacing": "warn",
     "brace-style": "warn",
     "comma-spacing": "warn",
     "comma-dangle": 0,
     "consistent-return": 0,
     "curly": ["warn", "multi-line"],
     "eol-last": 0,
     "func-names": 0,
     "import/no-unresolved": 0,
     "indent": "warn",
     "max-len": 0,
     "newline-per-chained-call": 0,
     "no-case-declarations": 0,
     "no-debugger": 0,
     "no-else-return": 0,
     "no-nested-ternary": 0,
     "no-param-reassign": 0,
     "no-restricted-syntax": 0,
     "no-trailing-spaces": 0,
     "no-underscore-dangle": 0,
     "no-unused-vars": "warn",
     "no-use-before-define": 0,
     "object-curly-spacing": "warn",
     "object-shorthand": "warn",
     "padded-blocks": 0,
     "prefer-arrow-callback": "warn",
     "prefer-template": "warn",
     "quotes": "warn",
     "radix": 0,
     "jsx-a11y/click-events-have-key-events": 0,
     "react/jsx-closing-tag-location": 0,
     "react/jsx-curly-brace-presence": "warn",
     "react/jsx-tag-spacing": 0,
     "react/jsx-closing-bracket-location": 0,
     "react/jsx-filename-extension": 0,
     "react/jsx-indent": "warn",
     "react/jsx-indent-props": "warn",
     "react/no-multi-comp": 0,
     "react/prefer-stateless-function": 0,
     "react/prop-types": 0,
     "react/sort-comp": 0,
     "react/jsx-curly-spacing": "warn",
     "react/jsx-first-prop-new-line": "warn",
     "react/jsx-tag-spacing": "warn",
     "react/jsx-no-bind": 0,
     "react/no-array-index-key": 0,
     "semi": 0,
     "space-before-function-paren": 0,
     "space-in-parens": "warn",
     "space-infix-ops": "warn",
     "template-curly-spacing": "warn",
     "no-fallthrough": 0,
     "new-cap": 0,
     "spaced-comment": "warn",
     "no-multi-spaces": "warn",
   },
   "plugins": [
    ],
   "env": {
     "es6": true,
     "browser": true
   },
   "globals": {
     "it": true,
     "describe": true,
     "afterEach": true,
     "afterAll": true,
     "beforeEach": true,
     "beforeAll": true,
     "Feature": true,
     "Scenario": true,
     "expect": true,
     "test": true,
     "jest": true,
     "jasmine": true,
     "cy": true,
     "Cypress": true
   }
}