import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import * as types from './actions/types';
import fetchDataForRoute from './utils/fetchDataForRoute';

class ClientDataFetcher extends Component {
  componentWillReceiveProps(nextProps) {
    const navigated = nextProps.location !== this.props.location;
    const { routes, store } = nextProps;
    if (navigated) {
      store.dispatch({ type: types.CREATE_REQUEST });
      fetchDataForRoute(matchRoutes(routes, nextProps.location.pathname))
      .then((data) => {
        return store.dispatch({ type: types.REQUEST_SUCCESS, data });
      });
    }
  }

  render() {
    const { children, location } = this.props;
    return (
      <Route
        location={location}
        render={() => children}
      />
    );
  }
}

export default withRouter(ClientDataFetcher);
