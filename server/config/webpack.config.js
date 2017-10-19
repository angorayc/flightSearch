const path = require('path')
const webpack = require('webpack')
const _merge = require('lodash/merge')
const webpackDevConfig = require('../../client/config/webpack.config.dev')

const config = _merge(webpackDevConfig, {
  entry: {}
})

module.exports = config