

const Servicios = {
  
  getAll() {
    return Storage.get(Storage.KEYS.SERVICES) || [];
  },

  
  getById(id) {
    const services = this.getAll();
    return services.find(s => s.id === id);
  },

  
  getActive() {
    return this.getAll().filter(s => s.estado === 'activo');
  },

  
  getDestacados() {
    return this.getActive().filter(s => s.destacado === true);
  },

  
  getByCategoria(categoriaId) {
    return this.getActive().filter(s => s.categoria === categoriaId);
  },

  
  search(texto) {
    const lowerText = texto.toLowerCase();
    return this.getActive().filter(s =>
      s.nombre.toLowerCase().includes(lowerText) ||
      s.descripcion.toLowerCase().includes(lowerText)
    );
  },

  
  create(data) {
    const services = this.getAll();

    if (!data.nombre || !data.precio || !data.categoria) {
      return { success: false, message: 'Nombre, precio y categoría son obligatorios' };
    }

    const newService = {
      id: Storage.generateId(),
      nombre: data.nombre.trim(),
      descripcion: data.descripcion || '',
      precio: parseFloat(data.precio),
      duracion: parseInt(data.duracion) || 30,
      condiciones: data.condiciones || '',
      categoria: data.categoria,
      imagen: data.imagen || '🔧',
      estado: data.estado || 'activo',
      destacado: data.destacado || false,
      fechaCreacion: new Date().toISOString()
    };

    services.push(newService);
    Storage.set(Storage.KEYS.SERVICES, services);

    return { success: true, message: 'Servicio creado exitosamente', service: newService };
  },

  
  update(id, data) {
    const services = this.getAll();
    const index = services.findIndex(s => s.id === id);

    if (index === -1) {
      return { success: false, message: 'Servicio no encontrado' };
    }

    if (data.nombre !== undefined) services[index].nombre = data.nombre.trim();
    if (data.descripcion !== undefined) services[index].descripcion = data.descripcion;
    if (data.precio !== undefined) services[index].precio = parseFloat(data.precio);
    if (data.duracion !== undefined) services[index].duracion = parseInt(data.duracion);
    if (data.condiciones !== undefined) services[index].condiciones = data.condiciones;
    if (data.categoria !== undefined) services[index].categoria = data.categoria;
    if (data.imagen !== undefined) services[index].imagen = data.imagen;
    if (data.estado !== undefined) services[index].estado = data.estado;
    if (data.destacado !== undefined) services[index].destacado = data.destacado;

    Storage.set(Storage.KEYS.SERVICES, services);

    return { success: true, message: 'Servicio actualizado exitosamente' };
  },

  
  delete(id) {
    const services = this.getAll();
    const filtered = services.filter(s => s.id !== id);

    if (filtered.length === services.length) {
      return { success: false, message: 'Servicio no encontrado' };
    }

    Storage.set(Storage.KEYS.SERVICES, filtered);

    const bookings = Storage.get(Storage.KEYS.BOOKINGS) || [];
    const filteredBookings = bookings.filter(b => b.servicioId !== id);
    Storage.set(Storage.KEYS.BOOKINGS, filteredBookings);

    return { success: true, message: 'Servicio eliminado exitosamente' };
  },

  
  formatPrice(price) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(price);
  },

  
  formatDuration(minutes) {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      if (mins === 0) return `${hours}h`;
      return `${hours}h ${mins}m`;
    }
    return `${minutes}m`;
  }
};

