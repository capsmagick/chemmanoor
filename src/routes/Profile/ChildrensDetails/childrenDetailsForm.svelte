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
    let numChildren = 1;
    export let data: PageData;

    const prefix = [
      {
        value: "mister",
        label: "Mr."
      },
      {
        label: 'Ms.',
        value: 'ms'
      },
      {
        value: "missus",
        label: "Mrs."
      }
    ];

    console.log(prefix[0])
  
    
    function handleAddChildrenClick() {
        numChildren++;
    }
    
    function handleCloseClick() {
        numChildren--;
    }

    let selectedPrefix = prefix[0].value;

    function handlePrefixChange(event: CustomEvent<{ value: string }>) {
        selectedPrefix = event.detail.value;
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

        <form>

          <div class="grid grid-cols-4 gap-4 mt-4">

            <div class="flex flex-col space-y-1.5 w-1/2">
              <Label for="status">Prefix(ഉപസർഗ്ഗം)</Label>
              <Select.Root on:change={handlePrefixChange}>
                <Select.Trigger id="prefix">
                  <Select.Value>{selectedPrefix === "mister" ? prefix[0].label : "Select"}</Select.Value> 
                </Select.Trigger>
                <Select.Content>
                  {#each prefix as option}
                    <Select.Item value={option.value} label={option.label}>
                      {option.label}
                    </Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="firstNameOfChild">First Name(ആദ്യനാമം)</Label>
              <Input id="firstNameOfChild" placeholder="E.g. John Smith"/>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="middleNameOfChild">Middle Name(മധ്യനാമം)</Label>
              <Input id="middleNameOfChild" placeholder="E.g. Daniel"/>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="lastNameOfChild">Last Name(അവസാന നാമം)</Label>
              <Input id="lastNameOfChild" placeholder="E.g. Chemmanoor"/>
            </div>

          </div>

          <div class="grid grid-cols-3 gap-4 mt-4">

            <div class="flex flex-col space-y-1.5">
              <Label class="label" for="dateOfBirthOfChild">Date Of Birth(ജനന തീയതി)</Label>
              <Input id="dateOfBirthChild" placeholder="12/10/95"/>
            </div>

            <div class="flex flex-col space-y-1.5">
              <Label for="emailOfChild">Email</Label>
              <Input id="emailOfChild" placeholder="john@doe.com"/>
            </div>

            <div class="grid grid-cols-2 gap-4">

              <div class="raw-span-3 flex flex-col">
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

          <div class="mt-4">
            <Button class="w-40 bg-blue-500 hover:bg-blue-700 text-white">Submit</Button>
          </div>

        </form>

      </Card.Content>

    </Card.Root>

  {/each}

</div>