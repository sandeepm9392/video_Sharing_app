import { initializeApp } from "firebase/app";
import dotenv from 'dotenv'
import {getAuth , GoogleAuthProvider } from "firebase/auth"

dotenv.config();
const firebaseConfig = {
  apiKey:process.env.FIREBASE_API_KEY,
  authDomain: "login-958ea.firebaseapp.com",
  projectId: "login-958ea",
  storageBucket: "login-958ea.appspot.com",
  messagingSenderId: "1020459248017",
  appId: "1:1020459248017:web:4229cedab0bc6a6b9c1230"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;