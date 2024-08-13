import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Si tienes un archivo de estilos globales
import { firestore } from './firebase'; // Importa el Firestore desde firebase.js

// Render React App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
