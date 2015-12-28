const fs = require('fs');

const defaultConfigPath = fs.absolute('config/default.json')
const devConfigPath = fs.absolute('config/dev.json')
const stagingConfigPath = fs.absolute('config/staging.json')
const productionConfigPath = fs.absolute('config/production.json')
const envPath = fs.absolute('env.json')

if (!fs.exists(defaultConfigPath))
  throw new Error('config/default.json doesn\'t exist')

const defaultConfig = require(defaultConfigPath)

const requireConfig = (path, defaultConfig) => {
  if (fs.exists(path)) {
    return require(path)
  } else {
    return defaultConfig 
  }
}

const devConfig = requireConfig(devConfigPath, defaultConfig)
const stagingConfig = requireConfig(stagingConfigPath, defaultConfig)
const productionConfig = requireConfig(productionConfigPath, defaultConfig)
const env = require(envPath, { 'SLIMERJS_ENV': 'local' })


const config = (env) => {
  switch(env) {
    case 'production':
      return productionConfig
    case 'staging':
      return stagingConfig
    case 'dev':
      return devConfig
    default:
      return defaultConfig
  }
}


module.exports = config(env['SLIMERJS_ENV'])
