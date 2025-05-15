// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwoGNYukXoxPD8GZ51vBcAA8aCyW9F30A",
  authDomain: "householdtypescript-de884.firebaseapp.com",
  projectId: "householdtypescript-de884",
  storageBucket: "householdtypescript-de884.firebasestorage.app",
  messagingSenderId: "715633444513",
  appId: "1:715633444513:web:7b7f97213f918c8d2852e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
