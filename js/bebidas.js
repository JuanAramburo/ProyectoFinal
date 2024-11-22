// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getDatabase, onValue, ref as refS, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

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
const storage = getStorage();

var idBebida = 0;
var bebida = "";
var preciobebida = "";

const btnAgregar = document.getElementById("AgregarBebida");
const btnBuscar = document.getElementById("BuscarBebida");
const btnActualizar = document.getElementById("ActualizarBebida");
const btnMostrar = document.getElementById("MostrarBebida");
const btnBorrar = document.getElementById("BorrarBebida");

function limpiarInput(){
    idBebida = document.getElementById("idBebidas").value = "";
    bebida = document.getElementById("txtBebidas").value = "";
    preciobebida = document.getElementById("PrecioBebidas").value = "";
}

function leerInput(){
    idBebida = document.getElementById("idBebidas").value;
    bebida = document.getElementById("txtBebidas").value;
    preciobebida = document.getElementById("PrecioBebidas").value;
}

function mostrarMensaje(mensaje){
  var mensajeElement = document.getElementById("mensajeBebidas");
  mensajeElement.textContent = mensaje;
  mensajeElement.style.display = "block";
  setTimeout(()=>{
      mensajeElement.style.display = "none"},1000);
}

function insertarProducto(){
  leerInput();
  // Validar
  if (idBebida === "" || bebida === "" || preciobebida === "") {
      mostrarMensaje("Faltaron datos por capturar");
      return;
  }

  //--- Función de Firebase para agregar registro
  set(
      refS(db, 'Bebidas/' + idBebida),
      {
          // Datos a guardar
          idBebida:idBebida,
          bebida:bebida,
          preciobebida:preciobebida
      }
  ).then(() => {
      alert("Se agregó con éxito");
      limpiarInput(); // Limpiar los campos después de agregar
      listarBebidas(); // Llamar a la función para actualizar la tabla
  }).catch((error) => {
      alert("Ocurrió un error");
  });
}

function escribirBebidas(){
  document.getElementById("txtBebidas").value = bebida;
  document.getElementById("PrecioBebidas").value = preciobebida;
}

function buscarBebida(){
    let idBebida = document.getElementById("idBebidas").value.trim();
    if(idBebida === ""){
        mostrarMensaje("No se ingreso una ID");
        return;
    }
    const dbref = refS(db);
    get(child(dbref, 'Bebidas/' + idBebida)).then((snapshot) =>{
        if(snapshot.exists()){
            bebida = snapshot.val().bebida;
            preciobebida = snapshot.val().preciobebida;
            escribirBebidas();
        } else {
            limpiarInput();
            mostrarMensaje("El producto con codigo " + idBebida + "no existe.")
        }
    });
}

function listarBebidas() {
    const dbref = refS(db, 'Bebidas');
    const tabla = document.getElementById("tablaBebidas");
    const tbody = tabla.querySelector("tbody");
    tbody.innerHTML =
    `<tr>
    <th>ID</th>
    <th>Bebidas</th>
    <th>Precio</th>
    </tr>`;

    onValue(dbref, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const data = childSnapshot.val();

            var fila = document.createElement("tr");

            // Celda para el número de serie
            var idBebidas = document.createElement("td");
            idBebidas.textContent = data.idBebida;
            fila.appendChild(idBebidas);

            // Celda para la marca
            var celdaBebidas = document.createElement("td");
            celdaBebidas.textContent = data.bebida;
            fila.appendChild(celdaBebidas);

            // Celda para el modelo
            var Preciobebida = document.createElement("td");
            Preciobebida.textContent = data.preciobebida;
            fila.appendChild(Preciobebida);

            // Agregar la fila al cuerpo de la tabla
            tbody.appendChild(fila);
        });
    }, { onlyOnce: true });
}

function actualizarBebidas(){
    leerInput();
    if(idBebida ==="" || bebida ==="" || preciobebida ===""){
        mostrarMensaje("Favor de capturar toda la informacion.");
        return;
    }
    update(refS(db, 'Bebidas/' + idBebida),{
        idBebida:idBebida,
        bebida:bebida,
        preciobebida:preciobebida,
    }).then(()=>{
        mostrarMensaje("Se actualizo con exito.");
        limpiarInput();
        listarBebidas();
    }).catch((error) =>{
        mostrarMensaje("Ocurrio un error: " + error)
    });
}

function mostrarTablaBebidas(){
    listarBebidas();
}

function eliminarBebidas(){
    let idBebida = document.getElementById("idBebidas").value.trim();
    if(idBebida === ""){
        mostrarMensaje("No se ingreso un codigo valido.");
        return;
    }
    const dbref = refS(db);
    get(child(dbref, 'Bebidas/' + idBebida)).then((snapshot) =>{
        if(snapshot.exists()){
            remove(refS(db, 'Bebidas/' + idBebida))
            .then(() => {
                mostrarMensaje("Producto eliminado con exito.");
                limpiarInput();
                listarBebidas();
            })
            .catch((error) => {
                mostrarMensaje("Ocurrio un error al eliminar el producto: " + error);
            });
        } else {
            limpiarInput();
            mostrarMensaje("El producto con ID " + idBebida + "no existe.");
        }
    });
    listarBebidas();
}

btnAgregar.addEventListener("click", insertarProducto);
btnBuscar.addEventListener("click", buscarBebida);
btnActualizar.addEventListener("click", actualizarBebidas);
btnMostrar.addEventListener("click", mostrarTablaBebidas);
btnBorrar.addEventListener("click", eliminarBebidas);