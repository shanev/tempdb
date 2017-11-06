module.exports = {
  "env": {
    "browser": false,
    "node": true,
    "es6": true,
    "mocha": true
  },
  "parserOptions": {
    "ecmaVersion": 2017,
  },
  "rules": {
    "no-param-reassign": [2, { "props": false }]
  },
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ]
};
