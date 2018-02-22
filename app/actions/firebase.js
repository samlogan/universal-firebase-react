import firebase from 'firebase';
// import { browserHistory } from 'react-router';
import { push } from 'react-router-redux';
import { firebaseAuth, firebaseDb } from '../utils/firebase';
import { getErrorFromCode } from '../utils/firebase/validation';
import { postAlert } from './alerts';
import {
  INIT_AUTH,
  SIGN_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_ERROR,
  SIGN_OUT_SUCCESS,
  PASSWORD_RESET,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAILURE,
  CAPTURE_REDIRECT,
  CLEAR_REDIRECT,
  RESET_AUTH_ERRORS
} from './types';

const usersRef = firebaseDb.ref('users');

/* Sign in / Sign off actions
=================================================== */
export const signInError = (error) => dispatch => {
  console.error('Error signing in', error);
  dispatch({type: SIGN_IN_ERROR, payload: getErrorFromCode(error.code)});
  setTimeout(() => {
    dispatch({ type: RESET_AUTH_ERRORS });
  }, 5000);
};
export const signInSuccess = (profile, reroute, redirect) => dispatch => {
  const nextPath = !redirect ? `/account/${profile.uid}` : redirect;
  dispatch({ type: SIGN_IN_SUCCESS, payload: profile});
  if (reroute) dispatch(push(nextPath));
};
export const signOutSuccess = () => (dispatch) => {
  dispatch({type: SIGN_OUT_SUCCESS});
  dispatch(postAlert('You have successfully signed out', 'success'));
  dispatch(push('/'));
};
export const signOut = (event) => async dispatch => {
  try {
    if (event) event.preventDefault();
    await firebaseAuth.signOut();
    dispatch(signOutSuccess());
  } catch (error) {
    console.error('Error signing out', error);
  }
};
/* Provider Signup
=================================================== */
export const createProfileFromProvider = (result, redirect) => async dispatch => {
  try {
    const userRef = usersRef.child(result.uid);
    const userInfo = {
      uid: result.uid,
      providerUid: result.providerData[0].uid,
      displayName: result.providerData[0].displayName,
      firstName: result.providerData[0].displayName.split(' ')[0],
      lastName: result.providerData[0].displayName.split(' ').pop().replace(',', ' '),
      email: result.providerData[0].email,
      providerType: result.providerData[0].providerId,
      photoURL: result.providerData[0].photoURL
    };
    const snapshot = await userRef.once('value');
    // Existing user
    if (snapshot.val()) return dispatch(signInSuccess(snapshot.val(), true, redirect));
    // New User
    await userRef.update(userInfo);
    return dispatch(signInSuccess(userInfo, true, redirect));
  } catch (error) {
    return console.error('Error creating profile from provider', error);
  }
};
const authenticate = (provider, redirect) => async dispatch => {
  try {
    dispatch({type: SIGN_IN});
    const result = await firebaseAuth.signInWithPopup(provider);
    dispatch(createProfileFromProvider(result.user, redirect));
  } catch (error) {
    dispatch(signInError(error));
  }
};
export const signInWithGoogle = (redirect) => authenticate(new firebase.auth.GoogleAuthProvider(), redirect);
export const signInWithTwitter = (redirect) => authenticate(new firebase.auth.TwitterAuthProvider(), redirect);
export const signInWithGithub = (redirect) => {
  const provider = new firebase.auth.GithubAuthProvider();
  const scopes = ['user', 'repo', 'delete_repo', 'read:org', 'write:org'];
  scopes.map(scope => provider.addScope(scope));
  return authenticate(provider, redirect);
};
export const signInWithFacebook = (redirect) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  const scopes = ['email'];
  scopes.map(scope => provider.addScope(scope));
  return authenticate(provider, redirect);
};
/* Fetch user profile
=================================================== */
export const fetchProfile = (result, reroute, redirect) => async dispatch => {
  const userRef = usersRef.child(result.uid);
  const snapshot = await userRef.once('value');
  const userInfo = {...snapshot.val(), uid: result.uid};
  dispatch(signInSuccess(userInfo, reroute, redirect));
};
/* Email Signup
=================================================== */
export const createProfileFromEmail = (result, firstName, lastName) => async dispatch => {
  try {
    const userRef = usersRef.child(result.uid);
    const userInfo = {
      firstName,
      lastName,
      email: result.email,
      uid: result.uid
    };
    await userRef.update(userInfo);
    dispatch(signInSuccess(userInfo, true));
  } catch (error) {
    console.error('Error creating profile from email address', error);
  }
};
export const createUserWithEmail = (props) => async (dispatch) => {
  try {
    const { firstName, lastName, email, password } = props;
    dispatch({type: SIGN_IN});
    const result = await firebaseAuth.createUserWithEmailAndPassword(email, password);
    dispatch(createProfileFromEmail(result, firstName, lastName));
  } catch (error) {
    dispatch(signInError(error));
  }
};
export const signInWithEmail = (props, redirect) => async dispatch => {
  try {
    const { email, password } = props;
    dispatch({type: SIGN_IN});
    const result = await firebaseAuth.signInWithEmailAndPassword(email, password);
    dispatch(fetchProfile(result, true, redirect));
  } catch (error) {
    dispatch(signInError(error));
  }
};
export const resetPasswordFromEmail = (email) => async dispatch => {
  try {
    dispatch({type: PASSWORD_RESET});
    await firebaseAuth.sendPasswordResetEmail(email);
    dispatch(postAlert(`A password reset email has been sent to ${email}`, 'success'));
    dispatch({type: PASSWORD_RESET_SUCCESS});
  } catch (error) {
    dispatch({type: PASSWORD_RESET_FAILURE, payload: getErrorFromCode(error.code)});
    setTimeout(() => {
      dispatch({ type: RESET_AUTH_ERRORS });
    }, 5000);
  }
};
/* Check Auth
=================================================== */
export const checkAuth = () => dispatch => {
  firebaseAuth.onAuthStateChanged(user => {
    if (user) dispatch(fetchProfile(user, false));
    else dispatch({ type: INIT_AUTH });
  });
};
/* Handle redirecting user post signin
=================================================== */
export const captureRedirect = (payload) => ({ type: CAPTURE_REDIRECT, payload });
export const clearRedirect = () => ({ type: CLEAR_REDIRECT });
