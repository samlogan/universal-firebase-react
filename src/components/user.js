import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInWithFacebook } from '../actions/actions_firebase';

class User extends Component {
  render() {
    const { auth } = this.props.auth;
    if(!auth){
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

export default connect(mapStateToProps, { signInWithFacebook })(User);
