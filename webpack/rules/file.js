const PATHS = require('../paths');

module.exports = ({
  test: /\.(woff|woff2|ttf|mp4)$/,
  loader: 'url-loader',
  options: {
    name: '[hash].[ext]'
  },
  include: PATHS.app
});
