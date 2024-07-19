import admin from 'firebase-admin';
import fs from 'fs';
import { readFileSync } from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import "dotenv/config";

 const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId:process.env.FIREBASE_PROJECT_DOMAIN,
    storageBucket:process.env.FIREBASE_STORAGE_BUCKET ,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
  };

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const serviceAccountPath = path.resolve(__dirname, './firestore_key/firebase_key.json');


async function connectionFirebase(){
    try{

        // const serviceAccount = JSON.parse(readFileSync(serviceAccountPath,'utf-8'));
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON)
        // Initialize Firebase Admin SDK
        admin.initializeApp({
            credential : admin.credential.cert(serviceAccount),
            // storageBucket :`${firebaseConfig.projectId}.app.spot.com`
            // storageBucket :process.env.FIREBASE_STORAGE_BUCKET
            storageBucket :`fir-uploadspmvault.appspot.com`
        });
        
        console.log("FIREBASE SERVICE ACCOUNT KEY OK")
        console.log(`CONNECTION TO FIREBASE DOMAIN OK`)

    }catch(error){
        console.log(` ${process.env.FIREBASE_PROJECT_DOMAIN}  : firebase connection fails. ERROR,`,error)

    }
}

export default connectionFirebase;
