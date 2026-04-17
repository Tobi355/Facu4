import express from "express"
import * as productosController from "../controllers/productos.controllers.js"

const router = express.Router()

router.get("/productos", productosController.getProductos)
router.get("/productos/nuevo", productosController.productoForm)
router.post("/productos/nuevo", productosController.guardarProducto)

router.get("/productos/borrar/:idProducto", productosController.borrarProductoForm)
router.post("/productos/borrar/:idProducto", productosController.borrarProducto)

router.get("/productos/editar/:idProducto", productosController.editarProductoForm)
router.post("/productos/editar/:idProducto", productosController.editarProducto)

router.get("/productos/:idProductos", productosController.getProductosById)

export default router