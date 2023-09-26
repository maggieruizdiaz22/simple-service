require("dotenv").config();
const {FIREBASE_SERVICE_ACCOUNT_KEY} = process.env;
const admin = require("firebase-admin");

const serviceAccount = FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(FIREBASE_SERVICE_ACCOUNT_KEY)
  : null;

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  console.error("FIREBASE_SERVICE_ACCOUNT_KEY is not a valid JSON string.");
}

module.exports = admin;
