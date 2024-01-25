<script lang="ts">
    import type { PageData } from './$types';
    import ChildrenDetailsForm from './childrenDetailsForm.svelte';
    
    export let data: PageData;
</script>

<div class="mt-30">
    <ChildrenDetailsForm { data }/> 
</div>