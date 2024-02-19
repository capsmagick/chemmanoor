import { browser } from '$app/environment';
import { auth,app} from '$lib/firebase/firebase.client'; // Adjust this path to where your Firebase initialization and auth object are exported
import { onAuthStateChanged } from 'firebase/auth';

export async function load({ url }) {
  if (browser) {
    try {
        const firebaseapp =app;
        //getFirebaseClient()
      // Ensure Firebase is initialized before this point in your app
    } catch (ex) {
      console.error(ex);
    }
  }

  async function getAuthUser() {
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user ? user : false);
      });
    });
  }

  return {
    getAuthUser: getAuthUser,
    url: url.pathname
  };
}