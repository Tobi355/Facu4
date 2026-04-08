import http from 'http';
import productos from "./data/productos.js";
import {createPages, createProductList} from "./pages/utils.js";
const server = http.createServer( (req, res) => {
    console.log(req.url)
    res.write('<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>')
    res.write('<header><h1>Mi espectacular página web!</h1></header>')
        switch (req.url) {
            case '/':
                res.write(createPages('Alumno: Tobias Blanco'));
                break;
            case '/materia':
                res.write(createPages('Materia: Aplicaciones Hibridas'));
                break;
            case '/profesor':
                res.write(createPages('Profesor: Victor Villafañe'));
                break;
            case '/productos':
                res.write(createPages(createProductList(productos), "Listado de productos"));
                break;
            default:
                res.write(createPages('Error 404, Página no encontrada'));
                break;
    }
    res.end('</body></html>')
})
server.listen(2026 , () => {
    console.log('Servidor escuchando en el puerto 2026');
})