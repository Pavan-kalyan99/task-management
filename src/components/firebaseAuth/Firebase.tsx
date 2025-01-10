// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCXPM3Su_JgwW3Hwfffdl4C1D29qt1urwY",
    authDomain: "task-management-20b34.firebaseapp.com",
    databaseURL: "https://task-management-20b34-default-rtdb.asia-southeast1.firebasedatabase.app", // Update to the correct URL

    projectId: "task-management-20b34",
    storageBucket: "task-management-20b34.firebasestorage.app",
    messagingSenderId: "1036449946723",
    appId: "1:1036449946723:web:d14bf9a8133379e2f7ec56"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
export const db =getDatabase(app);

export const googleProvider = new GoogleAuthProvider();
