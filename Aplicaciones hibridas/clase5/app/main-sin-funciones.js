const http = require("http")

const cafes = [
    {
        id: 1,
        nombre: "Cafe 1",
        precio: 1234
    },
    {
        id: 2,
        nombre: "Cafe 2",
        precio: 1234
    },
    {
        id: 3,
        nombre: "Cafe 3",
        precio: 1234
    }
]

function createPage(){
    
}

const server = http.createServer((request, response) => {
    console.log(request.url)
    response.write('<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>')
    response.write('<header>Mi espectacular pagina web</header>')
    switch (request.url) {
        case "/":
            response.write("Victor villafane")
            break
        case "/materia":
            response.write("aplicaciones hibridas")
            break
        case "/profesor":
            response.write("Victor")
            break
        case "/productos":
            response.write("<ul>")
            cafes.forEach( cafe => response.write("<li>"+ cafe.nombre +"</li>") )
            response.write("</ul>")
            break
        default:
            response.write("404")
            break
    }
    response.end("</body></html>")
})

server.listen(2026, () => console.log("Funcionando..."))