const productos = [
  { id: "escritorio 1", nombre: "Escritorio01", precio: 2000.99, categoria:{nombre:"escritorio",id:"escritorios"} ,imagen: "./img/escritorio1.jpg" },
  { id: "escritorio 2", nombre: "Escritorio02", precio: 25000.99,categoria:{nombre:"escritorio",id:"escritorios" } , imagen: "./img/escritorio2.png" },
  { id: "accesorio 3", nombre: "Soporte Notebook", precio: 10000.99,categoria:{nombre:"accesorio", id:"accesorios" }  ,imagen: "./img/imagen3.jpg" },
  { id:"accesorio 4" , nombre: "Soporte Monitor", precio: 9000.99,categoria:{nombre:"accesorio", id:"accesorios" } , imagen: "./img/imagen4.jpg" },
  { id: "accesorio 5", nombre: "Rack Bike", precio: 7000.99, categoria:{nombre:"accesorio", id:"accesorios" } ,imagen: "./img/imagen5.jpg" },
  { id:"accesorio 6" , nombre: "Mesita de apoyo", precio: 15000.99,categoria:{nombre:"accesorio", id:"accesorios" } , imagen: "./img/mesaluz.jpg" },
  { id:"accesorio 7" , nombre: "Mochila", precio: 11000.99,categoria:{nombre:"accesorio", id:"accesorios" } , imagen: "./img/mochila2.jpg" },


];
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelectorAll("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".comprar-btn");
const numerito = document.querySelector(".numerito");


function cargarProductos(productosElegidos) {
    
  contenedorProductos.innerHTML = "";

  productosElegidos.forEach(producto =>{
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
    <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
    <div class="informacion">
      <p>   ${producto.nombre}</p>
      <p class="precio">${producto.precio}</p>
      <button class="comprar-btn" id="${producto.id}">Comprar</button>
    </div>
    `;
    contenedorProductos.append(div);
  })
  actualizarBotonesAgregar ()

}


cargarProductos(productos);

botonesCategorias.forEach(boton => {
  boton.addEventListener ("click",(e) => {
    
    botonesCategorias.forEach(boton => boton.classList.remove("active"));

    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos"){
      const productoCategoria = productos.find( producto => producto.categoria.id  === e.currentTarget.id);
      tituloPrincipal.innertext = productoCategoria.categoria.nombre;
     
      const productosBoton = productos.filter (producto => producto.categoria.id === e.currentTarget.id);

    cargarProductos(productosBoton);
    } else{
      tituloPrincipal.innertext = "Todos los productos";
      cargarProductos(productos);
    }
  }
  )
})

function actualizarBotonesAgregar(){
  botonesAgregar = document.querySelectorAll(".comprar-btn");

  botonesAgregar.forEach(boton =>{
    boton.addEventListener("click", agregarAlCarrito );
  });
  
}
let productosEnCarrito;


let productosEnCarritoLS =localStorage.getItem("productos-en-carrito");


if(productosEnCarritoLS) {
   productosEnCarrito = JSON.parse(productosEnCarritoLS);
   actualizarNumerito();
}else{
 productosEnCarrito = [];
}



function agregarAlCarrito(e){
 const idBoton = e.currentTarget.id;
 const productoAgregado = productos.find ( producto => producto.id === idBoton);
 
 if (productosEnCarrito.some(producto => producto.id === idBoton)) {
     const index = productosEnCarrito.findIndex (producto => producto.id === idBoton);
       productosEnCarrito[index].cantidad++;
    } else {
  productoAgregado.cantidad = 1;
  productosEnCarrito.push(productoAgregado);
 }

 actualizarNumerito();

 localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

}
 
function actualizarNumerito() {
 let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0 );
numerito.innerText = nuevoNumerito;
}


 
