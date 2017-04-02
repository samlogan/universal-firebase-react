import { firebaseDb } from '../utils/firebase';

export function getFirebaseObject(ref) {
  return new Promise((resolve, reject) => {
    const firebaseRef = firebaseDb.ref(ref);
    return firebaseRef.once('value')
    .then(snapshot => resolve(snapshot.val()))
    .catch(error => reject(error));
  });
}

export function getFirebaseArray(ref) {
  return new Promise((resolve, reject) => {
    const firebaseRef = firebaseDb.ref(ref);
    return firebaseRef.once('value')
    .then(snapshot => {
      const firebaseArr = Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
      resolve(firebaseArr);
    })
    .catch(error => reject(error));
  });
}
