import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signInWithFacebook, signInWithEmail } from '../actions/actions_firebase';
import LoginForm from './auth/login_form';
import ProviderLogin from './auth/provider_login';

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillReceiveProps(nextProps){
    const { auth } = nextProps.auth;
    if(auth.uid){
      this.context.router.push(`/user/${auth.uid}`);
    }
  }
  render() {
    const { auth } = this.props.auth;
    if(auth.uid){
      return <span></span>
    }
    return (
      <div>
        <LoginForm error={this.props.auth.error} loginFunction={(email,password)=>this.props.signInWithEmail(email,password)} />
        <ProviderLogin loginFunction={() => this.props.signInWithFacebook()} provider={'Facebook'} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, { signInWithFacebook, signInWithEmail })(Home);
