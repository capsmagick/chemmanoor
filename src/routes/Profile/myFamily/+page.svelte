<script lang="ts">
    //import type { PageData } from './$types';
    
    export let data: PageData;
    import { onMount, tick } from 'svelte';
  import { writable } from 'svelte/store';
  import { updateDbStore, populate } from '$lib/Functions/dataHandlers';
  import * as Select from '$lib/components/ui/select';
  import { Input } from '$lib/components/ui/input';
  import Button from '$lib/components/ui/button/button.svelte';
  import FamilyIDSelector from '$lib/components/ui/familyIDSelector/familyIDSelector.svelte';
  import { getAuth } from 'firebase/auth';
  import { session } from '$lib/stores/sessions';

  const auth = getAuth();
  const user = auth.currentUser;
  const familyMember = writable('');
  const message = writable('');
  const formData = writable({
    prefix: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    familyID: '',
    profilePhoto: '',
    relationshipStatus: '',
    dateOfMarriage: '',
    dateOfDeath: '',
    occupation:'',
    late:''
  });

  onMount(async () => {
    if (user) {
      await populate(formData, 'user');
    }
  });

  async function handleSubmit(event: SubmitEvent) {
    const form = event.target as HTMLFormElement;
    const formEntries = new FormData(form);
    await updateDbStore(formEntries, formData, 'user')
      .then(() => {
        message.set('Data updated successfully!');
      })
      .catch((error) => {
        message.set(`Error updating data: ${error.message}`);
      });
  }

  $: familyMember.subscribe(async (value) => {
    if (value) {
      await populate(formData, value);
      await tick(); // Ensure UI is updated
    }
  });
</script>


<div class ="m-20 shadow-lg p-10 max-w-prose">
<form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div class ="class= 'max-w-xs">
  <Select.Root >
    <Select.Trigger aria-label="Select family member">
      <Select.Value placeholder="Select family member..." />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value="myself">Myself</Select.Item>
      <Select.Item value="mother">Mother</Select.Item>
      <Select.Item value="father">Father</Select.Item>
      <Select.Item value="lifePartner">Life Partner</Select.Item>
      <Select.Item value="children">Children</Select.Item>
    </Select.Content>
  </Select.Root>
</div>
  <div class="flex flex-col space-y-4">
    <div class="flex justify-left space-x-10   items-center">
        <label for="profilePhoto" class="cursor-pointer size-30px relative">
            <img src={$session.user?.photoURL || "https://github.com/shadcn.png"} alt="" class=" size-30px rounded-full object-cover" /> <!-- Removed descriptive alt text -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-2 py-1 text-white text-sm mb-2">Change</div>
            <Input id="profilePhoto" bind:value={$formData.profilePhoto} type="file" class="hidden" />
          </label>
        
        <div ml-10>
        
            <FamilyIDSelector id="familyID" bind:chartNumberSelection={$formData.familyID}  />
          </div>

      </div>
  
        <div class="grid grid-cols-4 gap-4">
            <div>
              <label for="prefix" class="block text-sm font-medium text-gray-700">Prefix</label>
              <Input id="prefix" bind:value={$formData.prefix} placeholder="Prefix" class="max-w-xs" />
            </div>
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
              <Input id="firstName" bind:value={$formData.firstName} placeholder="First Name" class="max-w-xs" />
            </div>
            <div>
              <label for="middleName" class="block text-sm font-medium text-gray-700">Middle Name</label>
              <Input id="middleName" bind:value={$formData.middleName} placeholder="Middle Name" class="max-w-xs" />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
              <Input id="lastName" bind:value={$formData.lastName} placeholder="Last Name" class="max-w-xs" />
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <div>
                <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Input id="dateOfBirth" bind:value={$formData.dateOfBirth} type="date" placeholder="Date of Birth" class="max-w-xs" />
              </div>
              <div>
                <label for="occupation" class="block text-sm font-medium text-gray-700">Occupation</label>
                <Input id="occupation" bind:value={$formData.occupation} placeholder="occupation" class="max-w-xs" />
              </div>
              <div>
                <label for="relationshipStatus" class="block text-sm font-medium text-gray-700">Relationship</label>
                <select id="relationshipStatus" bind:value={$formData.relationshipStatus} class="max-w-xs block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div>
              <label for="late" class="flex items-center space-x-2">
                <input id="late" type="checkbox" bind:checked={$formData.late} class="rounded text-indigo-600 focus:ring-indigo-500" />
                <span class="text-sm font-medium text-gray-700">Late</span>
              </label>

              </div>
          </div>

          <div class="flex flex-nowrap space-x-4 items-stretch">
          <div>
            <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input id="phoneNumber" bind:value={$formData.phoneNumber} type="tel" placeholder="Phone Number" class="max-w-xs" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <Input id="email" bind:value={$formData.email} type="email" placeholder="Email" class="max-w-xs" />
          </div>
          <div class="col-span-2 flex justify-end self-center items-center">
            <Button class="max-w-xs" type="button">Invite</Button>
          </div>

          </div>
    <div class="grid grid-cols-4 gap-4">
      
      
      {#if $formData.relationshipStatus === 'married'}
      <div>
        <label for="dateOfMarriage" class="block text-sm font-medium text-gray-700">Date of Marriage</label>
        <Input id="dateOfMarriage" bind:value={$formData.dateOfMarriage} type="date" placeholder="Date of Marriage" class="max-w-xs" />
      </div>
      {/if}
      {#if $formData.late}
      <div>
        <label for="dateOfDeath" class="block text-sm font-medium text-gray-700">Date of Death</label>
        <Input id="dateOfDeath" bind:value={$formData.dateOfDeath} type="date" placeholder="Date of Death" class="max-w-xs" />
      </div>
      {/if}
      
     
    </div>
  
 
    <Button class= 'max-w-xs' type="submit">Update</Button>
  
  <p class="text-sm mt-2">{$message}</p>
</form>
</div>

