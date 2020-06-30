const path = require('path');
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

  ],
  module: {
    rules: [
      {
        test: /\.js$/,
          use: {
            loader: "babel-loader",
            options: {                  
              presets: [
                ["@babel/preset-react"]
            ],
            plugins: [
              "@babel/plugin-transform-react-jsx-source",
              "@babel/plugin-transform-react-jsx-self",
              "@babel/plugin-proposal-json-strings"
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  }
});