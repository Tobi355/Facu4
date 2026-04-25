import { Router } from 'express';
import {
    getAllItems,
    createItem,
    updateItem,
    deleteItem
} from '../controllers/items.controller.js';

const router = Router();

// GET    /items         → traer todos (con filtros opcionales por query)
// POST   /items         → crear item
// PUT    /items/:id     → actualizar item
// DELETE /items/:id     → eliminar item

router.get('/', getAllItems);
router.post('/', createItem);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

export default router;