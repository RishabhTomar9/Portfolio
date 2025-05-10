// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQvII2gELlYtih9yB21Djl9e6KEY1-MA8",
  authDomain: "rishabh-portfolio-5d326.firebaseapp.com",
  projectId: "rishabh-portfolio-5d326",
  storageBucket: "rishabh-portfolio-5d326.appspot.com",
  messagingSenderId: "375585906189",
  appId: "1:375585906189:web:6d39314deb14c9685aff44",
  measurementId: "G-WG2GXNF41R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };