fetch("./Perros.json")
   .then(Response => Response.json())
   .then(variedadPerros => miCodigo(variedadPerros))

function miCodigo(variedadPerros) {
   let ContenedorCarrito = document.getElementById("ContenedorCarrito")

   let Perros = document.getElementById("ContenedorPerros")
   renderizarPerros(variedadPerros)

   let carrito = []
   if (localStorage.getItem("carrito")) {
      carrito = JSON.parse(localStorage.getItem("carrito"))
   }
   renderizar(carrito)

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
         seccionPerros.className = "perro" + variedadPerro.categoria
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
      localStorage.setItem("carrito", JSON.stringify(carrito))
      renderizar(carrito)
      alertPersonalizado("perrito añadido al carrito", "success", 1000)
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

   let botonCompra = document.getElementById("comprar")
   botonCompra.addEventListener("click", () => {
      if (carrito.length === 0) {
         alertPersonalizado("el carrito esta vacio, porfavor elija un perrito", "error", 1500)
      } else {
         alertPersonalizado("perrito comprado, gracias por su compra!", "success", 1000)
      }

      localStorage.removeItem("carrito")
      carrito = []
      renderizar(carrito)

   })
   function alertPersonalizado(texto, icono, tiempo) {
      Swal.fire({
         text: texto,
         icon: icono,
         showConfirmButton: false,
         timer: tiempo
      }
      )
   }
}




