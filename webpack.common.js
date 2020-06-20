const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var csso = require('csso');
  // const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true
    },
    entry: {
      app: './src/index.js',
      utils: './src/utils/utils.js',      
      wiki: './src/wikipedia/wiki.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },    
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ]
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              // Creates `style` nodes from JS strings
              'style-loader',
              // Translates CSS into CommonJS
              'css-loader',
              // Compiles Sass to CSS
              'sass-loader',
            ],
          },
          {              
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: [
                    "@babel/plugin-proposal-class-properties",
                    "@babel/plugin-proposal-object-rest-spread",
                    "@babel/plugin-transform-react-jsx-source",
                    "@babel/plugin-transform-react-jsx-self",
                    "@babel/plugin-proposal-json-strings"
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
            test: /dan.html$/,
            exclude: [ /node_modules/, path.resolve(__dirname, 'src/dan/dan.html')],
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
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunks: ['app'],
        inject: true
      }),
      new HtmlWebpackPlugin({
        filename: 'collection-builder.html',
        template: './src/admin/collection-builder.html',
        chunks: ['admin'],
        inject: true
      }),
      new HtmlWebpackPlugin({
        filename: 'dan.html',
        template: './src/dan/dan.html',
        chunks: ['dan'],
        inject: true
      }),      
      new CopyPlugin({
        patterns: [
          { from: './src/ui/css/groups', to: 'css', transform(content) { return csso.minify(content).css; } }
        ],
      }),
      new Dotenv({
        // path: './some.other.env', // load this now instead of the ones in '.env'
        // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        // allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        // silent: true, // hide any errors
        // defaults: false // load '.env.defaults' as the default values if empty.
      })
      //https://www.npmjs.com/package/dotenv-webpack
    ],
    resolve: {
        modules: [
          path.resolve('./src'),
          path.resolve('./node_modules')
        ]
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              keep_fnames: true,
            },
          }),
        ],
        splitChunks: {
          chunks: 'all',
        },
      },
    devtool: "source-map"
};