import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/app';
import Home from '../components/home';
import User from '../components/user';

export default (
  <Route path="/" component={App}>
    <Route path="user/:userid" component={User} />
    <IndexRoute component={Home} />
  </Route>
);
