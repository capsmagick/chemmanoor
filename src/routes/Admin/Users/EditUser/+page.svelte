<script lang="ts">
    import type { PageData } from './$types';
    import UserCard from './userCard.svelte';
    
    export let data: PageData;
</script>
<div class="container mx-auto">
    <UserCard />
</div>