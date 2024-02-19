// Assuming the necessary Firebase Admin SDK initialization is done elsewhere
import { db } from '$lib/server/firebase.server';
import { getFirebaseServer } from '$lib/server/firebase.server';
import { getFirestore } from "firebase-admin/firestore";

await getFirebaseServer()

export async function checkUser(uid: string, email: string): Promise<Boolean> {
  
  interface FamilyData {
    myself: string;
    father: string;
    mother: string;
    lifepartner: string;
    children: string[];
  }
  
  let emailExists = false;
  let userInFamily = false;
  let familyKey: string | null = null;
  let existingUserID: string | null = null;
  let existingFamilyData: FamilyData = { myself: '', father: '', mother: '', lifepartner: '', children: [] };
  let currentFamilyData: FamilyData = { myself: '', father: '', mother: '', lifepartner: '', children: [] };
  const fbdb= db;
  if (!fbdb) {
    throw new Error('Firebase database is not initialized');
  }
  // Check if email exists

    // Now you can safely access userDoc.collection
    if(fbdb){
    const usersRef = fbdb.collection('Users');
    const emailQuery = usersRef.where('email', '==', email);
    const querySnapshot = await emailQuery.get();
    if (!querySnapshot.empty) {
      emailExists = true;
      existingUserID = querySnapshot.docs[0].id;
      const UID = uid;
      let userData = await readDocument<{ UserID: string }>("userOnboard", UID);
      if (!userData) {
        await fbdb.collection("userOnboard").doc(UID).set({ UserID: existingUserID });
        //await createDocument("userOnboard", UID, { UserID: existingUserID });
      }
          // Check if the user is in any family document
    const familyRef = fbdb.collection("myFamily");
    const familyQuerySnapshot = await familyRef.get();

    for (const doc of familyQuerySnapshot.docs) {
      const data = doc.data();
      for (const key in data) {
        const value = data[key];
        if ((Array.isArray(value) && value.includes(existingUserID)) || value === existingUserID) {
          existingFamilyData = data as FamilyData; // Cast data to FamilyData
          userInFamily = true;
          familyKey = key; // Store the key where the user was found
          break; // Exit the loop once the user is found
        }
      }
      if (userInFamily) break; // Exit the for...of loop once the user is found
    }
  }

  if (emailExists && userInFamily && familyKey) {
    if (existingUserID !== null) {
      currentFamilyData['myself'] = existingUserID;

      if (familyKey === 'children') {
        currentFamilyData['father'] = existingFamilyData['myself'];
        currentFamilyData['mother'] = existingFamilyData['lifepartner'];
      } else if (familyKey === 'lifepartner') {
        currentFamilyData['lifepartner'] = existingFamilyData['myself'];
        currentFamilyData['children'] = existingFamilyData['children'];
      } else if (familyKey === 'mother' || familyKey === 'father') {
        currentFamilyData['children'] = [...currentFamilyData['children'], existingFamilyData['myself']];
        currentFamilyData['lifepartner'] = familyKey === 'mother' ? existingFamilyData['father'] : existingFamilyData['mother'];
      }

      // Use the updated currentFamilyData for creating/updating the document
      await db.collection("myFamily").doc(existingUserID).set(currentFamilyData);
    } else {
      console.error('existingUserID is null');
      // Handle the null case appropriately
    }
  }

  return emailExists;}else {
    // ... rest of the code ...
  
    console.error('User document does not exist');
    return emailExists;
    // Handle the case where the user document does not exist
 
  
  
}


}
export async function readDocument<T>(collection: string, id: string): Promise<T | null> {
    const docRef = db.collection(collection).doc(id);
    const docSnap = await docRef.get();
  
    if (docSnap.exists) {
      return docSnap.data() as T;
    } else {
      console.log("No such document!");
      return null;
    }
}