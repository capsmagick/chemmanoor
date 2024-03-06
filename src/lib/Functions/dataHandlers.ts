import { prefixOptions, UserStore, UserOnboard,formMessage, FamilyStore,isCustomSelected,selection, existingUser,existingFamilyStore, ContactStore } from '$lib/stores/data';
import {arrayUnion, doc, updateDoc } from 'firebase/firestore';
import type { Writable } from 'svelte/store';
import type { UserData } from '$lib/stores/data';
import {db, auth,storage} from '$lib/firebase/firebase.client'
import { ref as storageRef, uploadBytesResumable, uploadBytes, getDownloadURL, ref, getStorage } from "firebase/storage";
import { selecteduser } from '$lib/stores/data';
import { get } from 'svelte/store';
import type {FamilyData} from '$lib/stores/data';
import { collection, query, where, getDocs, getFirestore, addDoc } from 'firebase/firestore';

/**
 * Initializes Firebase if it hasn't been initialized yet.
 */

import { getDoc, setDoc, deleteDoc } from "firebase/firestore";

interface FamilyDataInterface {
    myself: string;
    father: string;
    mother: string;
    lifepartner: string;
    children: string[];
    // Add other member types as needed
  }



export async function createDocument(collection: string, id: string, data: any) {
  await setDoc(doc(db, collection, id), data);
}

