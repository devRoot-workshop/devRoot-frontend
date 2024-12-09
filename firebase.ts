import { firebaseConfig } from "./firebase-config";
import { getAuth } from 'firebase/auth';
import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);