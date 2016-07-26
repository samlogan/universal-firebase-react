var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'webpack/hot/dev-server', // "only" prevents reload on syntax errors
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    './src/index'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  sassLoader: {
    includePaths: [ 'style' ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style/style.css', {
      allChunks: true
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['react-hot','babel', 'eslint'],
    },  {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
          'style', // The backup style loader
          'css?sourceMap!sass?sourceMap'
      )
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};
