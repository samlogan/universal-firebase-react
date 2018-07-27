import firebase from 'firebase';
import { FIREBASE_CONFIG } from './config';

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG, 'Client');
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();
