require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Class = require('../models/Class');
const connectDB = require('../config/db');

const seed = async () => {
    try {
        await connectDB();

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@harmonystudio.com';
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (!existingAdmin) {
        await User.create({
            name: 'Admin Harmony',
            email: adminEmail,
            password: process.env.ADMIN_PASSWORD || 'Admin123!',
            role: 'admin',
            phone: '+541123456789',
        });
        console.log('Admin user created.');
        } else {
        console.log('Admin user already exists.');
        }

        const classCount = await Class.countDocuments();
        if (classCount === 0) {
        await Class.create([
            {
            name: 'Pilates Mat I',
            description: 'Clásico Pilates en colchoneta. Fortalece el core y mejora la postura.',
            instructor: 'Sofía Martínez',
            schedule: [
                { day: 'Monday', startTime: '08:00', endTime: '09:00' },
                { day: 'Wednesday', startTime: '08:00', endTime: '09:00' },
                { day: 'Friday', startTime: '08:00', endTime: '09:00' },
            ],
            duration: 60,
            capacity: 15,
            price: 1500,
            image: '/images/pilates-mat.jpg',
            },
            {
            name: 'Reformer Avanzado',
            description: 'Trabajo profundo en Reformer para alumnos con experiencia previa.',
            instructor: 'Carlos López',
            schedule: [
                { day: 'Tuesday', startTime: '10:00', endTime: '11:15' },
                { day: 'Thursday', startTime: '10:00', endTime: '11:15' },
            ],
            duration: 75,
            capacity: 8,
            price: 2500,
            image: '/images/reformer.jpg',
            },
            {
            name: 'Yoga & Pilates Flow',
            description: 'Fusión de Yoga y Pilates para flexibilidad y tonificación.',
            instructor: 'Lucía Gómez',
            schedule: [
                { day: 'Monday', startTime: '18:00', endTime: '19:00' },
                { day: 'Wednesday', startTime: '18:00', endTime: '19:00' },
            ],
            duration: 60,
            capacity: 20,
            price: 1800,
            image: '/images/yoga-pilates.jpg',
            },
            {
            name: 'Pilates para Embarazadas',
            description: 'Ejercicios seguros y adaptados para cada etapa del embarazo.',
            instructor: 'Sofía Martínez',
            schedule: [
                { day: 'Tuesday', startTime: '16:00', endTime: '17:00' },
                { day: 'Thursday', startTime: '16:00', endTime: '17:00' },
            ],
            duration: 60,
            capacity: 10,
            price: 2000,
            image: '/images/prenatal.jpg',
            },
            {
            name: 'Stretching & Movilidad',
            description: 'Clase enfocada en estiramientos profundos y movilidad articular.',
            instructor: 'Martín Díaz',
            schedule: [
                { day: 'Saturday', startTime: '09:00', endTime: '10:00' },
            ],
            duration: 60,
            capacity: 25,
            price: 1200,
            image: '/images/stretching.jpg',
            },
        ]);
        console.log('Sample classes created.');
        } else {
        console.log('Classes already exist.');
        }

        console.log('Seed completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    }
};

seed();