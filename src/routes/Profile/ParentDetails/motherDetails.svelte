<script lang="ts">
    import type { PageData } from './$types';
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label"; 
	  import Button from '$lib/components/ui/button/button.svelte';
    import { prefix } from '$lib/constants/dropdownOptions';
    import FamilyIDSelector from '$lib/components/ui/familyIDSelector/familyIDSelector.svelte';
    import {populate, updateDbStore} from '$lib/Functions/dataHandlers';
    import { onMount } from'svelte';
    import { MotherStore } from '$lib/stores/data';

    let checked = false;
    export let data: PageData;
    let successMessage = '';
    let errorMessage = '';

    onMount(async () => {
        await populate(MotherStore,'mother');
    });

    async function handleSubmit(event: SubmitEvent) {
      event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        formData.append('chart', $MotherStore.chart);
        formData.append('gen', $MotherStore.gen);
        formData.append('index', $MotherStore.index);
        try {
            await updateDbStore(formData, MotherStore, 'mother');
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
<div class="mt-4">
    <Card.Root class="w-[950px]">
        <Card.Header>
          <Card.Title>Mother Details</Card.Title>
        </Card.Header>
        <Card.Content>
            <form method="post" on:submit|preventDefault={handleSubmit}>
                <div class="p-4 mb-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="w-6/12 sm:w-4/12 px-4">
                            <img src="https://github.com/shadcn.png" alt="user avatar" class="shadow rounded-full max-w-full h-auto align-middle border-none">
                        </div>
                        <div class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <div class="raw-span-3">
                              <Label for="status">Branch Details (ശാഖ) according to Directory</Label>
                              <FamilyIDSelector bind:chartNumberSelection={$MotherStore.chart} bind:generationSelection={$MotherStore.gen} bind:indexSelection={$MotherStore.index} />
                          </div>
                          </div>
                    </div>
                    <div class="grid grid-cols-4 gap-4 mt-10">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="prefix">Prefix(ഉപസർഗ്ഗം)</Label>
                            <select bind:value={$MotherStore.prefix} id="prefix" name="prefix" class="input input-bordered w-full max-w-xs">
                              <option disabled selected value="">Prefix</option>
                               {#each prefix as prefix}
                                <option value={prefix.value}>
                                   {prefix.label}
                                </option>
                                {/each}
                              </select>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label class="label" for="firstNameOfMother">First Name(ആദ്യനാമം)<span class="text-red-500">*</span></Label>
                            <Input bind:value={$MotherStore.firstNameOfMother} id="firstNameOfMother" name="firstNameOfMother" type="text" placeholder="E.g. John" required />
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="middleNameOfMother">Middle Name(മധ്യനാമം)</Label>
                            <Input bind:value={$MotherStore.middleNameOfMother} id="middleNameOfMother" name="middleNameOfMother" type="text" placeholder="E.g. Daniel"/>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="lastNameOfMother">Last Name(അവസാന നാമം)</Label>
                            <Input bind:value={$MotherStore.lastNameOfMother} id="lastNameOfMother" name="lastNameOfMother" type="text" placeholder="E.g. Chemmanoor"/>
                        </div>
                </div>
                    <div class="grid grid-cols-4 gap-4 mt-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="occupationOfMother">Occupation of Mother(അമ്മയുടെ തൊഴിൽ)</Label>
                            <Input bind:value={$MotherStore.occupationOfMother} id="occupationOfMother" name="occupationOfMother" type="text" placeholder="E.g. Business"/>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label class="label" for="dateOfBirthMother">Date of Birth of Mother(അമ്മയുടെ ജനന തീയതി)</Label>
                            <Input bind:value={$MotherStore.dateOfBirthMother} id="dateOfBirthMother" name="dateOfBirthMother" type="date" placeholder="12/10/95"/>
                        </div>
                        <div class="flex items-center mt-5">
                            <Checkbox id="terms" bind:checked/>
                            <Label for="terms" 
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Late
                            </Label>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label class="label" for="dateOfDeathMother">Date of Death of Mother(അമ്മയുടെ മരണ തീയതി)</Label>
                            <Input bind:value={$MotherStore.dateOfDeathMother} id="dateOfDeathMother" name="dateOfDeathMother" type="date" placeholder="12/10/95"/>
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