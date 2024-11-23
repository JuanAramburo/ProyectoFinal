import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref as refS, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB3RXfHp1g81mT8kLq40OfhlEneaDGemgE",
    authDomain: "proyecto-ede3c.firebaseapp.com",
    databaseURL: "https://proyecto-ede3c-default-rtdb.firebaseio.com",
    projectId: "proyecto-ede3c",
    storageBucket: "proyecto-ede3c.appspot.com",
    messagingSenderId: "1038275061124",
    appId: "1:1038275061124:web:dc95692d082f199dfc69d1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const btnPizzas = document.getElementById("btnPizzas");
const btnAdicional = document.getElementById("btnAdicionales");
const btnBebidas = document.getElementById("btnBebidas");

function ocultarTablas(){
    document.getElementById("tablaTamaños").querySelector("tbody").innerHTML = "";
    document.getElementById("tablaCombinaciones").querySelector("tbody").innerHTML = "";
    document.getElementById("tablaAdicionales").querySelector("tbody").innerHTML = "";
    document.getElementById("tablaBebidas").querySelector("tbody").innerHTML = "";
}

function cargarPizzas() {
    ocultarTablas();
    const dbref = refS(db, "Pizzas");
    const tabla = document.getElementById("tablaTamaños").querySelector("tbody");

    tabla.innerHTML =
    `<tr>
    <th>Tamaños</th>
    <th>1 Ingrediente</th>
    <th>2-4 Ingredientes</th>
    <th>5-9 Ingredientes</th>
    </tr>`;

    onValue(dbref, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const data = childSnapshot.val();
            var fila = document.createElement("tr");

            var celdaTamaños = document.createElement("td");
            celdaTamaños.textContent = data.tamaños;
            fila.appendChild(celdaTamaños);

            var celdaUno = document.createElement("td");
            celdaUno.textContent = data.uno;
            fila.appendChild(celdaUno);

            var celdaDos = document.createElement("td");
            celdaDos.textContent = data.dos;
            fila.appendChild(celdaDos);

            var celdaCinco = document.createElement("td");
            celdaCinco.textContent = data.cinco;
            fila.appendChild(celdaCinco);

            tabla.appendChild(fila);
        });
    }, { onlyOnce: true });
}

function cargarEspecialidades() {
    const dbref = refS(db, "Especialidades");
    const tabla = document.getElementById("tablaCombinaciones").querySelector("tbody");

    tabla.innerHTML =
    `<tr>
    <th>Especialidad</th>
    <th>Ingredientes</th>
    <th></th>
    </tr>`;
    onValue(dbref, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const data = childSnapshot.val();
            var fila = document.createElement("tr");
            var celdaEspecialidad = document.createElement("td");
            celdaEspecialidad.textContent = data.especialidad;
            fila.appendChild(celdaEspecialidad);

            var celdaIngredientes = document.createElement("td");
            celdaIngredientes.textContent = data.ingredientes;
            fila.appendChild(celdaIngredientes);

            var celdaImagen = document.createElement("td");
            var imagen = document.createElement("img");
            imagen.src = data.urlimg;
            imagen.width = 100;
            celdaImagen.appendChild(imagen);
            fila.appendChild(celdaImagen);

            tabla.appendChild(fila);
        });
    }, { onlyOnce: true });
}

function cargarAdicional() {
    ocultarTablas();
    const dbref = refS(db, "Adicionales");
    const tabla = document.getElementById("tablaAdicionales").querySelector("tbody");
    
    tabla.innerHTML =
    `<tr>
    <th>Adicional</th>
    <th>Precio</th>
    <th></th>
    </tr>`;
    onValue(dbref, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const data = childSnapshot.val();
            var fila = document.createElement("tr");

            var celdaAdicional = document.createElement("td");
            celdaAdicional.textContent = data.adicional;
            fila.appendChild(celdaAdicional);

            var celdaPrecio = document.createElement("td");
            celdaPrecio.textContent = data.precio;
            fila.appendChild(celdaPrecio);

            var celdaImagen = document.createElement("td");
            var imagen = document.createElement("img");
            imagen.src = data.urlimag;
            imagen.width = 100;
            celdaImagen.appendChild(imagen);
            fila.appendChild(celdaImagen);

            tabla.appendChild(fila);
        });
    }, { onlyOnce: true });
}

function cargarBebidas() {
    ocultarTablas();
    const dbref = refS(db, "Bebidas");
    const tabla = document.getElementById("tablaBebidas").querySelector("tbody");
    
    tabla.innerHTML =
    `<tr>
    <th>Bebidas</th>
    <th>Precio</th>
    </tr>`;
    onValue(dbref, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const data = childSnapshot.val();
            var fila = document.createElement("tr");

            var celdaBebidas = document.createElement("td");
            celdaBebidas.textContent = data.bebida;
            fila.appendChild(celdaBebidas);

            var Preciobebida = document.createElement("td");
            Preciobebida.textContent = data.preciobebida;
            fila.appendChild(Preciobebida);

            tabla.appendChild(fila);
        });
    }, { onlyOnce: true });
}

btnPizzas.addEventListener("click", cargarPizzas);
btnPizzas.addEventListener("click", cargarEspecialidades);
btnAdicional.addEventListener("click", cargarAdicional);
btnBebidas.addEventListener("click",cargarBebidas);