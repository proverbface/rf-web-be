import admin from 'firebase-admin';
const serviceAccount = require('../env/firestore-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const firestore = admin.firestore();
