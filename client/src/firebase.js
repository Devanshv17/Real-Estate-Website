// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "estate-ac922.firebaseapp.com",
  projectId: "estate-ac922",
  storageBucket: "estate-ac922.appspot.com",
  messagingSenderId: "64221042814",
  appId: "1:64221042814:web:1c1fe2ab032bf00fb3e02f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
