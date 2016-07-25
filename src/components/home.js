import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { signInWithFacebook, signInWithEmail, resetErrors } from '../actions/actions_firebase_auth';
import LoginForm from './auth/login_form';
import ProviderLogin from './auth/provider_login';

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount(){
    this.props.resetErrors();
  }
  componentWillReceiveProps(nextProps){
    const { auth, loggedIn } = nextProps.auth;
    if(loggedIn){
      this.context.router.push(`/user/${auth.uid}`);
    }
  }
  render() {
    const { auth, loggedIn } = this.props.auth;
    if(loggedIn){
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

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default connect(mapStateToProps, { signInWithFacebook, signInWithEmail, resetErrors })(Home);
