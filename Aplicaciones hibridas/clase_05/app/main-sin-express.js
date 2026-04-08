
import http from "http"
import cafes from "../data/productos.js"
import { createPage, createProductList } from "../pages/utils.js"
import { readFile } from "fs"

const server = http.createServer((request, response) => {
    console.log(request.url)
    switch (request.url) {
        case "/":
            response.write(createPage("Victor villafane", "Mi nombre"))
            break
        case "/materia":
            response.write(createPage("aplicaciones hibridas", "Materia"))
            break
        case "/profesor":
            response.write(createPage("Victor", "Profesor"))
            break
        case "/productos":
            response.write(createPage(createProductList(cafes), "Listado de productos"))
            break
        case "/archivo":
            readFile("./public/productos.json", "utf-8", (err, data) => {
                if (err) throw err;
                // response.write(data)
                const productos = JSON.parse(data)
                response.write(createPage(createProductList(productos), "Listado de productos"))
                response.end()
            })
            break
        case "/index.html":
            readFile("./public/index.html", "utf-8", (err, data) => {
                if (err) throw err;
                response.write(data)
                response.end()
            })
            break
        case "/productos.html":
            readFile("./public/productos.html", "utf-8", (err, data) => {
                if (err) throw err;
                response.write(data)
                response.end()
            })
            break
        case "/contacto.html":
            readFile("./public/contacto.html", "utf-8", (err, data) => {
                if (err) throw err;
                response.write(data)
                response.end()
            })
            break                        
        case "/1775054652b91d.png":
            readFile("./public/1775054652b91d.png", (err, data) => {
                if (err) throw err;
                response.write(data)
                response.end()
            })
            break
        case "/favicon.ico":
            readFile("./public/1775054652b91d.png", (err, data) => {
                if (err) throw err;
                response.write(data)
                response.end()
            })
            break
        case "/style.css":
            readFile("./public/style.css", (err, data) => {
                if (err) throw err;
                response.write(data)
                response.end()
            })
            break
        default:
            response.write(createPage("404", "Pagina no encontrada"))
            break
    }
    // response.end()
})
server.listen(2026, () => console.log("Funcionando..."))