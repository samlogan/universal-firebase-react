import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  NOT_SIGNED_IN,
  HAS_ERROR,
  RESET_ERRORS
} from '../actions/types/types_firebase';

const INITIAL_STATE = {
  auth: {},
  loggedIn: false,
  error: ''
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case INIT_AUTH:
    return { ...state, auth: action.payload, loggedIn: true };
  case SIGN_IN_ERROR:
    return { ...state, auth: null, error: action.payload };
  case SIGN_IN_SUCCESS:
    return { ...state, auth: action.payload, error: '', loggedIn: true};
  case SIGN_OUT_SUCCESS:
    return { ...state, auth: null, loggedIn: false };
  case NOT_SIGNED_IN:
    return { ...state, auth: null, loggedIn: false };
  case HAS_ERROR:
    return { ...state, error: { code: action.payload } };
  case RESET_ERRORS:
    return { ...state, error: '' };
  default:
    return state;
  }
}
