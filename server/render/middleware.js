import React from 'react';
import { renderToString } from 'react-dom/server';
import createMemoryHistory from 'history/createMemoryHistory';
import { renderRoutes, matchRoutes } from 'react-router-config';
import Helmet from 'react-helmet';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import configureStore from '../../app/utils/configureStore';
import * as types from '../../app/actions/types';
import pageRenderer from './pageRenderer';
import fetchDataForRoute from '../../app/utils/fetchDataForRoute';
import routes from '../../app/routes';

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const history = createMemoryHistory();
  const store = configureStore({}, history);
  if (!req.url || req.url.includes('assets')) return null;
  const matchedRoutes = matchRoutes(routes, req.url);
  store.dispatch({ type: types.CREATE_REQUEST });
  return fetchDataForRoute(matchedRoutes)
    .then((data) => {
      store.dispatch({ type: types.REQUEST_SUCCESS, data });
      const initialState = store.getState();
      const context = {};
      const componentHTML = renderToString(
        <Provider store={store} key="provider">
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>,
      );
      if (context.url) {
        return res.status(301).redirect(context.url);
      }
      const headAssets = Helmet.renderStatic();
      const finalHTML = `<!DOCTYPE html>${pageRenderer({ initialState, componentHTML, headAssets })}`;
      return res.status(200).send(finalHTML);
    })
    .catch((err) => {
      console.error('renderError', err);
      res.status(500).json(err);
    });
}
