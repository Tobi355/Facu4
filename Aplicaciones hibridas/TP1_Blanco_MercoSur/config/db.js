import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let db;
let client;

export const connectDB = async () => {
    try {
        client = new MongoClient(process.env.MONGODB_URI);
        await client.connect();
        db = client.db(process.env.DB_NAME);
        console.log(`✅ MongoDB conectado — Base de datos: ${process.env.DB_NAME}`);
    } catch (error) {
        console.error('❌ Error al conectar con MongoDB:', error.message);
        throw error;
    }
};

export const getDB = () => {
    if (!db) {
        throw new Error('La base de datos no está conectada. Llamá a connectDB() primero.');
    }
    return db;
};

export const closeDB = async () => {
    if (client) {
        await client.close();
        console.log('🔒 Conexión a MongoDB cerrada');
    }
};