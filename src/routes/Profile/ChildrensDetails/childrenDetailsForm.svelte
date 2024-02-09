<script lang='ts'>
    import type { PageData } from "../$types";
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label"; 
	  import Button from '$lib/components/ui/button/button.svelte';
	  import { Plus, X } from "lucide-svelte";
    import { prefix } from '$lib/constants/dropdownOptions';
    import {populate, updateDbStore} from '$lib/Functions/dataHandlers';
    import FamilyIDSelector from '$lib/components/ui/familyIDSelector/familyIDSelector.svelte';
    import { ChildrenStore } from "$lib/stores/data";
    import { onMount } from'svelte';

    let numChildren = 1;

    
    function handleAddChildrenClick() {
        numChildren++;
            }
    
    function handleCloseClick() {
        numChildren--;
    }

    onMount(async () => {
        await populate(ChildrenStore,'children');
    });

    async function handleSubmit(event: SubmitEvent) {
      event.preventDefault();
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        try {
            await updateDbStore(formData, ChildrenStore, 'children');
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
  <Button variant="outline" on:click={handleAddChildrenClick}>
    <Plus class="mr-2 h-4 w-4"/>
    Add Children
  </Button>

  {#each Array(numChildren) as _, index (index)}
    <Card.Root class="w-[950px] mt-5 relative">

      <Card.Header>
        <Card.Title>
          Children Details {index + 1}
        </Card.Title>
      </Card.Header>

      <div class="absolute top-2 right-2">
        {#if index !== 0}
          <Button variant="ghost" on:click={handleCloseClick}>
            <X class="mr-2 h-4 w-4"/>
          </Button>
        {/if}
      </div>

      <Card.Content>

        <form method="post" on:submit|preventDefault={handleSubmit}>

          <div class="grid grid-cols-4 gap-4 mt-4">

            <div class="flex flex-col space-y-1.5 w-1/2">
              <Label for="status">Prefix(ഉപസർഗ്ഗം)</Label>
              <select bind:value={$ChildrenStore.prefix} id="prefix" name="prefix" class="input input-bordered w-full max-w-xs">
                <option disabled selected value="">Prefix</option>
                 {#each prefix as prefix}
                  <option value={prefix.value}>
                     {prefix.label}
                  </option>
                  {/each}
                </select>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="firstNameOfChild">First Name(ആദ്യനാമം)</Label>
              <Input bind:value={$ChildrenStore.firstNameOfChild} id="firstNameOfChild" name="firstNameOfChild" type="text" placeholder="E.g. John Smith"/>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="middleNameOfChild">Middle Name(മധ്യനാമം)</Label>
              <Input bind:value={$ChildrenStore.middleNameOfChild} id="middleNameOfChild" name="middleNameOfChild" type="text" placeholder="E.g. Daniel"/>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="lastNameOfChild">Last Name(അവസാന നാമം)</Label>
              <Input bind:value={$ChildrenStore.lastNameOfChild} id="lastNameOfChild" name="lastNameOfChild" type="text" placeholder="E.g. Chemmanoor"/>
            </div>

          </div>

          <div class="grid grid-cols-3 gap-4 mt-4">

            <div class="flex flex-col space-y-1.5">
              <Label class="label" for="dateOfBirthOfChild">Date Of Birth(ജനന തീയതി)</Label>
              <Input bind:value={$ChildrenStore.dateOfBirthChild} id="dateOfBirthChild" name="dateOfBirthChild" type="date" placeholder="12/10/95"/>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="emailOfChild">Email</Label>
              <Input bind:value={$ChildrenStore.emailOfChild} id="emailOfChild" name="emailOfChild" type="email" placeholder="john@doe.com"/>
            </div>

            <div class="grid grid-cols-2 gap-4">

              <div class="raw-span-3 flex flex-col">
                <Label for="sex">Sex(ലിംഗം)</Label>
                <RadioGroup.Root class="mt-2" bind:value={$ChildrenStore.sex} id="sex">
                  <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="male" id="male"/>
                    <Label for="male">Male</Label>
                  </div>
                  <div class="flex items-center space-x-2">
                    <RadioGroup.Item value="female" id="feamle"/>
                    <Label for="female">Female</Label>
                  </div>
                  <RadioGroup.Input name="sex" type="radio" id="sex"/>
                </RadioGroup.Root>
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

  {/each}

</div>