import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDP_XHHLQNg_18yRw5AgDd48-Sze8qrLDM",
  authDomain: "note-app-native.firebaseapp.com",
  projectId: "note-app-native",
  storageBucket: "note-app-native.appspot.com",
  messagingSenderId: "129430970588",
  appId: "1:129430970588:web:ca900f9e5e3ab05c6f9419",
};

// initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
