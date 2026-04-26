import { get } from 'http';
import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

const CLIENTS_COLLECTION = 'clients';
const ITEMS_COLLECTION = 'items';

export const insertClient = async (client) => {
  const db = getDB();
  const newClient = {
    ...client,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  const result = await db.collection(CLIENTS_COLLECTION).insertOne(newClient);
  return { ...newClient, _id: result.insertedId };
};

export const findAllClients = async () => {
  const db = getDB();
  return await db.collection(CLIENTS_COLLECTION).find({}).toArray();
};

export const findItemsByClientId = async (clientId) => {
    const db = getDB();

    if (!ObjectId.isValid(clientId)) {
        throw new Error('ID de cliente inválido');
    }

    return await db.collection(ITEMS_COLLECTION).find({
        clientId: new ObjectId(clientId)
    }).toArray();
};

export const findClientById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = getDB();
  return await db.collection('clients').findOne({ _id: new ObjectId(id) });
};