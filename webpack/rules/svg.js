const PATHS = require('../paths');

module.exports = ({ limit = 10240, noquotes = true } = {}) => ({
  test: /\.svg$/,
  use: [
    {
      loader: 'svg-url-loader',
      options: {
        name: '[hash].[ext]',
        limit,
        noquotes
      }
    }, {
      loader: 'image-webpack-loader',
      options: {
        bypassOnDebug: true
      }
    }
  ],
  include: PATHS.app
});
