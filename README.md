# React, Redux, Firebase universal boilerplate

> Full-stack universal React, Redux, Firebase boilerplate :fire: Built on top of the awesome [reactGo](https://github.com/reactGo/reactGo) framework

## Features:
- [**React 16**](https://facebook.github.io/react/)
- [**Redux**](https://github.com/reactjs/redux)
- [**ECMAScript 2017 (ES7)**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_Next_support_in_Mozilla)
- [**Firebase**](https://firebase.google.com/)
- [**Firebase Admin**](https://firebase.google.com/docs/admin/setup)
- [**Universal**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) rendering :earth_asia:
- [**React Router 4**](https://github.com/reactjs/react-router)
- [**React Router Redux**](https://github.com/reactjs/react-router-redux)
- [**Webpack 4**](https://github.com/webpack/webpack)
- [**CSS Module w/ SASS support**](https://github.com/css-modules/css-modules)
- [**Express**](https://expressjs.com/en/api.html) server

## Getting started

⛔️ 📛 🚫 **IMPORTANT** run `npm run build` at the start of each project

### Running Server

`npm install && npm run dev`

### Configuration

- Client Firebase configuration file exist within `app/utils/firebase/config.js`, replace these with your own Firebase credentials.
- Firebase admin configuration exist within `server/index.js`, replace these with your own Firebase credentials & swap out admin SDK key inside `server/secrets`.

### Firebase Services

- You can edit the below services inside `app/services/firebaseService.js`

##### Get Firebase object

```
const exampleObj = await getFirebaseObject('example-firebase-ref');
```

##### Get Firebase array

```
const arrayofItems = await getFirebaseArray('example-firebase-ref');
```

##### Using Firebase filters

```
const exampleObjWithFilters = await getFirebaseObject('example-firebase-ref', { orderByChild: 'date', equalTo: '06/03/2018' });
```

#### Example async route handling

> Super basic overview, [you can find out more here](https://github.com/reactGo/reactGo)

`app/routes.jsx`

```
// Post route with name value
{
  path: '/posts/:id',
  name: 'Post',
  fetchData,
  component: asyncComponent(() => import(/* webpackChunkName: "Post" */ './containers/Post')),
}
```
`app/fetch-data/fetchData.js`

```
// Post case in fetchData switch statement
case 'Post': {
  const posts = await getFirebaseArray('posts', { orderByChild: 'uploaded' });
  return ({ posts });
}
```
`containers/Post.jsx`

```
// Post container mapStateToProps
// Key returned in fetchData switch statement becomes available on the app redux state
function mapStateToProps({app, loading}) {
  const { post } = app;
  return {
    loading,
    post
  };
}
```

##### What's happening 🤔

- Matches component to path
- React Router's onUpdate function (`app/client.jsx`) handles the route change, dispatches initial Redux action creator and runs fetchData
- fetchData runs a switch statement on the name prop to request the async data and dispatches results to the Redux store making the data available within the matched container
- Server returns html file to the browser with initial state


### Redux-Forms

A quick tutorial to using Redux forms! ⚡

#### Creating a form:

```
import React from 'react';
import { reduxForm } from 'redux-form';

class ContactForm extends React.Component {
  render() {
    const { fields: {name, address, phone}, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" {...name}/>
        {name.error && name.touched && <div>{name.error}</div>}

        <label>Address</label>
        <input type="text" {...address} />
        {address.error && address.touched && <div>{address.error}</div>}

        <label>Phone</label>
        <input type="text" {...phone}/>
        {phone.error && phone.touched && <div>{phone.error}</div>}

        <button onClick={handleSubmit}>Submit</button>
      </form>
    );
  }
}

ContactForm = reduxForm({
  form: 'contact',                      // the name of your form and the key to
                                        // where your form's state will be mounted
  fields: ['name', 'address', 'phone'], // a list of all your fields in your form
  validate: validateContact             // a synchronous validation function
})(ContactForm);

export default ContactForm;
```

#### Connecting the form to the component which handles it:

```
import React from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import ContactForm from './ContactForm.react';

class App extends React.Component {

  handleSubmit(data) {
    console.log('Submission received!', data);
    this.props.dispatch(initialize('contact', {})); // clear form
  }

  render() {
    return (
      <div id="app">
        <h1>App</h1>
        <ContactForm onSubmit={this.handleSubmit.bind(this)}/>
      </div>
    );
  }

}

export default connect()(App);
```

#### Adding the redux-form reducer in your combined reducers:

```
import { combineReducers } from 'redux';
import { appReducer } from './app-reducers';
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
  appReducer, form: formReducer // this is the form reducer
});

export default reducers;
And the validator module looks like this:

export default function validateContact(data, props) {
  const errors = {};
  if(!data.name) {
    errors.name = 'Required';
  }
  if(data.address && data.address.length > 50) {
    errors.address = 'Must be fewer than 50 characters';
  }
  if(!data.phone) {
    errors.phone = 'Required';
  } else if(!/\d{3}-\d{3}-\d{4}/.test(data.phone)) {
    errors.phone = 'Phone must match the form "999-999-9999"'
  }
  return errors;
}
```

#### If you ever find yourself needing to prepopulate fields in your form, say for an editing type functionality, you can use the initialize function:

```
componentWillMount() {
  this.props.dispatch(initialize('contact', {
    name: 'test'
  }, ['name', 'address', 'phone']));
}
```

#### Or, another way to populate the forms is to set the initialValues:

```
ContactForm = reduxForm({
  form: 'contact',                      // the name of your form and the key to
  fields: ['name', 'address', 'phone'], // a list of all your fields in your form
  validate: validateContact             // a synchronous validation function
}, state => ({
  initialValues: {
    name: state.user.name,
    address: state.user.address,
    phone: state.user.phone,
  },
}))(ContactForm);
```
