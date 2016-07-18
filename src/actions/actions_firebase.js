import { firebaseAuth, firebaseDb } from '../config/firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from './types/types_firebase';

// AUTH
function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInError(error)));
  };
}
export function checkAuth() {
  return dispatch => {
    firebaseAuth.onAuthStateChanged(function(user) {
      console.log(user)
      if (user) {
        dispatch({
          type: INIT_AUTH,
          payload: user
        });
      } else {
        dispatch({
          type: INIT_AUTH,
          payload: user
        });
      }
    });
  }
}
export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
}
export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result.user
  };
}
export function createUserWithEmail(email, password) {
  return dispatch => {
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInError(error)));
  };
}
export function signInWithEmail(email, password) {
  return dispatch => {
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(result => dispatch(signInSuccess(result)))
      .catch(error => dispatch(signInError(error)));
  };
}
export function signInWithGithub() {
  return authenticate(new firebase.auth.GithubAuthProvider());
}
export function signInWithGoogle() {
  return authenticate(new firebase.auth.GoogleAuthProvider());
}
export function signInWithTwitter() {
  return authenticate(new firebase.auth.TwitterAuthProvider());
}
export function signInWithFacebook() {
  return authenticate(new firebase.auth.FacebookAuthProvider());
}
export function signOut() {
  return dispatch => {
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}
export function signOutSuccess() {
  return {
    type: SIGN_OUT_SUCCESS
  };
}
