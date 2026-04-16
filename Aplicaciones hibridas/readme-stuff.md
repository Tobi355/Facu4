# 1. La url no hace referencia a la accion sino que hace referencia al recurso

    /productos/nuevo        -> X        -> /productos -> POST
    /producto/editar        -> X        -> /productos -> PUT
    /producto/borrar        -> X        -> /productos -> DELETE

    URL -> URI    
    
    Uniform Resource Locator -> URL 
    Uniform Resource Identifier -> URI

# 2. Las acciones se definen con los verbos HTTP

    GET     -> Obtener
    POST    -> Crear
    PUT     -> Reemplazar  -> Actualiza o reemplaza
    PATCH   -> Actualizar  -> Actualiza parcial o totalmente 
    DELETE  -> Borrar

# 3. USAMOS JSON COMO FORMATO DE INTERCAMBIO DE DATOS

# 4. ESTADOS DE LAS RESPUESTAS

    1xx: Informativos
    2xx: OK         -> 200, 201, 202....
    3xx: Redireccion
    4xx: Errores del cliente
    5xx: Errores del servidor

https://aws.amazon.com/what-is/restful-api/