<script lang="ts">
    import type { PageData } from './$types';
    import ParentDetailsForm from './parentDetailsForm.svelte'
    import FatherDetails from './fatherDetails.svelte'
    import MotherDetails from './motherDetails.svelte'
    
    export let data: PageData;
</script>

<div class="mt-10">
    <FatherDetails { data }/>
    <MotherDetails { data }/>
</div>