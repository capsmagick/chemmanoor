<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { writable } from 'svelte/store';
  import { updateMyFamilyCollection,handleUserDocument,updateDbStore, populate, generateUniqueId ,checkUserOnboard } from '$lib/Functions/dataHandlers';
  import * as Select from '$lib/components/ui/select';
  import { Input } from '$lib/components/ui/input';
  import Button from '$lib/components/ui/button/button.svelte';
  import FamilyIDSelector from '$lib/components/ui/familyIDSelector/familyIDSelector.svelte';
  import { getAuth } from 'firebase/auth';
  import { session } from '$lib/stores/sessions';
  import { FamilyStore } from '$lib/stores/data';
  import { UserOnboard,UserStore } from '$lib/stores/data';
  import { updateDocument}  from '$lib/firebase/db';
  import { doc,getDoc,setDoc, getFirestore ,updateDoc} from 'firebase/firestore';
  import type { Writable } from 'svelte/store';
  
  
  //export let data: PageData;
  const auth = getAuth();
  const user = auth.currentUser;
  const message = writable('');
  const selecteduser = writable('');
  
  onMount(async () => {
    if (user) {
      checkUserOnboard();
      
      selecteduser.set($UserOnboard.UserID);
      if ($FamilyStore.selectedMember === '') {
          $FamilyStore.selectedMember = 'myself';
        }
      loadDataIntoUserStore();
    }
  });
  
  async function loadDataIntoUserStore() {
    const db = getFirestore();
    const userID = $selecteduser; // Assuming selecteduser is a writable store containing the user's ID
    if (!userID) {
      console.error("No user ID provided");
      return;
    }
    const userDocRef = doc(db, 'Users', userID);

    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        UserStore.set(docSnap.data());
        console.log("User data loaded into UserStore successfully.");
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error loading document: ", error);
    }
  }

  async function handleSelectChange(event: Event) {
    const selectedMember = (event.target as HTMLSelectElement).value;
    const userStoreValue = $UserStore[selectedMember];
    console.log(`Selected family member: ${$FamilyStore[selectedMember]}`);
  
    // Check if the selectedMember already has an ID in FamilyStore
    const existingMemberId = $FamilyStore[selectedMember];
    console.log(`Existing member ID: ${existingMemberId}`);
    selecteduser.set(existingMemberId);
    selecteduser.subscribe(($selecteduser) => {
      console.log(`Selected user ID: ${$selecteduser}`);
    });
  
    if (!existingMemberId) {
      // If there's no existing ID, generate a new one and proceed with the creation and update logic
      const uniqueId = generateUniqueId();
      await handleUserDocument(uniqueId); // Creates a document in the Users collection

      const userID = $UserOnboard.UserID;
      await updateMyFamilyCollection(userID, selectedMember, uniqueId)
        .then(() => {
          // Update FamilyStore selectedMember with the new uniqueId
          FamilyStore.update(store => {
            store[selectedMember] = uniqueId;
            return store;
          });
          message.set('Family member added successfully!');
        })
        .catch((error) => {
          message.set(`Error adding family member: ${error.message}`);
        });
    } else {
      loadDataIntoUserStore();
      // If there's already an existing ID, you might want to handle it differently
      // For example, log a message or update the UI to reflect that the member is already added
      console.log(`Family member ${selectedMember} is already added with ID: ${existingMemberId}`);
      message.set(`Family member ${selectedMember} is already added.`);
    }
  }

  async function submitForm(message: Writable<string>) {
    const db = getFirestore();
    const userID = $selecteduser; // Assuming selecteduser is a writable store containing the user's ID
    const userDocRef = doc(db, 'Users', userID);

    const userStoreValue = $UserStore; // Get the current value of the UserStore

    try {
      await updateDoc(userDocRef, userStoreValue);
      message.set('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user information:', error);
      message.set(`Error updating user information: ${error.message}`);
    }
  }
</script>




<div class ="m-20 shadow-lg p-10 max-w-prose">
  <form on:submit|preventDefault={(event) => submitForm(message)} class="space-y-6">
    <div class ="class= 'max-w-xs">
      <script>
        // Set 'myself' as the default value without causing it to disappear or change without user intervention
      
      </script>
      <select bind:value={$FamilyStore.selectedMember} on:change={handleSelectChange}>
        <option value="myself">Myself</option>
        <option value="mother">Mother</option>
        <option value="father">Father</option>
        <option value="lifePartner">Life Partner</option>
        <option value="children">Children</option>
      </select>
