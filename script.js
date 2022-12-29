let variedadPerros = [
   { id: 1, categoria: "familiar", raza: "Boxer", cantidad: 1, precio: 25500, imagen: "./imagenes-perros/Boxer.jpg" },
   { id: 2, categoria: "familiar", raza: "Golden", cantidad: 2, precio: 89900, imagen: "./imagenes-perros/Golden.jpg" },
   { id: 3, categoria: "familiar", raza: "Labrador", cantidad: 3, precio: 65000, imagen: "./imagenes-perros/Labrador.jpg" },
   { id: 4, categoria: "familiar", raza: "Shiba inu", cantidad: 1, precio: 380000, imagen: "./imagenes-perros/ShibaInu.jpg" },
   { id: 5, categoria: "familiar", raza: "Husky", cantidad: 1, precio: 70000, imagen: "./imagenes-perros/Husky.jpg" },
   { id: 6, categoria: "guardian", raza: "Pastor aleman", cantidad: 6, precio: 60000, imagen: "./imagenes-perros/PastorAleman.jpg" },
   { id: 7, categoria: "guardian", raza: "DogoArgentino", cantidad: 5, precio: 110000, imagen: "./imagenes-perros/DogoArgentino.jpg" },
   { id: 8, categoria: "guardian", raza: "Rottweiler", cantidad: 5, precio: 20000, imagen: "./imagenes-perros/Rottweiler.jpg" },
   { id: 9, categoria: "guardian", raza: "Doberman", cantidad: 4, precio: 55000, imagen: "./imagenes-perros/Doberman.jpg" },
   { id: 10, categoria: "guardian", raza: "PitBull", cantidad: 3, precio: 35500, imagen: "./imagenes-perros/PitBull.jpg" },
   { id: 11, categoria: "para dueños deportistas", raza: "Weimaraner", cantidad: 7, precio: 144500, imagen: "./imagenes-perros/Weimaraner.jpg" },
   { id: 12, categoria: "para dueños deportistas", raza: "BracoAleman", cantidad: 4, precio: 50000, imagen: "./imagenes-perros/BracoAleman.jpg" },
   { id: 13, categoria: "para dueños deportistas", raza: "BorderCollie", cantidad: 4, precio: 89000, imagen: "./imagenes-perros/BorderCollie.jpg" },
   { id: 14, categoria: "para dueños deportistas", raza: "Dalmata", cantidad: 6, precio: 29000, imagen: "./imagenes-perros/Dalmata.jpg" },
   { id: 15, categoria: "para dueños deportistas", raza: "JackRussell", cantidad: 2, precio: 60000, imagen: "./imagenes-perros/JackRussell.jpg" }
]

let carrito = []
let ContenedorCarrito = document.getElementById("ContenedorCarrito")

let Perros = document.getElementById("ContenedorPerros")
renderizarPerros(variedadPerros)

let navegador = document.getElementById("navegador")
navegador.addEventListener("input", renderizarPerrosFiltrados)

function renderizarPerrosFiltrados() {
   let PerrosFiltrados = variedadPerros.filter(variedadPerro => variedadPerro.raza.toLowerCase().includes(navegador.value.toLowerCase()) || variedadPerro.categoria.toLowerCase().includes(navegador.value.toLowerCase()))

   renderizarPerros(PerrosFiltrados)
}

function renderizarPerros(variedadPerros) {
   Perros.innerHTML = ""
   for (const variedadPerro of variedadPerros) {
      let seccionPerros = document.createElement("div")
      seccionPerros.className = "perro"
      seccionPerros.id = variedadPerro.id

      seccionPerros.innerHTML = `<h3> ${variedadPerro.raza} </h1>
                           <p> categoria:  ${variedadPerro.categoria} </p>
                           <p> quedan  ${variedadPerro.cantidad} cachorros</p>
                           <img src= ${variedadPerro.imagen}>
                           <p> $${variedadPerro.precio} </p>
                           <button class="boton" id=${variedadPerro.id}>añadir al carrito</button>
                           `
      Perros.appendChild(seccionPerros)
   }

   let botones = document.getElementsByClassName("boton")
   for (const boton of botones) {
      boton.addEventListener("click", AgregarAlCarro)
   }
}

function AgregarAlCarro(e) {
   let PerritoBuscado = variedadPerros.find(variedadPerro => variedadPerro.id == e.target.id)
   let posicionMascotas = carrito.findIndex(variedadPerro => variedadPerro.id == PerritoBuscado.id)
   if (posicionMascotas != -1) {
      carrito[posicionMascotas].cantidad++
      carrito[posicionMascotas].subtotal = carrito[posicionMascotas].cantidad * carrito
      [posicionMascotas].precioUnitario
   } else {
      carrito.push({ id: PerritoBuscado.id, raza: PerritoBuscado.raza, precioUnitario: PerritoBuscado.precio, cantidad: 1, subtotal: PerritoBuscado.precio })
   }

   renderizar(carrito)
}

function renderizar(mascotas) {
   ContenedorCarrito.innerHTML = ''
   for (const variedadPerro of mascotas) {
      ContenedorCarrito.innerHTML += ` <div class="flex">
                                     <p>raza:${variedadPerro.raza}</p> 
                                     <br>
                                     <p>-$${variedadPerro.precioUnitario}</p>
                                     <br>
                                     <p>-cantidad:${variedadPerro.cantidad}</p>
                                     <br>
                                     <p>-subtotal:$${variedadPerro.subtotal}</p>
                                     <br>
                                       </div>
                                         `
   }
   let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
   ContenedorCarrito.innerHTML += `<h3>TOTAL$${total}</h3> `
 }
