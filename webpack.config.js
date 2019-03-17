var webpack = require('webpack');
var path = require('path');


// SRC_DIR is used for storing development codes.
var SRC_DIR = path.resolve(__dirname, 'src');

// DIST_DIR is used for storing compiled production codes.
var DIST_DIR = path.resolve(__dirname, 'dist');

console.log(SRC_DIR, DIST_DIR);
var config = {
  entry: SRC_DIR + '/index.js',
  output: {
    path: DIST_DIR,
    filename: 'ocs-ldk.min.js',
	library: 'ocs',
	libraryTarget: 'window'
  },
  module : {
    loaders : [
      {
        test : /\.js?/,
        include : SRC_DIR,
        loader : 'babel-loader'
      },
      {
        test:   /\.json$/,
        loader: 'json-loader'
      },
    ]
  },
  node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
  },
  plugins:[
    //new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;
