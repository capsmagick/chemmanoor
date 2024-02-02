<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
    import * as Select from "$lib/components/ui/select";
    import * as Card from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label"; 
    import Button from '$lib/components/ui/button/button.svelte';
    import { prefix, generation, chartNumber, index } from '$lib/constants/Profile';
    import type { UserData } from '$lib/stores/data';
    import { UserStore } from '$lib/stores/data';
    import { manageStoreDocument, updateStoreDocument, readDocument } from '$lib/firebase/db';
    import { session } from '$lib/stores/sessions';
    import { getAuth } from 'firebase/auth';

    let checked = false;
    export let data: PageData;
    let userData: UserData;
    let prefix2 = "";

    onMount(async () => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            const uid = user.uid;
            const docData = await readDocument('user', uid);
            if (docData) {
                userData = docData as UserData;
                UserStore.set(userData); // Update the UserStore with the fetched data
            } else {
                UserStore.subscribe(value => { userData = value; });
                await manageStoreDocument('users', uid, userData,UserStore);
            }
        }
    });

    async function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const formProps = Object.fromEntries(formData);

        console.log('Form Data:', formProps);
        console.log('User Data:', userData);
        console.log('prefix=', prefix2);

        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            await updateStoreDocument('users', user.uid, { ...userData, ...formProps },UserStore);
        }
    }
    function updateUserData(property: keyof UserData, value: string) {
        userData = { ...userData, [property]: value };
    }

    $: UserStore.subscribe(value => { userData = value; }); // Subscribe to UserStore changes
    
</script>

<div class="mt-10">
    <Card.Root class="w-[950px]">
        <Card.Header>
          <Card.Title>User Info</Card.Title>
        </Card.Header>
        <Card.Content>
            <form method="post" on:submit|preventDefault={handleSubmit}>
                <div class="p-4 mb-4">
                  <!-- <div class="form-control w-full max-w-lg">
                    <Label for="avatar" class="label font-medium pb-1">
                      <span class="label-text">Profile Picture</span>
                    </Label>
                    <Label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
                      <div class="w-6/12 sm:w-4/12 px-4">
                        <img src="https://github.com/shadcn.png" alt="user avatar" class="shadow rounded-full max-w-full h-auto align-middle border-none">
                      </div>
                    </Label>
                    <Input type="file" name="profilePicture" id="profilePicture" value="" accept="image/*" hidden />
                  </div> -->
                    <div class="grid grid-cols-4 gap-4 mt-2">
                            <div class="flex flex-col space-y-1.5">
                                <Label for="prefix">Prefix(ഉപസർഗ്ഗം)</Label>
                                <!-- <Select.Root>
                                  <Select.Trigger id="prefix" name="prefix">
                                    <Select.Value placeholder="Prefix"/>
                                  </Select.Trigger>
                                  <Select.Content>
                                    <Select.Group>
                                      <Select.Label>prefix</Select.Label>
                                      {#each prefix as prefix}
                                        <Select.Item value={prefix.value} label={prefix.label}>
                                          {prefix.label}
                                        </Select.Item>
                                      {/each}
                                    </Select.Group>
                                  </Select.Content>
                                  <Select.Input name="prefix" id="prefix" />
                                </Select.Root>   -->
                                <select bind:value={prefix2} id="prefix" name="prefix" on:input={() => updateUserData('prefix', prefix2)}>
                                  <option disabled selected value="">Prefix</option>
                                   {#each prefix as prefix}
                                    <option value={prefix.value}>
                                       {prefix.label}
                                    </option>
                                    {/each}
                                   </select>
                            </div>
                            <div class="flex flex-col space-y-1.5">
                              <Label class="label" for="firstName">First Name(ആദ്യനാമം)
                                <span class="text-red-500">*</span>
                              </Label>
                              <Input bind:value={userData.firstName} id="firstName" name="firstName" 
                              type="text" placeholder="E.g. John" 
                              required on:input={() => updateUserData('firstName', userData.firstName)}/>
                            </div>
                            <div class="flex flex-col space-y-1.5">
                                <Label for="middleName">
                                  Middle Name(മധ്യനാമം)
                                </Label>
                                <Input bind:value={userData.middleName} id="middleName" name="middleName" 
                                type="text" placeholder="E.g. Daniel"
                                on:input={() => updateUserData('middleName', userData.middleName)}/>
                            </div>
                            <div class="flex flex-col space-y-1.5">
                                <Label for="lastName">
                                  Last Name(അവസാന നാമം)
                                </Label>
                                <Input bind:value={userData.lastName} id="lastName" name="lastName" 
                                type="text" placeholder="E.g. Chemmanoor"
                                on:input={() => updateUserData('lastName', userData.lastName)}/>
                            </div>
                    </div>
                      <div class="grid grid-cols-2 gap-4 mt-4">
                        <div class="raw-span-2 flex flex-raw items-center mt-4">
                            <div class="grid grid-cols-2 gap-4 mt-4">
                                <div class="flex flex-col space-y-1.5">
                                    <Label class="label" for="dob">
                                      Date Of Birth(ജനന തീയതി)
                                      <span class="text-red-500">*</span>
                                    </Label>
                                    <Input bind:value={userData.dob} id="dob" name="dob" 
                                    type="date" placeholder="12/10/95" required 
                                    on:input={() => updateUserData('dob', userData.dob)}/>
                                </div>
                                <div class="flex flex-col space-y-1.5">
                                    <Label for="occupation">Occupation(തൊഴിൽ)</Label>
                                    <Input bind:value={userData.occupation} id="occupation" name="occupation" 
                                    type="text" placeholder="E.g. Business"
                                    on:input={() => updateUserData('occupation', userData.occupation)}/>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                          <div class="raw-span-3">
                            <Label for="status">Branch Details (ശാഖ) according to Directory</Label>
                            <div class="grid grid-cols-3 gap-4">
                                <div class="flex flex-col space-y-1.5">
                                    <Label for="status">Chart Number</Label>
                                    <Select.Root>
                                        <Select.Trigger
                                         id="chartNumber" name="chartNumber">
                                          <Select.Value>{chartNumber[0].value}</Select.Value>
                                        </Select.Trigger>
                                        <Select.Content>
                                          {#each chartNumber as option}
                                            <Select.Item value={option.value} 
                                            label={option.label}>
                                            {option.label}
                                          </Select.Item>
                                          {console.log('Option value:', option.value)}
                                          {/each}
                                          {console.log('Selected value:', userData.chart)}
                                        </Select.Content>
                                      </Select.Root>
                                </div>
                                <div class="flex flex-col space-y-1.5">
                                    <Label for="status">Generation</Label>
                                    <Select.Root>
                                        <Select.Trigger id="generation" name="generation">
                                          <Select.Value>{generation[0].value}</Select.Value>
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
                                        <Select.Trigger 
                                         id="index" name="index">
                                          <Select.Value>{index[0].value}</Select.Value>
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
                </div>
                <Button class="w-40 bg-blue-500 hover:bg-blue-700 text-white" id="submit" name="submit" type="submit">
                  Submit
                </Button>
              </form>
        </Card.Content>
    </Card.Root>
</div>
