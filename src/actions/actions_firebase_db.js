import { firebaseDb } from '../config/firebase';
import {
  FETCH_NOTES,
  PUSH_NOTE,
  DELETE_NOTE,
  RESET_ALERTS
} from './types/types_firebase_db';

const usersRef = firebaseDb.ref(`users`);

/* Push & Delete
=================================================== */
export function pushNote(userID, note) {
  console.log('userID', userID);
  console.log('note', note);
  return (dispatch) => {
    const postRef = usersRef.child(userID).child('notes').push();
    postRef.set(note, error => {
      if (error) {
        console.error('ERROR @ pushNote :', error);
        // dispatch({
        //   type: CREATE_ERROR,
        //   payload: error
        // });
      } else{
        dispatch({
          type: PUSH_NOTE,
          payload: note
        });
      }
    });
  };
}
export function deleteNote(userID,key){
  return (dispatch) => {
    const noteRef = usersRef.child(userID).child(`notes`).child(key);
    noteRef.remove();
  };
}
/* Firebase Listeners
=================================================== */
export function noteListeners(userID) {
  return (dispatch) => {
    const notesRef = usersRef.child(userID).child('notes')
    notesRef.on('value', snapshot => {
      let noteArr = []
      snapshot.forEach((childSnapshot) => {
        let attr = childSnapshot.val();
        attr.key = childSnapshot.key;
        noteArr.push(attr)
      });
      dispatch({
        type: FETCH_NOTES,
        payload: noteArr
      });
    });
    notesRef.on("child_removed", function(snapshot) {
      dispatch({
        type: DELETE_NOTE,
        payload: snapshot.val()
      });
    });
    notesRef.on('child_changed', snapshot => dispatch({

    }));
  };
}

/* Alert Manager
=================================================== */
export function resetAlerts(){
  return {
    type: RESET_ALERTS
  };
}
