// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain: "devx-taskmanager.firebaseapp.com",
  projectId: "devx-taskmanager",
  storageBucket: "devx-taskmanager.firebasestorage.app",
  messagingSenderId: "315830411947",
  appId: "1:315830411947:web:fc2ebd2564a982f79d0dee",
  measurementId: "G-7RMM7PXBBD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);