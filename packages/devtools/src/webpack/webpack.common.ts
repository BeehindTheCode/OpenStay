import path from 'path'
import HtmlWebPackPlugin from 'html-webpack-plugin'
import { Configuration } from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import nodeExternals from 'webpack-node-externals'

import { ModeArgs } from './webpack.types'

const getWebpackCommonConfig = (args: ModeArgs): Configuration => {
  const {
    analyzerPort = 9001,
    devServer,
    htmlOptions,
    isAnalyze,
    mode,
    packageName,
    port = 3000
  } = args

  const devServerPort = port + 1

  // Client Entry
  const entry = path.resolve(__dirname, `../../../${packageName}/src/index.ts`)

  // Resolve
  const resolve = {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '~': path.resolve(__dirname, `../../../${packageName}/src`)
    },
    fallback: {
      buffer: false,
      crypto: false,
      stream: false,
      querystring: false,
      os: false,
      zlib: false,
      http: false,
      https: false,
      url: false,
      path: require.resolve('path-browserify')
    }
  }

  // Output
  const output = {
    path: path.resolve(__dirname, `../../../${packageName}/dist`),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'lib',
    umdNamedDefine: true,
    globalObject: 'this'
  }

  // Plugins
  const plugins: any = []

  if (isAnalyze) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort
      })
    )
  }

  if (mode === 'development' && htmlOptions?.title && htmlOptions.template) {
    plugins.push(
      new HtmlWebPackPlugin({
        title: htmlOptions.title,
        template: path.resolve(__dirname, `../../../${packageName}/${htmlOptions.template}`),
        filename: './index.html'
      })
    )
  }

  // Rules
  const rules: any = []

  rules.push({
    test: /\.(tsx|ts)$/,
    exclude: /node_modules/,
    loader: 'ts-loader'
  })

  const webpackConfig = {
    entry,
    ...(devServer && {
      devServer: {
        historyApiFallback: true,
        static: output.path,
        port: devServerPort
      }
    }),
    externals: [nodeExternals()],
    output,
    resolve,
    plugins,
    module: {
      rules
    },
    target: 'node'
  }

  return webpackConfig as Configuration
}

export default getWebpackCommonConfig
