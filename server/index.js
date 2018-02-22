import express from 'express';
import webpack from 'webpack';
import * as admin from 'firebase-admin';
import { isDebug } from '../config/app';
import initExpress from './init/express';
import initRoutes from './init/routes';
import renderMiddleware from './render/middleware';
import serviceAccount from './secrets/react-redux-firebase-d8246-firebase-adminsdk-c2fr6-b933ed253c.json';

const app = express();

// Firebase admin
const firebaseCredentials = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://react-redux-firebase-d8246.firebaseio.com'
};
admin.initializeApp(firebaseCredentials);
const db = admin.database();

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
