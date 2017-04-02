var path = require('path');
var fs = require('fs');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassNeatPaths = require("node-neat").with([
    path.resolve(__dirname, "../public/assets/scss")
  ]).map(function(neatPath) {
    return "includePaths[]=" + neatPath;
}).join("&");

var externalNodeModules =
  fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .reduce(function(acc, cur) {
    acc[cur] = 'commonjs ' + cur;
    return acc;
  }, {});

module.exports = {
  output: {
    publicPath: '/assets/',
    assetsPath: path.join(__dirname, '..', 'public', 'assets'),
    distPath: path.join(__dirname, '..', 'compiled')
  },
  commonLoaders: [
    {
      test: /\.js$|\.jsx$/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: [
          'transform-decorators-legacy',
          'transform-react-remove-prop-types',
          'transform-react-constant-elements',
          'transform-react-inline-elements'
        ]
      },
      exclude: path.join(__dirname, '..', 'node_modules')
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    },
    {
      test: /.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
      loader: "file-loader"
    }
  ],
  externals: externalNodeModules,
};
