import React from 'react';
import { createAppScript, createTrackingScript, createStylesheets } from './staticAssets';

const buildPage = ({ componentHTML, initialState, headAssets }) => {
  return `
<!doctype html>
<html>
  <head>
    ${headAssets.title.toString()}
    ${headAssets.meta.toString()}
    ${headAssets.link.toString()}
    ${createStylesheets()}
    ${createTrackingScript()}
  </head>
  <body>
    <div id="app">${componentHTML}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
    ${createAppScript()}
  </body>
</html>`;
};

export default ({ componentHTML, initialState, headAssets }) => {
  return buildPage({ componentHTML, initialState, headAssets });
};
