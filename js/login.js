import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js';
import { getAuth, signInWithEmailAndPassword} from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

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

login.addEventListener("click", (event) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password).then(() => {     
                alert("Bienvenido");
                window.location.href = "/html/admin.html"; 
            }).catch(error => {
                const errorCode = error.code;

                if (errorCode === "auth/invalid-email")
                    alert("El correo no es válido");
                else if(errorCode === "auth/missing-password")
                    alert("Ingresa una contraseña")
                else if (errorCode === "auth/user-not-found")
                    alert("El usuario no existe");
                else if (errorCode === "auth/invalid-credential")
                    alert("Contraseña incorrecta");
                });
});

auth.onAuthStateChanged(user => {
    if(user){
        console.log("Usuario Activo");
        var email = user.emailVerified;
        if(emailVerified){
            window.open("/html/admin.html")
        }else{
            auth.signOut();
        }
    }else{
        console.log("Usuario Inactivo");
    }
})


