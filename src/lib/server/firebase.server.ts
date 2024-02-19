import { SERVICE_ACCOUNT } from "$env/static/private";
import { Firestore } from '@google-cloud/firestore';
import admin from "firebase-admin";
const { firestore } = admin;
type ServiceAccount = admin.ServiceAccount;
import { getFirestore } from "firebase-admin/firestore";
//import { initializeApp } from 'firebase-admin';




let db: Firestore;
const serviceAccount = JSON.parse(SERVICE_ACCOUNT) as ServiceAccount;
export function getFirebaseServer():
    | { error: false; data: typeof admin }
    | { error: true; msg: string } {
    try {
        console.log(admin.apps.length);
        if (!admin.apps.length) {
            const cert = admin.credential.cert(serviceAccount);
            const app = admin.initializeApp({ credential: cert });
            db = getFirestore(app);
        
}
        return { error: false, data: admin };
    } catch (error) {
        console.error(error);
        return { error: true, msg: "Error initializing firebase server" };
    }
    
}
export { db };

// export function db() {
//     if (!app) { // Ensure the Firebase app is initialized
//         getFirebaseServer(); // This will initialize `app` if not already done
//     }
//     return getFirestore(app); // Use the initialized `app` directly
// }
//export const db = getFirestore(app);;

