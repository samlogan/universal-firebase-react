import {
  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  savedPost: {},
  error: ''
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_POST:
      return { ...INITIAL_STATE, savedPost: {}, loading: false };
    case CREATE_POST_SUCCESS:
      return { ...state, savedPost: action.payload, loading: true };
    case CREATE_POST_FAILURE:
      return { ...state, savedPost: {}, loading: false, error: action.payload };
    default:
      return state;
  }
}
