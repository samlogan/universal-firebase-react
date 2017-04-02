import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import alerts from '../reducers/alerts';
import app from '../reducers/app';
import firebase from '../reducers/firebase';
import loading from '../reducers/loading';
import posts from '../reducers/posts';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  alerts,
  firebase,
  app,
  form,
  loading,
  routing,
  posts
});

export default rootReducer;
