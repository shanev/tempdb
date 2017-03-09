module.exports = {
  "env": {
    "browser": false,
    "node": true,
    "es6": true,
    "mocha": true
  },
  "rules": {
    "no-param-reassign": [2, { "props": false }]
  },
  "extends": "airbnb-base",
  "plugins": [
    "import"
  ]
};
