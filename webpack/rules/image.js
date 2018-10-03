const PATHS = require('../paths');

module.exports = ({ limit = 10240 } = {}) => ({
  test: /\.(png|jpg|jpeg|gif)$/,
  use: [
    {
      loader: 'url-loader',
      options: {
        name: '[hash].[ext]',
        limit
      }
    }, {
      loader: 'image-webpack-loader',
      options: {
        // bypassOnDebug: true,
        mozjpeg: {
          progressive: true,
          quality: 75
        },
        // optipng.enabled: false will disable optipng
        optipng: {
          enabled: false,
        },
        pngquant: {
          quality: '65-90',
          speed: 4
        },
        gifsicle: {
          interlaced: false,
        },
        // the webp option will enable WEBP
        webp: {
          quality: 75
        }
      }
    }
  ],
  include: PATHS.app
});
