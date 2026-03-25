const http= require('http');

const server = http.createServer( (req, res) => {
    console.log(req.url)
    res.write('<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>')
    if (req.url == '/hola') {
        res.write('Hola mundo ñ');
    }else{
        res.write('Fin');
    }
    res.end('</body></html>')
})

server.listen(2026 , () => {
    console.log('Servidor escuchando en el puerto 2026');
})
