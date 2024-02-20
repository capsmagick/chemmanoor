<script lang="ts">
  import { auth} from "$lib/firebase/firebase.client";
  import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import Button from '$lib/components/ui/button/button.svelte';
  import { session } from '$lib/stores/sessions';
  import type {SessionState } from '$lib/stores/sessions';
  import { goto } from '$app/navigation';
import { signOut } from 'firebase/auth';
import {resetStores} from '$lib/Functions/dataHandlers';
  import googleImage from '$lib/images/google.png';
  const gimage : string = googleImage;
  let form: HTMLFormElement;
  let email = '';
  let password = '';
  import { getAuth} from 'firebase/auth';

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
  async function login(): Promise<void> {
      try {
          //const auth = await getFirebaseClient();
          
          // Check if the Firebase Auth instance is correctly initialized
          if (!auth) {
    console.error("Firebase Auth instance is not correctly initialized.");
    return;
}
          //const cred = await signInWithPopup(auth, new GoogleAuthProvider());

          const cred = await signInWithPopup(auth, new GoogleAuthProvider().setCustomParameters({ prompt: 'select_account' }));
          // Additional check to ensure cred.user is not undefined
          if (!cred.user) {
              console.error("cred.user is undefined.");
              return;
          }
          const { email, displayName, photoURL, uid } = cred.user;
          session.update((currentSession:SessionState) => {
               return {
                       ...currentSession,
                       user: {
                               email,
                              displayName,
                              photoURL,
                              uid
                            },
                            loggedIn: true
                          };
                        });

          const token = await cred.user.getIdToken();
          //await auth.data.signOut();

          const input = document.createElement("input");
          input.type = "hidden";
          input.name = "token";
          input.value = token;
          form.appendChild(input);
          form.submit();
      } catch (err) {
          console.error("Error during login:", err);
      }
  }
</script>

<!-- <form method="post" bind:this={form} />
<Button variant="outline"  on:click={login} class="login-button ">
  <img src={gimage} alt="Google" class="w-6 h-6 mr-4">
  Google Login</Button> -->

  <div class="flex flex-col justify-center items-center bg-gray-100">
    <div class="max-w-md w-full space-y-8 p-10 bg-white shadow-md rounded-lg">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" on:submit|preventDefault={login} method="post" bind:this={form}>
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" bind:value={email}>
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" bind:value={password}>
          </div>
        </div>
  
        <div>
          <button type="button" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" on:click={login}>
            Sign in with Email
          </button>
        </div>
      </form>
      <div class="mt-6">
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <div class="mt-6 grid grid-cols-1 gap-3">
          <div>
            <Button variant="outline"  on:click={login} class="login-button ">
              <img src={gimage} alt="Google" class="w-6 h-6 mr-4">
              Google Login</Button>
          </div>
        </div>
      </div>
    </div>
  </div>