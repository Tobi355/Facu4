import { getDB } from '../config/db.js';
import { ObjectId } from 'mongodb';

const COLLECTION = 'items';

export const findAllItems = async (filters = {}) => {
    const db = getDB();
    const query = {};

    // Filtro por categoría (búsqueda parcial, case-insensitive)
    if (filters.category && filters.category.trim() !== '') {
        query.category = { $regex: filters.category.trim(), $options: 'i' };
    }

    // Filtro por nombre (búsqueda parcial, case-insensitive)
    if (filters.name && filters.name.trim() !== '') {
        query.name = { $regex: filters.name.trim(), $options: 'i' };
    }

    return await db.collection(COLLECTION).find(query).toArray();
};

export const insertItem = async (item) => {
    const db = getDB();
    const newItem = {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const result = await db.collection(COLLECTION).insertOne(newItem);
    return { ...newItem, _id: result.insertedId };
};

export const updateItemById = async (id, updates) => {
    const db = getDB();

    if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
    }

    const updateData = {
        ...updates,
        updatedAt: new Date()
    };

    // No permitir sobreescribir _id ni createdAt
    delete updateData._id;
    delete updateData.createdAt;

    const result = await db.collection(COLLECTION).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { returnDocument: 'after' }
    );

    return result;
};

export const deleteItemById = async (id) => {
    const db = getDB();

    if (!ObjectId.isValid(id)) {
        throw new Error('ID inválido');
    }

    const result = await db.collection(COLLECTION).deleteOne({
        _id: new ObjectId(id)
    });

    return result;
};