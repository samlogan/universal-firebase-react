import firebase from 'firebase';
import { browserHistory } from 'react-router';
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
export function signInError(error) {
  return dispatch => {
    console.error('Error signing in', error);
    dispatch({type: SIGN_IN_ERROR, payload: getErrorFromCode(error.code)});
    setTimeout(() => {
      dispatch({ type: RESET_AUTH_ERRORS });
    }, 5000);
  };
}
export function signInSuccess(profile, reroute, redirect) {
  return dispatch => {
    const nextPath = !redirect ? `/account/${profile.uid}` : redirect;
    dispatch({ type: SIGN_IN_SUCCESS, payload: profile});
    if (reroute) browserHistory.push(nextPath);
  };
}
export function signOutSuccess() {
  return (dispatch) => {
    dispatch({type: SIGN_OUT_SUCCESS});
    dispatch(postAlert('You have successfully signed out', 'success'));
    browserHistory.push('/');
  };
}
export function signOut(event) {
  return dispatch => {
    if (event) event.preventDefault();
    firebaseAuth.signOut()
      .then(() => dispatch(signOutSuccess()));
  };
}
/* Provider Signup
=================================================== */
export function createProfileFromProvider(result, redirect) {
  return dispatch => {
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
    userRef.once('value')
    .then(snapshot => {
      // Existing user
      if (snapshot.val()) dispatch(signInSuccess(snapshot.val(), true, redirect));
      // New User
      else {
        userRef.update(userInfo, error => {
          if (error) {
            console.error('ERROR @ User :', error);
          } else {
            dispatch(signInSuccess(userInfo, true, redirect));
          }
        });
      }
    });
  };
}
function authenticate(provider, redirect) {
  return dispatch => {
    dispatch({type: SIGN_IN});
    firebaseAuth.signInWithPopup(provider)
    .then(result => dispatch(createProfileFromProvider(result.user, redirect)))
    .catch(error => dispatch(signInError(error)));
  };
}
export function signInWithGoogle(redirect) {
  return authenticate(new firebase.auth.GoogleAuthProvider(), redirect);
}
export function signInWithTwitter(redirect) {
  return authenticate(new firebase.auth.TwitterAuthProvider(), redirect);
}
export function signInWithGithub(redirect) {
  const provider = new firebase.auth.GithubAuthProvider();
  const scopes = ['user', 'repo', 'delete_repo', 'read:org', 'write:org'];
  scopes.map(scope => provider.addScope(scope));
  return authenticate(provider, redirect);
}
export function signInWithFacebook(redirect) {
  const provider = new firebase.auth.FacebookAuthProvider();
  const scopes = ['email'];
  scopes.map(scope => provider.addScope(scope));
  return authenticate(provider, redirect);
}
/* Email Signup
=================================================== */
export function createProfileFromEmail(result, firstName, lastName) {
  return dispatch => {
    const userRef = usersRef.child(result.uid);
    const userInfo = {
      firstName,
      lastName,
      email: result.email,
      uid: result.uid
    };
    userRef.update(userInfo, error => {
      if (error) {
        console.error('ERROR @ User :', error);
      } else {
        dispatch(signInSuccess(userInfo, true));
      }
    });
  };
}
export function createUserWithEmail(props) {
  const { firstName, lastName, email, password } = props;
  return (dispatch) => {
    dispatch({type: SIGN_IN});
    firebaseAuth.createUserWithEmailAndPassword(email, password)
    .then(result => dispatch(createProfileFromEmail(result, firstName, lastName)))
    .catch(error => dispatch(signInError(error)));
  };
}
export function signInWithEmail(props, redirect) {
  const { email, password } = props;
  return dispatch => {
    dispatch({type: SIGN_IN});
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(result => dispatch(fetchProfile(result, true, redirect)))
      .catch(error => dispatch(signInError(error)));
  };
}
export function resetPasswordFromEmail(email) {
  return (dispatch) => {
    dispatch({type: PASSWORD_RESET});
    firebaseAuth.sendPasswordResetEmail(email)
      .then(() => {
        dispatch(postAlert(`A password reset email has been sent to ${email}`, 'success'));
        dispatch({type: PASSWORD_RESET_SUCCESS});
      })
      .catch(error => {
        dispatch({type: PASSWORD_RESET_FAILURE, payload: getErrorFromCode(error.code)});
        setTimeout(() => {
          dispatch({ type: RESET_AUTH_ERRORS });
        }, 5000);
      });
  };
}
/* Check Auth and fetch user profile
=================================================== */
export function fetchProfile(result, reroute, redirect) {
  return (dispatch) => {
    const userRef = usersRef.child(result.uid);
    userRef.once('value').then(snapshot => {
      const userInfo = {...snapshot.val(), uid: result.uid};
      dispatch(signInSuccess(userInfo, reroute, redirect));
    });
  };
}
export function checkAuth() {
  return dispatch => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) dispatch(fetchProfile(user, false));
      else dispatch({ type: INIT_AUTH });
    });
  };
}
/* Handle redirecting user post signin
=================================================== */
export function captureRedirect(path) {
  return { type: CAPTURE_REDIRECT, payload: path};
}
export function clearRedirect() {
  return { type: CLEAR_REDIRECT };
}
