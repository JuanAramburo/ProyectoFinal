  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  import { getDatabase ,onValue, ref as refS, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCATnEerBt8P-jw6TUvOLZOSEzih8oGOGk",
    authDomain: "proyectofinal-e8310.firebaseapp.com",
    databaseURL: "https://proyectofinal-e8310-default-rtdb.firebaseio.com",
    projectId: "proyectofinal-e8310",
    storageBucket: "proyectofinal-e8310.firebasestorage.app",
    messagingSenderId: "934654887767",
    appId: "1:934654887767:web:d87e972fc868bc6a4d2012"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  var numSerie = 0;
  var marca = "";
  var modelo = "";
  var descripcion = "";
  var urlImag = "";

  //funciones
  function leerInputs(){
    numSerie = document.getElementById("txtNumSerie").value;
    marca = document.getElementById("txtMarca").value;
    modelo = document.getElementById("txtModelo").value;
    descripcion = document.getElementById("txtDescripcion").value;
    urlImag = document.getElementById("txtURL").value;
  }

  function mostrarMensaje(mensaje){
    var mensajeElement = document.getElementById("mensaje");
    mensajeElement.textContent = mensaje;
    mensajeElement.style.display = "block";
    setTimeout(()=>{
      mensajeElement.style.display = "none"
    },1000);
  }

  //agregar producto a la base de datos
  const btnAgregar = document.getElementById("btnAgregar");
  btnAgregar.addEventListener("click", insertarProducto);

  function insertarProducto(){
    alert("ingrese a add db");
    leerInputs();
    //validar
    if(numSerie ==="" || marca ==="" || modelo ==="" || descripcion ===""){
      mostrarMensaje("faltaron datos por capturar");
      return;
    }
    // --- funcion de Firebase para agregar registro
    set{
      refS(db,"Automoviles/" + numSerie),
      {
        /*
        Realizar json con los campos y datos de la tabla
        campo: valor 
        */

        numSerie:numSerie,
        marca:marca,
        modelo:modelo,
        descripcion:descripcion,
        urlImag:urlImag
      }
    }.then(()=>{
      alert("Se agrego con exito");
    }).catch ((error)=>{
      alert("Ocurrio un error");
    });
  }