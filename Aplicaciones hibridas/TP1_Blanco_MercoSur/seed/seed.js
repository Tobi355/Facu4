import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'AH20232CP1';

const clients = [
  {
    name: 'Mesa Familiar',
    image: 'https://picsum.photos/seed/family1/400/300',
    description: 'Cliente habitual que reserva para grupos familiares los fines de semana.',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Grupo de Amigos',
    image: 'https://picsum.photos/seed/friends1/400/300',
    description: 'Grupo de amigos que viene regularmente los viernes a la noche.',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const buildItems = (clientIds) => [
  // ---- PARRILLA ----
  {
    name: 'Bife de Chorizo',
    description: 'Clásico corte argentino de 400g, jugoso y tierno, cocinado a las brasas de quebracho. Servido con chimichurri casero.',
    category: 'Parrilla',
    image: '/images/items/BifedeChorizo.jpg',
    link: '#menu',
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Asado de Tira',
    description: 'Costillar a las brasas, lento y a punto. Sabor inigualable, crocante por fuera y rosado por dentro.',
    category: 'Parrilla',
    image: '/images/items/AsadodeTira.webp',
    link: '#menu',
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Entraña',
    description: 'Corte fino y sabroso, de cocción rápida. Ideal para los amantes de la carne bien sazonada y jugosa.',
    category: 'Parrilla',
    image: '/images/items/Entraña.jpg',
    link: '#menu',
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Vacío a la Parrilla',
    description: 'Corte suave con cobertura dorada y crocante. 350g de sabor intenso, perfecto acompañado con chimichurri.',
    category: 'Parrilla',
    image: '/images/items/Vacio.webp',
    link: '#menu',
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Parrillada para 2',
    description: 'Mix generoso de tira, vacío, chorizo, morcilla y entraña. La experiencia completa de la parrilla argentina para compartir.',
    category: 'Parrilla',
    image: '/images/items/Parrilladapara2.jpg',
    link: '#menu',
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ---- ENTRANTES ----
  {
    name: 'Provoleta',
    description: 'Queso provolone gratinado a las brasas con orégano y aceite de oliva. Crocante por fuera, cremoso por dentro.',
    category: 'Entrantes',
    image: '/images/items/Provoleta.jpg',
    link: '#menu',
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Empanadas de Carne (x3)',
    description: 'Rellenas con carne cortada a cuchillo, cebolla, huevo duro y aceitunas. Horneadas al estilo criollo.',
    category: 'Entrantes',
    image: '/images/items/Empanadas.webp',
    link: '#menu',
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Tabla de Fiambres',
    description: 'Selección de salamín, jamón crudo, queso cuartirolo y pan casero. Perfecta para empezar la velada.',
    category: 'Entrantes',
    image: '/images/items/TabladeFiambres.webp',
    link: '#menu',
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ---- GUARNICIONES ----
  {
    name: 'Papas Fritas',
    description: 'Papas cortadas en bastón, fritas en aceite de girasol. Doradas y crocantes, el acompañamiento perfecto.',
    category: 'Guarniciones',
    image: '/images/items/PapasFritas.jpg',
    link: '#menu',
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Ensalada Mixta',
    description: 'Lechuga criolla, tomate perita, cebolla morada, zanahoria rallada y aderezo de la casa.',
    category: 'Guarniciones',
    image: '/images/items/EnsaladaMixta.jpg',
    link: '#menu',
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Puré de Papas',
    description: 'Cremoso y casero, con manteca y leche. El acompañamiento que nunca falla con cualquier corte.',
    category: 'Guarniciones',
    image: '/images/items/PuredePapas.webp',
    link: '#menu',
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ---- BEBIDAS ----
  {
    name: 'Vino Malbec',
    description: 'Copa de Malbec mendocino de cuerpo completo. Maridaje ideal con cualquier corte de la parrilla.',
    category: 'Bebidas',
    image: '/images/items/Vino.jpg',
    link: '#menu',
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Cerveza Artesanal',
    description: 'Lager artesanal tirada en barril. Fresca, con espuma perfecta y aroma a malta y lúpulo.',
    category: 'Bebidas',
    image: '/images/items/CervezaArtesanal.jpg',
    link: '#menu',
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Gaseosa',
    description: 'Coca Cola, Sprite o Fanta en lata fría. La clásica para los más jóvenes de la mesa.',
    category: 'Bebidas',
    image: '/images/items/Gaseosa.jpg',
    link: '#menu',
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ---- POSTRES ----
  {
    name: 'Flan Casero con Crema',
    description: 'Flan de huevo casero con dulce de leche y crema batida. La combinación perfecta para cerrar el asado.',
    category: 'Postres',
    image: '/images/items/FlanconCrema.png',
    link: '#menu',
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Panqueques con Dulce de Leche',
    description: 'Panqueques suaves y esponjosos rellenos de dulce de leche repostero. El clásico postre argentino.',
    category: 'Postres',
    image: '/images/items/PanquequesconDulcedeLeche.jpg',
    link: '#menu',
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Budín de Pan',
    description: 'Receta casera de la abuela, con pasas de uva y salsa de caramelo. Tibio y reconfortante.',
    category: 'Postres',
    image: '/images/items/BudindePan.png',
    link: '#menu',
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const seed = async () => {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB');

    const db = client.db(DB_NAME);

    // Limpiar colecciones existentes
    await db.collection('items').deleteMany({});
    await db.collection('clients').deleteMany({});
    console.log('🧹 Colecciones limpiadas');

    // Insertar clients
    const clientsResult = await db.collection('clients').insertMany(clients);
    const clientIds = Object.values(clientsResult.insertedIds);
    console.log(`👥 ${clientIds.length} clientes insertados`);

    // Insertar items con referencias a clientes
    const items = buildItems(clientIds);
    const itemsResult = await db.collection('items').insertMany(items);
    console.log(`🍖 ${Object.keys(itemsResult.insertedIds).length} items insertados`);

    console.log('\n🎉 Seed completado exitosamente');
    console.log(`📦 Base de datos: ${DB_NAME}`);
    console.log('📋 Colecciones: items, clients');

  } catch (error) {
    console.error('❌ Error en seed:', error.message);
  } finally {
    await client.close();
    console.log('🔒 Conexión cerrada');
  }
};

seed();