import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearRedirect } from '../actions/firebase';
import ProtectedRoute from './ProtectedRoute';
import LoginForm from '../components/Auth/LoginForm';
import RegisterForm from '../components/Auth/RegisterForm';
import ForgottenPassword from '../components/Auth/ForgottenPassword';
import './AuthPage.scss';

const AuthForm = ({ authRoute }) => {
  if (authRoute === '/login') {
    return <LoginForm title="Login" />;
  }
  if (authRoute === '/register') {
    return (
      <RegisterForm
        title="Register"
        description="Sign up to access this content"
      />
    );
  }
  if (authRoute === '/forgotten') {
    return <ForgottenPassword title="Forgot your password?" />;
  }
}

let AuthPage = class AuthPage extends Component {
  componentWillUnmount() {
    this.props.clearRedirect();
  }
  render() {
    const { location } = this.props;
    return (
      <main className="container">
        <div className="wrapper authpage">
          <AuthForm authRoute={location.pathname} />
        </div>
      </main>
    );
  }
};

AuthPage = connect(null, {clearRedirect})(AuthPage);

export default ProtectedRoute(AuthPage);
