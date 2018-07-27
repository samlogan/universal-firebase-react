import express from 'express';
import webpack from 'webpack';
import { isDebug } from '../config/app';
import { db, auth } from './utils/firebase';
import initExpress from './init/express';
import initRoutes from './init/routes';
import initFirebase from './init/firebase';
import renderMiddleware from './render/middleware';

const app = express();


// Webpack dev server
if (isDebug) {
  // enable webpack hot module replacement
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack/webpack.config');
  const devBrowserConfig = webpackConfig({ browser: true });
  const compiler = webpack(devBrowserConfig);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: devBrowserConfig.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

/*
 * Bootstrap application settings
 */
initExpress(app);

/*
 * Firebase endpoints
 */
initFirebase(app, db, auth);

/*
 * REMOVE if not using any additional Express routes
 */
initRoutes(app, db);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * renderMiddleware matches the URL with react-router and renders the app into
 * HTML
 */
app.get('*', renderMiddleware);

app.listen(app.get('port'));
