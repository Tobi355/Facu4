import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import { connectDB } from './config/db.js';
import itemsRouter from './routes/items.routes.js';
import clientsRouter from './routes/clients.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3333;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/items', itemsRouter);
app.use('/clients', clientsRouter);

// Ruta raíz → frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Manejador de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Manejador de errores globales
app.use((err, req, res, next) => {
    console.error('Error global:', err.message);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

// Iniciar servidor
const start = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
        console.log(`🔥 Merco Sur corriendo en http://localhost:${PORT}`);
        console.log(`📡 API disponible en http://localhost:${PORT}/items`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar el servidor:', error.message);
        process.exit(1);
    }
};

start();