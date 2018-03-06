# React, Redux, Firebase universal boilerplate

> Full-stack universal React, Redux, Firebase boilerplate :fire: Built on top of the awesome [reactGo](https://github.com/reactGo/reactGo) framework

:construction: still in construction

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
