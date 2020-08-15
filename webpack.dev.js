const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  // devtool: "eval-source-map", // eval-cheap-module-source-map
  devtool: "source-map",
  devtool: false,
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      exclude: 'sw.js'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        // test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  }
});