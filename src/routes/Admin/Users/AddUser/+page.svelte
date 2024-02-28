<script lang="ts">
	import type { PageData } from './$types';
	import AddUserCard from './userAddCard.svelte';

	export let data: PageData;
</script>

<div class="container mx-auto">
    <AddUserCard />
</div>

