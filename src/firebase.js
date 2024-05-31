// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// const firebaseConfig = {
//   apiKey: "AIzaSyB7oAwSLaILOfMFt150wmq3fXtmhm4T1Ok",
//   authDomain: "projectaaa-ac9ba.firebaseapp.com",
//   databaseURL: "https://projectaaa-ac9ba-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "projectaaa-ac9ba",
//   storageBucket: "projectaaa-ac9ba.appspot.com",
//   messagingSenderId: "1000000650737",
//   appId: "1:1000000650737:web:dddd2991854cae30dc5850"
// };

console.log(firebaseConfig);


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;