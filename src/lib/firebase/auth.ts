import { session } from '$lib/stores/sessions';
import { goto } from '$app/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '$lib/firebase/firebase.client';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    type UserCredential
   } from 'firebase/auth';

export 	const signOutUser = async () => {
    await signOut(auth);
    session.set({ loggedIn: false, user: null });
    goto('/');
  };

  export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
     .then((result) => {
      const { displayName, email, photoURL, uid } = result?.user;
      session.set({
       loggedIn: true,
       user: {
        displayName,
        email,
        photoURL,
        uid
       }
      });
  
      goto('/');
     })
     .catch((error) => {
      return error;
     });
   }