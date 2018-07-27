import * as admin from 'firebase-admin';
import serviceAccount from '../../secrets/react-redux-firebase-d8246-firebase-adminsdk-c2fr6-b933ed253c.json';

// Firebase admin
const firebaseCredentials = {
  credential: admin.credential.cert(serviceAccount, 'Server'),
  databaseURL: 'https://react-redux-firebase-d8246.firebaseio.com'
};

admin.initializeApp(firebaseCredentials);

module.exports.db = admin.database();
module.exports.auth = admin.auth();
