import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { fetchData } from './fetch-data';
// Auth pages and handlers
import AuthPage from './containers/AuthPage';
import AuthHandler from './containers/AuthHandler';
import UnAuthHandler from './containers/UnAuthHandler';
// Import containers used for below routes
import App from './containers/App';
import Home from './containers/Home';
import Post from './containers/Post';
import Account from './containers/Account';
import AddPost from './containers/AddPost';

// Map paths to components
// Dynamic params declared using :
// Use name={} for switch statement in fetchData function
// Declare function to retreive data on the server using fetchData

// AuthHandler
// Handles protected routes, captures requested URL and redirects on login

// UnAuthHandler
// redirects user to account if accessing login, register routes etc

export default () => {
  return (
    <Route path="/" component={App} name="App">
      <IndexRoute component={Home} name="Home" fetchData={fetchData} />
      <Route path="posts/:id" component={Post} name="Post" fetchData={fetchData} />
      <Route component={AuthHandler}>
        <Route path="account/:uid" component={Account} />
        <Route path="add" component={AddPost} />
      </Route>
      <Route component={UnAuthHandler}>
        <Route path="login" component={AuthPage} />
        <Route path="register" component={AuthPage} />
        <Route path="forgotten" component={AuthPage} />
      </Route>
    </Route>
  );
};
