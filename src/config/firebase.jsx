import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCvAPjukxcUqy6DesVVCc53EFznlWpdpqQ",
  authDomain: "react-firebase-bb513.firebaseapp.com",
  projectId: "react-firebase-bb513",
  storageBucket: "react-firebase-bb513.appspot.com",
  messagingSenderId: "820561697738",
  appId: "1:820561697738:web:a2063a54edb85d54664d33",
  measurementId: "G-6FKNX37H37",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
