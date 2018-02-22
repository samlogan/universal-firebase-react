import { getFirebaseArray, getFirebaseObject } from '../services/firebaseService';

const fetchData = async (params, routeName) => {
  try {
    // Switch statement on routeName from routes.jsx
    // Fetch data to be loaded serverside
    switch (routeName) {
      // App container data
      case 'App': {
        return null;
      }
      // Home container data
      case 'Home': {
        const posts = await getFirebaseArray('posts', { orderByChild: 'uploaded' });
        return ({ posts });
      }
      // Post container data
      case 'Post': {
        const post = await getFirebaseObject(`posts/${params.id}`);
        return ({ post });
      }
      default:
        return null;
    }
  } catch (error) {
    return console.error('Error fetching universal data @ fetchData', error);
  }
};

export default fetchData;
