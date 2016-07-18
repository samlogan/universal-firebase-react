import React, { Component } from 'react';
import { Link } from 'react-router';
import { getErrorFromCode } from '../../config/validation';

class RegisterForm extends Component {
  handleSubmit(e,email,password, firstName, lastName){
    e.preventDefault();
    if(!this.refs.firstName.value){
      this.props.validationFunction('No First Name')
    } else if(!this.refs.lastName.value){
      this.props.validationFunction('No Last Name')
    } else {
      this.props.registerFunction(email, password, firstName, lastName)
    }
  }
  render() {
    const { error } = this.props;
    return (
      <div>
        <h3>Create an Account</h3>
        {error && error.code ? <p className="bg-danger">{getErrorFromCode(error.code)}</p> : ''}
        <form onSubmit={(event, email, password, firstName, lastName) => this.handleSubmit(event, this.refs.email.value, this.refs.password.value, this.refs.firstName.value, this.refs.lastName.value)} >
          <input type="text" ref="firstName" placeholder="First Name" className="form-control" />
          <input type="text" ref="lastName" placeholder="Last Name" className="form-control" />
          <input type="text" ref="email" placeholder="Email" className="form-control" />
          <input type="password" ref="password" placeholder="Password" className="form-control" />
          <span onClick={this.props.history.goBack} className="btn btn-danger">Go Back</span>
          <button className="btn btn-primary">Create an Account</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
