// importation des modules nécessaires
import React from 'react';
import ReactDOM from 'react-dom/client'; // Nouvelle importation pour React 18
import App from './App';
import './index.css';

// Création du root et rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root')); // Utilisation de createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
