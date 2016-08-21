import firebase from 'firebase';
import { FIREBASE_CONFIG } from './config';

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
export const firebaseStorage = firebaseApp.storage();
export const firebaseStorageRef = firebaseApp.storage().ref();
