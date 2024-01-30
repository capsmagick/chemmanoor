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
                            <Label for="pincode">ZIP / Postal Code(തപാൽ കോഡ്)</Label>
                            <Input id="pincode" name="pincode" type="number" placeholder="E.g. 680001"/>
                        </dev>
                        <dev>
                            <Label for="country">Country(രാജ്യം)</Label>
                            <Input id="country" name="country" type="text" placeholder="E.g. India"/>
                        </dev>
                    </dev>
                </div>
            </form>
      </Card.Content>
  </Card.Root>
</div>