<script lang="ts">
    import type { PageData } from './$types';
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Label } from "$lib/components/ui/label";
    import { Switch } from "$lib/components/ui/switch";
    import * as Form from "$lib/components/ui/form";  
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
        label: "B."
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

<div class="container mx-auto py-10">
    <Card.Root class="w-[800px] mx-auto">
        <Card.Header>
          <Card.Title>FAMILY REGISTRATION</Card.Title>
        </Card.Header>
        <Card.Content>
            <form>
                <div class="p-4 mb-4">
                    <div class="grid grid-cols-4 gap-4 mt-2">
                            <div class="flex flex-col space-y-1.5">
                                <Label for="status">Prefix</Label>
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
                                <Label class="label" for="firstName">First Name<span class="text-red-500">*</span></Label>
                                <Input id="firstName" placeholder="E.g. John" required />
                            </div>
                            <div class="flex flex-col space-y-1.5">
                                <Label for="middleName">Middle Name</Label>
                                <Input id="middleName" placeholder="E.g. Daniel"/>
                            </div>
                            <div class="flex flex-col space-y-1.5">
                                <Label for="lastName">Last Name</Label>
                                <Input id="lastName" placeholder="E.g. Chemmanoor"/>
                            </div>
                    </div>
                      <div class="grid grid-cols-4 gap-4 mt-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label class="label" for="dateOfBirth">Date Of Birth<span class="text-red-500">*</span></Label>
                            <Input id="dateOfBirth" placeholder="12/10/95" required />
                          </div>
                          <div class="flex flex-col space-y-1.5">
                            <Label for="occupation">Occupation</Label>
                            <Input id="occupation" placeholder="E.g. Business"/>
                          </div>
                          <div class="flex flex-col space-y-1.5">
                            <Label for="parish">Parish</Label>
                            <Input id="parish" placeholder="E.g. Pavaratty"/>
                          </div>
                          <div class="flex flex-col space-y-1.5 mt-5">
                            <Button id="uploadPhoto">Upload Photo</Button>
                          </div>
                      </div>
                      <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="raw-span-2 flex flex-col space-y-1.5 mt-4">
                            <Label for="terms" 
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Are you a Life Member of Chemmanoor Kudumbayogam?
                            </Label>
                            <Checkbox id="terms" bind:checked />
                        </div>
                        <div class="raw-span-3 mt-4">
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
                      <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="nameOfFather">Name of Father(പിതാവിന്റെ പേര്)</Label>
                            <Input id="nameOfFather" placeholder="E.g. Francis Xavier"/>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="occupationOfFather">Occupation of Father(പിതാവിന്റെ തൊഴിൽ)</Label>
                            <Input id="occupationOfFather" placeholder="E.g. Business"/>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="nameOfMother">Name of Mother(അമ്മയുടെ പേര്)</Label>
                            <Input id="nameOfMother" placeholder="E.g. Maria Theresa"/>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="occupationOfMother">Occupation of Mother( അമ്മയുടെ തൊഴിൽ)</Label>
                            <Input id="occupationOfFMother" placeholder="E.g. Business"/>
                        </div>
                    </div>
                </div>
              </form>
        </Card.Content>
    </Card.Root>
</div>