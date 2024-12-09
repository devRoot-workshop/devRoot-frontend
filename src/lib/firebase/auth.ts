import {
    type User,
    GoogleAuthProvider,
    signInWithPopup,
    browserLocalPersistence,
    onAuthStateChanged as _onAuthStateChanged,
    setPersistence,
} from 'firebase/auth';
  
import { firebaseAuth } from '../../../firebase';
  
export function onAuthStateChanged(callback: (authUser: User | null) => void) {
    return _onAuthStateChanged(firebaseAuth, callback);
}
  
export async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
  
    try {
      await setPersistence(firebaseAuth, browserLocalPersistence);

      const result = await signInWithPopup(firebaseAuth, provider);
  
      if (!result || !result.user) {
        throw new Error('Google sign in failed');
      }
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
}
  
export async function signOutWithGoogle() {
    try {
      await firebaseAuth.signOut();
    } catch (error) {
      console.error('Error signing out with Google', error);
    }
}