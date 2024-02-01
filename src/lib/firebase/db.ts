import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";


const db = getFirestore();

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

