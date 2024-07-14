// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-b9ca6.firebaseapp.com",
  projectId: "mern-estate-b9ca6",
  storageBucket: "mern-estate-b9ca6.appspot.com",
  messagingSenderId: "268600112624",
  appId: "1:268600112624:web:9fa014be076124964f5935",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