const Categorias = {
  
  getAll() {
    return Storage.get(Storage.KEYS.CATEGORIES) || [];
  },

  
  getById(id) {
    const categories = this.getAll();
    return categories.find(c => c.id === id);
  },

  
  getActive() {
    return this.getAll().filter(c => c.estado === 'activo');
  },

  
  create(data) {
    const categories = this.getAll();

    if (!data.nombre) {
      return { success: false, message: 'El nombre es obligatorio' };
    }

    if (categories.find(c => c.nombre.toLowerCase() === data.nombre.toLowerCase().trim())) {
      return { success: false, message: 'Ya existe una categoría con ese nombre' };
    }

    const newCategory = {
      id: Storage.generateId(),
      nombre: data.nombre.trim(),
      descripcion: data.descripcion || '',
      estado: data.estado || 'activo',
      fechaCreacion: new Date().toISOString()
    };

    categories.push(newCategory);
    Storage.set(Storage.KEYS.CATEGORIES, categories);

    return { success: true, message: 'Categoría creada exitosamente', category: newCategory };
  },

  
  update(id, data) {
    const categories = this.getAll();
    const index = categories.findIndex(c => c.id === id);

    if (index === -1) {
      return { success: false, message: 'Categoría no encontrada' };
    }

    if (data.nombre && categories.find(c => c.nombre === data.nombre && c.id !== id)) {
      return { success: false, message: 'Ya existe una categoría con ese nombre' };
    }

    if (data.nombre !== undefined) categories[index].nombre = data.nombre.trim();
    if (data.descripcion !== undefined) categories[index].descripcion = data.descripcion;
    if (data.estado !== undefined) categories[index].estado = data.estado;

    Storage.set(Storage.KEYS.CATEGORIES, categories);

    return { success: true, message: 'Categoría actualizada exitosamente' };
  },

  
  delete(id) {
    const categories = this.getAll();
    const services = Servicios.getAll();

    const servicesUsingCategory = services.filter(s => s.categoria === id);
    if (servicesUsingCategory.length > 0) {
      return {
        success: false,
        message: `No se puede eliminar: hay ${servicesUsingCategory.length} servicio(s) usando esta categoría`
      };
    }

    const filtered = categories.filter(c => c.id !== id);
    Storage.set(Storage.KEYS.CATEGORIES, filtered);

    return { success: true, message: 'Categoría eliminada exitosamente' };
  },

  
  getNombre(id) {
    const category = this.getById(id);
    return category ? category.nombre : 'Sin categoría';
  }
};

const Reservas = {
  
  getAll() {
    return Storage.get(Storage.KEYS.BOOKINGS) || [];
  },

  
  getByUsuario(usuarioId) {
    return this.getAll().filter(b => b.usuarioId === usuarioId);
  },

  
  getById(id) {
    const bookings = this.getAll();
    return bookings.find(b => b.id === id);
  },

  
  create(usuarioId, servicioId, fecha, hora, notas = '') {
    const bookings = this.getAll();
    const servicio = Servicios.getById(servicioId);

    if (!servicio) {
      return { success: false, message: 'Servicio no encontrado' };
    }

    if (servicio.estado !== 'activo') {
      return { success: false, message: 'Este servicio no está disponible' };
    }

    const newBooking = {
      id: Storage.generateId(),
      usuarioId,
      servicioId,
      servicioNombre: servicio.nombre,
      servicioPrecio: servicio.precio,
      fecha: fecha,
      hora: hora,
      notas: notas,
      estado: 'confirmada',
      fechaReserva: new Date().toISOString()
    };

    bookings.push(newBooking);
    Storage.set(Storage.KEYS.BOOKINGS, bookings);

    return { success: true, message: 'Reserva creada exitosamente', booking: newBooking };
  },

  
  update(id, data) {
    const bookings = this.getAll();
    const index = bookings.findIndex(b => b.id === id);

    if (index === -1) {
      return { success: false, message: 'Reserva no encontrada' };
    }

    if (data.fecha !== undefined) bookings[index].fecha = data.fecha;
    if (data.hora !== undefined) bookings[index].hora = data.hora;
    if (data.notas !== undefined) bookings[index].notas = data.notas;
    if (data.estado !== undefined) bookings[index].estado = data.estado;

    Storage.set(Storage.KEYS.BOOKINGS, bookings);

    return { success: true, message: 'Reserva actualizada exitosamente' };
  },

  
  cancelar(id) {
    return this.update(id, { estado: 'cancelada' });
  },

  
  delete(id) {
    const bookings = this.getAll();
    const filtered = bookings.filter(b => b.id !== id);

    if (filtered.length === bookings.length) {
      return { success: false, message: 'Reserva no encontrada' };
    }

    Storage.set(Storage.KEYS.BOOKINGS, filtered);

    return { success: true, message: 'Reserva eliminada exitosamente' };
  },

  
  getStats() {
    const bookings = this.getAll();
    return {
      total: bookings.length,
      confirmadas: bookings.filter(b => b.estado === 'confirmada').length,
      canceladas: bookings.filter(b => b.estado === 'cancelada').length,
      completadas: bookings.filter(b => b.estado === 'completada').length
    };
  }
};
