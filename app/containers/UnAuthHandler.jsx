import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseAuth } from '../utils/firebase';

class UnAuthHandler extends Component {
  render() {
    if (!firebaseAuth) return null;
    if (firebaseAuth && firebaseAuth.currentUser) {
      this.props.history.push(`/account/${firebaseAuth.currentUser.uid}`);
      return null;
    }
    return this.props.children;
  }
}

function mapStateToProps({firebase}) {
  const { loggedIn } = firebase;
  return {
    loggedIn
  };
}

export default connect(mapStateToProps)(UnAuthHandler);
