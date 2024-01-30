import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

const db = getFirestore();

export async function createDocument(collection: string, id: string, data: any) {
  await setDoc(doc(db, collection, id), data);
}

export async function readDocument(collection: string, id: string) {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
  }
}

export async function updateDocument(collection: string, id: string, data: any) {
  const docRef = doc(db, collection, id);
  await updateDoc(docRef, data);
}

export async function deleteDocument(collection: string, id: string) {
  await deleteDoc(doc(db, collection, id));
}

