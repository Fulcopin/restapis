const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();  


const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_API);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
