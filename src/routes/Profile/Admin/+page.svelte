<script lang="ts">
    import type { PageData } from './$types';
    import UserTable from './UserTable.svelte';
    import TestForDemo from './testforDemo.svelte'
    
    export let data: PageData;
    
</script>

<div class="container mx-auto py-10">
    <UserTable/>
</div>