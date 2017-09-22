# React, Redux, Firebase universal boilerplate

> Full-stack universal React, Redux, Firebase boilerplate :fire: Built on top of the awesome [reactGo](https://github.com/reactGo/reactGo) framework

:construction: still in construction

## Features:
- [**ReactJS**](https://facebook.github.io/react/)
- [**Redux**](https://github.com/reactjs/redux)
- [**Firebase**](https://firebase.google.com/)
- [**Universal**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) rendering :earth_asia:
- [**React Router**](https://github.com/reactjs/react-router)
- [**React Router Redux**](https://github.com/reactjs/react-router-redux)
- [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr) hot reloading
- [**Redux-Devtools Chrome Extension**](https://github.com/zalmoxisus/redux-devtools-extension)
- [**Webpack**](https://github.com/webpack/webpack)
- [**Express 4.x**](https://expressjs.com/en/api.html) server

### Configuration

Firebase configuration file exist within `app/utils/firebase/config.js`, replace these with your own Firebase credentials.

### Firebase Services

You can edit the below services inside `app/services/firebaseService.js`

##### Get Firebase object

```
getFirebaseObject('example-firebase-ref')
.then(exampleObj => ({exampleObj}))
.catch(error => console.error(error))
```

##### Get Firebase Array

```
getFirebaseArray('example-firebase-ref')
.then(arrayofItems => ({ arrayofItems }))
.catch(error => console.log('error', error));
```

#### Example async route handling

> Super basic overview, [you can find out more here](https://github.com/reactGo/reactGo)

`app/routes.jsx`

```
<Route path="posts/:id" component={Post} name="Post" fetchData={fetchData} />
```
`app/fetch-data/fetchData.js`

```
// Post container data
case 'Post': {
  return getFirebaseObject(`posts/${params.id}`)
  .then(post => ({ post }))
  .catch(error => console.log('error', error));
}
```

##### What's happening

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
