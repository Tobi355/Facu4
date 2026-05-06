

const UI = {
  
  toastContainer: null,

  
  init() {
    this.initMobileMenu();
    this.initToastContainer();
    this.initUserDropdown();
    this.updateNavAuth();
    this.disableNativeFormValidation();
    this.initScrollAnimations();
  },

  
  disableNativeFormValidation() {
    document.querySelectorAll('form').forEach(form => {
      form.noValidate = true;
    });
  },

  
  initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    if (toggle && navUl) {
      toggle.addEventListener('click', () => {
        navUl.classList.toggle('active');
      });
    }
  },

  
  initToastContainer() {
    this.toastContainer = document.createElement('div');
    this.toastContainer.id = 'toast-container';
    this.toastContainer.className = 'toast-container';
    document.body.appendChild(this.toastContainer);
  },

  
  initUserDropdown() {

    document.addEventListener('click', (e) => {
      const container = e.target.closest('.nav-user-container');
      if (!container) {
        document.querySelectorAll('.nav-user-container').forEach(c => {
          c.classList.remove('open');
        });
      }
    });
  },

  
  updateNavAuth() {
    const session = Storage.get(Storage.KEYS.SESSION);
    const userContainer = document.querySelector('.nav-user-container');
    const adminLinks = document.querySelectorAll('.nav-admin');

    if (!userContainer) return;

    if (session) {

      const initial = session.nombre.charAt(0).toUpperCase();

      userContainer.innerHTML = `
        <button class="nav-user-btn" id="nav-user-toggle">
          <span class="nav-user-avatar">${initial}</span>
          <span class="nav-user-name">${session.nombre}</span>
          <span class="nav-user-arrow">▼</span>
        </button>
        <div class="nav-user-dropdown" id="nav-user-dropdown">
          <a href="perfil.html">
            <span class="dropdown-icon">👤</span>
            <span>Mi Perfil</span>
          </a>
          <a href="servicios.html">
            <span class="dropdown-icon">📋</span>
            <span>Mis Servicios</span>
          </a>
          <a href="#" id="nav-logout">
            <span class="dropdown-icon">🚪</span>
            <span>Cerrar Sesión</span>
          </a>
        </div>
      `;

      userContainer.classList.remove('hidden');

      const toggleBtn = userContainer.querySelector('#nav-user-toggle');
      const dropdown = userContainer.querySelector('#nav-user-dropdown');

      if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          userContainer.classList.toggle('open');
        });
      }

      const logoutBtn = userContainer.querySelector('#nav-logout');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.showConfirmModal(
            'Cerrar Sesión',
            '¿Estás seguro que deseas cerrar sesión?',
            () => {
              Auth.logout();
            }
          );
        });
      }

      adminLinks.forEach(el => el.classList.add('hidden'));
    } else {

      userContainer.innerHTML = `
        <a href="login.html" class="nav-btn">Ingresar</a>
      `;
      userContainer.classList.remove('hidden');
      adminLinks.forEach(el => el.classList.remove('hidden'));
    }
  },

  
  toast(message, type = 'info', duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
      success: '✓',
      error: '✕',
      info: 'ℹ'
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type] || icons.info}</span>
      <span class="toast-message">${message}</span>
      <div class="toast-progress" style="animation-duration: ${duration}ms"></div>
    `;

    this.toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  },

  
  success(message, duration = 3000) {
    this.toast(message, 'success', duration);
  },

  
  error(message, duration = 4000) {
    this.toast(message, 'error', duration);
  },

  
  info(message, duration = 3000) {
    this.toast(message, 'info', duration);
  },

  
  showConfirmModal(title, message, onConfirm, onCancel) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';

    const modal = document.createElement('div');
    modal.className = 'modal-content';

    const header = document.createElement('div');
    header.className = 'modal-header';

    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    header.appendChild(titleEl);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => this.closeModal(overlay));
    header.appendChild(closeBtn);

    modal.appendChild(header);

    const body = document.createElement('div');
    body.className = 'modal-body';
    body.style.textAlign = 'center';
    body.innerHTML = `<p style="margin-bottom: 1.5rem; font-size: 1.05rem;">${message}</p>`;

    const buttonsContainer = document.createElement('div');
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.gap = '1rem';
    buttonsContainer.style.justifyContent = 'center';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'btn btn-secondary';
    cancelBtn.textContent = 'Cancelar';
    cancelBtn.style.minWidth = '120px';
    cancelBtn.addEventListener('click', () => {
      this.closeModal(overlay);
      if (onCancel) onCancel();
    });

    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'btn btn-primary';
    confirmBtn.textContent = 'Confirmar';
    confirmBtn.style.minWidth = '120px';
    confirmBtn.addEventListener('click', () => {
      this.closeModal(overlay);
      if (onConfirm) onConfirm();
    });

    buttonsContainer.appendChild(cancelBtn);
    buttonsContainer.appendChild(confirmBtn);
    body.appendChild(buttonsContainer);

    modal.appendChild(body);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const escHandler = (e) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', escHandler);
        this.closeModal(overlay);
      }
    };
    document.addEventListener('keydown', escHandler);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.closeModal(overlay);
      }
    });
  },

  
  showInfoModal(title, content, onClose) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay active';

    const modal = document.createElement('div');
    modal.className = 'modal-content';

    const header = document.createElement('div');
    header.className = 'modal-header';

    const titleEl = document.createElement('h3');
    titleEl.textContent = title;
    header.appendChild(titleEl);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'modal-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => this.closeModal(overlay, onClose));
    header.appendChild(closeBtn);

    modal.appendChild(header);

    const body = document.createElement('div');
    body.className = 'modal-body';
    if (typeof content === 'string') {
      body.innerHTML = content;
    } else {
      body.appendChild(content);
    }

    const closeActionBtn = document.createElement('button');
    closeActionBtn.className = 'btn btn-primary btn-block';
    closeActionBtn.textContent = 'Cerrar';
    closeActionBtn.style.marginTop = '1.5rem';
    closeActionBtn.addEventListener('click', () => this.closeModal(overlay, onClose));
    body.appendChild(closeActionBtn);

    modal.appendChild(body);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const escHandler = (e) => {
      if (e.key === 'Escape') {
        document.removeEventListener('keydown', escHandler);
        this.closeModal(overlay, onClose);
      }
    };
    document.addEventListener('keydown', escHandler);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        this.closeModal(overlay, onClose);
      }
    });
  },

  
  closeModal(overlay, onClose) {
    overlay.classList.remove('active');
    setTimeout(() => overlay.remove(), 300);
    if (onClose) onClose();
  },

  
  createServiceCard(servicio) {
    const card = document.createElement('article');
    card.className = 'card fade-in';
    card.dataset.servicioId = servicio.id;

    const image = document.createElement('div');
    image.className = 'card-image';
    image.textContent = servicio.imagen || '🔧';
    card.appendChild(image);

    const content = document.createElement('div');
    content.className = 'card-content';

    const title = document.createElement('h3');
    title.className = 'card-title';
    title.textContent = servicio.nombre;
    content.appendChild(title);

    const desc = document.createElement('p');
    desc.className = 'card-description';
    desc.textContent = this.truncateText(servicio.descripcion, 100);
    content.appendChild(desc);

    const meta = document.createElement('div');
    meta.className = 'card-meta';

    const duracion = document.createElement('span');
    duracion.textContent = `⏱ ${Servicios.formatDuration(servicio.duracion)}`;
    meta.appendChild(duracion);

    const categoria = document.createElement('span');
    categoria.textContent = `📁 ${Categorias.getNombre(servicio.categoria)}`;
    meta.appendChild(categoria);

    content.appendChild(meta);

    const price = document.createElement('div');
    price.className = 'card-price';
    price.textContent = Servicios.formatPrice(servicio.precio);
    content.appendChild(price);

    const btn = document.createElement('a');
    btn.className = 'btn btn-primary btn-block';
    btn.href = `detalle.html?id=${servicio.id}`;
    btn.textContent = 'Ver detalle';
    content.appendChild(btn);

    card.appendChild(content);
    return card;
  },

  
  truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  },

  
  renderServices(containerSelector, servicios) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = '';

    if (servicios.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'text-center text-gray';
      empty.textContent = 'No se encontraron servicios';
      container.appendChild(empty);
      return;
    }

    servicios.forEach(servicio => {
      const card = this.createServiceCard(servicio);
      container.appendChild(card);
    });

    this.checkScrollAnimations();
  },

  
  renderCategoriasOptions(selectSelector, includeAll = false) {
    const select = document.querySelector(selectSelector);
    if (!select) return;

    select.innerHTML = '';

    if (includeAll) {
      const allOption = document.createElement('option');
      allOption.value = '';
      allOption.textContent = 'Todas las categorías';
      select.appendChild(allOption);
    }

    const categorias = Categorias.getActive();
    categorias.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = cat.nombre;
      select.appendChild(option);
    });
  },

  
  getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  
  formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  
  validateForm(form, rules) {
    const errors = [];
    const formData = new FormData(form);

    for (const [field, rule] of Object.entries(rules)) {
      const value = formData.get(field) || '';

      if (rule.required && !value) {
        errors.push({ field, message: `${field} es obligatorio` });
        continue;
      }

      if (rule.email && value && !Auth.validateEmail(value)) {
        errors.push({ field, message: 'Email inválido' });
        continue;
      }

      if (rule.minLength && value.length < rule.minLength) {
        errors.push({ field, message: `Mínimo ${rule.minLength} caracteres` });
        continue;
      }
    }

    return errors;
  },

  
  showFormErrors(form, errors) {

    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));

    errors.forEach(err => {
      const group = form.querySelector(`[name="${err.field}"]`)?.closest('.form-group');
      if (group) {
        const errorEl = document.createElement('span');
        errorEl.className = 'form-error';
        errorEl.textContent = err.message;
        group.appendChild(errorEl);
        group.classList.add('error');
      }
    });
  },

  
  clearForm(form) {
    form.reset();
    form.querySelectorAll('.form-error').forEach(el => el.remove());
    form.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));
  },

  
  renderReservasTable(containerSelector, reservas) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = '';

    if (reservas.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'text-center text-gray';
      empty.textContent = 'No tienes reservas activas';
      container.appendChild(empty);
      return;
    }

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Servicio', 'Fecha', 'Hora', 'Estado', 'Acciones'];
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

      const tdServicio = document.createElement('td');
      tdServicio.textContent = reserva.servicioNombre;
      row.appendChild(tdServicio);

      const tdFecha = document.createElement('td');
      tdFecha.textContent = this.formatDate(reserva.fecha);
      row.appendChild(tdFecha);

      const tdHora = document.createElement('td');
      tdHora.textContent = reserva.hora;
      row.appendChild(tdHora);

      const tdEstado = document.createElement('td');
      const badge = document.createElement('span');
      badge.className = 'status-badge';

      if (reserva.estado === 'confirmada') {
        badge.classList.add('status-active');
        badge.textContent = 'Confirmada';
      } else if (reserva.estado === 'cancelada') {
        badge.classList.add('status-inactive');
        badge.textContent = 'Cancelada';
      } else if (reserva.estado === 'completada') {
        badge.classList.add('status-pending');
        badge.textContent = 'Completada';
      }
      tdEstado.appendChild(badge);
      row.appendChild(tdEstado);

      const tdAcciones = document.createElement('td');
      tdAcciones.style.display = 'flex';
      tdAcciones.style.gap = '0.5rem';

      if (reserva.estado === 'confirmada') {
        const btnCancelar = document.createElement('button');
        btnCancelar.className = 'btn btn-danger btn-small';
        btnCancelar.textContent = 'Cancelar';
        btnCancelar.addEventListener('click', () => {
          this.showConfirmModal(
            'Cancelar Reserva',
            '¿Seguro que deseas cancelar esta reserva?',
            () => {
              Reservas.cancelar(reserva.id);
              this.success('Reserva cancelada');
              setTimeout(() => window.location.reload(), 1000);
            }
          );
        });
        tdAcciones.appendChild(btnCancelar);
      }

      row.appendChild(tdAcciones);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const wrapper = document.createElement('div');
    wrapper.className = 'table-container';
    wrapper.appendChild(table);
    container.appendChild(wrapper);
  },

  
  initScrollAnimations() {
    this.checkScrollAnimations();
    window.addEventListener('scroll', () => this.checkScrollAnimations());
  },

  
  checkScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    const triggerBottom = window.innerHeight * 0.85;

    elements.forEach(el => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add('visible');
      }
    });
  },

  
  initIndex() {
    const container = document.getElementById('servicios-destacados');
    const destacados = Servicios.getDestacados();

    if (destacados.length > 0) {
      container.innerHTML = '';
      destacados.slice(0, 3).forEach(servicio => {
        container.appendChild(this.createServiceCard(servicio));
      });

      setTimeout(() => this.checkScrollAnimations(), 100);
    } else {
      container.innerHTML = '<p class="text-center text-gray">No hay servicios destacados</p>';
    }
  },

  
  initLogin() {

    if (Auth.redirectIfAuthenticated()) {
      return;
    }

    const form = document.getElementById('form-login');
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;

      const result = Auth.login(email, password);

      if (result.success) {
        UI.success(result.message + ', ' + (result.user ? result.user.nombre : 'Administrador'));
        setTimeout(() => {
          window.location.href = result.redirectUrl || (result.user ? 'perfil.html' : 'admin.html');
        }, 1000);
      } else {
        UI.error(result.message);
      }
    });
  },

  
  initServicios() {
    const grid = document.getElementById('servicios-grid');
    const filtrosContainer = document.getElementById('filtros-categorias');
    let categoriaActual = '';

    const categorias = Categorias.getActive();
    categorias.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'filter-btn';
      btn.textContent = cat.nombre;
      btn.dataset.categoria = cat.id;
      btn.addEventListener('click', () => {
        filtrosContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        categoriaActual = cat.id;
        filtrarServicios();
      });
      filtrosContainer.appendChild(btn);
    });

    function filtrarServicios() {
      grid.innerHTML = '';
      let servicios;

      if (categoriaActual) {
        servicios = Servicios.getByCategoria(categoriaActual);
      } else {
        servicios = Servicios.getActive();
      }

      if (servicios.length === 0) {
        grid.innerHTML = '<p class="text-center text-gray">No hay servicios en esta categoría</p>';
        return;
      }

      servicios.forEach(servicio => {
        grid.appendChild(UI.createServiceCard(servicio));
      });

      setTimeout(() => UI.checkScrollAnimations(), 100);
    }

    filtrarServicios();

    const btnTodas = filtrosContainer.querySelector('[data-categoria=""]');
    if (btnTodas) {
      btnTodas.addEventListener('click', () => {
        filtrosContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btnTodas.classList.add('active');
        categoriaActual = '';
        filtrarServicios();
      });
    }
  },

  
  initAdmin() {

    if (!Auth.requireAdmin()) {
      return;
    }

    Admin.init();
  },

  
  initPerfil() {

    if (!Auth.requireAuth()) {
      return;
    }

    if (Auth.isAdmin()) {
      window.location.href = 'admin.html';
      return;
    }

    const usuario = Auth.getCurrentUser();
    const session = Auth.getSession();

    if (!usuario) {
      this.error('Error al cargar el usuario');
      return;
    }

    document.getElementById('profile-name').textContent = usuario.nombre;
    document.getElementById('profile-email').textContent = usuario.email;
    document.getElementById('profile-avatar').textContent = usuario.nombre.charAt(0).toUpperCase();

    cargarReservas();

    document.getElementById('edit-nombre').value = usuario.nombre;
    document.getElementById('edit-email').value = usuario.email;
    document.getElementById('edit-telefono').value = usuario.telefono || '';

    const menuLinks = document.querySelectorAll('.profile-menu a[data-seccion]');
    menuLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const seccion = this.dataset.seccion;

        menuLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        document.getElementById('seccion-mis-reservas').classList.add('hidden');
        document.getElementById('seccion-editar-perfil').classList.add('hidden');

        if (seccion === 'mis-reservas') {
          document.getElementById('seccion-mis-reservas').classList.remove('hidden');
          cargarReservas();
        } else if (seccion === 'editar-perfil') {
          document.getElementById('seccion-editar-perfil').classList.remove('hidden');
        }
      });
    });

    document.getElementById('btn-logout').addEventListener('click', function(e) {
      e.preventDefault();
      UI.showConfirmModal(
        'Cerrar Sesión',
        '¿Estás seguro que deseas cerrar sesión?',
        () => {
          Auth.logout();
        }
      );
    });

    document.getElementById('form-editar-perfil').addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('edit-nombre').value;
      const email = document.getElementById('edit-email').value;
      const telefono = document.getElementById('edit-telefono').value;
      const password = document.getElementById('edit-password').value;

      const data = { nombre, email, telefono };
      if (password) {
        data.password = password;
      }

      const result = Auth.updateProfile(usuario.id, data);

      if (result.success) {
        UI.success(result.message);
        document.getElementById('edit-password').value = '';

        document.getElementById('profile-name').textContent = nombre;
        document.getElementById('profile-email').textContent = email;
        document.getElementById('profile-avatar').textContent = nombre.charAt(0).toUpperCase();
      } else {
        UI.error(result.message);
      }
    });

    function cargarReservas() {
      const usuario = Auth.getCurrentUser();
      const reservas = Reservas.getByUsuario(usuario.id);
      UI.renderReservasTable('#reservas-container', reservas);
    }
  },

  
  initRegistro() {

    if (Auth.redirectIfAuthenticated()) {
      return;
    }

    const form = document.getElementById('form-registro');
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const telefono = document.getElementById('telefono').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;

      if (password !== passwordConfirm) {
        UI.error('Las contraseñas no coinciden');
        return;
      }

      if (password.length < 6) {
        UI.error('La contraseña debe tener al menos 6 caracteres');
        return;
      }

      const result = Auth.register(nombre, email, password, telefono);

      if (result.success) {
        UI.success('Registro exitoso. ¡Bienvenido!');
        setTimeout(() => {
          window.location.href = 'perfil.html';
        }, 1500);
      } else {
        UI.error(result.message);
      }
    });
  },

  
  initContacto() {
    const form = document.getElementById('form-contacto');
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const telefono = document.getElementById('telefono').value;
      const mensaje = document.getElementById('mensaje').value;

      if (!nombre || !email || !mensaje) {
        UI.error('Completá los campos obligatorios');
        return;
      }

      if (!Auth.validateEmail(email)) {
        UI.error('Ingresá un email válido');
        return;
      }

      console.log('Formulario de contacto:', { nombre, email, telefono, mensaje });

      const contactos = Storage.get('whiteroad_contactos') || [];
      contactos.push({
        id: Storage.generateId(),
        nombre,
        email,
        telefono,
        mensaje,
        fecha: new Date().toISOString()
      });
      Storage.set('whiteroad_contactos', contactos);

      UI.success('Mensaje enviado. Te responderemos a la brevedad.');
      form.reset();
    });
  },

  
  initNosotros() {

  },

  
  initDetalle() {
    let usuario = Auth.getCurrentUser();

    const id = this.getUrlParam('id');
    const container = document.getElementById('detalle-container');

    if (!id) {
      container.innerHTML = `
        <div class="text-center">
          <h2>Servicio no encontrado</h2>
          <p class="mb-2">El servicio que buscas no existe o fue eliminado.</p>
          <a href="servicios.html" class="btn btn-primary">Ver servicios</a>
        </div>
      `;
      return;
    }

    const servicio = Servicios.getById(id);

    if (!servicio) {
      container.innerHTML = `
        <div class="text-center">
          <h2>Servicio no encontrado</h2>
          <p class="mb-2">El servicio que buscas no existe o fue eliminado.</p>
          <a href="servicios.html" class="btn btn-primary">Ver servicios</a>
        </div>
      `;
      return;
    }

    const categoria = Categorias.getNombre(servicio.categoria);

    container.innerHTML = `
      <div class="service-detail fade-in visible">
        <div class="service-detail-image">
          <div class="placeholder">${servicio.imagen || '🔧'}</div>
        </div>
        <div class="service-detail-info">
          <h2>${servicio.nombre}</h2>
          <p class="text-gray mb-2">${categoria}</p>
          <div class="service-detail-price">${Servicios.formatPrice(servicio.precio)}</div>

          <div class="service-detail-meta">
            <div class="meta-item">
              <div class="meta-item-label">Duración</div>
              <div class="meta-item-value">${Servicios.formatDuration(servicio.duracion)}</div>
            </div>
            <div class="meta-item">
              <div class="meta-item-label">Estado</div>
              <div class="meta-item-value">
                <span class="status-badge ${servicio.estado === 'activo' ? 'status-active' : 'status-inactive'}">
                  ${servicio.estado === 'activo' ? 'Disponible' : 'No disponible'}
                </span>
              </div>
            </div>
          </div>

          <div class="service-detail-description">
            <h3>Descripción</h3>
            <p>${servicio.descripcion}</p>
          </div>

          <div class="service-detail-conditions">
            <h3>Condiciones del servicio</h3>
            <ul>
              <li>${servicio.condiciones}</li>
            </ul>
          </div>

          ${usuario
            ? `<button class="btn btn-primary btn-block pulse" id="btn-reservar">Contratar Servicio</button>`
            : `<div class="text-center">
                <a href="login.html" class="btn btn-primary">Iniciá sesión para contratar este servicio</a>
              </div>`
          }
        </div>
      </div>
    `;

    const btnReservar = document.getElementById('btn-reservar');
    if (btnReservar) {
      btnReservar.addEventListener('click', function() {
        mostrarModalReserva();
      });
    }

    function mostrarModalReserva() {
      const servicio = Servicios.getById(UI.getUrlParam('id'));

      const form = document.createElement('form');
      form.id = 'form-reserva';
      form.innerHTML = `
        <div class="form-group">
          <label for="fecha">Fecha</label>
          <input type="date" id="fecha" name="fecha" required min="${new Date().toISOString().split('T')[0]}">
        </div>
        <div class="form-group">
          <label for="hora">Hora</label>
          <select id="hora" name="hora" required>
            <option value="">Seleccionar hora</option>
            <option value="08:00">08:00</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
          </select>
        </div>
        <div class="form-group">
          <label for="notas">Notas adicionales (opcional)</label>
          <textarea id="notas" name="notas" rows="3" placeholder="Indicá cualquier detalle adicional..."></textarea>
        </div>
        <div class="alert alert-info">
          <strong>Servicio:</strong> ${servicio.nombre}<br>
          <strong>Precio:</strong> ${Servicios.formatPrice(servicio.precio)}
        </div>
        <button type="submit" class="btn btn-primary btn-block">Confirmar Reserva</button>
      `;

      form.addEventListener('submit', function(e) {
        e.preventDefault();

        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const notas = document.getElementById('notas').value;

        if (!fecha || !hora) {
          UI.error('Completá fecha y hora');
          return;
        }

        const result = Reservas.create(usuario.id, servicio.id, fecha, hora, notas);

        if (result.success) {
          UI.success('Reserva creada exitosamente');
          setTimeout(() => {
            window.location.href = 'perfil.html';
          }, 1500);
        } else {
          UI.error(result.message);
        }
      });

      UI.showInfoModal('Reservar Servicio', form);
    }
  },

  
  initAdminLogin() {

    if (Auth.isAdmin()) {
      window.location.href = 'admin.html';
      return;
    }

    const form = document.getElementById('form-admin-login');
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const result = Auth.loginAdmin(email, password);

      if (result.success) {
        UI.success('Bienvenido Administrador');
        setTimeout(() => {
          window.location.href = 'admin.html';
        }, 1000);
      } else {
        UI.error(result.message);
      }
    });
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initPage());
} else {
  initPage();
}

function initPage() {
  UI.init(); // Inicializa lo común

  const path = window.location.pathname;
  const page = path.split('/').pop().replace('.html', '');

  switch (page) {
    case 'index':
      UI.initIndex();
      break;
    case 'login':
      UI.initLogin();
      break;
    case 'servicios':
      UI.initServicios();
      break;
    case 'admin':
      UI.initAdmin();
      break;
    case 'perfil':
      UI.initPerfil();
      break;
    case 'registro':
      UI.initRegistro();
      break;
    case 'contacto':
      UI.initContacto();
      break;
    case 'nosotros':
      UI.initNosotros();
      break;
    case 'detalle':
      UI.initDetalle();
      break;
    case 'admin-login':
      UI.initAdminLogin();
      break;
    default:

      break;
  }
}
