import express from "express"
import productosRoutes from "../routes/productos.routes.js"
import productosApiRoutes from "../api/routes/productos.api.routes.js"
const app = express()

app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(productosRoutes)
app.use("/api", productosApiRoutes)

app.listen(2026, () => console.log("Funcionando en http://localhost:2026"))