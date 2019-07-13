'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
//对象合并
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
