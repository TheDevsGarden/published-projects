let firebaseConfig = {
  apiKey: "AIzaSyCG-VtT7koxC7jed9WQvXJ_AiCz6seDS3s",
  authDomain: "my-blog-ilya.firebaseapp.com",
  projectId: "my-blog-ilya",
  storageBucket: "my-blog-ilya.appspot.com",
  messagingSenderId: "663032783699",
  appId: "1:663032783699:web:2aaaf5e733081dcb43f7a6",
  measurementId: "G-JRMLQK56N1"
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();

const logoutUser = () => {
  auth.signOut();
  location.reload();
}