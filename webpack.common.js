const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
      app: './src/index.js',
      utils: './src/utils/utils.js',      
      wiki: './src/wikipedia/wiki.js',
      admin: './src/admin/collection-builder.js'
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
            ]},
            {
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
            },
            {
              test: /collection-builder.html$/,
              exclude: [ /node_modules/, path.resolve(__dirname, 'src/admin/collection-builder.html')],
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
      
      // new CleanWebpackPlugin(['dist/index.html', 'dist/*.bundle.js']),      
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
    ],
    resolve: {
        modules: [
          path.resolve('./src'),
          path.resolve('./node_modules')
        ]
      },
      optimization: {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              keep_fnames: true,
            },
          }),
        ],
      },
    // devtool: "source-map"
};