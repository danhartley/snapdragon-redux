const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: "eval-source-map", // eval-cheap-module-source-map
  entry: {
    admin: './src/admin/collection-builder.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {                  
              presets: [
                ["@babel/preset-react"]
            ]
          }
        }
      }
    ]
  }
});