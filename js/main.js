


//----------------------------------------------- Botones ------------------------------------------//



document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    
    if (!clickedElement.matches('.myBtn')) {
        return;
    }
    Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Se ha agregado el producto",
        showConfirmButton: false,
        timer: 1000
    });
  });


  
document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    
    if (!clickedElement.matches('.borrar-producto')) {
        return;
    }
    Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Producto eliminado con exito",
        showConfirmButton: false,
        timer: 1000
    });
  });


  document.addEventListener("click", (event) => {
    const clickedElement = event.target;
    
    if (!clickedElement.matches('.vaciar-carrito')) {
        return;
    }
    Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Se ha vaciado el carrito",
        showConfirmButton: false,
        timer: 1000
    });
  });



//--------------------------------------------- Fin Botones ----------------------------------------//

//------------------------------------------------- BD ---------------------------------------------//



const frutas = [
    {id: "6", categoria: "fruta", nombre:"Frutilla", img: "Frutilla.webp", precio: 239},
    {id: "7", categoria: "fruta", nombre:"Naranja", img: "Naranja.webp", precio: 69},
    {id: "8", categoria: "fruta", nombre:"Melon", img: "Melon.webp", precio: 179},
    {id: "9", categoria: "fruta", nombre:"Manzana", img: "Manzana.webp", precio: 144},
]
const verduras = [
    {id:"0", categoria: "verdura", nombre:"Lechuga", img: "Lechuga.webp", precio: 54},
    {id: "1", categoria: "verdura", nombre:"Tomate", img: "Tomate.webp", precio: 249},
    {id: "2", categoria: "verdura", nombre:"Zanahoria", img: "Zanahoria.webp", precio: 99},
    {id: "3", categoria: "verdura", nombre:"Acelga", img: "Acelga.webp", precio: 69},
    {id: "4", categoria: "verdura", nombre:"Calabacin", img: "Calabacin.webp", precio: 89},
    {id: "5", categoria: "verdura", nombre:"Papa", img: "Papa.webp", precio: 94},
]

const productos = verduras.concat(frutas);



//----------------------------------------------- Fin BD -------------------------------------------//

//---------------------------------------- Productos de la pagina ----------------------------------//



const contenedor = document.querySelector("#contenedor")

function desgloseProductos(arr){
    contenedor.innerHTML = "";
    let html;
    for (const el of arr){
        const {id, img, categoria, nombre, precio} = el

        html = `<div class="col mb-5">
                    <div id="producto" class="card shadow-lg p-3 mb-5 bg-body-tertiary rounded">

                        <!-- Imagen producto-->
                    
                        <img class="card-img-top" src="./assets/IMG/${img}" alt="..." />
                    
                        <!-- Detalles producto-->
                    
                        <div class="card-body p-4">
                            <div class="text-center">
                                <!-- Product name-->
                                <h5 class="fw-bolder">${nombre}</h5>
                                <!-- Product price-->
                                <p data-precio="${precio}" >$${precio} /KG</p>
                            </div>
                        </div>
                    
                        <!-- Acciones producto-->
                    
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent ">
                            <div class="d-grid">
                                <button data-id="${id}" class="btn btn-outline-dark mt-auto agregarCarrito myBtn">Agregar al carrito</button>
                            </div>
                        </div>

                    </div>
                </div>`;

    contenedor.innerHTML += html;

    }
}



//--------------------------------------- Fin roductos de la pagina --------------------------------//

//------------------------------------------ Logica de categorias ----------------------------------//



const inicio = document.getElementById("inicio")

inicio.onclick = () => desgloseProductos()

const todo = document.getElementById("todo")

todo.onclick = () => desgloseProductos(productos)

const fruta = document.getElementById("fruta")

fruta.onclick = () => desgloseProductos(frutas)
  
const verdura = document.getElementById("verdura")

verdura.onclick = () => desgloseProductos(verduras)



//---------------------------------------- Fin logica de categorias --------------------------------//

//------------------------------------------- Logica del buscador ----------------------------------//



const ingreso = document.getElementById("ingreso")

  ingreso.addEventListener("input", () => {
    const filtrado = buscarProducto(productos, ingreso.value);
    desgloseProductos(filtrado);
  })


  function buscarProducto(arr, filtro) {
    const filtrado = arr.filter((el) => {
      return el.nombre.toLowerCase().includes(filtro.toLowerCase());
    });
    return filtrado;
  }



//----------------------------------------- Fin logica del buscador --------------------------------//

//------------------------------------------- logica del carrito -----------------------------------//



