import { reset } from 'redux-form';
import { firebaseDb, firebaseAuth } from '../utils/firebase';
import { postAlert } from './alerts';
import { CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE } from './types';

const postsRef = firebaseDb.ref('posts');
const usersRef = firebaseDb.ref('users');

// Success and error helper functions
function createPostError(key, error) {
  return (dispatch) => {
    postsRef.child(key).remove();
    dispatch({type: CREATE_POST_FAILURE, payload: error});
    dispatch(postAlert(error.message, 'error'));
  };
}
function createPostSuccess(props) {
  return (dispatch) => {
    dispatch({type: CREATE_POST_SUCCESS, payload: props});
    dispatch(postAlert(`${props.title} successfully created`, 'success'));
    dispatch(reset('addPostForm'));
  };
}

// Assignment helper function
function assignPostToUser(key, props) {
  return (dispatch) => {
    const user = firebaseAuth.currentUser;
    const userPostsRef = usersRef.child(`${user.uid}/posts`);
    const userPostRef = userPostsRef.child(key);
    userPostRef.set({uploaded: +new Date(), lastModified: +new Date()})
    .then(() => dispatch(createPostSuccess(props)))
    .catch(error => dispatch(createPostError(key, error)));
  };
}

// Add post action creator
export function addPost(props) {
  return (dispatch) => {
    dispatch({type: CREATE_POST});
    const postRef = postsRef.push();
    const postData = {...props, uploaded: +new Date(), lastModified: +new Date(), uid: postRef.key};
    postRef.set(postData)
    .then(() => dispatch(assignPostToUser(postRef.key, postData)))
    .catch(error => dispatch(createPostError(postRef.key, error)));
  };
}
