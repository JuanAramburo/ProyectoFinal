// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, onValue, ref as refS, set, child, get, update, remove } from "firebase/database"

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

var idPizzas = 0;
var tamaños = "";
var uno = "";
var dos = "";
var cinco = "";

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
  var mensajeElement = document.getElementById("mensaje");
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
