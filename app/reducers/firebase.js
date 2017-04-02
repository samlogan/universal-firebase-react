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
  authLoading: false,
  loggedIn: false,
  error: '',
  redirect: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case INIT_AUTH:
      return { ...INITIAL_STATE, redirect: state.redirect };
    case SIGN_IN:
      return { ...state, authLoading: true };
    case SIGN_IN_SUCCESS:
      return { ...state, profile: action.payload, error: '', redirect: null, loggedIn: true, authLoading: false };
    case SIGN_IN_ERROR:
      return { ...state, profile: null, error: action.payload, authLoading: false };
    case SIGN_OUT_SUCCESS:
      return { ...state, profile: null, loggedIn: false };
    case PASSWORD_RESET:
      return { ...state, authLoading: true };
    case PASSWORD_RESET_SUCCESS:
      return { ...state, authLoading: false };
    case PASSWORD_RESET_FAILURE:
      return { ...state, authLoading: false, error: action.payload };
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
