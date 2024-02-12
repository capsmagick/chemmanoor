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
  import { doc,getDoc,setDoc,arrayUnion, getFirestore ,updateDoc} from 'firebase/firestore';
  import type { Writable } from 'svelte/store';
  import { prefix} from '$lib/constants/dropdownOptions'

  
  
  //export let data: PageData;
  const auth = getAuth();
  const user = auth.currentUser;
  const db = getFirestore();
  const prefixOptions = writable([]); // Store for dropdown options
  let customPrefix = '';
  const message = writable('');
  const selecteduser = writable('');
  let isCustomSelected = writable(false);
  
  onMount(async () => {
    if (user) {
      fetchPrefixData();
      checkUserOnboard();
      prefixOptions.subscribe(options => {
        console.log(options);
      });
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
    const selectedValue = (event.target as HTMLSelectElement).value;
    const userID = $UserOnboard.UserID; // Assuming this is the ID of the current user's family document

    if (selectedValue.startsWith('child-')) {
      const index = parseInt(selectedValue.split('-')[1], 10);
      if (selectedValue === `child-${$FamilyStore.children.length}`) {
        // "Add New Child" logic
        const uniqueId = generateUniqueId();
        await handleUserDocument(uniqueId); // Creates a document in the Users collection for the new child

        // Update the family collection to add the new child
        await updateMyFamilyCollection(userID, 'children', uniqueId)
          .then(() => {
            FamilyStore.update(store => {
              store.children = [...store.children, uniqueId]; // Adding the new child's uniqueId to the children array
              return store;
            });
            message.set('New child added successfully!');
          })
          .catch((error) => {
            message.set(`Error adding new child: ${error.message}`);
          });
        selecteduser.set(uniqueId); // Set the newly added child as the selected user
      } else {
        // Existing child selection logic
        const existingMemberId = $FamilyStore.children[index];
        selecteduser.set(existingMemberId); // Set the selected existing child as the selected user
      }
    } else {
      // Logic for selecting or updating other family members
      let memberType = selectedValue; // e.g., "mother", "father"
      let existingMemberId = $FamilyStore[memberType];

      if (!existingMemberId) {
        // If the member does not exist, create a new ID and update accordingly
        const uniqueId = generateUniqueId();
        await handleUserDocument(uniqueId); // Potentially creates a new document for the member

        await updateMyFamilyCollection(userID, memberType, uniqueId)
          .then(() => {
            FamilyStore.update(store => {
              store[memberType] = uniqueId; // Update the FamilyStore with the new member ID
              return store;
            });
            message.set(`New family member (${memberType}) added successfully!`);
          })
          .catch((error) => {
            message.set(`Error adding family member (${memberType}): ${error.message}`);
          });
        selecteduser.set(uniqueId); // Set the newly added family member as the selected user
      } else {
        // If the member already exists, just load their information
        selecteduser.set(existingMemberId); // Set the existing family member as the selected user
      }
    }
    loadDataIntoUserStore(); // Load the selected user's data into UserStore
  }

  async function submitForm(message: Writable<string>) {
    const db = getFirestore();
    const userID = $selecteduser; // Assuming selecteduser is a writable store containing the user's ID
    const userDocRef = doc(db, 'Users', userID);
    if (customPrefix !== '') {
      await addCustomPrefix();
    }
    const userStoreValue = $UserStore; // Get the current value of the UserStore

    try {
      await updateDoc(userDocRef, userStoreValue);
      message.set('User information updated successfully!');
    } catch (error) {
      console.error('Error updating user information:', error);
      message.set(`Error updating user information: ${error.message}`);
    }
  }

// Fetch prefixData from Firestore
async function fetchPrefixData() {
    const docRef = doc(db, 'constants', 'prefix');
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && Array.isArray(docSnap.data().prefixdata)) {
        let options = docSnap.data().prefixdata;
        // Check and add the current prefix if not present and not 'other'
        if ($UserStore.prefix && $UserStore.prefix !== 'other' && !options.includes($UserStore.prefix)) {
          options = [...options, $UserStore.prefix];
        }
        prefixOptions.set(options); // Trigger reactivity by assignment
      } else {
        console.log('No such document or invalid format!');
      }
    } catch (error) {
      console.error("Error fetching prefix data:", error);
    }
  }
  async function addCustomPrefix() {
    const newPrefix = customPrefix.trim();
    if (newPrefix) {
      const docRef = doc(db, 'constants', 'prefix');
      await updateDoc(docRef, {
        prefixdata: arrayUnion(newPrefix) // Correct usage of arrayUnion
      });
      customPrefix = ''; // Reset custom prefix input
      await fetchPrefixData(); // Refresh options
      UserStore.update(store => {
        store.prefix = newPrefix; // Update the UserStore with the new custom prefix
        return store;
      });
      isCustomSelected.set(false);
    }
  }
  $: if ($UserStore.prefix === 'other') {
    isCustomSelected.set(true);
  } else {
    isCustomSelected.set(false);
  }

</script>

<div class ="m-20 shadow-md p-10 bg-white hover:shadow-lg rounded-xl max-w-screen-md">
  <form on:submit|preventDefault={(event) => submitForm(message)} class="space-y-6">
    <div class ="class= 'max-w-xs">
    
  <label for="familyMember" class="block text-sm font-medium text-gray-700">Select Family Member</label>
  <select id="familyMember" bind:value={$FamilyStore.selectedMember} on:change={handleSelectChange} class="max-w-xs border-2 block w-full py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
    <option value="myself" selected>Myself</option>
    <option value="mother">Mother</option>
    <option value="father">Father</option>
    <option value="lifePartner">Life Partner</option>
    {#each $FamilyStore.children as child, index (child)}
      <option value={`child-${index}`}>{`Child ${index + 1}`}</option>
    {/each}
    <option value={`child-${$FamilyStore.children.length}`}>Add New Child</option>
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
              
              <select class = ' max-w-xs border-2 block w-full py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'bind:value={$UserStore.prefix}>
                  {#each $prefixOptions as option}
                    <option value={option}>{option}</option>
                  {/each}
                  <option value="other">Custom</option>
                </select>
                
                {#if $isCustomSelected}
                  <Input bind:value={customPrefix} placeholder="Enter Custom Prefix" />
                  <!-- Assuming you have a mechanism to add the custom prefix to both Firestore and prefixOptions -->
                {/if}
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
              {#if $FamilyStore.selectedMember !== 'myself'}
                <label for="late" class="flex mt-4 space-x-2">
                  <input id="late" type="checkbox" bind:checked={$UserStore.late} class="rounded text-indigo-600 focus:ring-indigo-500" />
                  <span class="text-sm font-medium text-gray-700">Late</span>
                </label>
              {/if}

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
          {#if $FamilyStore.selectedMember !== 'myself'}
            <div class="flex self-center mt-4">
              <Button class="max-w-xs" type="button">Invite</Button>
            </div>
          {/if}

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