</div>

  <div class="flex flex-col space-y-4">
    <div class="flex justify-left space-x-10   items-center">
        <label for="profilePhoto" class="cursor-pointer size-30px relative">
            <img src={$session.user?.photoURL || "https://github.com/shadcn.png"} alt="" class=" size-30px rounded-full object-cover" /> <!-- Removed descriptive alt text -->
            <div class="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-2 py-1 text-white text-sm mb-2">Change</div>
            <Input id="profilePhoto" bind:value={$UserStore.profilePicture} type="file" class="hidden" />
          </label>
        
        <div ml-10>
        
            <FamilyIDSelector  bind:chartNumberSelection={$UserStore.chart} bind:generationSelection={$UserStore.gen} bind:indexSelection={$UserStore.index} />
          </div>

      </div>
  
        <div class="grid grid-cols-4 gap-4">
            <div>
              <label for="prefix" class="block text-sm font-medium text-gray-700">Prefix</label>
              <Input id="prefix" bind:value={$UserStore.prefix} placeholder="Prefix" class="max-w-xs" />
            </div>
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
              <Input id="firstName" bind:value={$UserStore.firstName} placeholder="First Name" class="max-w-xs" />
            </div>
            <div>
              <label for="middleName" class="block text-sm font-medium text-gray-700">Middle Name</label>
              <Input id="middleName" bind:value={$UserStore.middleName} placeholder="Middle Name" class="max-w-xs" />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
              <Input id="lastName" bind:value={$UserStore.lastName} placeholder="Last Name" class="max-w-xs" />
            </div>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <div>
                <label for="dateOfBirth" class="block text-sm font-medium text-gray-700">Date of Birth</label>
                <Input id="dateOfBirth" bind:value={$UserStore.dob} type="date" placeholder="Date of Birth" class="max-w-xs" />
              </div>
              <div>
                <label for="occupation" class="block text-sm font-medium text-gray-700">Occupation</label>
                <Input id="occupation" bind:value={$UserStore.occupation} placeholder="occupation" class="max-w-xs" />
              </div>
              <div>
                <label for="relationshipStatus" class="block text-sm font-medium text-gray-700">Relationship</label>
                <select id="relationshipStatus" bind:value={$UserStore.relationshipStatus} class="max-w-xs border-2 block w-full py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                  <option value="widowed">Widowed</option>
                </select>
              </div>
              <div class ="self-center">
              <label for="late" class="flex mt-4  space-x-2">
                <input id="late" type="checkbox" bind:checked={$UserStore.late} class="rounded text-indigo-600 focus:ring-indigo-500" />
                <span class="text-sm font-medium text-gray-700">Late</span>
              </label>

              </div>
          </div>

          <div class="flex flex-nowrap space-x-4 items-stretch">
          <div>
            <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
            <Input id="phoneNumber" bind:value={$UserStore.phone} type="tel" placeholder="Phone Number" class="max-w-xs" />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <Input id="email" bind:value={$UserStore.email} type="email" placeholder="Email" class="max-w-xs" />
          </div>
          <div class="flex self-center mt-4">
            <Button class="max-w-xs" type="button">Invite</Button>
          </div>

          </div>
    <div class="grid grid-cols-4 gap-4">
      
      
      {#if $UserStore.relationshipStatus === 'married'}
      <div>
        <label for="dateOfMarriage" class="block text-sm font-medium text-gray-700">Date of Marriage</label>
        <Input id="dateOfMarriage" bind:value={$UserStore.dateOfMarriage} type="date" placeholder="Date of Marriage" class="max-w-xs" />
      </div>
      {/if}
      {#if $UserStore.late}
      <div>
        <label for="dateOfDeath" class="block text-sm font-medium text-gray-700">Date of Death</label>
        <Input id="dateOfDeath" bind:value={$UserStore.dateOfDeath} type="date" placeholder="Date of Death" class="max-w-xs" />
      </div>
      {/if}
      
     
    </div>
  
 
    <Button class= 'max-w-xs' type="submit">Update</Button>
  
  <p class="text-sm mt-2">{$message}</p>
</form>
</div>

