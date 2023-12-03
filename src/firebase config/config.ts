// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, PhoneAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyAWNTMgT0bttnSaZtQqrXkt45GvfG0_MMQ",
  authDomain: "igotyou-399523.firebaseapp.com",
  projectId: "igotyou-399523",
  storageBucket: "igotyou-399523.appspot.com",
  messagingSenderId: "19922074976",
  appId: "1:19922074976:web:eaecf405a3757850c6f205",
  measurementId: "G-C7PB5K9Z3J",
};
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();
export const GoogleAuth = new GoogleAuthProvider();
export const PhoneAuth = new PhoneAuthProvider(auth);
