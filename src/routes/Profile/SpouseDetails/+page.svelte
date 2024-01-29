<script lang="ts">
    import type { PageData } from './$types';
    import SpouseDetails from './spouseDetails.svelte';
    
    export let data: PageData;
</script>

<div class="mt-10">
    <SpouseDetails data={data} />
</div>