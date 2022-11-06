// Import the functions you need from the SDKs you need
//import { initializeApp } from "../node_modules/firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG-VtT7koxC7jed9WQvXJ_AiCz6seDS3s",
  authDomain: "my-blog-ilya.firebaseapp.com",
  projectId: "my-blog-ilya",
  storageBucket: "my-blog-ilya.appspot.com",
  messagingSenderId: "663032783699",
  appId: "1:663032783699:web:2aaaf5e733081dcb43f7a6",
  measurementId: "G-JRMLQK56N1"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// initialize the DB

const db = firebase.firestore();
//export db; this wasnt working
