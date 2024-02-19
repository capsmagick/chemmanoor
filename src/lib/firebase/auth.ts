import { session } from '$lib/stores/sessions';
import { goto } from '$app/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '$lib/firebase/firebase.client';
import { resetStores } from '$lib/Functions/dataHandlers';
import { getAuth} from 'firebase/auth';
// import {
//     GoogleAuthProvider,
//     signInWithPopup,
//     signInWithEmailAndPassword,
//     type UserCredential
//    } from 'firebase/auth';
// import { get } from 'svelte/store';

export const signOutUser = async () => {
    const auth = getAuth();
    await signOut(auth);
    session.set({ loggedIn: false, user: null });
    resetStores();
    goto('/');

    // Clear authentication cookies
    // For example, if using cookies, you can clear them like this
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

//   export async function loginWithGoogle() {
//     const provider = new GoogleAuthProvider();
//     await signInWithPopup(auth, provider)
//       .then(async (result) => { // make the function async
//         const { displayName, email, photoURL, uid } = result?.user;
       
//         session.set({
//           loggedIn: true,
//           user: {
//             displayName,
//             email,
//             photoURL,
//             uid
//           }
//         });
//         if (email) {
//           const userStatus = await checkUser(email,uid); // use checkUser API
//           if (userStatus.exists) {
//             console.log('User exists');
//             goto('/Profile');
//           } else {
//             signOutUser();
//             console.log('User does not exist');
//             alert('Access denied');
//             resetStores();
//             goto('/');
//           }
//         }
    
//       })
//       .catch((error) => {
//         return error;
//       });
//   }
//   export async function checkUser(email: string, uid: string): Promise<{ exists: boolean }> {
//     try {
//       const response = await fetch(`/api/checkUser?email=${encodeURIComponent(email)}&uid=${encodeURIComponent(uid)}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       if (!response.ok) {
//         console.error(`Network response was not ok. Status: ${response.status}`);
//         throw new Error(`Network response was not ok. Status: ${response.status}`);
//       }
//       const data = await response.json();
//       return { exists: data.exists };
//     } catch (error) {
//       console.error("Failed to check user:", error);
//       return { exists: false }; // Consider how you want to handle errors more specifically
//     }
//   }