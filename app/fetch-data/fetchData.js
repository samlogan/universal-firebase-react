import { getFirebaseArray, getFirebaseObject } from '../services/firebaseService';

const fetchData = (params, routeName) => {
  // Switch statement on routeName from routes.jsx
  // Fetch data to be loaded serverside
  switch (routeName) {
    // App container data
    case 'App': {
      return null;
    }
    // Home container data
    case 'Home': {
      return getFirebaseArray('posts')
      .then(posts => ({ posts }))
      .catch(error => console.log('error', error));
    }
    // Post container data
    case 'Post': {
      return getFirebaseObject(`posts/${params.id}`)
      .then(post => ({ post }))
      .catch(error => console.log('error', error));
    }
    default:
      return null;
  }
};

export default fetchData;
