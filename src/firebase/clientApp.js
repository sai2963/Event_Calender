// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,

  authDomain: "event-3b897.firebaseapp.com",

  projectId: "event-3b897",

  storageBucket: "event-3b897.firebasestorage.app",

  messagingSenderId: "1016159881863",

  appId: "1:1016159881863:web:203caae9d537f0d9304622",

  measurementId: "G-QF453697TJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
