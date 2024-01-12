// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog2-6000a.firebaseapp.com",
  projectId: "blog2-6000a",
  storageBucket: "blog2-6000a.appspot.com",
  messagingSenderId: "519245785740",
  appId: "1:519245785740:web:8bcdc539f32736156469a9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
