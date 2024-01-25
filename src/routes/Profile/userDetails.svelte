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
    <Card.Root class="w-[950px] mx-auto">
        <Card.Header>
          <Card.Title>User Info</Card.Title>
        </Card.Header>
        <Card.Content>
            <form>
                <div class="p-4 mb-4">
                    <div class="grid grid-cols-4 gap-4 mt-2">
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
                                <Label class="label" for="firstName">First Name(ആദ്യനാമം)<span class="text-red-500">*</span></Label>
                                <Input id="firstName" placeholder="E.g. John" required />
                            </div>
                            <div class="flex flex-col space-y-1.5">
                                <Label for="middleName">Middle Name(മധ്യനാമം)</Label>
                                <Input id="middleName" placeholder="E.g. Daniel"/>
                            </div>
                            <div class="flex flex-col space-y-1.5">
                                <Label for="lastName">Last Name(അവസാന നാമം)</Label>
                                <Input id="lastName" placeholder="E.g. Chemmanoor"/>
                            </div>
                    </div>
                      <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="raw-span-2 flex flex-raw items-center mt-4">
                            <div class="grid grid-cols-2 gap-4 mt-4">
                                <div class="flex flex-col space-y-1.5">
                                    <Label class="label" for="dateOfBirth">Date Of Birth(ജനന തീയതി)<span class="text-red-500">*</span></Label>
                                    <Input id="dateOfBirth" placeholder="12/10/95" required />
                                </div>
                                <div class="flex flex-col space-y-1.5">
                                    <Label for="occupation">Occupation(തൊഴിൽ)</Label>
                                    <Input id="occupation" placeholder="E.g. Business"/>
                                </div>
                            </div>
                        </div>
                        <div class="raw-span-3 mt-3">
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
              </form>
        </Card.Content>
        <Card.Footer class="flex justify-center">
          <Button class="w-40 bg-blue-500 hover:bg-blue-700 text-white">Submit</Button>
        </Card.Footer>
    </Card.Root>
</div>