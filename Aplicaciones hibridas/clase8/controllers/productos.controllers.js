import * as productosService from "../services/productos.services.js"
import * as prouctosView from "../views/productos.views.js"

export async function getProductos(req, res) {
    try {
        const productos = await productosService.getProductos()
        res.send(prouctosView.createProductList(productos), "Listado de productos")
    } catch (error) {
        res.send("404")
    }
}

export async function getProductosById(req, res) {
    const idProducto = req.params.idProductos
    try {
        const producto = await productosService.getProductosById(idProducto)
        res.send(prouctosView.createProductDetail(producto))
    } catch (error) {
        console.log(error)
        res.send("404")
    }
}

export function productoForm(req, res) {
    res.send(prouctosView.productoForm())
}

export async function guardarProducto(req, res) {
    try {
        const producto = await productosService.guardarProducto(req.body)
        res.send(prouctosView.createProductDetail(producto))
    } catch (error) {
        console.log(error)
        res.send("404")
    }
}

export async function borrarProductoForm(req, res) {
    const id = req.params.idProducto
    try {
        const producto = await productosService.getProductosById(id)
        res.send(prouctosView.borrarProductoForm(producto))
    } catch (error) {

    }
}

export async function borrarProducto(req, res) {
    const id = req.params.idProducto
    try {
        const producto = await productosService.borrarProducto(id)
        res.send(prouctosView.createProductDetail(producto))
    } catch (error) {
        console.log(error)
        res.send("404")
    }
}

export async function editarProductoForm(req, res) {
    const id = req.params.idProducto
    try {
        const producto = await productosService.getProductosById(id)
        res.send(prouctosView.editarProductoForm(producto))
    } catch (error) {

    }
}

export async function editarProducto(req, res) {
    const id = req.params.idProducto
    const producto = {
        id: id,
        nombre: req.body.nombre,
        precio: req.body.precio
    }
    try {
        const productoEditado = await productosService.editarProducto(producto)
        res.send(prouctosView.createProductDetail(productoEditado))
    } catch (error) {
        console.log(error)
        res.send("404")
    }
}