<script lang="ts">
    import type { PageData } from './$types';
    import ContactDetails from './contactDetails.svelte';
    
    export let data: PageData;
</script>

<div>
    <ContactDetails { data }/>
</div>