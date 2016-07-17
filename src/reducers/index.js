import { combineReducers } from 'redux';
import FirebaseReducer from './reducer_firebase';

const rootReducer = combineReducers({
  auth: FirebaseReducer
});

export default rootReducer;
