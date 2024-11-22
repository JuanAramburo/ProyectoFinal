// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, onValue, ref as refS, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3RXfHp1g81mT8kLq40OfhlEneaDGemgE",
    authDomain: "proyecto-ede3c.firebaseapp.com",
    databaseURL: "https://proyecto-ede3c-default-rtdb.firebaseio.com",
    projectId: "proyecto-ede3c",
    storageBucket: "proyecto-ede3c.firebasestorage.app",
    messagingSenderId: "1038275061124",
    appId: "1:1038275061124:web:dc95692d082f199dfc69d1"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

var idPizzas = 0;
var tamaños = "";
var uno = "";
var dos = "";
var cinco = "";

const btnAnadir = document.getElementById("btnAnadir");
const btnBuscar = document.getElementById("btnBuscar");
const btnActualizar = document.getElementById("btnActualizar");
const btnMostra = document.getElementById("btnMostra");
const btnBorrar = document.getElementById("btnBorrar");

function limpiarInputs(){
  idPizzas = document.getElementById("txtID").value = "";
  tamaños = document.getElementById("txtTamaños").value = "";
  uno = document.getElementById("txtUNO").value = "";
  dos = document.getElementById("txtDOS").value = "";
  cinco = document.getElementById("txtCINCO").value = ""; 
}

function leerInputs(){
  idPizzas = document.getElementById("txtID").value;
  tamaños = document.getElementById("txtTamaños").value;
  uno = document.getElementById("txtUNO").value;
  dos = document.getElementById("txtDOS").value;
  cinco = document.getElementById("txtCINCO").value;  
}

function mostrarMensaje(mensaje){
  var mensajeElement = document.getElementById("mensajePizzas");
  mensajeElement.textContent = mensaje;
  mensajeElement.style.display = "block";
  setTimeout(()=>{
      mensajeElement.style.display = "none"},1000);
}

function insertarProducto() {
  leerInputs();
  // Validar
  if (idPizzas === "" || tamaños === "" || uno === "" || dos === "" || cinco === "") {
      mostrarMensaje("Faltaron datos por capturar");
      return;
  }

  //--- Función de Firebase para agregar registro
  set(
      refS(db, 'Pizzas/' + idPizzas),
      {
          // Datos a guardar
          idPizzas:idPizzas,
          tamaños:tamaños,
          uno:uno,
          dos:dos,
          cinco:cinco
      }
  ).then(() => {
      alert("Se agregó con éxito");
      limpiarInputs(); // Limpiar los campos después de agregar
      Listarproductos(); // Llamar a la función para actualizar la tabla
  }).catch((error) => {
      alert("Ocurrió un error");
  });
}

function escribirTamanos(){
  document.getElementById("txtTamaños").value = tamaños;
  document.getElementById("txtUNO").value = uno;
  document.getElementById("txtDOS").value = dos;
  document.getElementById("txtCINCO").value = cinco;
}

function BuscarProducto(){
    let idPizzas = document.getElementById("txtID").value.trim();
    if(idPizzas === ""){
        mostrarMensaje("No se ingreso una ID");
        return;
    }
    const dbref = refS(db);
    get(child(dbref, 'Pizzas/' + idPizzas)).then((snapshot) =>{
        if(snapshot.exists()){
            tamaños = snapshot.val().tamaños;
            uno = snapshot.val().uno;
            dos = snapshot.val().dos;
            cinco = snapshot.val().cinco;
            escribirTamanos();
        } else {
            limpiarInputs();
            mostrarMensaje("El producto con codigo " + idPizzas + "no existe.")
        }
    });
}

function Listarproductos() {
    const dbref = refS(db, 'Pizzas');
    const tabla = document.getElementById("tablaTamaños");
    const tbody = tabla.querySelector("tbody");
    tbody.innerHTML =
    `<tr>
    <th>ID</th>
    <th>Tamaño</th>
    <th>1 Ingrediente</th>
    <th>2-4 Ingredientes</th>
    <th>5-9 Ingredientes</th>
    </tr>`;

    onValue(dbref, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const data = childSnapshot.val();

            var fila = document.createElement("tr");

            // Celda para el número de serie
            var celdaId = document.createElement("td");
            celdaId.textContent = data.idPizzas;
            fila.appendChild(celdaId);

            // Celda para la marca
            var celdaTamaños = document.createElement("td");
            celdaTamaños.textContent = data.tamaños;
            fila.appendChild(celdaTamaños);

            // Celda para el modelo
            var celdaUno = document.createElement("td");
            celdaUno.textContent = data.uno;
            fila.appendChild(celdaUno);

            // Celda para la descripción
            var celdaDos = document.createElement("td");
            celdaDos.textContent = data.dos;
            fila.appendChild(celdaDos);

            // Celda para la imagen
            var celdaCinco = document.createElement("td");
            celdaCinco.textContent = data.cinco;
            fila.appendChild(celdaCinco);

            // Agregar la fila al cuerpo de la tabla
            tbody.appendChild(fila);
        });
    }, { onlyOnce: true });
}

function actualizarAutomovil(){
    leerInputs();
    if(idPizzas ==="" || tamaños ==="" || uno ==="" || dos ==="" || cinco === ""){
        mostrarMensaje("Favor de capturar toda la informacion.");
        return;
    }
    update(refS(db, 'Pizzas/' + idPizzas),{
        idPizzas:idPizzas,
        tamaños:tamaños,
        uno:uno,
        dos:dos,
        cinco:cinco
    }).then(()=>{
        mostrarMensaje("Se actualizo con exito.");
        limpiarInputs();
        Listarproductos();
    }).catch((error) =>{
        mostrarMensaje("Ocurrio un error: " + error)
    });
}

function mostrarTabla(){
    Listarproductos();
}

function eliminarAutomovil(){
    let idPizzas = document.getElementById("txtID").value.trim();
    if(idPizzas === ""){
        mostrarMensaje("No se ingreso un codigo valido.");
        return;
    }

    const dbref = refS(db);
    get(child(dbref, 'Pizzas/' + idPizzas)).then((snapshot) =>{
        if(snapshot.exists()){
            remove(refS(db, 'Pizzas/' + idPizzas))
            .then(() => {
                mostrarMensaje("Producto eliminado con exito.");
                limpiarInputs();
                Listarproductos();
            })
            .catch((error) => {
                mostrarMensaje("Ocurrio un error al eliminar el producto: " + error);
            });
        } else {
            limpiarInputs();
            mostrarMensaje("El producto con ID " + idPizzas + "no existe.");
        }
    });
    Listarproductos();
}

btnAnadir.addEventListener("click", insertarProducto);
btnBuscar.addEventListener("click", BuscarProducto);
btnActualizar.addEventListener("click", actualizarAutomovil);
btnMostra.addEventListener("click", mostrarTabla);
btnBorrar.addEventListener("click", eliminarAutomovil);
