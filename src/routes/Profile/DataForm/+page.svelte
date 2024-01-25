<script lang="ts">
    import type { PageData } from './$types';
    import UserDetailsForm from './userDetailsForm.svelte'
    import UserParentDetails from './userParentDetails.svelte'
    import ContactDetails from './contactDetails.svelte'
    import ChildrenDetails from './childrenDetails.svelte';
    export let data: PageData;
</script>

<div class="mt-10">
  <UserDetailsForm { data }/>
  <UserParentDetails { data}/>
  <ChildrenDetails { data }/> 
</div>