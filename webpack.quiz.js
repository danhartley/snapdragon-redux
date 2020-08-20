const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackLighthousePlugin = require('webpack-lighthouse-plugin'); 

module.exports = {
    mode: 'development',
    devtool: "source-map",
    entry: {
      quiz: './src/quiz/quiz.js'
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
            test: /quiz.html$/,
            exclude: [ /node_modules/, path.resolve(__dirname, 'src/quiz/quiz.html')],
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
        filename: 'quiz.html',
        template: './src/quiz/quiz.html',
        chunks: ['quiz'],
        inject: true
      }),
      new CopyPlugin({
        patterns: [
          { from: './src/quiz/static/fonts', to: 'fonts'}
        ],
      }),
      // better used for code that is production ready, e.g. on a staging/testing server
      // new WebpackLighthousePlugin({
      //   url: 'http://localhost:8080/dist/quiz.html'
      // })
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