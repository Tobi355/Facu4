const Admin = {
  seccionActual: 'dashboard',
  filtroReservasUsuarioId: null,

  
  init() {
    this.cargarDashboard();
    this.inicializarNavegacion();
    this.inicializarBotones();
  },

  
  cargarDashboard() {
    const usuarios = Storage.get(Storage.KEYS.USERS) || [];
    const servicios = Servicios.getAll();
    const reservas = Reservas.getAll();
    const categorias = Categorias.getAll();

    document.getElementById('stat-usuarios').textContent = usuarios.length;
    document.getElementById('stat-servicios').textContent = servicios.filter(s => s.estado === 'activo').length;
    document.getElementById('stat-reservas').textContent = reservas.length;
    document.getElementById('stat-categorias').textContent = categorias.length;

    const contactos = Storage.get('whiteroad_contactos') || [];
    document.getElementById('stat-contactos').textContent = contactos.length;

    const container = document.getElementById('reservas-recientes');
    const recientes = reservas.slice(-5).reverse();

    if (recientes.length === 0) {
      container.innerHTML = '<p class="text-gray">No hay reservas recientes</p>';
    } else {
      const table = document.createElement('table');
      const thead = document.createElement('thead');
      const tbody = document.createElement('tbody');

      const headers = ['Cliente', 'Servicio', 'Fecha', 'Hora', 'Estado'];
      const headerRow = document.createElement('tr');
      headers.forEach(h => {
        const th = document.createElement('th');
        th.textContent = h;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      recientes.forEach(reserva => {
        const row = document.createElement('tr');
        const usuario = usuarios.find(u => u.id === reserva.usuarioId);

        const tdCliente = document.createElement('td');
        tdCliente.textContent = usuario ? usuario.nombre : 'Usuario eliminado';
        row.appendChild(tdCliente);

        const tdServicio = document.createElement('td');
        tdServicio.textContent = reserva.servicioNombre;
        row.appendChild(tdServicio);

        const tdFecha = document.createElement('td');
        tdFecha.textContent = UI.formatDate(reserva.fecha);
        row.appendChild(tdFecha);

        const tdHora = document.createElement('td');
        tdHora.textContent = reserva.hora;
        row.appendChild(tdHora);

        const tdEstado = document.createElement('td');
        const badge = document.createElement('span');
        badge.className = `status-badge ${
          reserva.estado === 'confirmada' ? 'status-active' :
          reserva.estado === 'cancelada' ? 'status-inactive' : 'status-pending'
        }`;
        badge.textContent = reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1);
        tdEstado.appendChild(badge);
        row.appendChild(tdEstado);

        tbody.appendChild(row);
      });

      table.appendChild(tbody);

      const wrapper = document.createElement('div');
      wrapper.className = 'table-container';
      wrapper.appendChild(table);
      container.innerHTML = '';
      container.appendChild(wrapper);
    }

    this.cargarContactosRecientes(contactos);
  },

  
  cargarContactosRecientes(contactos) {
    const container = document.getElementById('contactos-recientes');

    if (!container) return;

    if (contactos.length === 0) {
      container.innerHTML = '<p class="text-gray">No hay mensajes de contacto aún</p>';
      return;
    }

    const recientes = contactos.slice(-5).reverse();
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Nombre', 'Email', 'Teléfono', 'Mensaje', 'Fecha', 'Acciones'];
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    recientes.forEach(contacto => {
      const row = document.createElement('tr');

      const tdNombre = document.createElement('td');
      tdNombre.textContent = contacto.nombre || '—';
      row.appendChild(tdNombre);

      const tdEmail = document.createElement('td');
      tdEmail.textContent = contacto.email || '—';
      row.appendChild(tdEmail);

      const tdTelefono = document.createElement('td');
      tdTelefono.textContent = contacto.telefono || '—';
      row.appendChild(tdTelefono);

      const tdMensaje = document.createElement('td');
      const mensajePreview = contacto.mensaje ? (contacto.mensaje.length > 50 ? `${contacto.mensaje.slice(0, 50)}...` : contacto.mensaje) : '—';
      tdMensaje.textContent = mensajePreview;
      row.appendChild(tdMensaje);

      const tdFecha = document.createElement('td');
      tdFecha.textContent = UI.formatDate(contacto.fecha);
      row.appendChild(tdFecha);

      const tdAcciones = document.createElement('td');
      const btnVer = document.createElement('button');
      btnVer.className = 'btn btn-secondary btn-small';
      btnVer.textContent = 'Ver mensaje';
      btnVer.addEventListener('click', () => this.mostrarContactoModal(contacto));
      tdAcciones.appendChild(btnVer);
      row.appendChild(tdAcciones);

      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    const wrapper = document.createElement('div');
    wrapper.className = 'table-container';
    wrapper.appendChild(table);
    container.innerHTML = '';
    container.appendChild(wrapper);
  },

  mostrarContactoModal(contacto) {
    const content = document.createElement('div');
    content.className = 'contact-modal-details';
    content.innerHTML = `
      <div class="mb-2"><strong>Nombre:</strong> ${contacto.nombre || '—'}</div>
      <div class="mb-2"><strong>Email:</strong> ${contacto.email || '—'}</div>
      <div class="mb-2"><strong>Teléfono:</strong> ${contacto.telefono || '—'}</div>
      <div class="mb-2"><strong>Fecha:</strong> ${UI.formatDate(contacto.fecha)}</div>
      <div class="mb-2"><strong>Mensaje:</strong></div>
      <div class="message-box">${contacto.mensaje ? contacto.mensaje.replace(/\n/g, '<br>') : '—'}</div>
    `;

    UI.showInfoModal('Detalle de Mensaje', content);
  },

  
  cargarServicios() {
    const servicios = Servicios.getAll();
    const container = document.getElementById('servicios-listado');

    if (servicios.length === 0) {
      container.innerHTML = '<p class="text-gray">No hay servicios registrados</p>';
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Servicio', 'Categoría', 'Precio', 'Duración', 'Estado', 'Acciones'];
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    servicios.forEach(servicio => {
      const row = document.createElement('tr');

      const tdNombre = document.createElement('td');
      tdNombre.innerHTML = `<strong>${servicio.nombre}</strong>`;
      row.appendChild(tdNombre);

      const tdCategoria = document.createElement('td');
      tdCategoria.textContent = Categorias.getNombre(servicio.categoria);
      row.appendChild(tdCategoria);

      const tdPrecio = document.createElement('td');
      tdPrecio.textContent = Servicios.formatPrice(servicio.precio);
      row.appendChild(tdPrecio);

      const tdDuracion = document.createElement('td');
      tdDuracion.textContent = Servicios.formatDuration(servicio.duracion);
      row.appendChild(tdDuracion);

      const tdEstado = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = `status-badge ${servicio.estado === 'activo' ? 'status-active' : 'status-inactive'}`;
      badge.textContent = servicio.estado === 'activo' ? 'Activo' : 'Inactivo';
      tdEstado.appendChild(badge);
      row.appendChild(tdEstado);

      const tdAcciones = document.createElement('td');
      tdAcciones.style.display = 'flex';
      tdAcciones.style.gap = '0.5rem';

      const btnEditar = document.createElement('button');
      btnEditar.className = 'btn btn-small';
      btnEditar.textContent = 'Editar';
      btnEditar.addEventListener('click', () => this.editarServicio(servicio.id));
      tdAcciones.appendChild(btnEditar);

      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn btn-danger btn-small';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => this.eliminarServicio(servicio.id));
      tdAcciones.appendChild(btnEliminar);

      row.appendChild(tdAcciones);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const wrapper = document.createElement('div');
    wrapper.className = 'table-container';
    wrapper.appendChild(table);
    container.innerHTML = '';
    container.appendChild(wrapper);
  },

  
  cargarCategorias() {
    const categorias = Categorias.getAll();
    const container = document.getElementById('categorias-listado');

    if (categorias.length === 0) {
      container.innerHTML = '<p class="text-gray">No hay categorías registradas</p>';
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Nombre', 'Descripción', 'Estado', 'Acciones'];
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    categorias.forEach(categoria => {
      const row = document.createElement('tr');

      const tdNombre = document.createElement('td');
      tdNombre.textContent = categoria.nombre;
      row.appendChild(tdNombre);

      const tdDescripcion = document.createElement('td');
      tdDescripcion.textContent = categoria.descripcion || '-';
      row.appendChild(tdDescripcion);

      const tdEstado = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = `status-badge ${categoria.estado === 'activo' ? 'status-active' : 'status-inactive'}`;
      badge.textContent = categoria.estado === 'activo' ? 'Activo' : 'Inactivo';
      tdEstado.appendChild(badge);
      row.appendChild(tdEstado);

      const tdAcciones = document.createElement('td');
      tdAcciones.style.display = 'flex';
      tdAcciones.style.gap = '0.5rem';

      const btnEditar = document.createElement('button');
      btnEditar.className = 'btn btn-small';
      btnEditar.textContent = 'Editar';
      btnEditar.addEventListener('click', () => this.editarCategoria(categoria.id));
      tdAcciones.appendChild(btnEditar);

      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn btn-danger btn-small';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => this.eliminarCategoria(categoria.id));
      tdAcciones.appendChild(btnEliminar);

      row.appendChild(tdAcciones);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const wrapper = document.createElement('div');
    wrapper.className = 'table-container';
    wrapper.appendChild(table);
    container.innerHTML = '';
    container.appendChild(wrapper);
  },

  
  cargarUsuarios() {
    const usuarios = Storage.get(Storage.KEYS.USERS) || [];
    const container = document.getElementById('usuarios-listado');

    if (usuarios.length === 0) {
      container.innerHTML = '<p class="text-gray">No hay usuarios registrados</p>';
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Nombre', 'Email', 'Teléfono', 'Fecha Registro', 'Estado', 'Acciones'];
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    usuarios.forEach(usuario => {
      const row = document.createElement('tr');

      const tdNombre = document.createElement('td');
      tdNombre.textContent = usuario.nombre;
      row.appendChild(tdNombre);

      const tdEmail = document.createElement('td');
      tdEmail.textContent = usuario.email;
      row.appendChild(tdEmail);

      const tdTelefono = document.createElement('td');
      tdTelefono.textContent = usuario.telefono || '-';
      row.appendChild(tdTelefono);

      const tdFecha = document.createElement('td');
      tdFecha.textContent = UI.formatDate(usuario.fechaRegistro);
      row.appendChild(tdFecha);

      const tdEstado = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = `status-badge ${usuario.estado === 'activo' ? 'status-active' : 'status-inactive'}`;
      badge.textContent = usuario.estado === 'activo' ? 'Activo' : 'Inactivo';
      tdEstado.appendChild(badge);
      row.appendChild(tdEstado);

      const tdAcciones = document.createElement('td');
      tdAcciones.style.display = 'flex';
      tdAcciones.style.gap = '0.5rem';

      const btnVer = document.createElement('button');
      btnVer.className = 'btn btn-small';
      btnVer.textContent = 'Ver Reservas';
      btnVer.addEventListener('click', () => this.verReservasUsuario(usuario.id));
      tdAcciones.appendChild(btnVer);

      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn btn-danger btn-small';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => this.eliminarUsuario(usuario.id));
      tdAcciones.appendChild(btnEliminar);

      row.appendChild(tdAcciones);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const wrapper = document.createElement('div');
    wrapper.className = 'table-container';
    wrapper.appendChild(table);
    container.innerHTML = '';
    container.appendChild(wrapper);
  },

  
  cargarReservas() {
    const container = document.getElementById('reservas-listado');
    let reservas = Reservas.getAll();

    if (this.filtroReservasUsuarioId) {
      reservas = Reservas.getByUsuario(this.filtroReservasUsuarioId);
    }

    if (reservas.length === 0) {
      const mensaje = this.filtroReservasUsuarioId
        ? '<p class="text-gray">No hay reservas para este usuario</p>'
        : '<p class="text-gray">No hay reservas registradas</p>';
      container.innerHTML = mensaje;
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Cliente', 'Servicio', 'Fecha', 'Hora', 'Estado', 'Acciones'];
    const headerRow = document.createElement('tr');
    headers.forEach(h => {
      const th = document.createElement('th');
      th.textContent = h;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    reservas.forEach(reserva => {
      const row = document.createElement('tr');
      const usuarios = Storage.get(Storage.KEYS.USERS) || [];
      const usuario = usuarios.find(u => u.id === reserva.usuarioId);

      const tdCliente = document.createElement('td');
      tdCliente.textContent = usuario ? usuario.nombre : 'Usuario eliminado';
      row.appendChild(tdCliente);

      const tdServicio = document.createElement('td');
      tdServicio.textContent = reserva.servicioNombre;
      row.appendChild(tdServicio);

      const tdFecha = document.createElement('td');
      tdFecha.textContent = UI.formatDate(reserva.fecha);
      row.appendChild(tdFecha);

      const tdHora = document.createElement('td');
      tdHora.textContent = reserva.hora;
      row.appendChild(tdHora);

      const tdEstado = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = `status-badge ${
        reserva.estado === 'confirmada' ? 'status-active' :
        reserva.estado === 'cancelada' ? 'status-inactive' : 'status-pending'
      }`;
      badge.textContent = reserva.estado.charAt(0).toUpperCase() + reserva.estado.slice(1);
      tdEstado.appendChild(badge);
      row.appendChild(tdEstado);

      const tdAcciones = document.createElement('td');
      tdAcciones.style.display = 'flex';
      tdAcciones.style.gap = '0.5rem';

      if (reserva.estado === 'confirmada') {
        const btnCompletar = document.createElement('button');
        btnCompletar.className = 'btn btn-small';
        btnCompletar.textContent = 'Completar';
        btnCompletar.addEventListener('click', () => {
          Reservas.update(reserva.id, { estado: 'completada' });
          UI.success('Reserva marcada como completada');
          this.cargarReservas();
        });
        tdAcciones.appendChild(btnCompletar);

        const btnCancelar = document.createElement('button');
        btnCancelar.className = 'btn btn-danger btn-small';
        btnCancelar.textContent = 'Cancelar';
        btnCancelar.addEventListener('click', () => {
          UI.showConfirmModal(
            'Cancelar Reserva',
            '¿Cancelar esta reserva?',
            () => {
              Reservas.cancelar(reserva.id);
              UI.success('Reserva cancelada');
              this.cargarReservas();
            }
          );
        });
        tdAcciones.appendChild(btnCancelar);
      }

      const btnEliminar = document.createElement('button');
      btnEliminar.className = 'btn btn-danger btn-small';
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.addEventListener('click', () => {
        UI.showConfirmModal(
          'Eliminar Reserva',
          '¿Eliminar esta reserva?',
          () => {
            Reservas.delete(reserva.id);
            UI.success('Reserva eliminada');
            this.cargarReservas();
          }
        );
      });
      tdAcciones.appendChild(btnEliminar);

      row.appendChild(tdAcciones);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const wrapper = document.createElement('div');
    wrapper.className = 'table-container';
    wrapper.appendChild(table);
    container.innerHTML = '';
    container.appendChild(wrapper);

    if (this.filtroReservasUsuarioId) {
      const usuario = (Storage.get(Storage.KEYS.USERS) || []).find(u => u.id === this.filtroReservasUsuarioId);
      const detalle = document.createElement('div');
      detalle.className = 'section-note mb-3';
      detalle.innerHTML = `Reservas de <strong>${usuario ? usuario.nombre : 'Usuario eliminado'}</strong>`;
      container.prepend(detalle);
    }
  },

  
  inicializarNavegacion() {
    const menuLinks = document.querySelectorAll('.admin-menu a[data-seccion]');
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const seccion = link.dataset.seccion;

        if (seccion === 'dashboard') {
          this.cargarDashboard();
        }

        menuLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        document.querySelectorAll('[id^="seccion-"]').forEach(s => s.classList.add('hidden'));

        const seccionElement = document.getElementById(`seccion-${seccion}`);
        if (seccionElement) {
          seccionElement.classList.remove('hidden');
        }

        switch (seccion) {
          case 'servicios':
            this.cargarServicios();
            break;
          case 'categorias':
            this.cargarCategorias();
            break;
          case 'usuarios':
            this.cargarUsuarios();
            break;
          case 'reservas':
            this.filtroReservasUsuarioId = null;
            this.cargarReservas();
            break;
        }

        this.seccionActual = seccion;
      });
    });
  },

  
  inicializarBotones() {

    document.getElementById('btn-logout-admin').addEventListener('click', (e) => {
      e.preventDefault();
      UI.showConfirmModal(
        'Cerrar Sesión',
        '¿Cerrar sesión de admin?',
        () => {
          Auth.logout();
        }
      );
    });

    document.getElementById('btn-nuevo-servicio').addEventListener('click', () => {
      this.mostrarModalServicio();
    });

    document.getElementById('btn-nueva-categoria').addEventListener('click', () => {
      this.mostrarModalCategoria();
    });
  },

  
  mostrarModalServicio(servicio = null) {
    const categorias = Categorias.getActive();
    const opcionesCategorias = categorias.map(c =>
      `<option value="${c.id}" ${servicio && servicio.categoria === c.id ? 'selected' : ''}>${c.nombre}</option>`
    ).join('');

    const form = document.createElement('form');
    form.id = 'form-servicio';
    form.innerHTML = `
      <div class="form-group">
        <label for="srv-nombre">Nombre *</label>
        <input type="text" id="srv-nombre" name="nombre" required value="${servicio ? servicio.nombre : ''}">
      </div>
      <div class="form-group">
        <label for="srv-descripcion">Descripción</label>
        <textarea id="srv-descripcion" name="descripcion" rows="3">${servicio ? servicio.descripcion : ''}</textarea>
      </div>
      <div class="form-group">
        <label for="srv-precio">Precio ($) *</label>
        <input type="number" id="srv-precio" name="precio" required value="${servicio ? servicio.precio : ''}">
      </div>
      <div class="form-group">
        <label for="srv-duracion">Duración (minutos)</label>
        <input type="number" id="srv-duracion" name="duracion" value="${servicio ? servicio.duracion : '60'}">
      </div>
      <div class="form-group">
        <label for="srv-condiciones">Condiciones</label>
        <textarea id="srv-condiciones" name="condiciones" rows="2">${servicio ? servicio.condiciones : ''}</textarea>
      </div>
      <div class="form-group">
        <label for="srv-categoria">Categoría *</label>
        <select id="srv-categoria" name="categoria" required>
          <option value="">Seleccionar</option>
          ${opcionesCategorias}
        </select>
      </div>
      <div class="form-group">
        <label for="srv-imagen">Ícono/Emoji</label>
        <input type="text" id="srv-imagen" name="imagen" value="${servicio ? servicio.imagen : '🔧'}" placeholder="🔧">
      </div>
      <div class="form-group">
        <label for="srv-estado">Estado</label>
        <select id="srv-estado" name="estado">
          <option value="activo" ${!servicio || servicio.estado === 'activo' ? 'selected' : ''}>Activo</option>
          <option value="inactivo" ${servicio && servicio.estado === 'inactivo' ? 'selected' : ''}>Inactivo</option>
        </select>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" id="srv-destacado" name="destacado" ${servicio && servicio.destacado ? 'checked' : ''}>
          Destacado
        </label>
      </div>
      <button type="submit" class="btn btn-primary btn-block">${servicio ? 'Actualizar' : 'Crear'} Servicio</button>
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        nombre: document.getElementById('srv-nombre').value,
        descripcion: document.getElementById('srv-descripcion').value,
        precio: document.getElementById('srv-precio').value,
        duracion: document.getElementById('srv-duracion').value,
        condiciones: document.getElementById('srv-condiciones').value,
        categoria: document.getElementById('srv-categoria').value,
        imagen: document.getElementById('srv-imagen').value,
        estado: document.getElementById('srv-estado').value,
        destacado: document.getElementById('srv-destacado').checked
      };

      let result;
      if (servicio) {
        result = Servicios.update(servicio.id, data);
      } else {
        result = Servicios.create(data);
      }

      if (result.success) {
        UI.success(result.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        UI.error(result.message);
      }
    });

    UI.showInfoModal(
      servicio ? 'Editar Servicio' : 'Nuevo Servicio',
      form
    );
  },

  
  mostrarModalCategoria(categoria = null) {
    const form = document.createElement('form');
    form.id = 'form-categoria';
    form.innerHTML = `
      <div class="form-group">
        <label for="cat-nombre">Nombre *</label>
        <input type="text" id="cat-nombre" name="nombre" required value="${categoria ? categoria.nombre : ''}">
      </div>
      <div class="form-group">
        <label for="cat-descripcion">Descripción</label>
        <textarea id="cat-descripcion" name="descripcion" rows="2">${categoria ? categoria.descripcion : ''}</textarea>
      </div>
      <div class="form-group">
        <label for="cat-estado">Estado</label>
        <select id="cat-estado" name="estado">
          <option value="activo" ${!categoria || categoria.estado === 'activo' ? 'selected' : ''}>Activo</option>
          <option value="inactivo" ${categoria && categoria.estado === 'inactivo' ? 'selected' : ''}>Inactivo</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary btn-block">${categoria ? 'Actualizar' : 'Crear'} Categoría</button>
    `;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const data = {
        nombre: document.getElementById('cat-nombre').value,
        descripcion: document.getElementById('cat-descripcion').value,
        estado: document.getElementById('cat-estado').value
      };

      let result;
      if (categoria) {
        result = Categorias.update(categoria.id, data);
      } else {
        result = Categorias.create(data);
      }

      if (result.success) {
        UI.success(result.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        UI.error(result.message);
      }
    });

    UI.showInfoModal(
      categoria ? 'Editar Categoría' : 'Nueva Categoría',
      form
    );
  },

  
  editarServicio(id) {
    const servicio = Servicios.getById(id);
    if (servicio) {
      this.mostrarModalServicio(servicio);
    }
  },

  
  eliminarServicio(id) {
    UI.showConfirmModal(
      'Eliminar Servicio',
      '¿Seguro que deseas eliminar este servicio?',
      () => {
        const result = Servicios.delete(id);
        if (result.success) {
          UI.success(result.message);
          this.cargarServicios();
        } else {
          UI.error(result.message);
        }
      }
    );
  },

  
  editarCategoria(id) {
    const categoria = Categorias.getById(id);
    if (categoria) {
      this.mostrarModalCategoria(categoria);
    }
  },

  
  eliminarCategoria(id) {
    UI.showConfirmModal(
      'Eliminar Categoría',
      '¿Seguro que deseas eliminar esta categoría?',
      () => {
        const result = Categorias.delete(id);
        if (result.success) {
          UI.success(result.message);
          this.cargarCategorias();
        } else {
          UI.error(result.message);
        }
      }
    );
  },

  
  eliminarUsuario(id) {
    UI.showConfirmModal(
      'Eliminar Usuario',
      '¿Seguro que deseas eliminar este usuario? Se eliminarán también sus reservas.',
      () => {
        const usuarios = Storage.get(Storage.KEYS.USERS) || [];
        const filtered = usuarios.filter(u => u.id !== id);
        Storage.set(Storage.KEYS.USERS, filtered);

        const reservas = Reservas.getByUsuario(id);
        reservas.forEach(r => Reservas.delete(r.id));

        UI.success('Usuario eliminado');
        this.cargarUsuarios();
      }
    );
  },

  
  verReservasUsuario(usuarioId) {
    this.filtroReservasUsuarioId = usuarioId;
    const menuLinks = document.querySelectorAll('.admin-menu a[data-seccion]');
    menuLinks.forEach(link => link.classList.remove('active'));
    const reservasLink = document.querySelector('.admin-menu a[data-seccion="reservas"]');
    if (reservasLink) reservasLink.classList.add('active');

    document.querySelectorAll('[id^="seccion-"]').forEach(s => s.classList.add('hidden'));
    const reservasSection = document.getElementById('seccion-reservas');
    if (reservasSection) reservasSection.classList.remove('hidden');

    this.cargarReservas();
  }
};
