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
} from '../actions/types';

const INITIAL_STATE = {
  profile: {},
  loading: true,
  loggedIn: false,
  error: '',
  redirect: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case INIT_AUTH:
      return { ...INITIAL_STATE, redirect: state.redirect, loading: false };
    case SIGN_IN:
      return { ...state, loading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, profile: action.payload, error: '', redirect: null, loggedIn: true, loading: false };
    case SIGN_IN_ERROR:
      return { ...state, profile: null, error: action.payload, loading: false };
    case SIGN_OUT_SUCCESS:
      return { ...state, profile: null, loggedIn: false };
    case PASSWORD_RESET:
      return { ...state, loading: true };
    case PASSWORD_RESET_SUCCESS:
      return { ...state, loading: false };
    case PASSWORD_RESET_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CAPTURE_REDIRECT:
      return { ...state, redirect: action.payload };
    case CLEAR_REDIRECT:
      return { ...state, redirect: null };
    case RESET_AUTH_ERRORS:
      return { ...state, error: '' };
    default:
      return state;
  }
}
