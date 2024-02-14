<script lang="ts">
    import type { PageData } from './$types';
    import Ontable from './onTable.svelte'
    
    export let data: PageData;
</script>

<div>
    <Ontable />
</div>