const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    flashcards: './src/flashcards/flashcards.js'
  },
  // devtool: "eval-source-map", // eval-cheap-module-source-map
  devtool: "source-map",
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      exclude: 'sw.js'
    }),
    new HtmlWebpackPlugin({
      filename: 'flashcards.html',
      template: './src/flashcards/flashcards.html',
      chunks: ['flashcards'],
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  }
});