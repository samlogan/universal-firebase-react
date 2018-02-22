import {
  REQUEST_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {

};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_SUCCESS:
    return { ...state, ...action.data };
  default:
    return state;
  }
}
