<script lang="ts">
    import { Input } from '$lib/components/ui/input';
    import Button from '$lib/components/ui/button/button.svelte';
    import FamilyIDSelector from '$lib/components/ui/familyIDSelector/familyIDSelector.svelte';
    import { UserStore, prefixOptions, formMessage } from '$lib/stores/data';
    import { getFirestore, collection, addDoc } from 'firebase/firestore';
    import { uploadBytes, getDownloadURL, ref, getStorage } from 'firebase/storage';

    let userData = UserStore;
    let formSubmitting = false;

    interface UserData {
        firstName: string;
        middleName: string;
        lastName: string;
        dob: string;
        occupation: string;
        phone: string;
        email: string;
        chart: string;
        gen: string;
        index: string;
        profilePicture?: string;
    }

    async function handleFormSubmit(event: Event) {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const profilePhoto = formData.get('profilePhoto') as File;

        const newData: UserData = {
            firstName: formData.get('firstName') as string,
            middleName: formData.get('middleName') as string,
            lastName: formData.get('lastName') as string,
            dob: formData.get('dateOfBirth') as string,
            occupation: formData.get('occupation') as string,
            phone: formData.get('phoneNumber') as string,
            email: formData.get('email') as string,
            chart: formData.get('chart') as string,
            gen: formData.get('gen') as string,
            index: formData.get('index') as string,
        };

        if (profilePhoto) {
            const storage = getStorage();
            const timestamp = new Date().getTime();
            const filename = `${timestamp}_${profilePhoto.name}`;
            const storageRef = ref(storage, `profilePictures/${filename}`);
            await uploadBytes(storageRef, profilePhoto);

            const profilePhotoURL = await getDownloadURL(storageRef);
            newData.profilePicture = profilePhotoURL;
        }

        try {
            const firestore = getFirestore();
            const usersCollection = collection(firestore, 'Users');
            await addDoc(usersCollection, newData);
            console.log('User added successfully!');
            // You can optionally reset the form here
        } catch (error) {
            console.error('Error adding user:', error);
        }
    }
</script>

<div class="m-20 max-w-screen-md rounded-xl bg-white p-10 shadow-md hover:shadow-lg">
    <form class="space-y-6" on:submit={handleFormSubmit}>
        <div class="flex flex-col space-y-4">
            <div class="flex items-center justify-between space-x-10">
                <div>
                    <label for="profilePhoto" class="size-30px relative cursor-pointer">
                        <img
                            src={$userData.profilePicture}
                            alt=""
                            class="size-40px max-h-40 max-w-40 rounded-full object-cover"/>
                        <div
                            class="absolute bottom-0 left-1/2 mb-2 -translate-x-1/2 transform bg-black
                        bg-opacity-50 px-2 py-1 text-sm text-white">
                            Change
                        </div>
                        <Input id="profilePhoto" name="profilePhoto" type="file" class="hidden" />
                    </label>
                </div>

                <div class="ml-auto">
                    <FamilyIDSelector
                        bind:chartNumberSelection={$UserStore.chart}
                        bind:generationSelection={$UserStore.gen}
                        bind:indexSelection={$UserStore.index}/>
                </div>
            </div>

            <div class="grid grid-cols-4 gap-4">
                <div>
                    <label for="prefix" class="block text-sm font-medium text-gray-700">Prefix</label>

                    <select
                        class=" block w-full max-w-xs rounded-md border-2 border-gray-300 py-2 text-base
                        focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        {#each $prefixOptions as option}
                            <option value={option}>{option}</option>
                        {/each}
                        <option value="other">Custom</option>
                    </select>

                    <!-- {#if $isCustomSelected} -->
                        <Input placeholder="Enter Custom Prefix" />
                    <!-- {/if} -->
                </div>
                <div>
                    <label for="firstName" class="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <Input
                        id="firstName"
                        type="text"
                        name="firstName"
                        value={$userData.firstName}
                        placeholder="First Name"
                        class="max-w-xs"/>
                </div>
                <div>
                    <label for="middleName" class="block text-sm font-medium text-gray-700">
                        Middle Name
                    </label>
                    <Input
                        id="middleName"
                        type="text"
                        name="middleName"
                        value={$userData.middleName}
                        placeholder="Middle Name"
                        class="max-w-xs"
                    />
                </div>
                <div>
                    <label for="lastName" class="block text-sm font-medium text-gray-700"> Last Name </label>
                    <Input
                        id="lastName"
                        type="text"
                        name="lastName"
                        value={$userData.lastName}
                        placeholder="Last Name"
                        class="max-w-xs"
                    />
                </div>
            </div>
            <div class="grid grid-cols-4 gap-4">
                <div>
                    <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">
                        Date of Birth
                    </label>
                    <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={$userData.dob}
                        type="date"
                        placeholder="Date of Birth"
                        class="max-w-xs"
                    />
                </div>
                <div>
                    <label for="occupation" class="block text-sm font-medium text-gray-700">
                        Occupation
                    </label>
                    <Input
                        id="occupation"
                        name="occupation"
                        type="text"
                        value={$userData.occupation}
                        placeholder="occupation"
                        class="max-w-xs"
                    />
                </div>
                <div>
                    <label for="relationshipStatus" class="block text-sm font-medium text-gray-700">
                        Relationship
                    </label>
                    <select
                        id="relationshipStatus"
                        class="block w-full max-w-xs rounded-md border-2 border-gray-300 py-2 text-base
                        focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <option value="">Select</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                    </select>
                </div>
                <div class="self-center">
                        <label for="late" class="mt-4 flex space-x-2">
                            <input
                                id="late"
                                type="checkbox"
                                class="rounded text-indigo-600 focus:ring-indigo-500"/>
                            <span class="text-sm font-medium text-gray-700"> Late </span>
                        </label>
                </div>
            </div>

            <div class="flex flex-nowrap items-stretch space-x-4">
                <div>
                    <label for="phoneNumber" class="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <Input id="phoneNumber" value={$userData.phone} 
                    type="tel" name="phoneNumber" placeholder="Phone Number" class="max-w-xs" />
                </div>
                <div>
                    <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
                    <Input value={$userData.email} 
                    id="email" name="email" type="email" placeholder="Email" class="max-w-xs" />
                </div>
            </div>
            <div class="grid grid-cols-4 gap-4">
                {#if $UserStore.relationshipStatus === 'married'}
                <div>
                    <label for="dateOfMarriage" class="block text-sm font-medium text-gray-700">
                        Date of Marriage
                    </label>
                    <Input value={$userData.dateOfMarriage} 
                    id="dateOfMarriage" type="date" placeholder="Date of Marriage" class="max-w-xs" />
                </div>
                {/if} 
                {#if $UserStore.late}
                <div>
                    <label for="dateOfDeath" class="block text-sm font-medium text-gray-700">
                        Date of Death
                    </label>
                    <Input value={$userData.dateOfDeath}
                    id="dateOfDeath" type="date" placeholder="Date of Death" class="max-w-xs" />
                </div>
                {/if}
            </div>

            <div class="flex items-center">
                <Button class="max-w-xs" type="submit">Update</Button>
                <div
                    class="ml-5 h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-gray-900">
                </div>
            </div>
            <p class="mt-2 text-sm">{$formMessage}</p>
        </div>
    </form>
</div>
