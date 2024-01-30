<script lang="ts">
    import type { PageData } from './$types';
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label"; 
	import Button from '$lib/components/ui/button/button.svelte';
    import { onMount } from'svelte';

    interface Country {
        country: string;
        iso2: string;
        iso3: string;
    }
    interface state {
        country: string;
        iso2: string;
        iso3: string;
    }
    let countries: Country[] = [];
    let states: state[] = [];

    onMount(async () => {
        const apiUrl = "https://www.universal-tutorial.com/api/getaccesstoken";
        const apiToken = "xF_PdQSql62UnDzH8cQtjU0Lc2B6VEFkdwluNoWwbPZ0ZRa1oARtAbTVmB6HMl-vAtk";
        const userEmail = "royidcp96@gmail.com";
        try {
        const res = await fetch('https://countriesnow.space/api/v0.1/countries');
        if (!res.ok) {
                throw new Error(`Failed to fetch countries: ${res.status}`);
            }
        const data = await res.json();
        countries = data.data;
        console.log('Countries:', countries);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    });

    async function handleCountryChange(e: Event) {
        try {
        const countryCode = (e.target as HTMLSelectElement).value;
        const res = await fetch(`https://countriesnow.space/api/v0.1/countries/${countryCode}/states`);
        if (!res.ok) {
                throw new Error(`Failed to fetch states: ${res.status}`);
            }
            states = await res.json();
            console.log('States:', states);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }

    let checked = false;
    export let data: PageData;
</script>
<div class="mt-10">
<Card.Root class="w-[950px]">
        <Card.Header>
          <Card.Title>Contact Details</Card.Title>
        </Card.Header>
        <Card.Content>
            <form>
                <div class="p-4 mb-4">
                    <dev class="grid grid-cols-4 gap-4">
                        <dev>
                            <Label for="email">Email</Label>
                            <Input id="email" name="email" type="email" placeholder="E.g. john@doe.com"/>
                        </dev>
                        <dev>
                            <Label for="phone1">Phone</Label>
                            <Input id="phone1" name="phone1" type="number" placeholder="E.g. +91 300 400 5000"/>
                        </dev>
                        <dev>
                            <Label for="phone2">Phone 2</Label>
                            <Input id="phone2" name="phone2" type="number" placeholder="E.g. +91 300 400 5000"/>
                        </dev>
                        <div>
                            <Label for="parish">Parish(ഇടവക)</Label>
                            <Input id="parish" name="parish" type="text" placeholder="E.g. Pavaratty"/>
                        </div>
                    </dev>
                    <dev>
                        <Label for="address1">Address 1</Label>
                        <Input id="address1" name="address1" type="text" placeholder="E.g. 42 Wallaby Way"/>
                    </dev>
                    <dev>
                        <Label for="address2">Address 2</Label>
                        <Input id="address2" name="address2" type="text" placeholder="E.g. Chemmanoor House"/>
                    </dev>
                    <dev class="grid grid-cols-2 gap-4">
                        <dev>
                            <Label for="city">City(നഗരം)</Label>
                            <Input id="city" name="city" type="text" placeholder="E.g. Thrissur"/>
                        </dev>
                        <dev>
                            <Label for="state">State/Province( സംസ്ഥാനം/പ്രവിശ്യ)</Label>
                            <Input id="state" name="state" type="text" placeholder="E.g. Kerala"/>
                        </dev>
                    </dev>
                    <dev class="grid grid-cols-2 gap-4">
                        <dev>
                            <Label for="pincode">ZIP / Postal Code(തപാൽ കോഡ്)</Label>
                            <Input id="pincode" name="pincode" type="number" placeholder="E.g. 680001"/>
                        </dev>
                        <dev>
                            <Label for="country">Country(രാജ്യം)</Label>
                            <Input id="country" name="country" type="text" placeholder="E.g. India"/>
                        </dev>
                    </dev>
                    <div class="grid grid-cols-2 gap-4">
                        <div>
                            <Label for="status">Country</Label>
                            <select id="countrys" name="countries" on:change={handleCountryChange}>
                                <option disabled selected value="">Select a country</option>
                                {#each countries as country}
                                <option value={country.iso2}>
                                    {country.country}
                                </option>
                                {/each}
                            </select>
                        </div>
                        <div>
                            <select id="states" name="states" placeholder="select">
                                <option disabled selected value="">Select a state</option>
                                {#each states as state}
                                <option value={state.iso3}>
                                    {state.country}
                                </option>
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
            </form>
      </Card.Content>
</Card.Root>
</div>