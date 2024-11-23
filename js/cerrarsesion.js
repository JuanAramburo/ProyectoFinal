import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';

import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyB3RXfHp1g81mT8kLq40OfhlEneaDGemgE",
    authDomain: "proyecto-ede3c.firebaseapp.com",
    databaseURL: "https://proyecto-ede3c-default-rtdb.firebaseio.com",
    projectId: "proyecto-ede3c",
    storageBucket: "proyecto-ede3c.firebasestorage.app",
    messagingSenderId: "1038275061124",
    appId: "1:1038275061124:web:dc95692d082f199dfc69d1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

cerrarSesion.addEventListener("click", (event) => {
    signOut(auth).then(() => {
        alert("Se ha cerrado sesion");
        window.location.href = "/html/login.html";
    }).catch((error) => {
        alert("Ocurrio un error" + error);
    });
})
