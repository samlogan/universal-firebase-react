import React, { Component } from 'react';

class LoginForm extends Component {
  getErrorMessage(code){
    console.log(code);
    if(code === "auth/invalid-email"){
      return "Please check that you have entered your email address correctly"
    }
    if(code === "auth/user-not-found"){
      return "We were unable to find a user with that email address"
    }
    if(code === "auth/wrong-password"){
      return "Incorrect password, please try again"
    }
  }
  handleSubmit(e,email,password){
    e.preventDefault();
    this.props.loginFunction(email, password)
  }
  render() {
    const { error } = this.props;
    return (
      <div>
        <h3>Sign in with email and password</h3>
        {error && error.code ? <p className="bg-danger">{this.getErrorMessage(error.code)}</p> : ''}
        <form onSubmit={(event, email, password) => this.handleSubmit(event, this.refs.email.value, this.refs.password.value)} >
          <input type="text" ref="email" placeholder="Email" className="form-control" />
          <input type="password" ref="password" placeholder="Password" className="form-control" />
          <button className="btn btn-primary">Sign in</button>
        </form>
        <p>Need an account?</p>
      </div>
    );
  }
}

export default LoginForm;
