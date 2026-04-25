import { Router } from 'express';
import {
    createClient,
    getAllClients,
    getClientItems
} from '../controllers/clients.controller.js';

const router = Router();

// POST /clients           → crear cliente
// GET  /clients           → traer todos los clientes
// GET  /clients/:id/items → traer items de un cliente

router.post('/', createClient);
router.get('/', getAllClients);
router.get('/:id/items', getClientItems);

export default router;