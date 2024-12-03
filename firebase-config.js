import { initializeApp } from "firebase/app"; // Importa initializeApp una sola vez
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configuración de Firebase de tu aplicación
const firebaseConfig = {
  apiKey: "AIzaSyAxiPxEM2bW_1XmH6pFL-Zu0C1dC3I-KcA",
  authDomain: "app-doc-9af7f.firebaseapp.com",
  projectId: "app-doc-9af7f",
  storageBucket: "app-doc-9af7f.appspot.com",
  messagingSenderId: "853108329202",
  appId: "1:853108329202:web:d508ad4fb7bcf3f7a85e6b"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Auth y Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta `auth` y `db` para usarlos en otros archivos
export { auth, db };