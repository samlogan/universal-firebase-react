import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import FirebaseAuthReducer from './reducer_firebase_auth';
import FirebaseDBReducer from './reducer_firebase_db';

const rootReducer = combineReducers({
  auth: FirebaseAuthReducer,
  notes: FirebaseDBReducer,
  form: formReducer
});

export default rootReducer;
