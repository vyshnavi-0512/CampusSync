import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = { 
  authDomain: "campus-sync-31dd4.firebaseapp.com",
  projectId: "campus-sync-31dd4",
  storageBucket: "campus-sync-31dd4.firebasestorage.app",
  messagingSenderId: "400847748101",
  appId: "1:400847748101:web:f8db01eddf058ece0df06c",
  measurementId: "G-YWPX6NLM4Y"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