let cantidadProducto = document.getElementById('conteo-producto');
let precioTotal = document.getElementById('precioTotal')
let contenedorCarrito = document.getElementById('contenedorCarrito');
let vaciarCarrito = document.getElementById('vaciarCarrito')
let todosProductos = document.querySelector(".productos")




let carrito = JSON.parse(localStorage.getItem("carrito"));
let conteoProducto = JSON.parse(localStorage.getItem("conteo"));
let total = JSON.parse(localStorage.getItem("total"));


todosProductos.addEventListener("click", agregarProducto)
contenedorCarrito.addEventListener('click', borrarProducto)
vaciarCarrito.addEventListener('click', limpiarCarrito)


function limpiarCarrito(){
    carrito = [];
    conteoProducto = 0;
    total = 0;

    if (carrito.length === 0) {
        precioTotal.innerHTML = 0 + "$";
        cantidadProducto.innerHTML = 0;
    }
    cargarHtml();
    localStorage.clear()
    localStorage.setItem("carrito",JSON.stringify(carrito));
    localStorage.setItem("conteo",JSON.stringify(conteoProducto));
    localStorage.setItem("total",JSON.stringify(total));
}

function borrarProducto(producto) {
    if (producto.target.classList.contains('borrar-producto')) {
        const borrarId = producto.target.getAttribute('data-id');

        carrito.forEach(value => {
            if (value.id == borrarId) {
                let precioReduce = parseFloat(value.precio) * parseFloat(value.cantidad);
                total =  total - precioReduce;
            }
        });
        carrito = carrito.filter(producto => producto.id !== borrarId);
        
        conteoProducto--;
    }
    if (carrito.length === 0) {
        precioTotal.innerHTML = 0 + "$";
        cantidadProducto.innerHTML = 0;
        
    }
    localStorage.setItem("carrito",JSON.stringify(carrito));
    localStorage.setItem("conteo",JSON.stringify(conteoProducto));
    localStorage.setItem("total",JSON.stringify(total));
    cargarHtml();
 
    
}

function agregarProducto(producto){
    
    producto.preventDefault(); 


    if (producto.target.classList.contains('agregarCarrito')) {
        const seleccionProducto = producto.target.parentElement.parentElement.parentElement; 
        detalleProducto(seleccionProducto);
    }

}




function detalleProducto(producto){
    
    const detalles = {
        img: producto.querySelector('img').src,
        nombre: producto.querySelector('div div h5').textContent,
        precio: producto.querySelector('div div p').getAttribute("data-precio"),
        id: producto.querySelector("div div button").getAttribute("data-id"),
        boton: producto.querySelector("div div button"),
        cantidad: 1
    }


    total = parseFloat(total) + parseFloat(detalles.precio);

    const existe = carrito.some(producto => producto.id === detalles.id);
    if (existe) {
        const pro = carrito.map(producto => {
            if (producto.id === detalles.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto
            }
        });
        carrito = [...pro];
    } else {
        carrito = [...carrito, detalles]
        conteoProducto++;
    }
    cargarHtml()
    localStorage.setItem("carrito", JSON.stringify(carrito))
    localStorage.setItem("conteo", JSON.stringify(conteoProducto))
    localStorage.setItem("total", JSON.stringify(total))



}



//----- Inicializacion del carrito en LS -------//



if (localStorage) {
    if (localStorage.getItem('carrito') == undefined) {
        carrito = [];
        conteoProducto = 0;
        total = 0;
        localStorage.setItem("carrito",JSON.stringify(carrito));
        localStorage.setItem("conteo",JSON.stringify(conteoProducto));
        localStorage.setItem("total",JSON.stringify(total));  
    }
} 
  


//----- Fin inicializacion del carrito en LS -----//



function cargarHtml(){
    contenedorCarrito.innerHTML = '';
    carrito.forEach(producto => {
        const {img, nombre, precio, cantidad, id} = producto;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `

<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${img}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h6 class="card-title">${nombre}</h5>
        <h10 class="card-text">${precio}$ /KG</h10>
        <h10 class="card-text">Cantidad: ${cantidad}</h10>
      </div>
    </div>
    <button type="button" class="borrar-producto btn btn-outline-danger" data-id="${id}">X</button>
  </div>
</div>`;



        contenedorCarrito.appendChild(row);

        precioTotal.innerHTML = total + "$";

        cantidadProducto.innerHTML = conteoProducto;
    });
}

cargarHtml()



//-------------------------------------------- Fin logica carrito -----------------------------------//


