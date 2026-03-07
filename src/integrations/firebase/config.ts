import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD112KP5jKlKTZgFYKP9Wuhx0tGZjAHc6o",
    authDomain: "theummahlab.firebaseapp.com",
    projectId: "theummahlab",
    storageBucket: "theummahlab.firebasestorage.app",
    messagingSenderId: "94909395732",
    appId: "1:94909395732:web:222c9a241dec290aff8801",
    measurementId: "G-5HWPBHPPLQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
