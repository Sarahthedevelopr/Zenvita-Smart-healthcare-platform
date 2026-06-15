import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBXLByKg30msaSPX_7IK8i00X3eKRcZVk0",
  authDomain: "zenvitaemergency.firebaseapp.com",
  databaseURL: "https://zenvitaemergency-default-rtdb.firebaseio.com",
  projectId: "zenvitaemergency",
  storageBucket: "zenvitaemergency.firebasestorage.app",
  messagingSenderId: "692853017601",
  appId: "1:692853017601:web:d5a5a340f224dadbcb4400"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);