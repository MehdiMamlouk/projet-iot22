import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Authentification
import { getFirestore, setDoc, doc, getDoc } from "firebase/firestore"; // Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCSLpQjTZaKgEBnzrX3S0mxhv7dVIWB2Bg",
  authDomain: "my-application-dabd2.firebaseapp.com",
  projectId: "my-application-dabd2",
  storageBucket: "my-application-dabd2.appspot.com",
  messagingSenderId: "658528587255",
  appId: "1:658528587255:web:b919dd7564c3ff1b8d32f2",
  measurementId: "G-XXXXXXXXXX"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Authentification
const db = getFirestore(app); // Firestore

// Fonction pour enregistrer un utilisateur avec son rôle
const registerUser = async (firstName, lastName, email, password, numero, role) => {
  try {
    // Créer un utilisateur avec l'email et le mot de passe
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;
    
    // Ajouter des informations supplémentaires à Firestore, y compris le rôle
    await setDoc(doc(db, "users", user.uid), {
      firstName,
      lastName,
      email,
      numero,
      role // Ajouter le rôle ici
    });

    console.log('Utilisateur inscrit avec succès:', user);
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error.message);
    throw error; // Propager l'erreur pour la gestion côté composant
  }
};

// Fonction pour authentifier un utilisateur et récupérer son rôle
const loginUser = async (email, password) => {
  try {
    // Authentifier l'utilisateur avec l'email et le mot de passe
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const user = userCredential.user;

    // Récupérer les données de l'utilisateur depuis Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('Utilisateur connecté:', userData);
      return { ...userData, uid: user.uid };
    } else {
      console.error("Les données utilisateur sont introuvables.");
      throw new Error("Données utilisateur introuvables.");
    }
  } catch (error) {
    console.error("Erreur lors de la connexion:", error.message);
    throw error; // Propager l'erreur pour la gestion côté composant
  }
};

// Exporter les fonctions et objets nécessaires
export { app, auth, db, registerUser, loginUser };
