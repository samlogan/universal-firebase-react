import 'firebase';
import { FIREBASE_CONFIG } from './config';
// import GeoFire from 'geofire';

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
export const firebaseStorage = firebaseApp.storage();
export const firebaseStorageRef = firebaseApp.storage().ref();
// GEO Fire
// const firebaseRef = firebaseDb.ref().child('geodata');
// export const geoFire = new GeoFire(firebaseRef);
