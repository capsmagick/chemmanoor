// Import the functions you need from the SDKs you need
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage} from "firebase/storage";
import {  type Auth } from "firebase/auth";
import { inMemoryPersistence, setPersistence } from "firebase/auth";



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
// let app: FirebaseApp;
// let db: Firestore;
// let auth: Auth;
// let storage: FirebaseStorage;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// export async function getFirebaseClient():Promise<{ error: false; data: ReturnType<typeof getAuth> } | { error: true; msg: string }> {
//     try {
      
//          app = initializeApp(firebaseConfig);
//          auth = getAuth(app);
//          db = getFirestore(app);
//          storage = getStorage(app);
//         await setPersistence(auth, inMemoryPersistence);
//         return { error: false, data: auth };
//     } catch (error) {
//         console.error(error);
//         return { error: true, msg: "Error initializing firebase client" };
//     }
// }
export { app, db, auth, storage };
