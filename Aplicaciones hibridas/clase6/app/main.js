import express from "express"
import { read } from "fs"
import {readFile} from "fs/promises"
const app = express()

app.use( "/", express.static("public") )
app.use(express.urlencoded({extended: true}))
app.use( express.json() )

app.get("/productos", async (req, res) => {
    try {
        const productos = await readFile("./data/productos.json", "utf-8");
        console.log(productos);
        res.json(JSON.parse(productos));
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "Error al leer el archivo de productos"});
    }
})



app.listen(2026, () => console.log("Funcionando en http://localhost:2026"))