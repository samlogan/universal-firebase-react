import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import ProtectedRoute from './ProtectedRoute';
import { Head } from '../components/Common/Head';
import { addPost } from '../actions/posts';
import { ValidationError } from '../components/Auth/ValidationError';
import ErrorBoundary from '../components/Common/ErrorBoundary';

let AddPost = class AddPost extends Component {
  submit(values) {
    this.props.addPost(values);
  }
  render() {
    const { addPostForm, handleSubmit } = this.props;
    if (!addPostForm) return null;
    const { values, syncErrors, submitFailed } = addPostForm;
    return (
      <main className="container">
        <Head title="Add Post" />
        <div className="wrapper">
          <ErrorBoundary>
            <form onSubmit={handleSubmit(props => this.submit(props))}>
              <div className={values && values.email ? 'field active' : 'field'}>
                <label htmlFor="title">Title</label>
                <Field name="title" component="input" type="text" placeholder="Enter a title for your post" />
                <ValidationError submitFailed={submitFailed} errors={syncErrors} field="title" />
              </div>
              <div className={values && values.password ? 'field active' : 'field'}>
                <label htmlFor="content">Content</label>
                <Field name="content" component="textarea" placeholder="Enter some content for your post" />
                <ValidationError submitFailed={submitFailed} errors={syncErrors} field="content" />
              </div>
              <button type="submit" className="button">Post</button>
            </form>
          </ErrorBoundary>
        </div>
      </main>
    );
  }
};

function validate(values) {
  const errors = { };
  if (!values.title) errors.title = 'Please enter a title';
  else if (!values.content) errors.content = 'Please enter some content';
  return errors;
}

function mapStateToProps({form, posts}) {
  const { addPostForm } = form;
  return {
    addPostForm,
    posts
  };
}

AddPost = reduxForm({
  form: 'addPostForm',
  destroyOnUnmount: true,
  validate
})(AddPost);
AddPost = connect(mapStateToProps, { addPost })(AddPost);
export default ProtectedRoute(AddPost);
