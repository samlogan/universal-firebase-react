import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import methodOverride from 'method-override';
import gzip from 'compression';
import helmet from 'helmet';
import { ENV } from '../../config/env';

export default (app) => {
  app.set('port', (process.env.PORT || 3000));

  if (ENV === 'production') {
    app.use(gzip());
    // Secure your Express apps by setting various HTTP headers. Documentation: https://github.com/helmetjs/helmet
    app.use(helmet());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, '..', 'public')));

  console.log('--------------------------');
  console.log('[1/3] 😊 Starting Server . . .');
  console.log(`[2/3] 🌵 Environment: ${ENV}`);
  console.log(`[3/3] 🚀 Listening on port: ${app.get('port')}`);
  if (ENV === 'production') {
    // sess.cookie.secure = true; // Serve secure cookies
  }
  console.log('--------------------------');
};
