import { readFile } from "fs/promises";

export async function getProductos() {
    return readFile("./data/productos.json","utf-8")
        .then( productosString => JSON.parse(productosString) )
        .catch( err => console.log(err) )
}

export async function getProductosById(id) {
    return getProductos()
        .then( productos => productos.find( producto => producto.id == id ) )
        .catch( err => console.log(err) )
}