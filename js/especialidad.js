import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { getDatabase, onValue, ref as refS, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

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

var idEspecialidad = 0;
var especialidad = "";
var ingredientes = "";
var urlimg = "";

const btnAgregar = document.getElementById("btnAgg");
const btnBuscar = document.getElementById("btnBus");
const btnActualizar = document.getElementById("btnAct");
const btnBorrar = document.getElementById("btnBorr");
const imagenInput = document.getElementById("imagen");
const btnImagen = document.getElementById("btnSubir");
const ProgressDiv = document.getElementById("progress");

function limpiarInput(){
    idEspecialidad = document.getElementById("txtId").value = "";
    especialidad = document.getElementById("txtEspecialidad").value = "";
    ingredientes = document.getElementById("txtIngredientes").value = "";
    urlimg = document.getElementById("txturl").value = "";
}

function leerInput(){
    idEspecialidad = document.getElementById("txtId").value;
    especialidad = document.getElementById("txtEspecialidad").value;
    ingredientes = document.getElementById("txtIngredientes").value;
    urlimg = document.getElementById("txturl").value;
}

function mostrarMensaje(mensaje){
    var mensajeElement = document.getElementById("mensajeEspecialidad");
    mensajeElement.textContent = mensaje;
    mensajeElement.style.display = "block";
    setTimeout(()=>{
        mensajeElement.style.display = "none"},1000);
}

function insertarProducto() {
    leerInput();
    // Validar
    if (idEspecialidad === "" || especialidad === "" || ingredientes === "") {
        mostrarMensaje("Faltaron datos por capturar");
        return;
    }

    //--- Función de Firebase para agregar registro
    set(refS(db, 'Especialidades/' + idEspecialidad), {
            idEspecialidad:idEspecialidad,
            especialidad:especialidad,
            ingredientes:ingredientes,
            urlimg:urlimg,
      }).then(() => {
        alert("Se agregó con éxito");
        limpiarInput();
        ListarEspecialidades();
    }).catch((error) => {
      alert("Ocurrió un error");
    });
}

function escribirEspecialidad(){
    document.getElementById("txtEspecialidad").value = especialidad;
    document.getElementById("txtIngredientes").value = ingredientes;
    document.getElementById("txturl").value = urlimg;
}

function BuscarEspecialidad(){
    let idEspecialidad = document.getElementById("txtId").value.trim();
    if(idEspecialidad === ""){
        mostrarMensaje("No se ingreso una ID");
        return;
    }
    const dbref = refS(db);
    get(child(dbref, 'Especialidades/' + idEspecialidad)).then((snapshot) =>{
        if(snapshot.exists()){
            especialidad = snapshot.val().especialidad;
            ingredientes = snapshot.val().ingredientes;
            urlimg = snapshot.val().urlimg;
            escribirEspecialidad();
        } else {
            limpiarInput();
            mostrarMensaje("El producto con codigo " + idEspecialidad + "no existe.")
        }
    });
}

function ListarEspecialidades() {
    const dbref = refS(db, 'Especialidades');
    const tabla = document.getElementById("tablaEspecialidades");
    const tbody = tabla.querySelector("tbody");
    tbody.innerHTML =
    `<tr>
    <th>ID</th>
    <th>Especialidad</th>
    <th>Ingredientes</th>
    <th>Imagen</th>
    </tr>`;

    onValue(dbref, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const data = childSnapshot.val();

            var fila = document.createElement("tr");

            var celdaID = document.createElement("td");
            celdaID.textContent = data.idEspecialidad;
            fila.appendChild(celdaID);

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

            tbody.appendChild(fila);
        });
    }, { onlyOnce: true });
}

function actualizarEspecialidad(){
    leerInput();
    if(idEspecialidad ==="" || especialidad ==="" || ingredientes ===""){
        mostrarMensaje("Favor de capturar toda la informacion.");
        return;
    }
    update(refS(db, 'Especialidades/' + idEspecialidad),{
        idEspecialidad:idEspecialidad,
        especialidad:especialidad,
        ingredientes:ingredientes,
        urlimg:urlimg
    }).then(()=>{
        mostrarMensaje("Se actualizo con exito.");
        limpiarInput();
        ListarEspecialidades();
    }).catch((error) =>{
        mostrarMensaje("Ocurrio un error: " + error)
    });
}

function mostrarTablaEspecialidad(){
    ListarEspecialidades();
}

function eliminarEspecialidad(){
    let idEspecialidad = document.getElementById("txtId").value.trim();
    if(idEspecialidad === ""){
        mostrarMensaje("No se ingreso un codigo valido.");
        return;
    }

    const dbref = refS(db);
    get(child(dbref, 'Especialidades/' + idEspecialidad)).then((snapshot) =>{
        if(snapshot.exists()){
            remove(refS(db, 'Especialidades/' + idEspecialidad))
            .then(() => {
                mostrarMensaje("Producto eliminado con exito.");
                limpiarInput();
                ListarEspecialidades();
            })
            .catch((error) => {
                mostrarMensaje("Ocurrio un error al eliminar el producto: " + error);
            });
        } else {
            limpiarInput();
            mostrarMensaje("El producto con ID " + idEspecialidad + "no existe.");
        }
    });
    ListarEspecialidades();
}

btnImagen.addEventListener("click", (event) =>{
    event.preventDefault();
    const file = imagenInput.files[0];

    if(file) {
        const storageRef = ref(storage, file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',(snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            ProgressDiv.textContent = "Progreso: " + progress.toFixed(2) + "%";
        },(error) => {
            console.error(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                txturl.value = downloadURL;
                setTimeout(() => {
                    ProgressDiv.textContent = "";
                }, 500);
            }).catch((error) => { 
                console.error(error);
            });
        });
    }
});

btnAgregar.addEventListener("click", insertarProducto);
btnBuscar.addEventListener("click", BuscarEspecialidad);
btnActualizar.addEventListener("click", actualizarEspecialidad);
btnBorrar.addEventListener("click", eliminarEspecialidad);
document.addEventListener("DOMContentLoaded", mostrarTablaEspecialidad);

