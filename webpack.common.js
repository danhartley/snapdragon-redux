const webpack = require('webpack');
const path = require('path');
const csso = require('csso');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
      app: { import: './src/index.js', dependOn: 'shared' },
      flashcards: './src/flashcards/flashcards.js',
      shared: [ './src/utils/utils.js' ]
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
            test: /collection-builder.html$/,
            exclude: [ /node_modules/, path.resolve(__dirname, 'src/admin/collection-builder.html')],
            use: {loader: 'html-loader'}
          },
          {
            test: /checklist.html$/,
            exclude: [ /node_modules/, path.resolve(__dirname, 'src/checklist/checklist.html')],
            use: {loader: 'html-loader'}
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                ouputPath: 'img/',
                publicPath: 'img/'
              }
            }]
          }
        ],
    },
    plugins: [     
      new webpack.ProgressPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunks: ['app', 'shared'],
        inject: true
      }),
      new HtmlWebpackPlugin({
        filename: 'flashcards.html',
        template: './src/flashcards/flashcards.html',
        chunks: ['flashcards'],
        inject: true
      }),  
      new CopyPlugin({
        patterns: [
          // { from: './src/ui/css/groups', to: 'css', transform(content) { return csso.minify(content).css; } },
          { from: './src/static/assets', to: 'static' },          
          { from: './src/static/root', to: ''}
        ],
      }),
      // new BundleAnalyzerPlugin(),
      new Dotenv({})
    ],
    resolve: {
        modules: [
          path.resolve('./src'),
          path.resolve('./node_modules'),
        ],
        // https://webpack.js.org/configuration/resolve/#resolvemodules
    },
    devServer: {
      host: 'localhost',// 0.0.0.0 necessary for ??? (device?), localhost for service worker to be recognised and reload
      disableHostCheck: true,
      writeToDisk: true,
      compress: true
    },
    // watch: true watched by default in webpack-dev-server
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