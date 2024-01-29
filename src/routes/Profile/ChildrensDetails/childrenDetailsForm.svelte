<script lang='ts'>
    import type { PageData } from "../$types";
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { Input } from "$lib/components/ui/input";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label"; 
	  import Button from '$lib/components/ui/button/button.svelte';
	  import { Plus, Minus, X } from "lucide-svelte";

    let checked: false;
    export let data: PageData;

    const chartNumberChild = [
      {
        value: "1C1",
        label: "1C1"
      },
      {
        value: "1C2",
        label: "1C2"
      }
    ];
    const generationChild = [
      {
        value: "A",
        label: "A"
      },
      {
        value: "B",
        label: "B"
      }
    ];
    const indexChild = [
      {
        value: "1",
        label: "1"
      },
      {
        value: "2",
        label: "2"
      }
    ];
    // State to track the number of children cards to display
    let numChildren = 1;

    // Function to handle the "Add Children" button click
    function handleAddChildrenClick() {
        numChildren++;
    }
    // Function to handle the "Close" button click
    function handleCloseClick() {
        numChildren--;
    }
</script>

<div>
  <Button variant="outline" on:click={handleAddChildrenClick}>
    <Plus class="mr-2 h-4 w-4"></Plus>
    Add Children
  </Button>
  {#each Array(numChildren) as _, index (index)}
  <Card.Root class="w-[950px] mx-auto relative">
    <Card.Header>
      <Card.Title>Children Details {index + 1}</Card.Title>
    </Card.Header>
    <div class="absolute top-2 right-2">
      <!-- Close button in the top right corner -->
      {#if index !== 0}
          <Button variant="ghost" on:click={handleCloseClick}><X class="mr-2 h-4 w-4"></X>
          </Button>
      {/if}
    </div>
    <Card.Content>
      <form>
        <div class="p-4 mb-4">
          <div class="grid grid-cols-3 gap-4 mt-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="nameOfChild">Full Name</Label>
              <Input id="nameOfChild" placeholder="E.g. John Smith"/>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label class="label" for="dateOfBirthOfChild">Date Of Birth(ജനന തീയതി)</Label>
              <Input id="dateOfBirthChild" placeholder="12/10/95"/>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="emailOfChild">Email</Label>
              <Input id="emailOfChild" placeholder="john@doe.com"/>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="raw-span-3 flex flex-col mt-4">
              <Label>Sex(ലിംഗം)</Label>
              <RadioGroup.Root class="mt-2" value="comfortable">
                <div class="flex items-center space-x-2">
                  <RadioGroup.Item value="male" id="r1"/>
                  <Label for="r1">Male</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroup.Item value="female" id="r2"/>
                  <Label for="r2">Female</Label>
                </div>
                <RadioGroup.Input name="spacing"/>
              </RadioGroup.Root>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <Button class="w-40 bg-blue-500 hover:bg-blue-700 text-white">Submit</Button>
    </div>
   </form>
  </Card.Content>
 </Card.Root>
 {/each}
</div>