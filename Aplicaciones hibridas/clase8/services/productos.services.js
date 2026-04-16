import { readFile, writeFile } from "fs/promises"

export function getProductos() {
    return readFile("./data/productos.json", "utf-8")
        .then((productoString) => JSON.parse(productoString))
        .catch((err) => err)
}

export function getProductosById(id) {
    return getProductos()
        .then((productos) => productos.find(producto => producto.id == id))
        .catch(err => err)
}

export async function guardarProducto(producto) {
    try {
        const productos = await getProductos()
        producto.id = productos.length + 1
        console.log(producto)
        productos.push(producto)

        await writeFile("./data/productos.json", JSON.stringify(productos))
        return producto
    } catch (error) {
        throw new Error("Error")
    }
}

export async function borrarProducto(id) {
    try {
        const total = await getProductos()
        let productoBorrado = {}
        const productos = total.filter(producto => {
            if(producto.id != id) return true
            else productoBorrado = producto
        })
        await writeFile("./data/productos.json", JSON.stringify(productos))
        return productoBorrado
    } catch (error) {
        throw new Error("Error")
    }
}

export async function editarProducto(producto) {
    try {
        const total = await getProductos()
        let productoEditado = {}
        const productos = total.map( item => {
            if( item.id == producto.id ){
                productoEditado = producto
                return producto
            }
            return item
        } )
        await writeFile("./data/productos.json", JSON.stringify(productos))
        return productoEditado
    } catch (error) {
        throw new Error("Error")
    }
}