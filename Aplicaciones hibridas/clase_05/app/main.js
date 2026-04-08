import express from "express"

const app = express()

const usuarios = []

app.use( "/", express.static("public") )
app.use(express.urlencoded({extended: true}))
app.use( express.json() )

// app.get( "/", (req, res) => {
//     res.send("OK")
// } )
app.get( "/formulario", (req, res) => {
    console.log(req.query.nombre)
    console.log(req.query.apellido)
    usuarios.push({nombre: req.query.nombre, apellido: req.query.apellido})
    res.send("Datos recibidos!")
    console.log(usuarios)
} )

app.post( "/formulario", (req, res) => {
    console.log(req.body)
    res.send("Datos recibidos!")
} )

app.listen(2026, () => console.log("Funcionando en http://localhost:2026"))