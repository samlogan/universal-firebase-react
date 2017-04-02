import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { createUserWithEmail, signInWithFacebook, signInWithGoogle } from '../../actions/firebase';
import { ValidationError } from './ValidationError';

let RegisterForm = class RegisterForm extends Component {
  submit(values) {
    this.props.createUserWithEmail(values);
  }
  providerSignIn(event, provider) {
    event.preventDefault();
    const { redirect } = this.props.firebase;
    if (provider === 'facebook') this.props.signInWithFacebook(redirect);
    if (provider === 'google') this.props.signInWithGoogle(redirect);
  }
  render() {
    const {
      title,
      description,
      firebase,
      handleSubmit,
      switchAuthForm,
      registerForm
    } = this.props;
    if (!registerForm) return null;
    const { values, submitFailed, syncErrors } = registerForm;
    return (
      <div className="form authform register">
        {title ? <h2 className="form-title">{title}</h2> : null}
        {description ? <p className="form-description">{description}</p> : null}
        {firebase.error ? <p className="form-error">{firebase.error}</p> : null}
        <form className="fancylabels" onSubmit={handleSubmit((props) => this.submit(props))}>
          <div className={values && values.firstName ? 'field active split' : 'field split'}>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" component="input" type="text" placeholder="First Name" />
            <ValidationError submitFailed={submitFailed} errors={syncErrors} field="firstName" />
          </div>
          <div className={values && values.lastName ? 'field active split end' : 'field split end'}>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" component="input" type="text" placeholder="Last Name" />
            <ValidationError submitFailed={submitFailed} errors={syncErrors} field="lastName" />
          </div>
          <div className={values && values.email ? 'field active clear' : 'field clear'}>
            <label htmlFor="email">Email</label>
            <Field name="email" component="input" type="email" placeholder="Email" />
            <ValidationError submitFailed={submitFailed} errors={syncErrors} field="email" />
          </div>
          <div className={values && values.password ? 'field active' : 'field'}>
            <label htmlFor="password">Password</label>
            <Field name="password" component="input" type="password" placeholder="Password" />
            <ValidationError submitFailed={submitFailed} errors={syncErrors} field="password" />
          </div>
          <button type="submit" className={firebase.authLoading ? 'button loading' : 'button'}>Register</button>
        </form>
        <Link to="#" className="button provider facebook" onClick={(event) => this.providerSignIn(event, 'facebook')}>Sign up with Facebook</Link>
        <Link to="#" className="button provider google" onClick={(event) => this.providerSignIn(event, 'google')}>Sign up with Google</Link>
        <Link to="#" className="sublink" onClick={(event) => switchAuthForm(event, 'login')}>Already have an account?</Link>
      </div>
    );
  }
};

function validate(values) {
  const errors = { };
  if (!values.firstName) errors.firstName = 'Please enter your first name';
  else if (!values.lastName) errors.lastName = 'Please enter your last name';
  else if (!values.email) errors.email = 'Please enter your email';
  else if (!values.password) errors.password = 'Please enter a password';
  return errors;
}

function mapStateToProps({form, firebase}) {
  const { registerForm } = form;
  return {
    registerForm,
    firebase
  };
}

RegisterForm = reduxForm({
  form: 'registerForm',
  destroyOnUnmount: true,
  validate
})(RegisterForm);
RegisterForm = connect(mapStateToProps, { createUserWithEmail, signInWithFacebook, signInWithGoogle })(RegisterForm);
export default RegisterForm;
