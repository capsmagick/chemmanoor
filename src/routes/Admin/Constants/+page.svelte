<script lang="ts">
	import type { PageData } from './$types';
	import PrefixTable from './prefixTable.svelte';

	export let data: PageData;
</script>

<div class="container mx-auto">
    <PrefixTable />
</div>
