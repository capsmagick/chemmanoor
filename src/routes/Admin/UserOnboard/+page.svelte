<script lang="ts">
    import type { PageData } from './$types';
    import UserOnboardTable from './userOnboardTable.svelte'
    
    export let data: PageData;
</script>

<div class="container mx-auto">
    <UserOnboardTable />
</div>