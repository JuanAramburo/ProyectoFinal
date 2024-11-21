var menu = [
    {"tamaños": "Mediana Regular/Delgada", "uningrediente": "$179", "dosingredientes": "$219", "cincoingredientes": "$259"},
    {"tamaños": "Mediana Orilla de Queso", "uningrediente": "$209", "dosingredientes": "$249", "cincoingredientes": "$289"},
    {"tamaños": "Grande Regular/Delgada", "uningrediente": "$189", "dosingredientes": "$239", "cincoingredientes": "$289"},
    {"tamaños": "Grande Orilla de Queso", "uningrediente": "$229", "dosingredientes": "$279", "cincoingredientes": "$329"},
    {"tamaños": "Grande a la Cacerola", "uningrediente": "$199", "dosingredientes": "$249", "cincoingredientes": "$299"},
    {"tamaños": "Extra Grande Regular/Delgada", "uningrediente": "$264", "dosingredientes": "$314", "cincoingredientes": "$364"},
    {"tamaños": "Extra Grande Orilla de Queso", "uningrediente": "$342", "dosingredientes": "$392", "cincoingredientes": "$442"},
]
  
var combinaciones = [
    {"especialidades": "Americana", "Ingredientes": "Pepperoni, Champiñones, Extra Queso"},
    {"especialidades": "Carnes Frias", "Ingredientes": "Pepperoni, Jamon, Salami"},
    {"especialidades": "Vegetariana", "Ingredientes": "Pimiento, Cebolla, Champiñones, Aceitunas negras"},
    {"especialidades": "Mexicana", "Ingredientes": "Cebolla, Chorizo, Carne Molida, Jalapeño"},
    {"especialidades": "Hawaiiana", "Ingredientes": "Jamon, Piña, Extra Queso"},
    {"especialidades": "Brother's burger", "Ingredientes": "Tocino, Carne Molida, Extra Queso"},
    {"especialidades": "Maui", "Ingredientes": "Jamon, Piña, Jalapeño, Tocino"},
    {"especialidades": "4 Quesos", "Ingredientes": "Queso Mozarella, Queso Crema, Queso Parmesano, Queso Cheddar"},
    {"especialidades": "Brother's Especial", "Ingredientes": "Pepperoni, Jamon, Pimiento, Cebolla, Champiñones, Aceitunas, Extra Queso, Aceitunas negras, Carne Molida", imagen: "/img/exv.jpg"},
    {"especialidades": "Deluxe", "Ingredientes": "Pepperoni, Pimiento, Cebolla, Champiñones, Carne Molida"},
]
  
var adicionales = [
    {"adicional": "Alitas BBQ", "precio": "$109"},
    {"adicional": "Alitas Buffalo", "precio": "$109"},
    {"adicional": "Papotas", "precio": "$59"},
    {"adicional": "Chessy Bread", "precio": "$79"},
    {"adicional": "Canelazos", "precio": "$59"},
    {"adicional": "Bread Sticks", "precio": "$59"},
]

var bebidas = [
    {"bebida": "Coca-Cola 600ml", "precio" : "$30"},
    {"bebida": "Coca-Cola Light 600ml", "precio" : "$30"},
    {"bebida": "Coca-Cola Zero 600ml", "precio" : "$30"},
    {"bebida": "Coca-Cola 2L", "precio" : "$55"},
    {"bebida": "Sprite 600ml", "precio" : "$30"},
    {"bebida": "Sprite 2L", "precio" : "$55"},
]

const btnPizzas = document.getElementById("btnPizzas");
const btnAdicional = document.getElementById("btnAdicionales");
const btnBebidas = document.getElementById("btnBebidas");

function limpiarTablas() {
    document.getElementById("tablaTamaños").querySelector("tbody").innerHTML = "";
    document.getElementById("tablaCombinaciones").querySelector("tbody").innerHTML = "";
    document.getElementById("tablaAdicionales").querySelector("tbody").innerHTML = "";
    document.getElementById("tablaBebidas").querySelector("tbody").innerHTML = "";
}

function tablaTamaño(){
    limpiarTablas();
    let tabla = document.getElementById("tablaTamaños").querySelector("tbody");
    tabla.innerHTML = 
    `<tr>
      <th>Tamaño</th>
      <th>1 Ingrediente</th>
      <th>2-4 Ingredientes</th>
      <th>5-9 Ingredientes</th>
    </tr>`;
    for(let con = 0; con < menu.length; con++){
       tabla.innerHTML += "<td>" + menu[con].tamaños + "<td>" + menu[con].uningrediente + "<td>" + menu[con].dosingredientes + "<td>" + menu[con].cincoingredientes;
    }
}

function tablaCombinaciones(){
    limpiarTablas();
    tablaTamaño();
    let tablaco = document.getElementById("tablaCombinaciones").querySelector("tbody");
    tablaco.innerHTML = 
    `<tr>
      <th>Especialidades</th>
      <th>Ingredientes</th>
      <th></th>
    </tr>`;
    for(let con = 0; con < combinaciones.length; con++){
       tablaco.innerHTML += "<td>" + combinaciones[con].especialidades + "<td>" + combinaciones[con].Ingredientes + "<td>" + combinaciones[con].imagen;
    }
}

function tablaAdicional(){
    limpiarTablas();
    let tablaadi = document.getElementById("tablaAdicionales").querySelector("tbody");
    tablaadi.innerHTML = 
    `<tr>
      <th>Extras</th>
      <th>Precio</th>
    </tr>`;
    for(let con = 0; con < adicionales.length; con++){
       tablaadi.innerHTML += "<td>" + adicionales[con].adicional + "<td>" + adicionales[con].precio;
    }
}

function tablaBebidas(){
    limpiarTablas();
    let tablabebida = document.getElementById("tablaBebidas").querySelector("tbody");
    tablabebida.innerHTML = 
    `<tr>
      <th>Bebidas</th>
      <th>Precio</th>
    </tr>`;
    for(let con = 0; con < bebidas.length; con++){
       tablabebida.innerHTML += "<td>" + bebidas[con].bebida + "<td>" + bebidas[con].precio;
    }
}


btnPizzas.addEventListener("click", tablaTamaño);
btnPizzas.addEventListener("click", tablaCombinaciones);
btnAdicional.addEventListener("click", tablaAdicional);
btnBebidas.addEventListener("click", tablaBebidas);