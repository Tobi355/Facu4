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

  // ══════════════════════════════
  //  PARRILLA
  // ══════════════════════════════
  {
    name: 'Bife de Chorizo',
    description: 'Clásico corte argentino de 400g, jugoso y tierno, cocinado a las brasas de quebracho. Servido con chimichurri casero.',
    details: 'Nuestro bife de chorizo proviene de novillos criados en feedlot de la provincia de Buenos Aires, seleccionados por su marmoleado y terneza. Se cocina lentamente sobre brasas de quebracho blanco a temperatura controlada, logrando una costra caramelizada por fuera y un interior rosado y jugoso. Se sirve con chimichurri casero elaborado con perejil fresco, ajo, orégano, ají molido y aceite de oliva virgen extra.',
    category: 'Parrilla',
    image: '/images/items/BifedeChorizo.jpg',
    link: '#menu',
    badge: 'El más pedido',
    weight: '400g',
    servings: '1-2 personas',
    price: 6500,
    cookingPoints: ['Jugoso', 'A punto', 'Bien cocido'],
    seasoningOptions: ['Con chimichurri', 'Con salsa criolla', 'Solo'],
    extrasLabel: 'Aderezo',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: true,
      vegan: false,
      vegetarian: false
    },
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Asado de Tira',
    description: 'Costillar a las brasas, lento y a punto. Sabor inigualable, crocante por fuera y rosado por dentro.',
    details: 'El asado de tira es el corte más representativo de la parrilla argentina. Nuestras tiras provienen de novillos de feedlot con un mínimo de 18 meses de engorde. Se cocina al calor indirecto durante más de 90 minutos, desarrollando una corteza dorada y sabrosa mientras la carne se tierniza desde adentro. El resultado es un corte con hueso lleno de sabor y con la textura perfecta entre crocante y jugoso.',
    category: 'Parrilla',
    image: '/images/items/AsadodeTira.webp',
    link: '#menu',
    badge: 'Para compartir',
    weight: '600g',
    servings: '2-3 personas',
    price: 5800,
    cookingPoints: ['Jugoso', 'A punto', 'Bien cocido'],
    seasoningOptions: ['Con chimichurri', 'Con salsa criolla', 'Solo'],
    extrasLabel: 'Aderezo',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: true,
      vegan: false,
      vegetarian: false
    },
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Entraña',
    description: 'Corte fino y sabroso, de cocción rápida. Ideal para los amantes de la carne bien sazonada y jugosa.',
    details: 'La entraña es un corte de diafragma con un sabor intenso y una textura fibrosa y jugosa muy característica. Por ser un músculo de trabajo continuo, acumula un marbling natural que le aporta un aroma y un gusto únicos. Su cocción rápida sobre brasas vivas —no más de 4 minutos por lado— es clave para lograr el punto perfecto. Se sirve cortada en tiras diagonales para aprovechar al máximo su terneza.',
    category: 'Parrilla',
    image: '/images/items/Entraña.jpg',
    link: '#menu',
    badge: null,
    weight: '250g',
    servings: '1 persona',
    price: 5200,
    cookingPoints: ['Jugosa', 'A punto', 'Bien cocida'],
    seasoningOptions: ['Con chimichurri', 'Con salsa criolla', 'Solo'],
    extrasLabel: 'Aderezo',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: true,
      vegan: false,
      vegetarian: false
    },
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Vacío a la Parrilla',
    description: 'Corte suave con cobertura dorada y crocante. 350g de sabor intenso, perfecto acompañado con chimichurri.',
    details: 'El vacío es uno de los cortes más queridos del asado argentino. Situado entre las costillas y el cuarto trasero, tiene una cubierta de grasa exterior que durante la cocción lenta se va derritiendo y creando una cobertura crocante y dorada impresionante. La carne interior queda suave, con una jugosidad notable. Recomendamos pedirlo a punto para disfrutar al máximo el contraste entre la cubierta y el interior.',
    category: 'Parrilla',
    image: '/images/items/Vacio.webp',
    link: '#menu',
    badge: null,
    weight: '350g',
    servings: '1-2 personas',
    price: 5600,
    cookingPoints: ['Jugoso', 'A punto', 'Bien cocido'],
    seasoningOptions: ['Con chimichurri', 'Con salsa criolla', 'Solo'],
    extrasLabel: 'Aderezo',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: true,
      vegan: false,
      vegetarian: false
    },
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Parrillada para 2',
    description: 'Mix generoso de tira, vacío, chorizo, morcilla y entraña. La experiencia completa de la parrilla argentina para compartir.',
    details: 'Nuestra parrillada para dos es la experiencia definitiva del asado argentino. Incluye tira de asado, vacío, entraña, chorizo criollo, morcilla y una provoleta de cortesía. Todo cocinado al mismo tiempo en nuestra parrilla de quebracho, sincronizando los tiempos de cocción de cada corte para que todo llegue a la mesa en su punto óptimo. Viene acompañada de chimichurri y salsa criolla de elaboración propia.',
    category: 'Parrilla',
    image: '/images/items/Parrilladapara2.jpg',
    link: '#menu',
    badge: 'Nuestra favorita',
    weight: '800g total',
    servings: '2 personas',
    price: 11500,
    cookingPoints: ['Jugoso', 'A punto', 'Bien cocido'],
    seasoningOptions: ['Con chimichurri', 'Con salsa criolla', 'Mixto (ambos)'],
    extrasLabel: 'Aderezo',
    dietaryInfo: {
      glutenFree: false,
      lactoseFree: true,
      vegan: false,
      vegetarian: false
    },
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // ══════════════════════════════
  //  ENTRANTES
  // ══════════════════════════════
  {
    name: 'Provoleta',
    description: 'Queso provolone gratinado a las brasas con orégano y aceite de oliva. Crocante por fuera, cremoso por dentro.',
    details: 'Nuestra provoleta está elaborada con queso provolone curado importado de Italia, que maduramos al menos 6 meses para lograr la consistencia ideal en la parrilla. Se coloca directamente sobre las brasas bajas con una plancha de hierro fundido, logrando una corteza dorada y crocante en ambas caras mientras el interior se derrite lentamente. Se termina con orégano fresco y un hilo de aceite de oliva extra virgen. Es el entrante perfecto para compartir mientras esperan los cortes principales.',
    category: 'Entrantes',
    image: '/images/items/Provoleta.jpg',
    link: '#menu',
    badge: null,
    weight: '200g',
    servings: '2-3 personas',
    price: 2800,
    cookingPoints: [],
    seasoningOptions: ['Con orégano', 'Con ají molido', 'Con romero y ajo'],
    extrasLabel: 'Sazón',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: false,
      vegan: false,
      vegetarian: true
    },
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Empanadas de Carne (x3)',
    description: 'Rellenas con carne cortada a cuchillo, cebolla, huevo duro y aceitunas. Horneadas al estilo criollo.',
    details: 'Nuestras empanadas se elaboran con masa casera hecha con harina, grasa y sal, siguiendo la receta criolla de la provincia de Tucumán. El relleno lleva carne vacuna picada a cuchillo (no molida), cebolla, morrón rojo, huevo duro, aceitunas verdes y una mezcla de especias que incluye comino, pimentón dulce y ají molido. Se hornean en horno de barro a 250°C durante 12 minutos hasta lograr el dorado característico. Vienen de a tres unidades por porción.',
    category: 'Entrantes',
    image: '/images/items/Empanadas.webp',
    link: '#menu',
    badge: null,
    weight: '3 unidades',
    servings: '1-2 personas',
    price: 3200,
    cookingPoints: [],
    seasoningOptions: ['Con chimichurri', 'Con salsa criolla', 'Solas'],
    extrasLabel: 'Acompañamiento',
    dietaryInfo: {
      glutenFree: false,
      lactoseFree: true,
      vegan: false,
      vegetarian: false
    },
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Tabla de Fiambres',
    description: 'Selección de salamín, jamón crudo, queso cuartirolo y pan casero. Perfecta para empezar la velada.',
    details: 'Nuestra tabla de fiambres es una selección cuidada de productos artesanales y de alta calidad. Incluye: salamín cular estacionado 45 días, jamón crudo en cuna con pata, queso cuartirolo cremoso de tambos de Tandil, aceitunas negras en aceite de oliva y pan casero con semillas horneado al momento. Es ideal para compartir mientras se espera la parrilla. Recomendamos maridarla con un vaso de Malbec de nuestra carta.',
    category: 'Entrantes',
    image: '/images/items/TabladeFiambres.webp',
    link: '#menu',
    badge: 'Para compartir',
    weight: '500g',
    servings: '3-4 personas',
    price: 4800,
    cookingPoints: [],
    seasoningOptions: ['Con pan casero', 'Con tostadas', 'Con grissines'],
    extrasLabel: 'Pan',
    dietaryInfo: {
      glutenFree: false,
      lactoseFree: false,
      vegan: false,
      vegetarian: false
    },
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // ══════════════════════════════
  //  GUARNICIONES
  // ══════════════════════════════
  {
    name: 'Papas Fritas',
    description: 'Papas cortadas en bastón, fritas en aceite de girasol. Doradas y crocantes, el acompañamiento perfecto.',
    details: 'Utilizamos papas Kennebec de la región del Sudoeste bonaerense, conocidas por su bajo contenido de humedad y alto porcentaje de almidón, lo que las hace ideales para freír. Se cortan a mano en bastones de 1cm, se precocen a 150°C y se terminan a 180°C al momento del pedido para garantizar el punto crocante perfecto. No utilizamos papas congeladas ni prefritas industriales. Se sirven sin adición de sal para que cada comensal sazons a su gusto.',
    category: 'Guarniciones',
    image: '/images/items/PapasFritas.jpg',
    link: '#menu',
    badge: null,
    weight: '300g',
    servings: '1-2 personas',
    price: 1800,
    cookingPoints: [],
    seasoningOptions: ['Con sal fina', 'Con sal gruesa y orégano', 'Con sal y pimienta negra'],
    extrasLabel: 'Sazón',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: true,
      vegan: true,
      vegetarian: true
    },
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Ensalada Mixta',
    description: 'Lechuga criolla, tomate perita, cebolla morada, zanahoria rallada y aderezo de la casa.',
    details: 'Nuestra ensalada mixta se prepara con ingredientes frescos comprados diariamente en el Mercado Central. La lechuga criolla se corta a mano para mantener su textura, el tomate perita se incorpora maduro y sin semillas para evitar el exceso de líquido, la cebolla morada se macera brevemente en vinagre para reducir su picor y la zanahoria se ralla fina al momento. El aderezo de la casa es una vinagreta elaborada con vinagre de manzana, aceite de oliva, mostaza de Dijon, ajo y hierbas frescas.',
    category: 'Guarniciones',
    image: '/images/items/EnsaladaMixta.jpg',
    link: '#menu',
    badge: null,
    weight: '300g',
    servings: '1-2 personas',
    price: 1600,
    cookingPoints: [],
    seasoningOptions: ['Con aderezo de la casa', 'Con aceite y vinagre', 'Con limón y oliva'],
    extrasLabel: 'Aderezo',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: true,
      vegan: true,
      vegetarian: true
    },
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Puré de Papas',
    description: 'Cremoso y casero, con manteca y leche. El acompañamiento que nunca falla con cualquier corte.',
    details: 'Nuestro puré se elabora con papas Spunta hervidas con sal y un hoja de laurel hasta lograr la consistencia perfecta. Se procesan en caliente con prensapuré tradicional (nunca licuadora para evitar que quede gomoso) y se integran con manteca de primera calidad, leche entera y un toque de nuez moscada recién rallada. La consistencia final es cremosa y liviana, con pequeños gránulos de papa que le dan carácter de casero. Se sirve caliente en el momento.',
    category: 'Guarniciones',
    image: '/images/items/PuredePapas.webp',
    link: '#menu',
    badge: null,
    weight: '250g',
    servings: '1-2 personas',
    price: 1500,
    cookingPoints: [],
    seasoningOptions: ['Clásico con manteca', 'Con ciboulette fresco', 'Con queso rallado'],
    extrasLabel: 'Variante',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: false,
      vegan: false,
      vegetarian: true
    },
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // ══════════════════════════════
  //  BEBIDAS
  // ══════════════════════════════
  {
    name: 'Vino Malbec',
    description: 'Copa de Malbec mendocino de cuerpo completo. Maridaje ideal con cualquier corte de la parrilla.',
    details: 'Servimos Malbec de la zona de Luján de Cuyo, Mendoza, reconocida mundialmente por producir los mejores ejemplares de esta cepa. El vino seleccionado tiene una crianza mínima de 12 meses en barricas de roble francés, lo que le aporta notas de frutas rojas maduras, especias y un final largo y persistente. Su cuerpo pleno y sus taninos suaves lo convierten en el compañero perfecto para los cortes de res que servimos. Temperatura de servicio ideal: 16-18°C.',
    category: 'Bebidas',
    image: '/images/items/Vino.jpg',
    link: '#menu',
    badge: null,
    weight: '150ml (copa)',
    servings: '1 persona',
    price: 2200,
    cookingPoints: [],
    seasoningOptions: ['Copa (150ml)', 'Media botella (375ml)', 'Botella completa (750ml)'],
    extrasLabel: 'Formato',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: true,
      vegan: true,
      vegetarian: true
    },
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Cerveza Artesanal',
    description: 'Lager artesanal tirada en barril. Fresca, con espuma perfecta y aroma a malta y lúpulo.',
    details: 'Trabajamos con una cervecería artesanal local de Palermo que elabora sus cervezas con maltas importadas de Alemania y lúpulos de producción propia en la Patagonia. La Lager que servimos tiene una fermentación baja de 14 días a 8°C, lo que le da una claridad y una carbonatación natural impecables. Su color dorado, la espuma compacta y las notas de malta tostada y lúpulo floral la convierten en la mejor compañía para un asado de barrio.',
    category: 'Bebidas',
    image: '/images/items/CervezaArtesanal.jpg',
    link: '#menu',
    badge: null,
    weight: '500ml (pinta)',
    servings: '1 persona',
    price: 1900,
    cookingPoints: [],
    seasoningOptions: ['Lager dorada', 'Stout oscura', 'IPA lupulada'],
    extrasLabel: 'Estilo',
    dietaryInfo: {
      glutenFree: false,
      lactoseFree: true,
      vegan: true,
      vegetarian: true
    },
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Gaseosa',
    description: 'Coca Cola, Sprite o Fanta en lata fría. La clásica para los más jóvenes de la mesa.',
    details: 'Servimos gaseosas de la línea Coca-Cola en lata de 354ml, siempre a temperatura de heladera entre 3°C y 5°C. Tenemos disponibles todas las variedades de la línea. Si preferís una opción sin azúcar, también contamos con las variantes diet/zero. Las latas llegan a la mesa sin abrir para que el cliente controle la temperatura y el nivel de carbonatación a su gusto.',
    category: 'Bebidas',
    image: '/images/items/Gaseosa.jpg',
    link: '#menu',
    badge: null,
    weight: '354ml (lata)',
    servings: '1 persona',
    price: 900,
    cookingPoints: [],
    seasoningOptions: ['Coca-Cola', 'Sprite', 'Fanta naranja'],
    extrasLabel: 'Variante',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: true,
      vegan: true,
      vegetarian: true
    },
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  // ══════════════════════════════
  //  POSTRES
  // ══════════════════════════════
  {
    name: 'Flan Casero con Crema',
    description: 'Flan de huevo casero con dulce de leche y crema batida. La combinación perfecta para cerrar el asado.',
    details: 'Nuestro flan se prepara diariamente con una receta que lleva más de 20 años en la familia del chef. La base lleva huevos enteros, leche entera, azúcar y vainilla natural de Tahití. Se cocina a baño María en el horno a 160°C durante 50 minutos y se desmolda frío para que el caramelo se distribuya perfectamente. Se sirve con dulce de leche repostero de La Salamandra y crema doble batida a punto nieve con una pizca de vainilla.',
    category: 'Postres',
    image: '/images/items/FlanconCrema.png',
    link: '#menu',
    badge: null,
    weight: '200g',
    servings: '1 persona',
    price: 2400,
    cookingPoints: [],
    seasoningOptions: ['Con dulce de leche y crema', 'Solo con crema batida', 'Solo con dulce de leche'],
    extrasLabel: 'Acompañamiento',
    dietaryInfo: {
      glutenFree: true,
      lactoseFree: false,
      vegan: false,
      vegetarian: true
    },
    clientId: clientIds[1],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Panqueques con Dulce de Leche',
    description: 'Panqueques suaves y esponjosos rellenos de dulce de leche repostero. El clásico postre argentino.',
    details: 'Nuestros panqueques se preparan con masa de harina, huevo, leche y manteca que reposa 30 minutos antes de cocinar para lograr la textura sedosa característica. Se cocinan en sartén de teflón de bajo calibre con manteca clarificada a fuego medio, logrando un dorado parejo y uniforme. El relleno de dulce de leche repostero se incorpora caliente para que se derrita ligeramente con el calor del panqueque. Se sirven dos unidades por porción, dobladas en cuatro y espolvoreadas con azúcar impalpable.',
    category: 'Postres',
    image: '/images/items/PanquequesconDulcedeLeche.jpg',
    link: '#menu',
    badge: null,
    weight: '2 unidades',
    servings: '1-2 personas',
    price: 2600,
    cookingPoints: [],
    seasoningOptions: ['Con dulce de leche', 'Con dulce de leche y crema', 'Con miel y nueces'],
    extrasLabel: 'Relleno y salsa',
    dietaryInfo: {
      glutenFree: false,
      lactoseFree: false,
      vegan: false,
      vegetarian: true
    },
    clientId: clientIds[0],
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    name: 'Budín de Pan',
    description: 'Receta casera de la abuela, con pasas de uva y salsa de caramelo. Tibio y reconfortante.',
    details: 'El budín de pan es la receta más antigua de nuestra carta, transmitida por la abuela del fundador de Merco Sur. Se elabora con pan de campo del día anterior remojado en leche tibia, huevos, azúcar, esencia de vainilla y pasas de uva maceradas en ron durante 24 horas. Se hornea en molde de budín a 170°C durante 55 minutos en baño María. La salsa de caramelo se hace en el momento con azúcar, crema y un toque de sal marina que equilibra la dulzura. Se sirve tibio para que la salsa impregne cada bocanada.',
    category: 'Postres',
    image: '/images/items/BudindePan.png',
    link: '#menu',
    badge: 'Receta de la abuela',
    weight: '200g',
    servings: '1-2 personas',
    price: 2200,
    cookingPoints: [],
    seasoningOptions: ['Con salsa de caramelo', 'Con crema batida', 'Con salsa de caramelo y crema'],
    extrasLabel: 'Salsa',
    dietaryInfo: {
      glutenFree: false,
      lactoseFree: false,
      vegan: false,
      vegetarian: true
    },
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

    await db.collection('items').deleteMany({});
    await db.collection('clients').deleteMany({});
    console.log('🧹 Colecciones limpiadas');

    const clientsResult = await db.collection('clients').insertMany(clients);
    const clientIds = Object.values(clientsResult.insertedIds);
    console.log(`👥 ${clientIds.length} clientes insertados`);

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