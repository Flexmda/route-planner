// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAx-KvgSzNq08UufHtPKLro5TcJL9NtLdw',
  authDomain: 'routeplanner-299b9.firebaseapp.com',
  databaseURL: 'https://routeplanner-299b9-default-rtdb.firebaseio.com',
  projectId: 'routeplanner-299b9',
  storageBucket: 'routeplanner-299b9.appspot.com',
  messagingSenderId: '16602922856',
  appId: '1:16602922856:web:e2e9ead4349d8f2421a0dd',
  measurementId: 'G-4XLFW8VFPW'
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inicializa otros servicios de Firebase
const firestore = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, analytics, firestore, auth, database, storage };
