const dotenv = require("dotenv");
dotenv.config();
//firebase auth
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

function adminInitialize(){
   admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: process.env.FB_REALTIME_DB
   });
}

module.exports = adminInitialize; 