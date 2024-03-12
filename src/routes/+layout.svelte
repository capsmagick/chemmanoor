<script lang="ts">
	import '../app.pcss';

	import { onMount } from 'svelte';
	import { session } from '$lib/stores/sessions';
	import { app } from '$lib/firebase/firebase.client';
	import { goto } from '$app/navigation';
	//import { loginWithGoogle, signOutUser } from '$lib/firebase/auth';
	import type { LayoutData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import Footer from './footer.svelte';
	import Navigation from './navigation.svelte';
	import googleImage from '$lib/images/google.png';
	import { signOutUser } from '$lib/firebase/auth';

	export let data: LayoutData;


</script>

<script context="module">
    export const routes = {
        '/admin': import('./Admin/Users/+page.svelte') // Add the admin route
    };
</script>


<div class="w-full grid justify-items-stretch min-h-screen">
	<div class="absolute top-0 -z-10 h-full w-full bg-white">
		<div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-60 blur-[80px]">
		</div>
		<div class="absolute bottom-auto right-auto  top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-70 blur-[80px]"></div>
		<div class="absolute bottom-0 right-0  top-auto h-[300px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-5a0 blur-[80px]"></div>
	</div>
	<div class="sm:mt-20 justify-self-center w-full sm:w-10/12">
	<Navigation {data}/>
	</div>
	
	<!-- Main content area -->
    <div class="justify-self-center my-8">
        <slot />
    </div>
	
	<div class="justify-self-center my-8">
		<div class="bg-white rounded-lg shadow p-6">
			<h2 class="text-2xl font-bold mb-4">About Us</h2>
			<p class="text-lg">We are a team of passionate developers dedicated to creating high-quality software solutions.</p>
		</div>
	</div>
    
	<div class="flex justify-center sticky top-[100vh] items-end w-full ">
		<Footer />
	</div>
	
</div>
	

