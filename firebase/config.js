// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBN0iIxRH2vrDhWfkvIoyzlfO46jxJ5psA",
  authDomain: "rasberrypi-445ec.firebaseapp.com",
  databaseURL: "https://rasberrypi-445ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rasberrypi-445ec",
  storageBucket: "rasberrypi-445ec.appspot.com",
  messagingSenderId: "749174287916",
  appId: "1:749174287916:web:7800e8209006b89989ab89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth =getAuth(app);
const provider = new GoogleAuthProvider();
export {db,auth,provider}