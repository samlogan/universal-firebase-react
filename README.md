# React, Redux, Firebase universal boilerplate

> Full-stack universal React, Redux, Firebase boilerplate :fire: Built on top of the awesome [reactGo](https://github.com/reactGo/reactGo) framework

:construction: still in construction

## Features:
- [**ReactJS**](https://facebook.github.io/react/)
- [**Redux**](https://github.com/reactjs/redux)
- [**Firebase**](https://firebase.google.com/)
- [**Universal**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) rendering :earth_asia:
- [**React Router 4**](https://github.com/reactjs/react-router)
- [**React Router Redux**](https://github.com/reactjs/react-router-redux)
- [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr) hot reloading
- [**Redux-Devtools Chrome Extension**](https://github.com/zalmoxisus/redux-devtools-extension)
- [**Webpack 3**](https://github.com/webpack/webpack)
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
