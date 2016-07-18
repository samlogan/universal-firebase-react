import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signInWithFacebook } from '../actions/actions_firebase_auth';

class User extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillReceiveProps(nextProps){
    const { loggedIn } = nextProps.auth;
    if(!loggedIn){
      this.context.router.push(`/`);
    }
  }
  render() {
    const { auth, loggedIn } = this.props.auth;
    if(!loggedIn){
      return <span></span>
    }
    return (
      <div>
        <p>User account area for {auth.displayName}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, null)(User);
