<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import type { PageData } from './$types';
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label"; 
    import Button from '$lib/components/ui/button/button.svelte';
    import { prefix, generation, chartNumber, index } from '$lib/constants/dropdownOptions';
    import { UserStore } from '$lib/stores/data';
    import {populate, updateDbStore} from '$lib/Functions/dataHandlers';
    import FamilyIDSelector from '$lib/components/ui/familyIDSelector/familyIDSelector.svelte';
	

    let checked = false;
    export let data: PageData;
    let prefix2 = "";
    let successMessage = '';
    let errorMessage = '';
    

    onMount(async () => {
        await populate(UserStore,'users');
    });

    async function handleSubmit(event: SubmitEvent) {
      event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append('chart', $UserStore.chart);
        formData.append('gen', $UserStore.gen);
        formData.append('index', $UserStore.index);
        try {
            await updateDbStore(formData, UserStore, 'users');
            for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

            //console.log(formData);
            successMessage = 'Updated successfully';
        } catch (error: any) {
            errorMessage = `Update failed: ${error.message}`;
        }
    }
</script>

<div class="mt-10">
    <Card.Root class="w-[950px]">
        <Card.Header>
          <Card.Title>User Info</Card.Title>
        </Card.Header>
        <Card.Content>
            <form method="post" on:submit|preventDefault={handleSubmit}>
                <div class="p-4 mb-4">
                    <div class="grid grid-cols-4 gap-4 mt-2">
                            <div class="flex flex-col space-y-1.5">
                                <Label for="prefix">Prefix(ഉപസർഗ്ഗം)</Label>
                                <select bind:value={prefix2} id="prefix" name="prefix" class="input input-bordered w-full max-w-xs">
                                  <option disabled selected value="">Prefix</option>
                                   {#each prefix as prefix}
                                    <option value={prefix.value}>
                                       {prefix.label}
                                    </option>
                                    {/each}
                                  </select>
                            </div>
                            <div class="flex flex-col space-y-1.5">
                              <Label for="firstName">First Name(ആദ്യനാമം)<span class="text-red-500">*</span></Label>
                              <Input bind:value={$UserStore.firstName} id="firstName" name="firstName" type="text" placeholder="E.g. John" required />
                            </div>
                            <div class="flex flex-col space-y-1.5">
                                <Label for="middleName">Middle Name(മധ്യനാമം)</Label>
                                <Input bind:value={$UserStore.middleName} id="middleName" name="middleName" type="text" placeholder="E.g. Daniel" />
                            </div>
                            <div class="flex flex-col space-y-1.5">
                                <Label for="lastName">Last Name(അവസാന നാമം)</Label>
                                <Input bind:value={$UserStore.lastName} id="lastName" name="lastName" type="text" placeholder="E.g. Chemmanoor" />
                            </div>
                    </div>
                      <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="raw-span-2 flex flex-raw items-center mt-4">
                            <div class="grid grid-cols-2 gap-4 mt-4">
                                <div class="flex flex-col space-y-1.5">
                                    <Label class="label" for="dob">
                                      Date Of Birth(ജനന തീയതി)
                                      <span class="text-red-500">*</span>
                                    </Label>
                                    <Input bind:value={$UserStore.dob} id="dob" name="dob" 
                                    type="date" placeholder="12/10/95" required 
                                    />
                                </div>
                                <div class="flex flex-col space-y-1.5">
                                    <Label for="occupation">Occupation(തൊഴിൽ)</Label>
                                    <Input bind:value={$UserStore.occupation} id="occupation" name="occupation" 
                                    type="text" placeholder="E.g. Business"
                                   />
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                          <div class="raw-span-3">
                            <Label for="status">Branch Details (ശാഖ) according to Directory</Label>
                            <FamilyIDSelector bind:chartNumberSelection={$UserStore.chart} bind:generationSelection={$UserStore.gen} bind:indexSelection={$UserStore.index} />
                            
                        </div>
                        </div>         
                      </div>
                </div>
                <div class="flex justify-between items-center">
                  <Button class="w-40 bg-blue-500 hover:bg-blue-700 text-white" type="submit">Update</Button>
                  {#if successMessage}
                  <div class="flex items-center text-green-500">
                      <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                      {successMessage}
                  </div>
                  {/if}
                  {#if errorMessage}
                      <div class="text-red-500">
                          {errorMessage}
                      </div>
                  {/if}
                </div>
              </form>
              
        </Card.Content>
    </Card.Root>
</div>

