import {
  FETCH_NOTES,
  PUSH_NOTE,
  DELETE_NOTE,
  RESET_ALERTS
} from '../actions/types/types_firebase_db';

const INITIAL_STATE = {
  notes: [],
  note: {},
  deleted_note: {},
  alert: { success: '', error: '', warning: '' }
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_NOTES:
    return { ...state, notes: action.payload }
  case PUSH_NOTE:
    return { ...state, note: action.payload, alert: {success: 'Your note was added'} };
  case DELETE_NOTE:
    return { ...state, deleted_note: action.payload, alert: {error: 'Your note was deleted'} };
  case RESET_ALERTS:
    return { ...state, alert: { success: '', error: '', warning: '' } }
  default:
    return state;
  }
}
