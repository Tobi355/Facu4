import express from "express"
import {readFile} from "fs/promises"
import { createPage, createProductDetail, createProductList } from "../utils/utils.js"
import { log } from "console"

const app = express()

app.use( "/", express.static("public") )
app.use(express.urlencoded({extended: true}))
app.use( express.json() )

app.get("/productos", async (req, res) => {
    // readFile("./data/productos.json", "utf-8")
    //     .then( productos => console.log(productos))
    //     .catch(err => console.log(err))
    try {
        const productosString = await readFile("./data/productos.json", "utf-8")
        const productos = JSON.parse(productosString)
        res.send(createPage(createProductList(productos), "Listado de productos"))        
    } catch (error){
        console.log(error);    
        res.status(404).send(createPage("<h1>Ocurrió un error</h1>", "Error 404"))    
    }
})

app.get("/productos/:idproductos",async (req,res) => {
    const idproducto= req.params.idproductos
    try {
        const productosString = await readFile("./data/productos.json", "utf-8")
        const productos = JSON.parse(productosString)
        // manual:
        // for (let i = 0; i < productos.length; i++) {
        //     if (productos[i].id==idproducto) {
        //         console.log(productos[i]);
        //     }}
        // es igual a automatico:
        const producto= productos.find(producto => producto.id==idproducto)
        res.send(createProductDetail(producto));
        
    }catch (error){
        console.log(error);    
        res.status(404).send(createPage("<h1>Ocurrió un error</h1>", "Error 404"))    
    }
})

app.get("/personajes",async (req,res) => {
    try {
        const personajes= await fetch("https://hp-api.onrender.com/api/characters")
        const body=await personajes.json()
        res.send(body)
    } catch (error) {
        res.send("no se encontraron los personajes")
    }
})




app.listen(2026, () => console.log("Funcionando en http://localhost:2026"))