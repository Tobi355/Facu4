import * as service from "../../services/productos.services.js"

export async function getProductos(req, res) {
    try {
        const productos = await service.getProductos()
        res.status(500).json(productos)
    } catch (error) {
        res.status(500).json({ message: "Error al traer los productos" })
    }
}

export async function getProductosById(req, res) {
    const id = req.params.id
    try {
        const producto = await service.getProductosById(id)
        res.status(200).json(producto)
    } catch (error) {
        res.status(500).json({ message: "Error al traer los productos" })
    }
}

export async function saveProducto(req, res) {
    try {
        const producto = {
            nombre: req.body.nombre,
            precio: req.body.precio
        }
        const respuesta = service.guardarProducto(producto)
        res.status(201), json(respuesta)
    } catch (error) {
        res.status(500).json({ message: "Error guardar el producto" })
    }
}

export async function reemplazarProducto(req, res) {
    const id = req.params.id
    try {
        const producto = {
            id: id,
            nombre: req.body.nombre,
            precio: req.body.precio
        }
        const respuesta = await service.editarProducto(producto)
        res.status(202).json(respuesta)
    } catch (error) {
        res.status(500).json({ message: "Error guardar el producto" })
    }
}

export async function actualizarProducto(req, res){
    const id = req.params.id
    try {
        const productoAntiguo = await service.getProductosById(id)
        const producto = {}
        producto.nombre = req.body?.nombre ? req.body.nombre : productoAntiguo?.nombre
        producto.precio = req.body?.precio ? req.body.precio : productoAntiguo?.precio
        producto.id = id
        const respuesta = await service.editarProducto(producto)
        res.status(202).json(respuesta)
    } catch (error) {
        res.status(500).json({ message: "Error guardar el producto" })
    }    
}

export async function borrarProducto(req, res){
    const id = req.params.id
    try {
        const respuesta = await service.borrarProducto(id)
        res.status(202).json(respuesta)
    } catch (error) {
        res.status(500).json({ message: "Error guardar el producto" })
    }
}