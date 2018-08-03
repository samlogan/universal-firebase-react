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

const getComponent = (name) => {
  return asyncComponent(() => import(/* webpackChunkName: "[request]" */ `./containers/${name}`));
};

export default [{
  component: App,
  routes: [{
    path: '/',
    exact: true,
    name: 'Home',
    fetchData,
    component: getComponent('Home'),
  }, {
    path: '/posts/:id',
    name: 'Post',
    fetchData,
    component: getComponent('Post'),
  }, {
    path: '/account/:uid',
    name: 'Account',
    component: getComponent('Account'),
  }, {
    path: '/add',
    component: getComponent('AddPost'),
  }, {
    path: '/login',
    component: getComponent('AuthPage'),
  }, {
    path: '/register',
    component: getComponent('AuthPage'),
  }, {
    path: '/forgotten',
    component: getComponent('AuthPage')
  }],

}];
