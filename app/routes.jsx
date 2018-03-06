import React from 'react';
import { fetchData } from './fetch-data';
import App from './containers/App';

function asyncComponent(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    state = { Component: AsyncComponent.Component };

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(({ default: Component }) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        }).catch(err => console.error(err));
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  };
}

export default [{
  component: App,
  routes: [{
    path: '/',
    exact: true,
    name: 'Home',
    fetchData,
    component: asyncComponent(() => import(/* webpackChunkName: "Home" */ './containers/Home')),
  }, {
    path: '/posts/:id',
    name: 'Post',
    fetchData,
    component: asyncComponent(() => import(/* webpackChunkName: "Post" */ './containers/Post')),
  }, {
    path: '/account/:uid',
    name: 'Account',
    component: asyncComponent(() => import(/* webpackChunkName: "Account" */ './containers/Account')),
  }, {
    path: '/add',
    component: asyncComponent(() => import(/* webpackChunkName: "AddPost" */ './containers/AddPost')),
  }, {
    path: '/login',
    component: asyncComponent(() => import(/* webpackChunkName: "AuthPage" */ './containers/AuthPage')),
  }, {
    path: '/register',
    component: asyncComponent(() => import(/* webpackChunkName: "AuthPage" */ './containers/AuthPage')),
  }, {
    path: '/forgotten',
    component: asyncComponent(() => import(/* webpackChunkName: "AuthPage" */ './containers/AuthPage')),
  }],

}];
