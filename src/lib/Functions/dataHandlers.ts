import { getAuth } from 'firebase/auth';
import { manageStoreDocument, updateStoreDocument,readDocument } from '$lib/firebase/db';


/**
 * Updates the specified Firebase collection and Svelte store with the provided form entries.
 * 
 * @param formEntries - The entries of the form data.
 * @param store - The Svelte store to update.
 * @param collectionName - The name of the Firebase collection to update.
 */
export async function updateDbStore(formEntries: FormData, store: any, collectionName: string): Promise<void> {
    const formData = Object.fromEntries(formEntries);
  
    const auth = getAuth();
   const user = auth.currentUser;
    if (user) {
        const user = auth.currentUser;
        await updateStoreDocument(collectionName, user.uid, formData, store);
    }
}


export async function populate(store:any ,collection: string) {
    const auth = getAuth();
    const user = auth.currentUser;
    let data: typeof store;
    if (user) {
        const uid = user.uid;
        const docData = await readDocument(collection, uid);
        if (docData) {
            data = docData as typeof store;
            store.set(data); // Update the UserStore with the fetched data
        } else {
            store.subscribe((value: typeof store) => { data = value; });
            await manageStoreDocument(collection, uid, data,store);
        }
    }
    
}

