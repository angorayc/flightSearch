var baseConfig = require('./eslint');
var _merge = require('lodash/merge');

var productionConfig = {
  rules: {
    'no-console': "error",
    'no-debugger': "error"
  }
}

module.exports = _merge(baseConfig, productionConfig)