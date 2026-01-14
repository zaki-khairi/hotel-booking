import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDh9nkiaeq4ZAziVTBxkeqlMvFRbbp_wss",
  authDomain: "hotelbooking-8573c.firebaseapp.com",
  databaseURL: "https://hotelbooking-8573c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hotelbooking-8573c",
  storageBucket: "hotelbooking-8573c.firebasestorage.app",
  messagingSenderId: "450231403806",
  appId: "1:450231403806:web:0197fd872bdf42af18750f",
  measurementId: "G-XCVLH8XDE4"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
