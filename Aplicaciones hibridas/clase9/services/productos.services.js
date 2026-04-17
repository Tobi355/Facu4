import { readFile, writeFile } from "fs/promises"
import { MongoClient, ObjectId } from "mongodb"

const client = new MongoClient("mongodb+srv://admin:admin@dwm4av.3ndyw29.mongodb.net/")
const db = client.db("dwm4av")

export async function getProductos(filter = {}) {
    console.log(filter)
    const filterMongo = {}
    if (filter?.precio_max) filterMongo.precio = { $lte: parseInt(filter?.precio_max) }  //https://www.mongodb.com/es/docs/manual/reference/operator/query/lte/
    if (filter?.precio_min) filterMongo.precio = { $gte: parseInt(filter?.precio_min) }  //https://www.mongodb.com/es/docs/manual/reference/operator/query/gte/

    if (filter?.precio_max && filter?.precio_min) filterMongo.$and = [
        { precio: { $lte: parseInt(filter?.precio_max) } }, 
        { precio: { $gte: parseInt(filter?.precio_min) } }
    ]

    try {
        await client.connect()
        return db.collection("cafes").find(filterMongo).toArray()
    } catch (error) {

    }
}

export async function getProductosById(id) {
    try {
        await client.connect()
        return db.collection("cafes").findOne({ _id: new ObjectId(id) })
    } catch (error) {

    }
}

export async function guardarProducto(producto) {
    try {
        await client.connect()
        await db.collection("cafes").insertOne(producto)
        return producto
    } catch (error) {
        throw new Error(error)
    }
}

export async function borrarProducto(id) {
    try {
        await client.connect()
        return db.collection("cafes").deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error("Error")
    }
}

export async function editarProducto(producto) {
    try {
        await client.connect()
        console.log(producto)
        // return db.collection("cafes").replaceOne({ _id: new ObjectId(producto.id) }, producto) // Reemplaza el objeto que le pasamos por el que encontro con nuestra condicion
        return db.collection("cafes").updateOne({ _id: new ObjectId(producto.id) }, {
            $set: producto //https://www.mongodb.com/es/docs/manual/reference/operator/update/set/
        })
    } catch (error) {
        throw new Error("Error")
    }
}