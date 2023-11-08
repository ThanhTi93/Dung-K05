// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl8yjy_MWHVDuryg5mVsdTm_2kxkJcT5M",
  authDomain: "dung-k05.firebaseapp.com",
  projectId: "dung-k05",
  storageBucket: "dung-k05.appspot.com",
  messagingSenderId: "143467865146",
  appId: "1:143467865146:web:08f196d6ada9b5e5d84103"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);