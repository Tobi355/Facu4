import {
  findAllItems,
  insertItem,
  updateItemById,
  deleteItemById
} from '../services/items.service.js';

export const getAllItems = async (req, res) => {
  try {
    const { category, name } = req.query;
    const items = await findAllItems({ category, name });
    res.status(200).json({
      success: true,
      total: items.length,
      data: items
    });
  } catch (error) {
    console.error('Error en getAllItems:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const { name, description, category, image, link, clientId } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'El campo "name" es obligatorio' });
    }

    if (!category || !category.trim()) {
      return res.status(400).json({ success: false, message: 'El campo "category" es obligatorio' });
    }

    const newItem = {
      name: name.trim(),
      description: description?.trim() || '',
      category: category.trim(),
      image: image?.trim() || '',
      link: link?.trim() || '',
      clientId: clientId || null
    };

    const created = await insertItem(newItem);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    console.error('Error en createItem:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: 'El ID es obligatorio' });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ success: false, message: 'No se enviaron datos para actualizar' });
    }

    const updated = await updateItemById(id, updates);

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Item no encontrado' });
    }

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error('Error en updateItem:', error.message);
    const status = error.message === 'ID inválido' ? 400 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ success: false, message: 'El ID es obligatorio' });
    }

    const result = await deleteItemById(id);

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: 'Item no encontrado' });
    }

    res.status(200).json({ success: true, message: 'Item eliminado correctamente' });
  } catch (error) {
    console.error('Error en deleteItem:', error.message);
    const status = error.message === 'ID inválido' ? 400 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};