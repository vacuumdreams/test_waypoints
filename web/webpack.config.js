const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MODE = process.env.NODE_ENV === 'development' ? 'development' : 'production'
const OUT_DIR = process.env.NODE_ENV === 'development' ? 'sandbox' : 'build'
const DEV_TOOL = process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'hidden-source-map'

const sandboxApiPath = path.join(__dirname, 'sandbox', 'api.js')
const cutomPackageEntry = path.join(__dirname, 'sandbox', 'entry.tsx')

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
    serveIndex: true,
    before: async () => {
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
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2015'
       }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  ...devConfig,
};