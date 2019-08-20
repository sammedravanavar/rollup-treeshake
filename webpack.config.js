/* eslint-disable camelcase */

const path = require('path');
const webpack = require('webpack');
const ShakePlugin = require('webpack-common-shake').Plugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function getPath() {
  const returnValue = path.resolve(__dirname, ...arguments);

  return returnValue;
}

const {
  NODE_ENV
} = process.env;

const webpackConfig = {
  output: {
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'umd',
    filename: '[name].js',
    // will name the AMD module of the UMD build
    umdNamedDefine: true,
    pathinfo: true
  },

  entry: {
    runtime: path.resolve('src', 'single.js'),
    // runtime1: path.resolve('src', 'combined.js'),
  },

  devtool: '',

  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },

  module: {
    rules: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'packages')
      ],
      use: ['babel-loader']
    }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3000
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),

    // scope hoisting (webpack 3) - each module in your bundle would be wrapped in individual function closures
    new webpack.optimize.ModuleConcatenationPlugin(),

    // (webpack 3) use identifiers instead of module names to minimize the output a bit more
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.UglifyJsPlugin(),

    // new ShakePlugin()
  ],
  stats: {
    children: false,
    reasons: false
  }
};


module.exports = webpackConfig;
