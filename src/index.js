import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeApp } from "firebase/app";
import './index.css';
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAx-KvgSzNq08UufHtPKLro5TcJL9NtLdw",
  authDomain: "routeplanner-299b9.firebaseapp.com",
  projectId: "routeplanner-299b9",
  storageBucket: "routeplanner-299b9.appspot.com",
  messagingSenderId: "16602922856",
  appId: "1:16602922856:web:e2e9ead4349d8f2421a0dd",
  measurementId: "G-4XLFW8VFPW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Render React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
