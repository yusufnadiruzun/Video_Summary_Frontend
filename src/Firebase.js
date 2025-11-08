// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp1Y_hRy9ShWGX0bdo97UT8duCdVpuPxs",
  authDomain: "videosummaryapp-95c10.firebaseapp.com",
  projectId: "videosummaryapp-95c10",
  storageBucket: "videosummaryapp-95c10.firebasestorage.app",
  messagingSenderId: "842223245297",
  appId: "1:842223245297:web:2528bd8cb539c2d2625650",
  measurementId: "G-YHWF9VMSK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();