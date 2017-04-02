import {
  POST_ALERT,
  CLEAR_ALERT
} from '../actions/types';

const INITIAL_STATE = {
  success: null,
  error: null,
  warning: null
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case POST_ALERT:
    return { ...INITIAL_STATE, [action.alert]: action.payload };
  case CLEAR_ALERT:
    return { ...INITIAL_STATE };
  default:
    return state;
  }
}
