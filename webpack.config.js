const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, './entry.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'boundle.js',
  },
  watch: true,
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css/,
        loader: 'style!css',
      },
      {
        test: /\.less/,
        loader: 'style!css!less',
      },
      {
        test: /\.scss/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass?sourceMap=true&sourceMapContents=true']),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
  ],
};

module.exports = config;
