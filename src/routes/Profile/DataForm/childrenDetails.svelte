<script lang='ts'>
    import type { PageData } from "../$types";
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import * as RadioGroup from "$lib/components/ui/radio-group";
    import { Input } from "$lib/components/ui/input";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label"; 
	import Button from '$lib/components/ui/button/button.svelte';
    import ContactDetails from "./contactDetails.svelte";

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
</script>

<div>
    <Card.Root class="w-[950px] mx-auto">
        <Card.Header>
          <Card.Title>Add Children</Card.Title>
        </Card.Header>
        <Card.Content>
            <form>
                <div class="p-4 mb-4">
                    <div class="grid grid-cols-4 gap-4 mt-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="nameOfChild">Name(പേര്)</Label>
                            <Input id="nameOfChild" placeholder="E.g. John Smith"/>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label class="label" for="dateOfBirthOfChild">Date Of Birth(ജനന തീയതി)</Label>
                            <Input id="dateOfBirthChild" placeholder="12/10/95"/>
                          </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="occupationOfChild">Occupation(തൊഴിൽ)</Label>
                            <Input id="occupationOfChild" placeholder="E.g. Business"/>
                        </div>
                        <dev class="flex flex-col space-y-1.5">
                            <Label for="phoneChild">Phone</Label>
                            <Input id="phoneChild" type="number" placeholder="E.g. +91 300 400 5000"/>
                        </dev>
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
                        <div class="raw-span-3 mt-3">
                            <Label for="status">Branch Details (ശാഖ) according to Directory</Label>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="flex flex-col space-y-1.5">
                                    <Label for="status">Chart Number</Label>
                                    <Select.Root>
                                        <Select.Trigger id="chartNumberChild">
                                          <Select.Value>{chartNumberChild[0].label}</Select.Value>
                                        </Select.Trigger>
                                        <Select.Content>
                                          {#each chartNumberChild as option}
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
                                        <Select.Trigger id="generationChild">
                                          <Select.Value>{generationChild[0].label}</Select.Value>
                                        </Select.Trigger>
                                        <Select.Content>
                                          {#each generationChild as option}
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
                                        <Select.Trigger id="indexChild">
                                          <Select.Value>{indexChild[0].label}</Select.Value>
                                        </Select.Trigger>
                                        <Select.Content>
                                          {#each indexChild as option}
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
                    <Checkbox id="terms" bind:checked/>
                        <Label for="terms" 
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Married
                        </Label>
                    <div class="grid grid-cols-4 gap-4 mt-4">
                        <div class="flex flex-col space-y-1.5 mt-3.5">
                            <Label for="nameOfChildSpouse">Name of Spouse( ഇണയുടെ പേര്)</Label>
                            <Input id="nameOfChildSpouse" placeholder="E.g. Maria Theresa"/>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label class="label" for="dateOfBirthOfChildSpouse">Date of Birth of Spouse(ഇണയുടെ ജനന തീയതി)</Label>
                            <Input id="dateOfBirthChildSpouse" placeholder="12/10/95"/>
                          </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="occupationOfChildSpouse">Occupation of Spouse(ഇണയുടെ തൊഴിൽ)</Label>
                            <Input id="occupationOfChildSpouse" placeholder="E.g. Business"/>
                        </div>
                        <div class="flex flex-col space-y-1.5 mt-7">
                            <Label for="phoneChildSpouse">Phone</Label>
                            <Input id="phoneChildSpouse" type="number" placeholder="E.g. +91 300 400 5000"/>
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <Label for="nameOfGrandChild">Name of Grand Child(പേരക്കുട്ടിയുടെ പേര്)</Label>
                            <Input id="nameOfGrandChild" placeholder="E.g. John Smith"/>
                        </div>
                        <div>
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
                    <ContactDetails { data }/> 
                </div>
            </form>
        </Card.Content>
        <Card.Footer class="flex justify-center">
            <Button class="w-40 bg-blue-500 hover:bg-blue-700 text-white">Submit</Button>
          </Card.Footer>
    </Card.Root>
  </div>