const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  // entry: {
  //   admin: './src/admin/collection-builder.js',
  //   dan: './src/dan/dan.js'
  // },
  // devtool: "eval-source-map",
  plugins: [
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false })
  ]
});