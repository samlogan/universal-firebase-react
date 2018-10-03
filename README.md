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
- [**Redux Form**](https://redux-form.com/7.4.2/)
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

### Example async route handling

#### Route configuration

`app/routes.jsx`

**Home route with corresponding 'name' and 'component' value.**
- 'name' value is sent to a fetchData function and makes async requests for data
- getComponent function awaits async requests and handles WebPack code splitting

```
{
  path: '/',
  exact: true,
  name: 'Home',
  fetchData,
  component: getComponent('Home'),
}
```

#### Fetch Data

`app/fetch-data/fetchData.js`

**Post container mapStateToProps**
- Object returned in fetchData switch statement becomes available on the 'app' Redux state

```
case 'Home': {
  const posts = await getFirebaseArray('posts', { orderByChild: 'uploaded' });
  return ({ posts });
}
```
`containers/Home.jsx`

**Post container mapStateToProps**
- Object returned in fetchData switch statement becomes available on the 'app' Redux state
- 'loading' key is set to true at the start of a request and false upon completion

```
function mapStateToProps({app, loading}) {
  const { posts } = app;
  return {
    loading,
    posts
  };
}
```

## Styling

Component and container level based styles exist in `/app/components/*/*.scss` & `app/containers/*/*.scss` and are imported at the top of each JSX file (beneath absolute and relative module/component imports):

```
// Header.jsx
import React from 'react';
import { Logo } from './Logo';
import './Header.scss';
```

Global SASS partials (variables, typography, grid settings etc) are contained within `/app/sass/` and are split between two folders:

#### /base

For storing Sass mixins, variables and functions across the project.

#### /global

For styles and classes used throughout the project, such as our CSS reset, typography rules, etc. Imported in App container (`/app/containers/App.jsx`) - file imports need be relative to here.
