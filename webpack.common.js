const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    module: {
        rules: [
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
            ]
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
          }
        ],
    },
    resolve: {
        modules: [
          path.resolve('./src'),
          path.resolve('./node_modules')
        ]
      },
};