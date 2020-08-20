const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: "source-map",
    entry: {
      flashcards: './src/flashcards/flashcards.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
    },    
    module: {
        rules: [
          {              
            test: /\.js$/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-env",{
                  "targets": ">.25%",
                  "modules": false
                }]],
                plugins: [
                  "@babel/plugin-proposal-class-properties",
                  "@babel/plugin-proposal-object-rest-spread"
                ]          
              }                
            }
          },
          {
            test: /\.html$/,
            exclude: [ /node_modules/, path.resolve(__dirname, 'src/index.html')],
            use: {loader: 'html-loader'}
          },
          {
            test: /flashcards.html$/,
            exclude: [ /node_modules/, path.resolve(__dirname, 'src/flashcards/flashcards.html')],
            use: {loader: 'html-loader'}
          },
          {
            test: /\.(sa|sc|c)ss$/,
            use: [
              'style-loader',
              'css-loader',
              'sass-loader',
            ],
          },
        ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'flashcards.html',
        template: './src/flashcards/flashcards.html',
        chunks: ['flashcards'],
        inject: true
      }),
      new CopyPlugin({
        patterns: [
          { from: './src/flashcards/static/fonts', to: 'fonts'}
        ],
      })
    ],
    resolve: {
        modules: [
          path.resolve('./src'),
          path.resolve('./node_modules'),
        ]
    },
    devServer: {
      host: 'localhost',
      disableHostCheck: true,
      writeToDisk: true,
      compress: true
    },
    optimization: {
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
};