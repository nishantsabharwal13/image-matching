var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');

var config = {
  entry: {
   js: APP_DIR +'/js/app.jsx'
  },
  module : {
    loaders : [
    {
      test : /\.js?/,
      include : APP_DIR,
      loader : 'babel-loader',
    }
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  watch: true,
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};


module.exports = config;
