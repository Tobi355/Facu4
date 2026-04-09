import express from "express"


const app = express()

app.use( "/", express.static("public") )
app.use(express.urlencoded({extended: true}))
app.use( express.json() )



app.listen(2026, () => console.log("Funcionando en http://localhost:2026"))