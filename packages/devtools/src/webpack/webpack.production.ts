import { Configuration } from 'webpack'

const getWebpackProductionConfig = (): Configuration => {
  // Externals
  const externals = {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    },
    jsonwebtoken: 'jsonwebtoken'
  }

  const webpackConfig = {
    mode: 'production',
    devtool: false,
    externals
  }

  return webpackConfig as Configuration
}

export default getWebpackProductionConfig
