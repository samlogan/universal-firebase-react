import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { clearRedirect } from '../actions/firebase';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import ForgottenPassword from '../components/Auth/ForgottenPassword';

class AuthPage extends Component {
  componentWillUnmount() {
    this.props.clearRedirect();
  }
  getAuthForm(type) {
    switch (type) {
      case '/login':
        return (
          <LoginForm
            title="Login"
            switchAuthForm={(event, authType) => this.handleAuthRouteChange(event, authType)}
          />
        );
      case '/register':
        return (
          <RegisterForm
            title="Register"
            description="Sign up to access this content"
            switchAuthForm={(event, authType) => this.handleAuthRouteChange(event, authType)}
          />
        );
      case '/forgotten':
        return (
          <ForgottenPassword
            title="Forgot your password?"
            switchAuthForm={(event, authType) => this.handleAuthRouteChange(event, authType)}
          />
        );
      default:
        return <span />;
    }
  }
  handleAuthRouteChange(event, authType) {
    event.preventDefault();
    if (authType === 'login') browserHistory.push('/login');
    if (authType === 'register') browserHistory.push('/register');
    if (authType === 'forgottenPassword') browserHistory.push('/forgotten');
  }
  render() {
    const { location } = this.props;
    return (
      <main className="container">
        <div className="wrapper authpage">
          {this.getAuthForm(location.pathname)}
        </div>
      </main>
    );
  }
}

export default connect(null, {clearRedirect})(AuthPage);
