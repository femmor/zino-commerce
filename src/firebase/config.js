// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Firebase Auth
import { getAuth } from 'firebase/auth';
// Firebase Firestore
import { getFirestore } from 'firebase/firestore';
// Firebase Storage
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyAesDEaheylCZufsLPCKqpJ4mo8aXnZwY0',
  authDomain: 'zino-commerce.firebaseapp.com',
  projectId: 'zino-commerce',
  storageBucket: 'zino-commerce.appspot.com',
  messagingSenderId: '884346916545',
  appId: '1:884346916545:web:8fb1899a9de0d79395ce40',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
