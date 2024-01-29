<script lang="ts">
    import type { PageData } from './$types';
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label"; 
	import Button from '$lib/components/ui/button/button.svelte';

    let checked = false;
    export let data: PageData;

    const prefix = [
      {
        value: "mister",
        label: "Mr."
      },
      {
        value: "missus",
        label: "Mrs."
      }
    ];
    const chartNumber = [
      {
        value: "1C1",
        label: "1C1"
      },
      {
        value: "1C2",
        label: "1C2"
      }
    ];
    const generation = [
      {
        value: "A",
        label: "A"
      },
      {
        value: "B",
        label: "B"
      }
    ];
    const index = [
      {
        value: "1",
        label: "1"
      },
      {
        value: "2",
        label: "2"
      }
    ];
</script>
<div class="mt-10">
    <Card.Root class="w-[950px]">
        <Card.Header>
          <Card.Title>Father Details</Card.Title>
        </Card.Header>
        <Card.Content>
            <form>
                <div class="p-4 mb-4">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="w-6/12 sm:w-4/12 px-4">
                            <img src="https://github.com/shadcn.png" alt="user avatar" class="shadow rounded-full max-w-full h-auto align-middle border-none">
                        </div>
                        <div class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                            <div class="raw-span-3">
                              <Label for="status">Branch Details (ശാഖ) according to Directory</Label>
                              <div class="grid grid-cols-3 gap-4">
                                  <div class="flex flex-col space-y-1.5">
                                      <Label for="status">Chart Number</Label>
                                      <Select.Root>
                                          <Select.Trigger id="chartNumber">
                                            <Select.Value>{chartNumber[0].label}</Select.Value>
                                          </Select.Trigger>
                                          <Select.Content>
                                            {#each chartNumber as option}
                                              <Select.Item value={option.value} 
                                              label={option.label}>
                                              {option.label}
                                            </Select.Item>
                                            {/each}
                                          </Select.Content>
                                        </Select.Root>
                                  </div>
                                  <div class="flex flex-col space-y-1.5">
                                      <Label for="status">Generation</Label>
                                      <Select.Root>
                                          <Select.Trigger id="generation">
                                            <Select.Value>{generation[0].label}</Select.Value>
                                          </Select.Trigger>
                                          <Select.Content>
                                            {#each generation as option}
                                              <Select.Item value={option.value} 
                                              label={option.label}>
                                              {option.label}
                                            </Select.Item>
                                            {/each}
                                          </Select.Content>
                                        </Select.Root>
                                  </div>
                                  <div class="flex flex-col space-y-1.5">
                                      <Label for="status">Index</Label>
                                      <Select.Root>
                                          <Select.Trigger id="index">
                                            <Select.Value>{index[0].label}</Select.Value>
                                          </Select.Trigger>
                                          <Select.Content>
                                            {#each index as option}
                                              <Select.Item value={option.value} 
                                              label={option.label}>
                                              {option.label}
                                            </Select.Item>
                                            {/each}
                                          </Select.Content>
                                        </Select.Root>
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-4 gap-4 mt-10">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="status">Prefix(ഉപസർഗ്ഗം)</Label>
                            <Select.Root>
                              <Select.Trigger id="prefix">
                                <Select.Value>{prefix[0].label}</Select.Value>
                              </Select.Trigger>
                              <Select.Content>
                                {#each prefix as option}
                                  <Select.Item value={option.value} 
                                  label={option.label}>
                                  {option.label}
                                </Select.Item>
                                {/each}
                              </Select.Content>
                            </Select.Root>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label class="label" for="firstNameOfFather">First Name(ആദ്യനാമം)<span class="text-red-500">*</span></Label>
                            <Input id="firstNameOfFather" placeholder="E.g. John" required />
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="middleNameOfFather">Middle Name(മധ്യനാമം)</Label>
                            <Input id="middleNameOfFather" placeholder="E.g. Daniel"/>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="lastNameOfFather">Last Name(അവസാന നാമം)</Label>
                            <Input id="lastNameOfFather" placeholder="E.g. Chemmanoor"/>
                        </div>
                </div>
                    <div class="grid grid-cols-4 gap-4 mt-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="occupationOfFather">Occupation of Father(പിതാവിന്റെ തൊഴിൽ)</Label>
                            <Input id="occupationOfFather" placeholder="E.g. Business"/>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label class="label" for="dateOfBirthFather">Date of Birth of Father(പിതാവിന്റെ ജനന തീയതി)</Label>
                            <Input id="dateOfBirthFather" placeholder="12/10/95"/>
                        </div>
                        <div class="flex items-center mt-5">
                            <Checkbox id="terms" bind:checked/>
                            <Label for="terms" 
                                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Late
                            </Label>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label class="label" for="dateOfDeathFather">Date of Death of Father(പിതാവിന്റെ മരണ തീയതി)</Label>
                            <Input id="dateOfDeathFather" placeholder="12/10/95"/>
                        </div>
                    </div>
                </div>
                <div>
                    <Button class="w-40 bg-blue-500 hover:bg-blue-700 text-white">Submit</Button>
                </div>
            </form>
      </Card.Content>
  </Card.Root>
</div>