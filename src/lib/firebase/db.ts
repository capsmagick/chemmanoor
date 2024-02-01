import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import type { UserData } from "$lib/stores/data";
import { UserStore } from '$lib/stores/data'; // Import UserStore to manage user data
import type { ContactData } from "$lib/stores/data";
import { ContactStore } from "$lib/stores/data";

const db = getFirestore();


export async function createDocument(collection: string, id: string, data: any) {
  await setDoc(doc(db, collection, id), data);
}

// Modify the readDocument function to return UserData
export async function readDocument(collection: string, id: string): Promise<UserData | null> {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserData; // Cast the data to UserData
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function readContactDocument(collection: string, id: string): Promise<ContactData | null> {
  const docuRef = doc(db, collection, id);
  const docuSnap = await getDoc(docuRef);

  if (docuSnap.exists()) {
    return docuSnap.data() as ContactData; // Cast the data to ContactData
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



// Now, the data from readDocument is guaranteed to be of type UserData or null
export async function manageUserStoreDocument(collection: string, uid: string, data: UserData) {
  const docSnap = await readDocument(collection, uid);

  if (docSnap) {
    UserStore.set(docSnap);
  } else {
    await createDocument(collection, uid, data);
    UserStore.set(data);
  }
}

export async function updateUserStoreDocument(collection: string, uid: string, data: any) {
  await updateDocument(collection, uid, data);
  UserStore.update((currentData: any) => { // Explicitly type currentData to any to fix lint error
    return { ...currentData, ...data };
  });
}

export async function deleteUserStoreDocument(collection: string, uid: string) {
  await deleteDocument(collection, uid);
  UserStore.set({
    uid:'',
    prefix:'',
    firstName: '',
    middleName:'',
    lastName: '',
    profilePicture:'',
    dob:'',
    occupation:'',
    chart:'',
    gen:'',
    index:'', 
    approvalStatus:'',
    lifeMember:'',
    sponsorStatus:''
  });
}

export async function manageContactStoreDocument(collection: string, uid: string, data: ContactData) {
  const docuSnap = await readContactDocument(collection, uid);

  if (docuSnap) {
    ContactStore.set(docuSnap);
  } else {
    await createDocument(collection, uid, data);
    ContactStore.set(data);
  }
}

export async function updateContactStoreDocument(collection: string, uid: string, data: any) {
  await updateDocument(collection, uid, data);
  ContactStore.update((currentData: any) => { // Explicitly type currentData to any to fix lint error
    return { ...currentData, ...data };
  });
}

export async function deleteContactStoreDocument(collection: string, uid: string) {
  await deleteDocument(collection, uid);
  ContactStore.set({
    uid:'',
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
  });
}
