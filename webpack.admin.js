const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    admin: './src/admin/collection-builder.js',
    dan: './src/dan/dan.js'
  },
  devtool: "source-map",
  plugins: [

  ]
});