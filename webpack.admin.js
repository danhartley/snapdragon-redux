const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  mode: 'development',
  entry: {
    admin: './src/admin/collection-builder.js',
    checklist: './src/checklist/checklist.js'
  },
  devtool: "source-map",
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'collection-builder.html',
      template: './src/admin/collection-builder.html',
      chunks: ['admin'],
      inject: true
    }),
    new HtmlWebpackPlugin({
      filename: 'checklist.html',
      template: './src/checklist/checklist.html',
      chunks: ['checklist'],
      inject: true
    }),   
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [ /node_modules/ ],
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ]
  }
});