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
</script>
<div>
    <Card.Root class="w-[950px] mx-auto">
        <Card.Header>
          <Card.Title>Parents Details</Card.Title>
        </Card.Header>
        <Card.Content>
            <form>
                <div class="p-4 mb-4">
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
                    <div class="grid grid-cols-3 gap-4 mt-4">
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
                    <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label for="nameOfMother">Name of Mother(അമ്മയുടെ പേര്)</Label>
                            <Input id="nameOfMother" placeholder="E.g. Maria Theresa"/>
                        </div>
                        <div class="flex flex-col space-y-1.5">
                            <Label for="occupationOfMother">Occupation of Mother(അമ്മയുടെ തൊഴിൽ)</Label>
                            <Input id="occupationOfFMother" placeholder="E.g. Business"/>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-4 mt-4">
                        <div class="flex flex-col space-y-1.5">
                            <Label class="label" for="dateOfBirthMother">Date of Birth of Mother(അമ്മയുടെ ജനന തീയതി)</Label>
                            <Input id="dateOfBirthMother" placeholder="12/10/95"/>
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
                            <Input id="dateOfDeathMother" placeholder="12/10/95"/>
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

