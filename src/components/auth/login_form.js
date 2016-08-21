import React, { Component } from 'react';
import { Link } from 'react-router';
import { CREATE_ACCOUNT } from '../../config/paths';
import { getErrorFromCode } from '../../config/validation';

class LoginForm extends Component {
  getErrorMessage(code){
    if(code === "auth/invalid-email"){
      return "Please check that you have entered your email address correctly";
    }
    if(code === "auth/user-not-found"){
      return "We were unable to find a user with that email address";
    }
    if(code === "auth/wrong-password"){
      return "Incorrect password, please try again";
    }
  }
  handleSubmit(e,email,password){
    e.preventDefault();
    this.props.loginFunction(email, password);
  }
  render() {
    const { error } = this.props;
    return (
      <div>
        <h3>Sign in with email and password</h3>
        {error && error.code ? <p className="bg-danger">{getErrorFromCode(error.code)}</p> : ''}
        <form className="form-inline" onSubmit={(event, email, password) => this.handleSubmit(event, this.refs.email.value, this.refs.password.value)} >
          <input type="text" ref="email" placeholder="Email" className="form-control" />
          <input type="password" ref="password" placeholder="Password" className="form-control" />
          <button className="btn btn-primary">Sign in</button>
        </form>
        <Link to={CREATE_ACCOUNT}>Create an account</Link>
        <p></p>
      </div>
    );
  }
}

LoginForm.propTypes = {
  error: React.PropTypes.object.isRequired,
  loginFunction: React.PropTypes.func.isRequired
};

export default LoginForm;
