// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import { getStorage } from '@firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVa7um0jbNrkDHHOnq6H7BGzqRmEGPE3Q",
  authDomain: "dnb-app-2e52e.firebaseapp.com",
  projectId: "dnb-app-2e52e",
  storageBucket: "dnb-app-2e52e.appspot.com",
  messagingSenderId: "713995329252",
  appId: "1:713995329252:web:c1cdfabe0b76f7d28d56f1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const db = getFirestore(app)