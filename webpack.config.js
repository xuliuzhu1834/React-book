var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var config = {
  entry: path.resolve(__dirname, './entry.js'),
  output: {
    path: path.resolve(__dirname,'./build'),
    filename: 'boundle.js'
  },
  module:{
    loaders:[
      {
        test: /\.jsx?$/,
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
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("style.css")
  ]
};

module.exports = config;