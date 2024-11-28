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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage();

var idAdicional = 0;
var adicional = "";
var precio = "";
var urlimag = "";

const btnAgregar = document.getElementById("Agregar");
const btnBuscar = document.getElementById("Buscar");
const btnActualizar = document.getElementById("Actualizar");
const btnBorrar = document.getElementById("Borrar");
const imagenInput = document.getElementById("imagenes");
const btnImage = document.getElementById("btnImage");
const ProgressDiv = document.getElementById("progress");

function limpiarInput(){
    idAdicional = document.getElementById("IDadicional").value = "";
    adicional = document.getElementById("txtAdicional").value = "";
    precio = document.getElementById("Precio").value = "";
    urlimag = document.getElementById("txtURL").value = "";
}

function leerInput(){
    idAdicional = document.getElementById("IDadicional").value;
    adicional = document.getElementById("txtAdicional").value;
    precio = document.getElementById("Precio").value;
    urlimag = document.getElementById("txtURL").value;
}

function mostrarMensaje(mensaje){
    var mensajeElement = document.getElementById("mensajeAdicional");
    mensajeElement.textContent = mensaje;
    mensajeElement.style.display = "block";
    setTimeout(()=>{
        mensajeElement.style.display = "none"},1000);
}

function insertarProducto() {
    leerInput();
    // Validar
    if (idAdicional === "" || adicional === "" || precio === "") {
        mostrarMensaje("Faltaron datos por capturar");
        return;
    }

    //--- Función de Firebase para agregar registro
    set(refS(db, 'Adicionales/' + idAdicional),{
            idAdicional:idAdicional,
            adicional:adicional,
            precio:precio,
            urlimag:urlimag,
        }).then(() => {
            alert("Se agregó con éxito");
            limpiarInput();
            listarAdicional();
        }).catch((error) => {
            alert("Ocurrió un error");
    });
}

function escribirAdicional(){
    document.getElementById("txtAdicional").value = adicional;
    document.getElementById("Precio").value = precio;
    document.getElementById("txtURL").value = urlimag;
}

function buscarAdicional(){
    let idAdicional = document.getElementById("IDadicional").value.trim();
    if(idAdicional === ""){
        mostrarMensaje("No se ingreso una ID");
        return;
    }
    const dbref = refS(db);
    get(child(dbref, 'Adicionales/' + idAdicional)).then((snapshot) =>{
        if(snapshot.exists()){
            adicional = snapshot.val().adicional;
            precio = snapshot.val().precio;
            urlimag = snapshot.val().urlimag;
            escribirAdicional();
        } else {
            limpiarInput();
            mostrarMensaje("El producto con codigo " + idEspecialidad + " no existe.")
        }
    });
}

function listarAdicional() {
    const dbref = refS(db, 'Adicionales');
    const tabla = document.getElementById("tablaAdicionales");
    const tbody = tabla.querySelector("tbody");
    tbody.innerHTML =
    `<tr>
    <th>ID</th>
    <th>Adicional</th>
    <th>Precio</th>
    <th>Imagen</th>
    </tr>`;

    onValue(dbref, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const data = childSnapshot.val();

            var fila = document.createElement("tr");

            var idadicional = document.createElement("td");
            idadicional.textContent = data.idAdicional;
            fila.appendChild(idadicional);

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

            tbody.appendChild(fila);
        });
    }, { onlyOnce: true });
}

function actualizarAdicional(){
    leerInput();
    if(idAdicional ==="" || adicional ==="" || precio ===""){
        mostrarMensaje("Favor de capturar toda la informacion.");
        return;
    }
    update(refS(db, 'Adicionales/' + idAdicional),{
        idAdicional:idAdicional,
        adicional:adicional,
        precio:precio,
        urlimag:urlimag
    }).then(()=>{
        alert("Se actualizo con éxito");
        limpiarInput();
        listarAdicional();
    }).catch((error) =>{
        mostrarMensaje("Ocurrio un error: " + error)
    });
}

function mostrarTablaAdicional(){
    listarAdicional();
}

function eliminarAdicional(){
    let idAdicional = document.getElementById("IDadicional").value.trim();
    if(idAdicional === ""){
        mostrarMensaje("No se ingreso un codigo valido.");
        return;
    }

    if (!confirm(`¿Estás seguro de que deseas eliminar el adicional con ID ${idAdicional}?`)){
        return;
    }

    const dbref = refS(db);
    get(child(dbref, 'Adicionales/' + idAdicional)).then((snapshot) =>{
        if(snapshot.exists()){
            remove(refS(db, 'Adicionales/' + idAdicional))
            .then(() => {
                mostrarMensaje("Producto eliminado con exito.");
                limpiarInput();
                listarAdicional();
            })
            .catch((error) => {
                mostrarMensaje("Ocurrio un error al eliminar el producto: " + error);
            });
        } else {
            limpiarInput();
            mostrarMensaje("El producto con ID " + idAdicional + " no existe.");
        }
    });
    listarAdicional();
}

btnImage.addEventListener("click", (event) =>{
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
                txtURL.value = downloadURL;
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
btnBuscar.addEventListener("click", buscarAdicional);
btnActualizar.addEventListener("click", actualizarAdicional);
btnBorrar.addEventListener("click", eliminarAdicional);
document.addEventListener("DOMContentLoaded", mostrarTablaAdicional);