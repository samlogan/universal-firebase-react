import {
  POST_ALERT,
  CLEAR_ALERT
} from './types';

export function postAlert(message, alert) {
  return (dispatch) => {
    dispatch({ type: POST_ALERT, alert, payload: message});
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 4000);
  };
}
