import {
  insertClient,
  findAllClients,
  findItemsByClientId
} from '../services/clients.service.js';

export const createClient = async (req, res) => {
  try {
    const { name, image, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'El campo "name" es obligatorio' });
    }

    const newClient = {
      name: name.trim(),
      image: image?.trim() || '',
      description: description?.trim() || ''
    };

    const created = await insertClient(newClient);
    res.status(201).json({ success: true, data: created });
  } catch (error) {
    console.error('Error en createClient:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await findAllClients();
    res.status(200).json({
      success: true,
      total: clients.length,
      data: clients
    });
  } catch (error) {
    console.error('Error en getAllClients:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getClientItems = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await findItemsByClientId(id);
    res.status(200).json({
      success: true,
      total: items.length,
      data: items
    });
  } catch (error) {
    console.error('Error en getClientItems:', error.message);
    const status = error.message === 'ID de cliente inválido' ? 400 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};