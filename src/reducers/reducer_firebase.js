import {
  INIT_AUTH,
  SIGN_IN_ERROR,
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS
} from '../actions/types/types_firebase';

const INITIAL_STATE = {
  auth: {},
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case INIT_AUTH:
    return { ...state, auth: action.payload };
  case SIGN_IN_ERROR:
    return { ...state, auth: {}, error: action.payload };
  case SIGN_IN_SUCCESS:
    return { ...state, auth: action.payload, error: '' };
  case SIGN_OUT_SUCCESS:
    return { ...state, auth: {} };
  default:
    return state;
  }
}
