import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

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

// Enable offline persistence so Firestore works better when the client is offline.
// If persistence fails (e.g., due to multiple tabs), we just log the warning.
enableIndexedDbPersistence(db, { synchronizeTabs: true }).catch((err) => {
  // Firestore persistence can fail if the browser is in private mode or if another tab
  // is using persistence without synchronizeTabs enabled.
  console.warn("Could not enable Firestore persistence:", err);
});
