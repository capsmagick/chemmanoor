<script lang="ts">
    import type { PageData } from './$types';
    import EditUserCard from './editUserCard.svelte';
    
    export let data: PageData;
</script>
<div class="container mx-auto">
    <EditUserCard />
</div>