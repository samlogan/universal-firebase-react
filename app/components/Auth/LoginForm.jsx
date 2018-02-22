import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { signInWithEmail, signInWithFacebook, signInWithGoogle } from '../../actions/firebase';
import { ValidationError } from './ValidationError';

let LoginForm = class LoginForm extends Component {
  submit(values) {
    const { redirect } = this.props.firebase;
    this.props.signInWithEmail(values, redirect);
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
      loginForm,
      handleSubmit,
      switchAuthForm
    } = this.props;
    if (!loginForm) return null;
    const { values, syncErrors, submitFailed } = loginForm;
    return (
      <div className="form authform login">
        {title ? <h2 className="form-title">{title}</h2> : null}
        {description ? <p className="form-description">{description}</p> : null}
        {firebase.error ? <p className="form-error">{firebase.error}</p> : null}
        <form className="fancylabels" onSubmit={handleSubmit((props) => this.submit(props))}>
          <div className={values && values.email ? 'field active' : 'field'}>
            <label htmlFor="email">Email Address</label>
            <Field name="email" component="input" type="email" placeholder="Email Address" />
            <ValidationError submitFailed={submitFailed} errors={syncErrors} field="email" />
          </div>
          <div className={values && values.password ? 'field active' : 'field'}>
            <label htmlFor="password">Password</label>
            <Field name="password" component="input" type="password" placeholder="Password" />
            <ValidationError submitFailed={submitFailed} errors={syncErrors} field="password" />
          </div>
          <button type="submit" className={firebase.authLoading ? 'button loading' : 'button'}>Login</button>
        </form>
        <Link to="#" className="button provider facebook" onClick={(event) => this.providerSignIn(event, 'facebook')}>Sign in with Facebook</Link>
        <Link to="#" className="button provider google" onClick={(event) => this.providerSignIn(event, 'google')}>Sign in with Google</Link>
        <Link to="#" className="sublink" onClick={(event) => switchAuthForm(event, 'forgottenPassword')}>Forgotten Password?</Link>
      </div>
    );
  }
};

function validate(values) {
  const errors = { };
  if (!values.email) errors.email = 'Please enter your email';
  else if (!values.password) errors.password = 'Please enter a password';
  return errors;
}

function mapStateToProps({form, firebase}) {
  const { loginForm } = form;
  return {
    loginForm,
    firebase
  };
}

LoginForm = reduxForm({
  form: 'loginForm',
  destroyOnUnmount: true,
  validate
})(LoginForm);
LoginForm = connect(mapStateToProps, { signInWithEmail, signInWithFacebook, signInWithGoogle })(LoginForm);
export default LoginForm;
