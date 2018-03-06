import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { captureRedirect } from '../actions/firebase';
import { Loading } from '../components/Content/Loading';

const ProtectedRoute = (WrappedComponent) => {
  class AuthHandler extends Component {
    constructor(props) {
      super(props);
      this.unauthProtectedRoutes = ['/login', '/register', '/forgotten'];
      this.isUnAuthProtected = this.unauthProtectedRoutes.indexOf(props.currentURL) !== -1;
    }
    componentDidMount() {
      const { loggedIn, currentURL } = this.props;
      if (!loggedIn) {
        this.props.captureRedirect(currentURL);
      }
    }
    render() {
      const { loading, loggedIn, profile } = this.props;
      // Show loading flag whilst Firebase auth is checked
      if (loading) return <Loading />;
      // If logged in and not an unauth protected route (login etc) load child component
      if (loggedIn && !this.isUnAuthProtected) return <WrappedComponent {...this.props} />;
      // If not logged in and an unauth protected route (login etc) load child component
      if (!loggedIn && this.isUnAuthProtected) return <WrappedComponent {...this.props} />;
      // If logged in and an unauth protected route (login etc) redirect to account area
      if (loggedIn && this.isUnAuthProtected) return <Redirect to={`/account/${profile.uid}`} />;
      // Bounce back to register page
      return <Redirect to="/login" />;
    }
  }

  function mapStateToProps({firebase}, ownProps) {
    const { loggedIn, profile, loading } = firebase;
    return {
      loading,
      loggedIn,
      profile,
      currentURL: ownProps.location.pathname
    };
  }

  return connect(mapStateToProps, { captureRedirect })(AuthHandler);
};

export default ProtectedRoute;
