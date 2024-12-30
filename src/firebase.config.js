// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

import { getFirestore } from "firebase/firestore";
 // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACJSsptRJfoglH5ahR8AF-UYyWsqaQn3E",
  authDomain: "petshop-c538e.firebaseapp.com",
  projectId: "petshop-c538e",
  storageBucket: "petshop-c538e.appspot.com",
  messagingSenderId: "590276424404",
  appId: "1:590276424404:web:847d7d0f1421308d94c141",
  measurementId: "G-Q66YGZ0X88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth,db }; 