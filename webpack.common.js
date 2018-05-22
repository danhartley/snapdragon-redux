const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      app: './src/index.js'
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
        }
        // ,{
        //     test: /\.html$/,
        //     use: [ {
        //       loader: 'file-loader',
        //       options: {
        //           name: '[name].[ext]'
        //       }
        //     } ],
        //     exclude: path.resolve(__dirname, 'src/index.html')
        // }
        ],
    },
    plugins: [
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