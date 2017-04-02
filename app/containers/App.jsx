import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkAuth, signOut } from '../actions/firebase';
import Header from '../components/Common/Header';
import { Alert } from '../components/Common/Alert';

class App extends Component {
  componentWillMount() {
    this.props.checkAuth();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.loggedIn !== nextProps.loggedIn) nextProps.checkAuth();
  }
  render() {
    const { children, location, alerts, profile, loggedIn, signOut } = this.props;
    return (
      <div className={location.pathname === '/' ? 'home' : location.pathname.replace(/\//g, '')}>
        <Alert alerts={alerts} />
        <Header
          profile={profile}
          loggedIn={loggedIn}
          signOut={signOut}
          closeModal={Object.keys(alerts).find(key => alerts[key])}
        />
        {children}
      </div>
    );
  }
}

function mapStateToProps({firebase, alerts}) {
  const { loggedIn, success, profile } = firebase;
  return {
    alerts,
    loggedIn,
    profile,
    success
  };
}

export default connect(mapStateToProps, { checkAuth, signOut })(App);