export async function readDocument<T>(collection: string, id: string): Promise<T | null> {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as T;
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function updateDocument(collection: string, id: string, data: any) {
  const docRef = doc(db, collection, id);
  await updateDoc(docRef, data);
}

export async function deleteDocument(collection: string, id: string) {
  await deleteDoc(doc(db, collection, id));
}

export async function manageStoreDocument<T>(collection: string, uid: string, data: T, store: any) {
  const docSnap = await readDocument<T>(collection, uid);

  if (docSnap) {
    store.set(docSnap);
  } else {
    await createDocument(collection, uid, data);
    store.set(data);
  }
}

export async function updateStoreDocument(collection: string, uid: string, data: any, store: any) {
  await updateDocument(collection, uid, data);
  store.update((currentData: any) => {
    return { ...currentData, ...data };
  });
}

export async function deleteStoreDocument(collection: string, uid: string, store: any, defaultData: any) {
  await deleteDocument(collection, uid);
  store.set(defaultData);
}
/**
 * Checks if the email ID used for login exists in the email field inside any of the documents in the Users collection.
 * 
 * @param email The email ID to check in the Users collection.
 * @returns A promise that resolves to a boolean indicating if the email exists or not.
 */


/**
 * Updates the specified Firebase collection and Svelte store with the provided form entries.
 * 
 * @param formEntries - The entries of the form data.
 * @param store - The Svelte store to update.
 * @param collectionName - The name of the Firebase collection to update.
 */
export async function updateDbStore(formEntries: FormData, store: Writable<any>, collectionName: string): Promise<void> {
    
    const formData = Object.fromEntries(formEntries);
    const user = auth.currentUser;
    if (user) {
        await updateStoreDocument(collectionName, user.uid, formData, store);
    }
}

/**
 * Generates a unique ID based on the current timestamp and a random number.
 * 
 * @returns A unique ID string.
 */
export function generateUniqueId(): string {
    
    const timestamp = Date.now().toString(36);
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${randomString}`;
}
export async function uploadImage(file: File): Promise<void> { 
    const fileName = `${new Date().getTime()}-${file.name}`; // A unique file name
    const fileRef = storageRef(storage, `profilePhotos/${fileName}`);

    try {
      const uploadTaskSnapshot = await uploadBytesResumable(fileRef, file);
      const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
      UserStore.update(store => {
        store.profilePicture = downloadURL; // Update the UserStore with the new image URL
        return store;
      });
      console.log('Image uploaded and UserStore updated with URL:', downloadURL);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle the error accordingly
    }
  }
  export async function submitForm(
     // Assuming this is the user's ID // The current value of the UserStore
    customPrefix: string,
    fileInput: HTMLInputElement,
  ) {
    const selectedUser = get(selecteduser);
    const userDocRef = doc(db, 'Users', selectedUser);
  
    if (customPrefix !== '') {
      await addCustomPrefix(customPrefix); // Assuming addCustomPrefix is adapted similarly
    }
  
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        await uploadImage(fileInput.files[0]);
        fileInput.value = ''; 
      }
  
    try {
        const userData = get(UserStore); // Extract the value from the Svelte store
        await updateDoc(userDocRef, userData);
      formMessage.set('User information updated successfully!');
    } catch (error) {
        const errorMessage = (error as Error).message; // Type assertion
        console.error('Error updating user information:', error);
        formMessage.set(`Error updating user information: ${errorMessage}`);
    }
  }
  
  export async function addCustomPrefix(
    customPrefix: string, 
  ) {
    const newPrefix = customPrefix.trim();
    if (newPrefix) {
     // const db = getFirestore();
      const docRef = doc(db, 'constants', 'prefix');
      await updateDoc(docRef, {
        prefixdata: arrayUnion(newPrefix) // Correct usage of arrayUnion
      });
      await fetchPrefixData(); // Refresh options
      UserStore.update(store => {
        store.prefix = newPrefix; // Update the UserStore with the new custom prefix
        return store;
      });
      isCustomSelected.set(false);
    }
  }
  export async function fetchPrefixData() {
    const docRef = doc(db, 'constants', 'prefix');
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && Array.isArray(docSnap.data().prefixdata)) {
        let options = docSnap.data().prefixdata;
        let currentUserPrefix;
        UserStore.subscribe(value => { currentUserPrefix = value.prefix; })(); // Immediately invoked to unsubscribe
        // Check and add the current prefix if not present and not 'other'
        if (currentUserPrefix && currentUserPrefix !== 'other' && !options.includes(currentUserPrefix)) {
          options = [...options, currentUserPrefix];
        }
        prefixOptions.set(options); // Trigger reactivity by assignment
      } else {
        console.log('No such document or invalid format!');
      }
    } catch (error) {
      console.error("Error fetching prefix data:", error);
    }
  }

export async function checkUserOnboard(store: Writable<any>): Promise<void> {
   
    const user = auth.currentUser;
    
    if(user){
        const UID = user.uid;
        let userData = await readDocument<{ UserID: string }>("userOnboard", UID);
  
        if (userData) {
          UserOnboard.set(userData);
          selecteduser.set(userData.UserID);
          let familyData = await readDocument<{ myself: string, father: string, mother: string, lifepartner: string, children: string[] }>("myFamily", userData.UserID);
          if (familyData === null) {
            // Provide a default value for familyData if null
            familyData = { myself: '', father: '', mother: '', lifepartner: '', children: [] };
        }
        FamilyStore.set(familyData);
          
      } else {
          // Handle the null case, for example, by setting a default value or showing an error message
          console.error("User data is null");
         
      }

    }
}
export function resetStores() {
  // Assuming all stores are imported and are of type Writable<any>
  // Replace 'StoreName' with actual store names from your data.ts
  UserStore.set({
    // Assuming the structure of UserStore, replace with actual keys
    userID: '',
    prefix: '',
    firstName: '',
    middleName: '',
    lastName: '',
    profilePicture: '',
    dob: '',
    occupation: '',
    relationshipStatus: '',
    late: '',
    phone: '',
    email: '',
    dateOfMarriage: '',
    dateOfDeath: '',
    chart: '',
    gen: '',
    index: '', 
    approvalStatus: '',
    lifeMember: '',
    sponsorStatus: ''
  });
  UserOnboard.set({UserID: ''});

  FamilyStore.set({
    // Assuming the structure of FamilyStore, replace with actual keys
    myself: '',
    father: '',
    mother: '',
    lifepartner: '',
    children: []
  });

  ContactStore.set({
    email: '',
    phone1: '',
    phone2: '',
    parish: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  })

  existingFamilyStore.set({
     myself: '',
  father: '',
  mother: '',
  lifepartner: '',
  children: []
}
  );

  // Repeat the pattern for other stores, setting each key to an empty string or an appropriate default value
  // For example:
  // AnotherStore.set({ key1: '', key2: '', ... });

  // If there are any specific stores that handle arrays or objects differently, adjust the default value accordingly
}
/**
 * Checks if the value of existingUser is present in any document within the myFamily collection.
 * If present, retrieves the document's values into the existingFamilyStore.
 */


/**
 * Updates the MyFamily collection with a new family member's unique ID.
 * 
 * @param userId The UID of the current user.
 * @param memberType The type of the family member (e.g., "mother", "father").
 * @param uniqueId The unique ID generated for the new family member.
 */
export async function updateMyFamilyCollection(userId: string, memberTypeOrUniqueId: string , uniqueId?: string): Promise<void> {
    
    const userDocRef = doc(db, 'myFamily', userId);

    try {
        if (uniqueId === undefined) {
            // If uniqueId is not provided, we're updating a specific family member field
            await updateDoc(userDocRef, {
                [memberTypeOrUniqueId]: arrayUnion(memberTypeOrUniqueId)
            });
        } else {
            // If uniqueId is provided, we're appending a new child to the children array
            await updateDoc(userDocRef, {
                [memberTypeOrUniqueId]: uniqueId,
                children: arrayUnion(uniqueId) // Assuming you also want to keep track of all children IDs in a separate array
            });
        }
        console.log('MyFamily collection updated successfully');
    } catch (error) {
        console.error('Error updating MyFamily collection:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

/**
 * Checks if a document with the given UserID exists in the Users collection.
 * If it exists, it retrieves the data to UserStore, else it creates a document with the given UserID.
 * 
 * @param UserID The UserID to check or create in the Users collection.
 */
export async function handleUserDocument(UserID: string): Promise<void> {
    
    let userData = await readDocument("Users", UserID);
    if (!userData) {
        const initialUserData = {
            userID: UserID,
            prefix:'',
            firstName: '',
            middleName:'',
            lastName: '',
            profilePicture:'',
            dob:'',
            occupation:'',
            relationshipStatus:'',
            late:'',
            phone:'',
            email:'',
            dateOfMarriage:'',
            dateOfDeath:'',
            chart:'',
            gen:'',
            index:'', 
            approvalStatus:'',
            lifeMember:'',
            sponsorStatus:''
        };
        await createDocument("Users", UserID, initialUserData);
        userData = initialUserData;
    }
    UserStore.set(userData as UserData);
}


export async function handleSelectChange(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    const userOnboard = get(UserOnboard); // Use get to access the value of the Svelte store
    const userID = userOnboard.UserID; // Assuming this is the ID of the current user's family document
    const familyStore = get(FamilyStore); 
    selection.set(selectedValue);
    console.log(get(selection));

    if (selectedValue.startsWith('child-')) {
      const index = parseInt(selectedValue.split('-')[1], 10);
      if (selectedValue === `child-${familyStore.children.length}`) {
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
            formMessage.set('New child added successfully!');
          })
          .catch((error) => {
            formMessage.set(`Error adding new child: ${error.message}`);
          });
        selecteduser.set(uniqueId); // Set the newly added child as the selected user
      } else {
        // Existing child selection logic
        const existingMemberId = familyStore.children[index];
        selecteduser.set(existingMemberId); // Set the selected existing child as the selected user
      }
    } else {
      // Logic for selecting or updating other family members
      let memberType = selectedValue as keyof FamilyData;
      // e.g., "mother", "father"
      let existingMemberId = familyStore[memberType];

      if (!existingMemberId) {
        const userOnboardValue = get(UserOnboard);
        await addNewFamilyMember(userOnboardValue.UserID, selectedValue);
      } else {
        // If the member already exists, just load their information
        // Ensure existingMemberId is a string before setting it
        if (typeof existingMemberId === 'string') {
          selecteduser.set(existingMemberId); // Set the existing family member as the selected user
        } else {
          console.error('existingMemberId is not a string:', existingMemberId);
          // Handle the error appropriately, maybe select the first element if it's an array and not empty
          if (Array.isArray(existingMemberId) && existingMemberId.length > 0) {
            selecteduser.set(existingMemberId[0]); // Example: selecting the first ID if it's an array
          }
        }
      }
    }
    loadDataIntoUserStore();
     // Load the selected user's data into UserStore
  }
 export async function loadDataIntoUserStore() {
    const userID = get(selecteduser); 
    // Assuming selecteduser is a writable store containing the user's ID
    console.log('User ID:', userID);
    if (!userID) {
      console.error("No user ID provided");
      return;
    }
    await handleUserDocument(userID);
  }
  export async function addNewFamilyMember(userID: string, memberType: string) {
    const uniqueId = generateUniqueId();
    await handleUserDocument(uniqueId); // Potentially creates a new document for the member

    await updateMyFamilyCollection(userID, memberType, uniqueId)
      .then(() => {
        FamilyStore.update(store => {
            const key = memberType as keyof FamilyDataInterface; // Assert memberType as a key of FamilyData
            if (Array.isArray(store[key])) {
              // If it's an array, append the uniqueId
              return { ...store, [key]: [...store[key], uniqueId] };
            } else {
              // If it's a string (or potentially undefined), just assign it directly
              return { ...store, [key]: uniqueId };
            }
          });
        formMessage.set(`New family member (${memberType}) added successfully!`);
      })
      .catch((error) => {
        formMessage.set(`Error adding family member (${memberType}): ${error.message}`);
      });
    selecteduser.set(uniqueId); // Set the newly added family member as the selected user
}

export async function populate(store: Writable<any>, collection: string): Promise<void> {
    
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        let data = await readDocument(collection, uid);
        if (!data) {
            store.subscribe((value: typeof store) => { data = value; });
            await manageStoreDocument(collection, uid, data, store);
        } else {
            store.set(data); // Update the Store with the fetched data
        }
    }
}

//addUserAdmin

export async function handleFormSubmit(event: Event) {
  event.preventDefault();

  const formData = new FormData(event.target as HTMLFormElement);
  const profilePhoto = formData.get('profilePhoto') as File;

  const newData: UserData = {
    userID: '', // provide a value for this property
    prefix: formData.get('prefix') as string,
    firstName: formData.get('firstName') as string,
    middleName: formData.get('middleName') as string,
    lastName: formData.get('lastName') as string,
    profilePicture: '', 
    dob: formData.get('dateOfBirth') as string,
    occupation: formData.get('occupation') as string,
    relationshipStatus: formData.get('relationshipStatus') as string, 
    late: formData.get('late') as string,
    phone: formData.get('phoneNumber') as string,
    email: formData.get('email') as string,
    dateOfMarriage: formData.get('dateOfMarriage') as string,
    dateOfDeath: formData.get('dateOfDeath') as string,
    chart: formData.get('chartNumber') as string,
    gen: formData.get('generation') as string,
    index: formData.get('index') as string,
    approvalStatus: formData.get('approvalStatus') as string,
    lifeMember: formData.get('lifeMember') as string,
    sponsorStatus:formData.get('sponsorStatus') as string,
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
      formMessage.set('Error adding user');
  }
}
