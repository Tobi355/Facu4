const http=require('http');
const server = http.createServer( (req, res) => {
    console.log(req.url)
    res.write('<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>')
    res.write('<header><h1>Mi espectacular página web!</h1></header>')
        switch (req.url) {
            case '/':
                res.write('Alumno: Tobias Blanco');
                break;
            case '/materia':
                res.write('Materia: Aplicaciones Hibridas');
                break;
            case '/profesor':
                res.write('profesor: Victor Villafañe');
                break;
            case '/productos':
                res.write('<table border="1"><tr><th>ID</th><th>Nombre</th><th>Precio</th></tr><tr><td>1</td><td>Café Expreso</td><td>200</td></tr><tr><td>2</td><td>Café Americano</td><td>250</td></tr><tr><td>3</td><td>Café Cortado</td><td>200</td></tr><tr><td>4</td><td>Café Doble</td><td>250</td></tr><tr><td>5</td><td>Café Lagrima</td><td>200</td></tr></table>');
                break;
            default:
                res.write('Pagina no encontrada');
                break;
    }
    res.end('</body></html>')
})
server.listen(2023 , () => {
    console.log('Servidor escuchando en el puerto 2023');
})