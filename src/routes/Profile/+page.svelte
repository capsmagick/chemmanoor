<script lang="ts">
    import type { PageData } from './$types';
    import { onMount } from'svelte';
    import { goto } from '$app/navigation';
    
    export let data: PageData;

    onMount(async () => {
        goto('/Profile/myFamily');
         });

</script>