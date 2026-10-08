export class Producto {
    static items = []

    constructor(codigo,nombre,precio,imagen){
        this.codigo = codigo
        this.nombre = nombre
        this.precio = precio
        this.imagen = imagen

    }

    static agregar(producto) {
    const existe = Producto.items.some(function(item) {
        return item.codigo === producto.codigo
    })

    if (existe) {
        return false
    }

    Producto.items.push(producto)
    return true
}
    static eliminar (codigo){
        Producto.items = Producto.items.filter(producto => producto.codigo !== codigo)
    }

}