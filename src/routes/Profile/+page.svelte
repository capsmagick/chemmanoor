<script lang="ts">
    import type { PageData } from './$types';
    import UserDetails from './userDetails.svelte'
    
    export let data: PageData;
</script>
<div>
    <UserDetails { data }/>
</div>