
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAXMYSIuqEaPftonrd1posoqifwD0wvu-o",
  authDomain: "chatapp-dbc63.firebaseapp.com",
  projectId: "chatapp-dbc63",
  storageBucket: "chatapp-dbc63.appspot.com",
  messagingSenderId: "722643174692",
  appId: "1:722643174692:web:326f2c04d290a6e8b39fb1",
  measurementId: "G-6TL6GW9DFR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const storage = getStorage();
export const db=getFirestore()