import { combineReducers } from 'redux';
import FirebaseReducer from './reducer_firebase_auth';

const rootReducer = combineReducers({
  auth: FirebaseReducer
});

export default rootReducer;
