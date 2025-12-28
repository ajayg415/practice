import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyBWPk3njRgBSKFkNWvedAhUfCLa_CA0xSg",
  authDomain: "rkt-counter.firebaseapp.com",
  databaseURL: "https://rkt-counter-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rkt-counter",
  storageBucket: "rkt-counter.firebasestorage.app",
  messagingSenderId: "621922635394",
  appId: "1:621922635394:web:e947929799a24332786e9b",
  measurementId: "G-F19DC4Q8Y7"
};

const app = initializeApp(firebaseConfig);

export default app;
