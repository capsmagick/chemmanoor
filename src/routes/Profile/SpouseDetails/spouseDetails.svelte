<script lang='ts'>
    import type { PageData } from "../$types";
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label"; 
	import Button from '$lib/components/ui/button/button.svelte';
	import { Plus, X } from "lucide-svelte";

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

    <Card.Root class="w-[950px]">

      <Card.Header>
        <Card.Title>
          Spouse Details
        </Card.Title>
      </Card.Header>

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

          </div>

          <div class="mt-4">
            <Button class="w-40 bg-blue-500 hover:bg-blue-700 text-white">Submit</Button>
          </div>

        </form>

      </Card.Content>

    </Card.Root>

</div>