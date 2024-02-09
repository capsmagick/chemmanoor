<script lang='ts'>
    import type { PageData } from "../$types";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label"; 
	  import Button from '$lib/components/ui/button/button.svelte';
    import { prefix } from '$lib/constants/dropdownOptions';
    import {populate, updateDbStore} from '$lib/Functions/dataHandlers';
    import { SpouseStore } from "$lib/stores/data";
	import { onMount } from "svelte";

    
    let successMessage = '';
    let errorMessage = '';
    export let data: PageData;

    onMount(async () => {
      await populate(SpouseStore, "spouse");
    });

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        try {
            await updateDbStore(formData, SpouseStore, 'spouse');
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

<div>

    <Card.Root class="w-[950px]">

      <Card.Header>
        <Card.Title>
          Spouse Details
        </Card.Title>
      </Card.Header>

      <Card.Content>

        <form method="post" on:submit|preventDefault={handleSubmit}>

          <div class="grid grid-cols-4 gap-4 mt-4">

            <div class="flex flex-col space-y-1.5 w-1/2">
              <Label for="prefix">Prefix(ഉപസർഗ്ഗം)</Label>
              <select bind:value={$SpouseStore.prefix} id="prefix" name="prefix" class="input input-bordered w-full max-w-xs">
                <option disabled selected value="">Prefix</option>
                 {#each prefix as prefix}
                  <option value={prefix.value}>
                     {prefix.label}
                  </option>
                 {/each}
              </select>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="firstNameOfSpouse">First Name(ആദ്യനാമം)</Label>
              <Input bind:value={$SpouseStore.firstNameOfSpouse} id="firstNameOfSpouse" name="firstNameOfSpouse" type="text" placeholder="E.g. John Smith"/>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="middleNameOfSpouse">Middle Name(മധ്യനാമം)</Label>
              <Input bind:value={$SpouseStore.middleNameOfSpouse} id="middleNameOfSpouse" name="middleNameOfSpouse" type="text" placeholder="E.g. Daniel"/>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="lastNameOfSpouse">Last Name(അവസാന നാമം)</Label>
              <Input bind:value={$SpouseStore.lastNameOfSpouse} id="lastNameOfSpouse" name="lastNameOfSpouse" type="text" placeholder="E.g. Chemmanoor"/>
            </div>

          </div>

          <div class="grid grid-cols-3 gap-4 mt-4">

            <div class="flex flex-col space-y-1.5">
              <Label class="label" for="dateOfBirthOfSpouse">Date Of Birth(ജനന തീയതി)</Label>
              <Input bind:value={$SpouseStore.dateOfBirthSpouse} id="dateOfBirthSpouse" name="dateOfBirthSpouse" type="date" placeholder="12/10/95"/>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="emailOfSpouse">Email</Label>
              <Input bind:value={$SpouseStore.emailOfSpouse} id="emailOfSpouse" name="emailOfSpouse" type="email" placeholder="john@doe.com"/>
            </div>

          </div>

          <div class="flex justify-between items-center mt-4">
            <Button class="w-40 bg-blue-500 hover:bg-blue-700 text-white" type="submit">
                Update
            </Button>
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