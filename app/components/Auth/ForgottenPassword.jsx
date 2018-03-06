import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { resetPasswordFromEmail, signInWithFacebook, signInWithGoogle } from '../../actions/firebase';
import { ValidationError } from './ValidationError';

let ForgottenPassword = class ForgottenPassword extends Component {
  submit(values) {
    const { email } = values;
    this.props.resetPasswordFromEmail(email);
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
      forgottenPasswordForm
    } = this.props;
    if (!forgottenPasswordForm) return null;
    const { values, submitFailed, syncErrors } = forgottenPasswordForm;
    return (
      <div className="form authform forgot">
        {title ? <h2 className="form-title">{title}</h2> : null}
        {description ? <p className="form-description">{description}</p> : null}
        {firebase.error ? <p className="form-error">{firebase.error}</p> : null}
        <form className="fancylabels" onSubmit={handleSubmit(props => this.submit(props))}>
          <div className={values && values.email ? 'field active' : 'field'}>
            <label htmlFor="email">Email Address</label>
            <Field name="email" component="input" type="email" placeholder="Email Address" />
            <ValidationError submitFailed={submitFailed} errors={syncErrors} field="email" />
          </div>
          <button type="submit" className={firebase.authLoading ? 'button loading' : 'button'}>Submit</button>
        </form>
        <Link to="#" className="button provider facebook" onClick={event => this.providerSignIn(event, 'facebook')}>Sign up with Facebook</Link>
        <Link to="#" className="button provider google" onClick={event => this.providerSignIn(event, 'google')}>Sign in with Google</Link>
        <Link to="#" className="sublink" onClick={event => switchAuthForm(event, 'register')}>Create an account</Link>
      </div>
    );
  }
};

function validate(values) {
  const errors = { };
  if (!values.email) errors.email = 'Please enter your email address';
  return errors;
}

function mapStateToProps({form, firebase}) {
  const { forgottenPasswordForm } = form;
  return {
    forgottenPasswordForm,
    firebase
  };
}

ForgottenPassword = reduxForm({
  form: 'forgottenPasswordForm',
  destroyOnUnmount: true,
  validate
})(ForgottenPassword);
ForgottenPassword = connect(mapStateToProps, { resetPasswordFromEmail, signInWithFacebook, signInWithGoogle })(ForgottenPassword);
export default ForgottenPassword;
