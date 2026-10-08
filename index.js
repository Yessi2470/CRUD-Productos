import { Producto } from "./classes/Producto.js";

const formulario = document.querySelector("#formProducto")
const tablaProductos = document.querySelector("#tablaProductos")

const productosGuardados = JSON.parse(localStorage.getItem("productos")) || []

Producto.items = productosGuardados.map(function (producto) {
    return new Producto(
        producto.codigo,
        producto.nombre,
        producto.precio,
        producto.imagen
    )
})

mostrarProductos()

formulario.addEventListener("submit", function (event) {

    event.preventDefault()

    const codigo = document.querySelector("#codigo").value
    const nombre = document.querySelector("#nombre").value
    const precio = document.querySelector("#precio").value
    const imagen = document.querySelector("#imagen").value

    if (!codigo || !nombre || !precio || !imagen) {
        alert("Completá todos los campos")
        return
    }

    if (Number(precio) <= 0) {
        alert("El precio debe ser mayor a cero")
        return
    }

    const producto = new Producto(codigo, nombre, precio, imagen)

    const agregado = Producto.agregar(producto)

    if (!agregado) {
        alert("Ya existe un producto con ese código")
        return
    }

    mostrarProductos()

    localStorage.setItem("productos", JSON.stringify(Producto.items))

    formulario.reset()

})

function mostrarProductos() {

    tablaProductos.innerHTML = ""

    Producto.items.forEach(function (producto) {

        const fila = document.createElement("tr")

        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>
        <img src="${producto.imagen}" width="100">
    </td>
            <td>
                <button>Eliminar</button>
            </td>
        `
        const botonEliminar = fila.querySelector("button")

        botonEliminar.addEventListener("click", function () {

            const confirmar = confirm("¿Estás seguro de eliminar este producto?")

            if (confirmar) {

                Producto.eliminar(producto.codigo)
                mostrarProductos()

                localStorage.setItem("productos", JSON.stringify(Producto.items))

            }



        })

        tablaProductos.appendChild(fila)
    })
}