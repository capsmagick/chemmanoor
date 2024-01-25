<script lang="ts">
    import type { PageData } from './$types';
    import ParentDetailsForm from './parentDetailsForm.svelte'
    
    export let data: PageData;
</script>

<div class="mt-10">
    <ParentDetailsForm { data }/>
</div>