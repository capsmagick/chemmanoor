// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectAuthEmulator,getAuth,setPersistence,inMemoryPersistence} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';
import type { Auth } from 'firebase/auth';
import { browser } from '$app/environment';
import { getStorage, type FirebaseStorage } from "firebase/storage";
export let db: Firestore;
export let app: FirebaseApp;
export let auth: Auth;
export let storage: FirebaseStorage;



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
        // It's generally not recommended to initialize Firebase client SDKs on the server side due to security and functionality limitations.
        // Server environments should use the Firebase Admin SDK.
        console.error("Attempting to initialize Firebase client SDK on the server. Consider using Firebase Admin SDK for server-side operations.");
        return;
    }
    if (!app) {
        app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
        auth = getAuth(app);
        db = getFirestore(app);
        storage=getStorage(app);
    
        if (firebaseConfig.useEmulator) {
            connectAuthEmulator(auth, 'http://127.0.0.1:9099');
        }
    }
};
