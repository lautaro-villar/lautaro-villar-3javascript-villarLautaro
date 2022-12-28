let variedadPerros = [
    { id: 1, raza: "golden", cantidad: 5, precio: 89900 },
    { id: 2, raza: "boxer", cantidad: 5, precio: 89900 },
    { id: 3, raza: "labrador", cantidad: 5, precio: 89900 },
    { id: 4, raza: "husky", cantidad: 5, precio: 89900 },
    { id: 5, raza: "pastor aleman", cantidad: 5, precio: 89900 },
    { id: 6, raza: "shiba inu", cantidad: 5, precio: 89900 }
]


let Perros = document.getElementById("ContenedorPerros")
Perros.className = "CajaPerros"
//console.log(Perros.innerHTML);

for (const variedadPerro of variedadPerros) {
    //Perros.innerHTML = Perros.innerHTML + `<div class=variedadPerro>${variedadPerro.raza}</div>`
    let ContenedorPerros = document.createElement("div")
    ContenedorPerros.innerHTML = `<h3> ID: ${variedadPerros.id}</h3>
                                  <p> raza: ${variedadPerros.raza}</p>
                                  <p> cantidad: ${variedadPerros.cantidad}</p> 
                                  <p> precio: $${variedadPerros.precio}</p>`
    document.body.appendChild(ContenedorPerros)
}