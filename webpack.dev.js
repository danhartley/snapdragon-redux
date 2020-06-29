const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: "source-map",
  // devtool: "eval-source-map",
  entry: {
    admin: './src/admin/collection-builder.js'
  },
  plugins: [
    // new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }), // not consistent
  ]
});