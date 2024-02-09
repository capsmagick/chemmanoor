import { getAuth } from 'firebase/auth';
import { manageStoreDocument, updateStoreDocument, readDocument, createDocument, updateDocument } from '$lib/firebase/db';
import {  UserStore, UserOnboard, FamilyStore } from '$lib/stores/data';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import type { Writable } from 'svelte/store';
import type { UserData } from '$lib/stores/data';

/**
 * Updates the specified Firebase collection and Svelte store with the provided form entries.
 * 
 * @param formEntries - The entries of the form data.
 * @param store - The Svelte store to update.
 * @param collectionName - The name of the Firebase collection to update.
 */
export async function updateDbStore(formEntries: FormData, store: Writable<any>, collectionName: string): Promise<void> {
    const formData = Object.fromEntries(formEntries);
    const auth = getAuth();
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

export async function submitForm(event: SubmitEvent, message: Writable<string>): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formEntries = new FormData(form);
  
    const formDataObject: Record<string, string | number> = {};
    formEntries.forEach((value, key) => {
      if (typeof value === 'string' || typeof value === 'number') {
        formDataObject[key] = value;
      } else {
        console.warn(`Skipping non-serializable form entry: ${key}`);
      }
    });
  
    const userID = formEntries.get('UserID') as string;
    if (!userID) {
      message.set('UserID is missing.');
      return;
    }
  
    await updateDocument('Users', userID, formDataObject)
      .then(() => message.set('Data updated successfully!'))
      .catch((error) => message.set(`Error updating data: ${error.message}`));
  }

export async function checkUserOnboard(store: Writable<any>): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if(user){
        const UID = user.uid;
        let userData = await readDocument<{ UserID: string }>("userOnboard", UID);
        if (!userData) {
            const userID = generateUniqueId();
            await createDocument("userOnboard", UID, { UserID: userID });
            userData = { UserID: userID };
        }
        UserOnboard.set(userData);

        let familyData = await readDocument<{ myself: string, father: string, mother: string, lifepartner: string, children: string[] }>("myFamily", userData.UserID);
        if (!familyData) {
            const initialFamilyData = { myself: userData.UserID, father: '', mother: '', lifepartner: '', children: [] as string[] };
            await createDocument("myFamily", userData.UserID, initialFamilyData);
            familyData = initialFamilyData;
        }
        FamilyStore.set(familyData);
        handleUserDocument(userData.UserID);
    }
}

/**
 * Updates the MyFamily collection with a new family member's unique ID.
 * 
 * @param userId The UID of the current user.
 * @param memberType The type of the family member (e.g., "mother", "father").
 * @param uniqueId The unique ID generated for the new family member.
 */
export async function updateMyFamilyCollection(userId: string, memberType: string, uniqueId: string): Promise<void> {
    try {
      await updateDocument('myFamily', userId, { [memberType]: uniqueId });
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

export async function populate(store: Writable<any>, collection: string): Promise<void> {
    const auth = getAuth();
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
