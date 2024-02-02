<script lang="ts">
    import type { PageData } from './$types';
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import { Label } from "$lib/components/ui/label"; 
	import Button from '$lib/components/ui/button/button.svelte';
    import { onMount } from'svelte';
    import type { ContactData } from "$lib/stores/data";
    import { ContactStore } from '$lib/stores/data';
    import { getAuth } from 'firebase/auth';
    import { manageStoreDocument, updateStoreDocument, readDocument } from '$lib/firebase/db';
    import { populate } from '$lib/Functions/dataHandlers';

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

    export let data: PageData;
    let contactData: ContactData;
    let countries: Country[] = [];
    let states: state[] = [];

    onMount(async () => {
        await populate(ContactStore,'contact');
 
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

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const formProps = Object.fromEntries(formData);

        console.log('Form Data:', formProps);
        console.log('User Data:', contactData);

        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            await updateStoreDocument('contact', user.uid, { ...contactData, ...formProps },ContactStore);
        }
    }

    function updateContactData(property: keyof ContactData, value: string) {
        $ContactStore = { ...contactData, [property]: value };
    }

    $: ContactStore.subscribe(value => {contactData = value; }); // Subscribe to UserStore changes

</script>
<div class="mt-10">
<Card.Root class="w-[950px]">
        <Card.Header>
          <Card.Title>Contact Details</Card.Title>
        </Card.Header>
        <Card.Content>
            <form on:submit|preventDefault={handleSubmit}>
                <div class="p-4 mb-4">
                    <dev class="grid grid-cols-4 gap-4">
                        <dev>
                            <Label for="email">Email</Label>
                            <Input bind:value={contactData.email} id="email" name="email" type="email" placeholder="E.g. john@doe.com"/>
                        </dev>
                        <dev>
                            <Label for="phone1">Phone</Label>
                            <Input bind:value={contactData.phone1} id="phone1" name="phone1" type="number" placeholder="E.g. +91 300 400 5000"/>
                        </dev>
                        <dev>
                            <Label for="phone2">Phone 2</Label>
                            <Input bind:value={contactData.phone2} id="phone2" name="phone2" type="number" placeholder="E.g. +91 300 400 5000"/>
                        </dev>
                        <div>
                            <Label for="parish">Parish(ഇടവക)</Label>
                            <Input bind:value={contactData.parish} id="parish" name="parish" type="text" placeholder="E.g. Pavaratty"/>
                        </div>
                    </dev>
                    <dev>
                        <Label for="address1">Address 1</Label>
                        <Input bind:value={contactData.address1} id="address1" name="address1" type="text" placeholder="E.g. 42 Wallaby Way"/>
                    </dev>
                    <dev>
                        <Label for="address2">Address 2</Label>
                        <Input bind:value={contactData.address2} id="address2" name="address2" type="text" placeholder="E.g. Chemmanoor House"/>
                    </dev>
                    <dev class="grid grid-cols-2 gap-4">
                        <dev>
                            <Label for="city">City(നഗരം)</Label>
                            <Input bind:value={contactData.city} id="city" name="city" type="text" placeholder="E.g. Thrissur"/>
                        </dev>
                        <dev>
                            <Label for="state">State/Province( സംസ്ഥാനം/പ്രവിശ്യ)</Label>
                            <Input bind:value={contactData.state} id="state" name="state" type="text" placeholder="E.g. Kerala"/>
                        </dev>
                    </dev>
                    <dev class="grid grid-cols-2 gap-4">
                        <dev>
                            <Label for="pincode">ZIP / Postal Code(തപാൽ കോഡ്)</Label>
                            <Input bind:value={contactData.zip} id="pincode" name="pincode" type="number" placeholder="E.g. 680001"/>
                        </dev>
                        <dev class="mt-5">
                            <div>
                                <Label for="country">Country</Label>
                            </div>
                            <select bind:value={contactData.country} id="country" name="country" on:change={handleCountryChange}>
                                <option disabled selected value="">Select a country</option>
                                {#each countries as country}
                                <option value={country.country}>
                                    {country.country}
                                </option>
                                {/each}
                            </select>
                        </dev>
                    </dev>
                    <!-- <div class="grid grid-cols-2 gap-4">
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
                    </div> -->
                </div>
                <Button class="w-40 bg-blue-500 hover:bg-blue-700 text-white" id="submit" name="submit" type="submit">
                    Submit
                </Button>
            </form>
      </Card.Content>
</Card.Root>
</div>