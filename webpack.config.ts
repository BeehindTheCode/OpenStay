import {
  ConfigArgs,
  getWebpackCommonConfig,
  getWebpackDevelopmentConfig,
  getWebpackProductionConfig,
  log
} from '@openstay/devtools'
import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'

// Mode Config
const getModeConfig = {
  development: getWebpackDevelopmentConfig,
  production: getWebpackProductionConfig
}

// Mode Configuration (development/production)
const modeConfig: (args: ConfigArgs) => Configuration = ({ mode }) => {
  const getWebpackConfiguration = getModeConfig[mode]
  return getWebpackConfiguration()
}

// Merging all configurations
const webpackConfig: (args: ConfigArgs) => Promise<Configuration> = async (
  { mode, packageName } = {
    mode: 'production',
    packageName: 'design-system'
  }
) => {
  const commonConfiguration = getWebpackCommonConfig({
    packageName,
    mode
  })

  // Mode Configuration
  const modeConfiguration = mode ? modeConfig({ mode, packageName }) : {}

  // Merging all configurations
  const webpackConfiguration = merge(commonConfiguration, modeConfiguration)

  // Logging Webpack Configuration
  log({ tag: 'Webpack Configuration', json: webpackConfiguration, type: 'warning' })

  return webpackConfiguration
}

export default webpackConfig
