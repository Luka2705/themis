import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDFocC1hRV44m2RDsJ8O8n8qXkP3t8D3T8",
    authDomain: "themis-bdc8d.firebaseapp.com",
    projectId: "themis-bdc8d",
    storageBucket: "themis-bdc8d.appspot.com",
    messagingSenderId: "651722961163",
    appId: "1:651722961163:web:20ade8e34b0accf267b20e",
    measurementId: "G-Z80WZLCKFK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);