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
    {"especialidades": "Americana", "Ingredientes": "Pepperoni, Champiñones, Extra Queso", "imagen":"/img/cmp.png"},
    {"especialidades": "Carnes Frias", "Ingredientes": "Pepperoni, Jamon, Salami", "imagen":"/img/hpl.png"},
    {"especialidades": "Vegetariana", "Ingredientes": "Pimiento, Cebolla, Champiñones, Aceitunas negras", "imagen":"/img/bgp.png"},
    {"especialidades": "Mexicana", "Ingredientes": "Cebolla, Chorizo, Carne Molida, Jalapeño", "imagen":"/img/mex.jpg"},
    {"especialidades": "Hawaiiana", "Ingredientes": "Jamon, Piña, Extra Queso", "imagen":"/img/hnc.png"},
    {"especialidades": "Brother's burger", "Ingredientes": "Tocino, Carne Molida, Extra Queso", "imagen":"/img/cbt.jpg"},
    {"especialidades": "Maui", "Ingredientes": "Jamon, Piña, Jalapeño, Tocino", "imagen":"/img/honol.jpg"},
    {"especialidades": "4 Quesos", "Ingredientes": "Queso Mozarella, Queso Crema, Queso Parmesano, Queso Cheddar", "imagen":"/img/4Q.jpg"},
    {"especialidades": "Brother's Especial", "Ingredientes": "Pepperoni, Jamon, Pimiento, Cebolla, Champiñones, Aceitunas, Extra Queso, Aceitunas negras, Carne Molida", "imagen":"/img/exv.jpg"},
    {"especialidades": "Deluxe", "Ingredientes": "Pepperoni, Pimiento, Cebolla, Champiñones, Carne Molida", "imagen":"/img/dlx.png"},
]
  
var adicionales = [
    {"adicional": "Alitas BBQ", "precio": "$109", "imagen": "/img/alitasbbq.webp"},
    {"adicional": "Alitas Buffalo", "precio": "$109", "imagen": "/img/buffalo.jpg"},
    {"adicional": "Papotas", "precio": "$59", "imagen": "/img/papotas.png"},
    {"adicional": "Chessy Bread", "precio": "$79", "imagen": "/img/chessebread.png"},
    {"adicional": "Canelazos", "precio": "$59", "imagen": "/img/canela.png"},
    {"adicional": "Bread Sticks", "precio": "$59", "imagen": "/img/breadstick.png"},
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
       tablaco.innerHTML += "<td>" + combinaciones[con].especialidades + "<td>" + combinaciones[con].Ingredientes + `<td><img src="${combinaciones[con].imagen}" alt="${combinaciones[con].especialidades}"></td>`;
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
       tablaadi.innerHTML += "<td>" + adicionales[con].adicional + "<td>" + adicionales[con].precio + `<td><img src="${adicionales[con].imagen}"></td>`;
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