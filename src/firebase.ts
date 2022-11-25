import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2SAglghJYq5z8MOIvUjWhbsOGbI1EVJA",
  authDomain: "gyro-14469.firebaseapp.com",
  projectId: "gyro-14469",
  storageBucket: "gyro-14469.appspot.com",
  messagingSenderId: "38022374934",
  appId: "1:38022374934:web:0131dec709661e03837737",
  measurementId: "G-5MRER5Y4JY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { app, provider, auth };
