import firebase from 'firebase';
import { firebaseAuth, firebaseDb } from '../config/firebase';
import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  NOT_SIGNED_IN,
  HAS_ERROR,
  RESET_ERRORS
} from './types/types_firebase';

const usersRef = firebaseDb.ref(`users`);

/* Check Auth
=================================================== */
export function checkAuth() {
  return dispatch => {
    firebaseAuth.onAuthStateChanged(function(user) {
      if (user) {
        dispatch({
          type: INIT_AUTH,
          payload: user
        });
      } else {
        dispatch({
          type: NOT_SIGNED_IN
        });
      }
    });
  };
}
/* Sign in / Sign off actions
=================================================== */
export function signInError(error) {
  return {
    type: SIGN_IN_ERROR,
    payload: error
  };
}
export function signInSuccess(result) {
  return {
    type: SIGN_IN_SUCCESS,
    payload: result
  };
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
/* Provider Signup
=================================================== */
function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
      .then(result => dispatch(createProfileFromProvider(result.user)))
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
export function createProfileFromProvider(result){
  return dispatch => {
    let userRef = usersRef.child(result.uid);
    let userInfo = {
      uid: result.uid,
      displayName: result.displayName
    };
    userRef.update(userInfo, error => {
      if (error) {
        console.error('ERROR @ User :', error);
      } else{
        return {
          type: SIGN_IN_SUCCESS,
          payload: result.user
        };
      }
    });
  };
}

/* Email Signup
=================================================== */
export function createUserWithEmail(email, password, firstName, lastName) {
  return (dispatch) => {
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(result => dispatch(createProfileFromEmail(result, firstName, lastName)))
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
export function createProfileFromEmail(result, firstName, lastName){
  return dispatch => {
    let userRef = usersRef.child(result.uid);
    let userInfo = {
      uid: result.uid,
      email: result.email,
      first_name: firstName,
      last_name: lastName
    };
    userRef.update(userInfo, error => {
      if (error) {
        console.error('ERROR @ User :', error);
      } else{
        return {
          type: SIGN_IN_SUCCESS,
          payload: result.user
        };
      }
    });
  };
}

/* Has Error
=================================================== */
export function hasError(error) {
  return {
    type: HAS_ERROR,
    payload: error
  };
}
export function resetErrors() {
  return {
    type: RESET_ERRORS
  };
}
