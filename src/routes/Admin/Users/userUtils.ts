import { getFirestore, deleteDoc, doc } from 'firebase/firestore';

export async function removeUser(userId: string) {
  try {
    const firestore = getFirestore();
    await deleteDoc(doc(firestore, 'Users', userId));
    console.log('User removed successfully!');
  } catch (error) {
    console.error('Error removing user:', error);
  }
}
