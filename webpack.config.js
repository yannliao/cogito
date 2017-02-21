// webpack.config.js

const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './index.js'),
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, './lib'),
    filename: 'template.js',
    library: 'template',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'buble-loader',
        options: {
          objectAssign: 'Object.assign'
        }
      }
    }]
  }
};
