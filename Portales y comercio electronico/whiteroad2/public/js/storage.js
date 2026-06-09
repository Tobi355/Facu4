

const Storage = {

  KEYS: {
    USERS: 'whiteroad_users',
    ADMIN: 'whiteroad_admin',
    SERVICES: 'whiteroad_services',
    CATEGORIES: 'whiteroad_categories',
    BOOKINGS: 'whiteroad_bookings',
    SESSION: 'whiteroad_session'
  },

  
  init() {
    if (!this.get(this.KEYS.CATEGORIES)) {
      this.set(this.KEYS.CATEGORIES, this.getDefaultCategories());
    }
    if (!this.get(this.KEYS.SERVICES)) {
      this.set(this.KEYS.SERVICES, this.getDefaultServices());
    }
    if (!this.get(this.KEYS.ADMIN)) {
      this.set(this.KEYS.ADMIN, this.getDefaultAdmin());
    }
    if (!this.get(this.KEYS.USERS)) {
      this.set(this.KEYS.USERS, []);
    }
    if (!this.get(this.KEYS.BOOKINGS)) {
      this.set(this.KEYS.BOOKINGS, []);
    }
  },

  
  get(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error leyendo localStorage:', error);
      return null;
    }
  },

  
  set(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error guardando en localStorage:', error);
      return false;
    }
  },

  
  delete(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error eliminando de localStorage:', error);
      return false;
    }
  },

  
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  
  getDefaultCategories() {
    return [
      {
        id: 'cat_1',
        nombre: 'Mantenimiento',
        descripcion: 'Servicios de mantenimiento preventivo',
        estado: 'activo'
      },
      {
        id: 'cat_2',
        nombre: 'Reparaciones',
        descripcion: 'Reparaciones mecánicas y eléctricas',
        estado: 'activo'
      },
      {
        id: 'cat_3',
        nombre: 'Diagnóstico',
        descripcion: 'Diagnóstico computarizado y electrónico',
        estado: 'activo'
      },
      {
        id: 'cat_4',
        nombre: 'Accesorios',
        descripcion: 'Instalación de accesorios y personalizados',
        estado: 'activo'
      }
    ];
  },

  
  getDefaultServices() {
    return [
      {
        id: 'srv_1',
        nombre: 'Service Completo',
        descripcion: 'Mantenimiento integral de la motocicleta. Incluye cambio de aceite, filtro de aire, ajuste de cadena, revisión de frenos, lubricación de cables y puesta a punto general.',
        precio: 45000,
        duracion: 120,
        condiciones: 'Válido para motos hasta 200cc. Incluye mano de obra y materiales básicos. No incluye repuestos adicionales.',
        categoria: 'cat_1',
        imagen: '🔧',
        estado: 'activo',
        destacado: true
      },
      {
        id: 'srv_2',
        nombre: 'Cambio de Aceite',
        descripcion: 'Reemplazo de aceite del motor y filtro. Verificación de nivel y detección de fugas. Aceite semi-sintético incluido.',
        precio: 18000,
        duracion: 30,
        condiciones: 'Incluye hasta 1 litro de aceite semi-sintético. Aceite sintético tiene costo adicional.',
        categoria: 'cat_1',
        imagen: '🛢️',
        estado: 'activo',
        destacado: true
      },
      {
        id: 'srv_3',
        nombre: 'Diagnóstico Electrónico',
        descripcion: 'Escaneo computarizado completo del sistema electrónico. Lectura de códigos de error y verificación de sensores.',
        precio: 25000,
        duracion: 45,
        condiciones: 'El diagnóstico no incluye reparación. Si se realiza la reparación en nuestro taller, el diagnóstico es bonificado.',
        categoria: 'cat_3',
        imagen: '💻',
        estado: 'activo',
        destacado: false
      },
      {
        id: 'srv_4',
        nombre: 'Reparación de Motor',
        descripcion: 'Reparación mayor de motor. Incluye rectificación, cambio de anillos, ajustes de válvulas y puesta a punto.',
        precio: 180000,
        duracion: 480,
        condiciones: 'Presupuesto sujeto a evaluación previa. Los repuestos no están incluidos en el precio base.',
        categoria: 'cat_2',
        imagen: '⚙️',
        estado: 'activo',
        destacado: false
      },
      {
        id: 'srv_5',
        nombre: 'Ajuste de Frenos',
        descripcion: 'Reglaje y ajuste del sistema de frenos. Cambio de pastillas y líquido de frenos. Purga del circuito.',
        precio: 22000,
        duracion: 40,
        condiciones: 'No incluye pastillas ni líquido de frenos. Se cotiza aparte según modelo de motocicleta.',
        categoria: 'cat_1',
        imagen: '🛑',
        estado: 'activo',
        destacado: true
      },
      {
        id: 'srv_6',
        nombre: 'Balanceo de Ruedas',
        descripcion: 'Balanceo computarizado de ruedas. Corrección de vibraciones y verificación de cubiertas.',
        precio: 15000,
        duracion: 25,
        condiciones: 'Por rueda. Incluye contrapesos básicos.',
        categoria: 'cat_2',
        imagen: '🎯',
        estado: 'activo',
        destacado: false
      },
      {
        id: 'srv_7',
        nombre: 'Instalación de Alarma',
        descripcion: 'Colocación de sistema de alarma con control remoto. Configuración de sensibilidad y pruebas de funcionamiento.',
        precio: 35000,
        duracion: 60,
        condiciones: 'No incluye la alarma. Se instala el equipo proporcionado por el cliente o comprado en nuestro local.',
        categoria: 'cat_4',
        imagen: '🔐',
        estado: 'activo',
        destacado: false
      },
      {
        id: 'srv_8',
        nombre: 'Limpieza de Carburador',
        descripcion: 'Desarme, limpieza ultrasónica y ajuste de carburador. Regulación de mezcla y ralentí.',
        precio: 20000,
        duracion: 50,
        condiciones: 'Por carburador. Motos con inyección electrónica requieren diagnóstico especial.',
        categoria: 'cat_2',
        imagen: '✨',
        estado: 'activo',
        destacado: false
      }
    ];
  },

  
  getDefaultAdmin() {
    return {
      email: 'admin@whiteroad.com',
      password: 'admin123',
      nombre: 'Administrador'
    };
  }
};

Storage.init();
