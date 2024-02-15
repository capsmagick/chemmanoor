import { session } from '$lib/stores/sessions';
import { goto } from '$app/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '$lib/firebase/firebase.client';
import { checkEmailExists } from '$lib/Functions/dataHandlers';
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    type UserCredential
   } from 'firebase/auth';
import { get } from 'svelte/store';

export 	const signOutUser = async () => {
    await signOut(auth);
    session.set({ loggedIn: false, user: null });
    goto('/');
  };

  export async function loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then(async (result) => { // make the function async
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
        if (email) {
          const emailExists = await checkEmailExists(email); // use await directly
          if (emailExists) {
            console.log('Email exists');
            goto('/Profile');
            // rest of your code
          }
          else {
            signOutUser();
            console.log('Email does not exists');
            alert('Access denied');
            
            goto('/');
          }
        }
    
      })
      .catch((error) => {
        return error;
      });
  }
   