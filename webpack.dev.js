const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: "source-map",
  entry: {
    admin: './src/admin/collection-builder.js'
  },
  plugins: [

  ]
});