import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8FA5PoXN3oVg0s5S3sEeiV92sMqzDfv8",
  authDomain: "ihelp-81806.firebaseapp.com",
  projectId: "ihelp-81806",
  storageBucket: "ihelp-81806.appspot.com",
  messagingSenderId: "689396817516",
  appId: "1:689396817516:web:47b1c792a0064fdf9c8249",
  measurementId: "G-RHDYCV2LBL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
