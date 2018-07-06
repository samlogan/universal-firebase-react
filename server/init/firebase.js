import { getFirebaseObject, getFirebaseArray } from '../../app/services/firebaseService';

/**
 * Routes for Firebase admin
 */

export default (app, db, auth) => {
  /* Realtime database endpoints
  =================================================== */
  // Get array
  app.post('/api/firebase/getarray', async (req, res) => {
    try {
      const refString = req.body.ref;
      const filters = req.body.filters;
      if (!refString || (filters && typeof filters !== 'object')) res.status(400).send({ error: 'Did you miss a parameter?' });
      const data = await getFirebaseArray(refString, filters, db);
      res.send({ data });
    } catch (error) {
      res.status(502).send({ error });
    }
  });
  // Get Object
  app.post('/api/firebase/get', async (req, res) => {
    try {
      const refString = req.body.ref;
      const filters = req.body.filters;
      if (!refString || (filters && typeof filters !== 'object')) res.status(400).send({ error: 'Did you miss a parameter?' });
      const data = await getFirebaseObject(refString, filters, db);
      res.send({ data });
    } catch (error) {
      res.status(502).send({ error });
    }
  });
  // Write data
  app.post('/api/firebase/set', async (req, res) => {
    try {
      const refString = req.body.ref;
      const content = req.body.content;
      if (!refString || !content) res.status(400).send({ error: 'Did you miss a parameter?' });
      const ref = db.ref(refString);
      await ref.set(content);
      res.send({ success: `${refString} saved` });
    } catch (error) {
      res.status(502).send(error);
    }
  });
  app.post('/api/firebase/update', async (req, res) => {
    try {
      const refString = req.body.ref;
      const content = req.body.content;
      if (!refString || !content) res.status(400).send({ error: 'Did you miss a parameter?' });
      const ref = db.ref(refString);
      await ref.update(content);
      res.send({ success: `${refString} saved` });
    } catch (error) {
      res.status(502).send(error);
    }
  });
  // Delete data
  app.post('/api/firebase/delete', async (req, res) => {
    const refString = req.body.ref;
    if (!refString) res.status(400).send({ error: 'Did you miss a parameter?' });
    if (refString.length < 5) res.status(401).send('Permission denied');
    const ref = db.ref(refString);
    await ref.remove();
    res.send({ success: `${refString} deleted` });
  });
  /* Authentication endpoints
  =================================================== */
  // Create user
  app.post('/api/firebase/createuser', async (req, res) => {
    const {
      email,
      password,
      phoneNumber,
      displayName
    } = req.body;
    if (!email || !password) res.status(400).send({ error: 'Did you miss a parameter?' });
    try {
      const createUserObj = {
        email,
        password,
        phoneNumber,
        displayName,
        emailVerified: false,
        disabled: false
      };
      if (!phoneNumber) delete createUserObj.phoneNumber;
      const userRecord = await auth.createUser(createUserObj);
      res.send({ ...userRecord });
    } catch (error) {
      console.error('Error creating user', error.errorInfo);
      res.status(502).send(error);
    }
  });
  // Delete user
  app.post('/api/firebase/deleteuser', async (req, res) => {
    const { uid } = req.body;
    if (!uid) res.status(400).send({ error: 'Did you miss a parameter?' });
    await auth.deleteUser(uid);
    res.send({ success: `${uid} deleted` });
  });
};
