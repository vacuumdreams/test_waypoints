const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { spawn } = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const MODE = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const OUT_DIR = process.env.NODE_ENV === 'development' ? 'sandbox' : 'build'
const DEV_TOOL = process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'hidden-source-map'
const hasSandbox = process.env.WEBPACK_ENV === 'sandbox'

const sandboxApiPath = path.join(__dirname, 'sandbox', 'api.js')
const cutomPackageEntry = path.join(__dirname, 'sandbox', 'entry.tsx')

const devPlugins = [
  new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') }),
  new webpack.DefinePlugin({
    'process.env.API': JSON.stringify('http://localhost:8080'),
  })
]

const prodPlugins = [
  new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') }),
  new CopyPlugin({
    patterns: [
      { from: path.join(__dirname, 'server.js'), to: '.' },
    ],
  }),
  new webpack.DefinePlugin({
    'process.env.API': JSON.stringify(`http://${process.env.API}`),
  })
]

const devConfig = process.env.NODE_ENV !== 'development' ? {} : {
  watchOptions: {
      aggregateTimeout: 1000,
  },
  devServer: {
    port: 8080,
    contentBase: OUT_DIR,
    inline: true,
    compress: true,
    open: true,
    historyApiFallback: {
      index: '../index.html',
    },
    proxy: {
      '/api/v1/**': {
        target: 'http://localhost:8001',
        secure: false,
        changeOrigin: true
      },
    },
    serveIndex: true,
    before: async () => {
        if (!hasSandbox) {
            return
        }
        if (fs.existsSync(sandboxApiPath)) {
            console.log('Starting up sandbox servers...')
            const sandboxApi = require(sandboxApiPath);
            await sandboxApi();
        } else {
            console.log('No sandbox servers to launch.')
        }
    }
  }
}

module.exports = {
  mode: MODE,
  devtool: DEV_TOOL,
  entry: fs.existsSync(cutomPackageEntry) ? cutomPackageEntry : './src/index.tsx',
  output: {
    path: path.resolve(process.cwd(), OUT_DIR),
    filename: 'bundle.js',
    publicPath: '/',
  },
  externals: MODE  === 'production' ? {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'mapboxgl': 'mapboxgl',
  } : undefined,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2018'
       }
      },
    ],
  },
  plugins: MODE === 'production' ? prodPlugins : devPlugins,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  ...devConfig,
};
