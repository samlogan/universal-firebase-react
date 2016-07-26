var webpack = require('webpack');
var path = require('path');

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
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    test: /\.jsx?$/,
    loaders: [{
      exclude: /node_modules/,
      loaders: ['react-hot','babel'],
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
