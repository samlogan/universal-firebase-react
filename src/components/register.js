import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createUserWithEmail, signInWithFacebook, hasError, resetErrors } from '../actions/actions_firebase_auth';
import RegisterForm from './auth/register_form';
import ProviderLogin from './auth/provider_login';

class Register extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  componentWillMount(){
    this.props.resetErrors();
  }
  componentWillReceiveProps(nextProps){
    const { auth, loggedIn } = nextProps.auth;
    {console.log(nextProps)}
    if(loggedIn){
      this.context.router.push(`/user/${auth.uid}`);
    }
  }
  handleSubmit(e, email, password, firstName, lastName){
    e.preventDefault();
    this.props.createUserWithEmail(email, password, firstName, lastName);
  }
  render() {
    const { loggedIn } = this.props.auth;
    if(loggedIn){
      return <span>You are logged in</span>
    }
    return (
      <div>
        <RegisterForm
          error={this.props.auth.error}
          validationFunction={(error) => this.props.hasError(error)}
          registerFunction={(email, password, firstName, lastName)=>this.props.createUserWithEmail(email, password, firstName, lastName)}
          history={this.props.history}
        />
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

export default connect(mapStateToProps, { createUserWithEmail, signInWithFacebook, hasError, resetErrors })(Register);
