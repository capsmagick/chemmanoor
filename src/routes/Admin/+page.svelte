<script lang="ts">
    import type { PageData } from './Users/$types';
    import { onMount } from'svelte';
    import { goto } from '$app/navigation';
    
    export let data: PageData;
    onMount(async () => {
        goto('/Admin/Users');
         });
</script>