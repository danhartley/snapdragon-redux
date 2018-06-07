const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
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
        rules: [{
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
        },{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
        },
        {
          test: /\.html$/,
          exclude: [ /node_modules/, path.resolve(__dirname, 'src/index.html')],
          use: {loader: 'html-loader'}
        }
        ],
    },
    plugins: [
      
      // new CleanWebpackPlugin(['dist/index.html', 'dist/*.bundle.js']),      
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        chunks: ['app'],
        inject: true
      }),
    ],
    resolve: {
        modules: [
          path.resolve('./src'),
          path.resolve('./node_modules')
        ]
      },
};