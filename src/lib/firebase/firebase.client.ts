// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator,getAuth,setPersistence,inMemoryPersistence} from 'firebase/auth';

import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { browser } from '$app/environment';
export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: import.meta.env.VITE_AUTHDOMAIN,
  projectId:import.meta.env.VITE_PROJECTID,
  storageBucket:import.meta.env.VITE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
  useEmulator: import.meta.env.VITE_FIREBASE_USE_EMULATOR === 'false',
  appId: import.meta.env.VITE_APPID,
  measurementId: import.meta.env.VITE_MEASUREMENTID
};

// Initialize Firebase
export const initializeFirebase = () => {
    if (!browser) {
     throw new Error("Can't use the Firebase client on the server.");
    }
    if (!app) {
     app = initializeApp(firebaseConfig);
     auth = getAuth(app);
   
     if (firebaseConfig.useEmulator) {
      connectAuthEmulator(auth, 'http://127.0.0.1:9099');
     }
    }
   };