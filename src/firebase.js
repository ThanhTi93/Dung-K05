import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
export const storage = getStorage(app);