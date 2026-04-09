import * as productosServices from "../services/productos.services.js"
import * as productosView from "../views/productos.views.js";


export async function getProductos(req,res) {
    try {
        const productos = await productosServices.getProductos()
        res.send(productosView.createPage(productosView.createProductList(productos), "Listado de productos"))        
    } catch (error){
        console.log(error);    
        res.status(404).send(productosView.createPage("<h1>Ocurrió un error</h1>", "Error 404"))    
    }
}
export async function getProductosById(req,res) {
    const idproducto= req.params.idproductos
    try {
        const producto= await productosServices.getProductosById(idproducto)
        res.send(productosView.createProductDetail(producto));
        
    }catch (error){
        console.log(error);    
        res.status(404).send(productosView.createPage("<h1>Ocurrió un error</h1>", "Error 404"))    
    }
}