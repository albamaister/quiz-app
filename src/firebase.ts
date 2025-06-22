import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAj_NK-R-H1lDrA7gxIKw2493RRckd_KE",
  authDomain: "quiz-app-bcfd4.firebaseapp.com",
  projectId: "quiz-app-bcfd4",
  storageBucket: "quiz-app-bcfd4.firebasestorage.app",
  messagingSenderId: "121746755999",
  appId: "1:121746755999:web:bd6d9a5f19c5e753ebedaa",
  measurementId: "G-NE38312FJ0"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
