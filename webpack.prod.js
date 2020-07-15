const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const glob = require('glob');

const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
        },
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  // You should configure your server to disallow access to the Source Map file for normal users!
  // https://webpack.js.org/configuration/devtool/
  // devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      // is this necssary? process.env.NODE_ENV ready out of the boc
      // path: './some.other.env', // load this now instead of the ones in '.env'
      // safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      // allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      // systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      // silent: true, // hide any errors
      // defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,  { nodir: true }),
    }),
    new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
    ]
  }
});