import { firebaseDb } from '../utils/firebase';

export function getRef(ref, filters) {
  if (!filters) return ref;
  let firebaseRef = ref;
  const filterKeyArr = Object.keys(filters);
  filterKeyArr.forEach((key) => {
    firebaseRef = firebaseRef[key](filters[key]);
  });
  return firebaseRef;
}

export const getFirebaseObject = async (refString, filters, admin) => {
  try {
    const db = admin || firebaseDb;
    const firebaseRef = db.ref(refString);
    const ref = getRef(firebaseRef, filters);
    const snapshot = await ref.once('value');
    return snapshot.val();
  } catch (error) {
    return error;
  }
};

export const getFirebaseArray = async (refString, filters, admin) => {
  try {
    const db = admin || firebaseDb;
    const firebaseRef = db.ref(refString);
    const ref = getRef(firebaseRef, filters);
    const snapshot = await ref.once('value');
    return Object.keys(snapshot.val()).map(key => snapshot.val()[key]);
  } catch (error) {
    return error;
  }
};
