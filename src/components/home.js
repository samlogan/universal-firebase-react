import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signInWithFacebook } from '../actions/actions_firebase';

class Home extends Component {

  render() {
    const { auth } = this.props.auth;
    return (
      <div>
        {auth.uid ? '' : <button className="btn btn-primary" onClick={() => this.props.signInWithFacebook()}>Sign in with Facebook</button>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { signInWithFacebook })(Home);
