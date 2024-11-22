import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';

import {getAuth, createUserWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

const firebaseConfig = {
    apiKey: "AIzaSyB3RXfHp1g81mT8kLq40OfhlEneaDGemgE",
    authDomain: "proyecto-ede3c.firebaseapp.com",
    databaseURL: "https://proyecto-ede3c-default-rtdb.firebaseio.com",
    projectId: "proyecto-ede3c",
    storageBucket: "proyecto-ede3c.firebasestorage.app",
    messagingSenderId: "1038275061124",
    appId: "1:1038275061124:web:dc95692d082f199dfc69d1"
  };

//Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Evento para el botón de registro
registro.addEventListener("click", (event) => {
    var email = document.getElementById("emailreg").value;
    var password = document.getElementById("passwordreg").value;

    createUserWithEmailAndPassword(auth, email, password).then(cred => {
            alert("Usuario creado exitosamente");
        }).catch(error => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-email")
                alert("El correo no es válido");
            else if (errorCode === "auth/email-already-in-use")
                alert("El correo ya está en uso");
            else if (errorCode === "auth/weak-password")
                alert("La contraseña debe tener al menos 6 caracteres");
        });
});