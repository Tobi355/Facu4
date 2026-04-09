import express from "express"
import { getProductos, getProductosById } from "../controllers/productos.controllers.js"

const app = express()

app.use( "/", express.static("public") )
app.use(express.urlencoded({extended: true}))
app.use( express.json() )

app.get("/productos",getProductos)

app.get("/productos/:idproductos",getProductosById)

app.listen(2026, () => console.log("Funcionando en http://localhost:2026"))