// ═══════════════════════════════════════════════
//  MERCO SUR — Frontend JS
//  Consume la API REST en localhost:3333
// ═══════════════════════════════════════════════

const API_BASE = 'http://localhost:3333';

// ── Estado global de la app ──────────────────
const state = {
  allItems:       [],
  activeCategory: '',
  searchTerm:     '',
  isLoading:      false
};

// ═══════════════════════════════════════════════
//  UTILIDADES
// ═══════════════════════════════════════════════

/**
 * Muestra un toast de notificación temporario
 * @param {string} message - Texto a mostrar
 * @param {number} duration - Milisegundos (default 3000)
 */
function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.add('hidden');
  }, duration);
}

/**
 * Genera partículas de brasa flotando en el hero
 */
function createEmberParticles() {
  const container = document.getElementById('hero-embers');
  if (!container) return;

  const PARTICLE_COUNT = 28;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    particle.classList.add('ember-particle');

    // Tamaño aleatorio entre 2px y 6px
    const size = Math.random() * 4 + 2;

    // Color entre naranja y amarillo
    const hue    = Math.floor(Math.random() * 30) + 15;
    const sat    = Math.floor(Math.random() * 30) + 70;
    const light  = Math.floor(Math.random() * 20) + 55;

    // Deriva horizontal aleatoria
    const drift  = (Math.random() - 0.5) * 80;

    // Posición horizontal aleatoria
    const left   = Math.random() * 100;

    // Duración y delay aleatorios
    const duration = Math.random() * 8 + 5;
    const delay    = Math.random() * 8;

    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: hsl(${hue}, ${sat}%, ${light}%);
      bottom: ${Math.random() * 30}%;
      left: ${left}%;
      --drift: ${drift}px;
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      box-shadow: 0 0 ${size * 2}px hsl(${hue}, 90%, 65%);
    `;

    container.appendChild(particle);
  }
}

/**
 * Activa/desactiva el menú hamburguesa en mobile
 */
function initHamburger() {
  const btn = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    nav.classList.toggle('open');
    // Animar las barras del hamburger
    const spans = btn.querySelectorAll('span');
    if (nav.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Cerrar al hacer click en un link de la nav
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });
}

/**
 * Resalta el link de navegación activo según el scroll
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${entry.target.id}`) {
              link.classList.add('active-nav');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
}

// ═══════════════════════════════════════════════
//  API — ITEMS
// ═══════════════════════════════════════════════

/**
 * Carga items desde la API con filtros opcionales
 * @param {Object} filters - { category?: string, name?: string }
 * @returns {Promise<Array>}
 */
async function fetchItems(filters = {}) {
  const params = new URLSearchParams();

  if (filters.category && filters.category.trim()) {
    params.append('category', filters.category.trim());
  }
  if (filters.name && filters.name.trim()) {
    params.append('name', filters.name.trim());
  }

  const queryString = params.toString();
  const url = `${API_BASE}/items${queryString ? '?' + queryString : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al cargar los items');
  }

  const data = await response.json();
  return data.data || [];
}

// ═══════════════════════════════════════════════
//  API — CLIENTS
// ═══════════════════════════════════════════════

/**
 * Carga todos los clientes desde la API
 * @returns {Promise<Array>}
 */
async function fetchClients() {
  const response = await fetch(`${API_BASE}/clients`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al cargar los clientes');
  }
  const data = await response.json();
  return data.data || [];
}

/**
 * Carga los items de un cliente específico
 * @param {string} clientId - ID de MongoDB del cliente
 * @returns {Promise<Array>}
 */
async function fetchClientItems(clientId) {
  const response = await fetch(`${API_BASE}/clients/${clientId}/items`);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al cargar los items del cliente');
  }
  const data = await response.json();
  return data.data || [];
}

// ═══════════════════════════════════════════════
//  RENDER — ITEMS
// ═══════════════════════════════════════════════

/**
 * Construye el HTML de una card de producto
 * @param {Object} item - Documento de MongoDB
 * @returns {string} HTML string
 */
function buildItemCard(item) {
  const imageSrc = item.image && item.image.trim()
    ? item.image
    : `https://picsum.photos/seed/${item._id}/400/300`;

  const linkHref = item.link && item.link.trim() ? item.link : '#menu';

  // Truncar descripción a 110 caracteres
  const desc = item.description && item.description.length > 110
    ? item.description.substring(0, 110) + '…'
    : (item.description || 'Un plato especial de nuestra parrilla.');

  return `
    <article class="item-card" data-id="${item._id}">
      <div class="item-card__img-wrap">
        <img
          class="item-card__img"
          src="${imageSrc}"
          alt="${item.name}"
          loading="lazy"
          onerror="this.src='https://picsum.photos/seed/fallback${Math.random()}/400/300'"
        />
        <span class="item-card__category">${item.category}</span>
      </div>
      <div class="item-card__body">
        <h3 class="item-card__name">${item.name}</h3>
        <p class="item-card__desc">${desc}</p>
        <div class="item-card__footer">
          <a class="item-card__link" href="${linkHref}">Ver plato</a>
          <div class="item-card__dot" title="Disponible ahora"></div>
        </div>
      </div>
    </article>
  `;
}

/**
 * Renderiza el grid de items en el DOM
 * @param {Array} items - Array de documentos de items
 */
function renderItems(items) {
  const grid       = document.getElementById('items-grid');
  const emptyState = document.getElementById('empty-state');
  const counter    = document.getElementById('results-count');

  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = '';
    emptyState?.classList.remove('hidden');
    if (counter) counter.textContent = '';
    return;
  }

  emptyState?.classList.add('hidden');

  if (counter) {
    const label = items.length === 1 ? 'plato encontrado' : 'platos encontrados';
    counter.textContent = `${items.length} ${label}`;
  }

  // Añadir animation-delay escalonado por card
  grid.innerHTML = items.map((item, index) => {
    const card = buildItemCard(item);
    // Inyectar delay en el estilo de cada card
    return card.replace(
      'class="item-card"',
      `class="item-card" style="animation-delay: ${index * 0.07}s"`
    );
  }).join('');
}

/**
 * Muestra el estado de carga en el grid
 */
function showGridLoading() {
  const grid = document.getElementById('items-grid');
  if (grid) {
    grid.innerHTML = `
      <div class="loading-state">
        <div class="loading-spinner"></div>
        <p>Cargando el menú...</p>
      </div>
    `;
  }
  document.getElementById('empty-state')?.classList.add('hidden');
  const counter = document.getElementById('results-count');
  if (counter) counter.textContent = '';
}

/**
 * Carga y renderiza items aplicando los filtros del estado global
 */
async function loadAndRenderItems() {
  if (state.isLoading) return;
  state.isLoading = true;

  showGridLoading();

  try {
    const items = await fetchItems({
      category: state.activeCategory,
      name:     state.searchTerm
    });

    state.allItems = items;
    renderItems(items);
  } catch (error) {
    console.error('Error cargando items:', error);
    const grid = document.getElementById('items-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="loading-state">
          <span style="font-size:2rem">⚠️</span>
          <p>No se pudo cargar el menú. Verificá que el servidor esté corriendo.</p>
        </div>
      `;
    }
    showToast('⚠️ Error al conectar con la API');
  } finally {
    state.isLoading = false;
  }
}

// ═══════════════════════════════════════════════
//  RENDER — CLIENTS
// ═══════════════════════════════════════════════

/**
 * Construye el HTML de una card de cliente
 * @param {Object} client - Documento de MongoDB
 * @returns {string} HTML string
 */
function buildClientCard(client) {
  const imageSrc = client.image && client.image.trim()
    ? client.image
    : `https://picsum.photos/seed/client${client._id}/400/300`;

  const desc = client.description && client.description.length > 100
    ? client.description.substring(0, 100) + '…'
    : (client.description || 'Cliente frecuente de Merco Sur.');

  return `
    <div
      class="client-card"
      data-client-id="${client._id}"
      data-client-name="${client.name}"
      role="button"
      tabindex="0"
      title="Ver pedidos de ${client.name}"
    >
      <img
        class="client-card__img"
        src="${imageSrc}"
        alt="${client.name}"
        loading="lazy"
        onerror="this.src='https://picsum.photos/seed/clientfb/400/300'"
      />
      <div class="client-card__body">
        <h3 class="client-card__name">${client.name}</h3>
        <p class="client-card__desc">${desc}</p>
        <span class="client-card__cta">Ver sus pedidos</span>
      </div>
    </div>
  `;
}

/**
 * Renderiza el grid de clientes en el DOM
 */
async function loadAndRenderClients() {
  const grid = document.getElementById('clients-grid');
  if (!grid) return;

  grid.innerHTML = `
    <div class="loading-state">
      <div class="loading-spinner"></div>
      <p>Cargando clientes...</p>
    </div>
  `;

  try {
    const clients = await fetchClients();

    if (clients.length === 0) {
      grid.innerHTML = `
        <div class="loading-state">
          <span style="font-size:2rem">👥</span>
          <p>Aún no hay clientes registrados.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = clients.map((client, i) => {
      const card = buildClientCard(client);
      return card.replace(
        'class="client-card"',
        `class="client-card" style="animation-delay: ${i * 0.1}s"`
      );
    }).join('');

    // Adjuntar listeners a las cards de clientes
    grid.querySelectorAll('.client-card').forEach(card => {
      card.addEventListener('click', () => openClientModal(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') openClientModal(card);
      });
    });

  } catch (error) {
    console.error('Error cargando clientes:', error);
    grid.innerHTML = `
      <div class="loading-state">
        <span style="font-size:2rem">⚠️</span>
        <p>No se pudieron cargar los clientes.</p>
      </div>
    `;
    showToast('⚠️ Error al cargar clientes');
  }
}

// ═══════════════════════════════════════════════
//  MODAL DE CLIENTE
// ═══════════════════════════════════════════════

/**
 * Abre el modal con los items de un cliente
 * @param {HTMLElement} card - Card del cliente clickeada
 */
async function openClientModal(card) {
  const clientId   = card.dataset.clientId;
  const clientName = card.dataset.clientName;

  const modal     = document.getElementById('client-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalItems = document.getElementById('modal-items');

  if (!modal || !modalTitle || !modalItems) return;

  modalTitle.textContent = clientName;
  modalItems.innerHTML   = `
    <div class="loading-state" style="padding: 1rem 0">
      <div class="loading-spinner"></div>
      <p>Cargando pedidos...</p>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  try {
    const items = await fetchClientItems(clientId);

    if (items.length === 0) {
      modalItems.innerHTML = `
        <div style="text-align:center; padding: 1.5rem; color: var(--color-text-muted);">
          <span style="font-size: 2rem">🍽️</span>
          <p style="margin-top: 0.5rem">Este cliente no tiene pedidos registrados.</p>
        </div>
      `;
      return;
    }

    modalItems.innerHTML = items.map(item => {
      const imgSrc = item.image && item.image.trim()
        ? item.image
        : `https://picsum.photos/seed/${item._id}/64/64`;

      return `
        <div class="modal-item">
          <img
            src="${imgSrc}"
            alt="${item.name}"
            onerror="this.src='https://picsum.photos/seed/mfb/64/64'"
          />
          <div class="modal-item__info">
            <strong>${item.name}</strong>
            <span>${item.category}</span>
          </div>
        </div>
      `;
    }).join('');

  } catch (error) {
    console.error('Error al cargar items del cliente:', error);
    modalItems.innerHTML = `
      <div style="text-align:center; padding:1rem; color: var(--color-text-muted);">
        ⚠️ No se pudieron cargar los pedidos.
      </div>
    `;
    showToast('⚠️ Error al cargar pedidos del cliente');
  }
}

/**
 * Cierra el modal de cliente
 */
function closeClientModal() {
  const modal = document.getElementById('client-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

// ═══════════════════════════════════════════════
//  FILTROS Y BÚSQUEDA
// ═══════════════════════════════════════════════

/**
 * Inicializa los botones de filtro de categoría
 */
function initCategoryFilters() {
  const filterContainer = document.getElementById('category-filters');
  if (!filterContainer) return;

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Actualizar estado visual
    filterContainer.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    // Actualizar estado y recargar
    state.activeCategory = btn.dataset.category || '';
    loadAndRenderItems();
  });
}

/**
 * Inicializa el input de búsqueda con debounce
 */
function initSearchInput() {
  const input = document.getElementById('search-input');
  if (!input) return;

  let debounceTimer;

  input.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.searchTerm = e.target.value.trim();
      loadAndRenderItems();
    }, 350);
  });

  // Limpiar búsqueda con Escape
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value      = '';
      state.searchTerm = '';
      loadAndRenderItems();
    }
  });
}

// ═══════════════════════════════════════════════
//  LINKS DEL FOOTER (categorías)
// ═══════════════════════════════════════════════

/**
 * Los links del footer que filtran por categoría
 * navegan al menú y activan el filtro correspondiente
 */
function initFooterCategoryLinks() {
  document.querySelectorAll('[data-category-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const category = link.dataset.categoryLink;

      // Scroll al menú
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });

      // Activar el filtro correspondiente
      setTimeout(() => {
        const filterBtn = document.querySelector(
          `.filter-btn[data-category="${category}"]`
        );
        if (filterBtn) filterBtn.click();
      }, 600);
    });
  });
}

// ═══════════════════════════════════════════════
//  FORMULARIO DE CONTACTO (simulado)
// ═══════════════════════════════════════════════

function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form || !success) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled    = true;

    // Simular envío (en producción sería un fetch real)
    await new Promise(resolve => setTimeout(resolve, 1200));

    form.classList.add('hidden');
    success.classList.remove('hidden');
    showToast('✅ ¡Consulta enviada con éxito!');
  });
}

// ═══════════════════════════════════════════════
//  ANIMACIÓN ON SCROLL (Intersection Observer)
// ═══════════════════════════════════════════════

function initScrollAnimations() {
  const targets = document.querySelectorAll(
    '.stat-item, .feature-item, .contact-item, .about-img'
  );

  if (!targets.length) return;

  // Preparar elementos para animación
  targets.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(el => observer.observe(el));
}

// ═══════════════════════════════════════════════
//  HEADER SCROLL EFFECT
// ═══════════════════════════════════════════════

function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.background = 'rgba(10, 8, 7, 0.97)';
    } else {
      header.style.background = 'rgba(15, 12, 10, 0.85)';
    }
  }, { passive: true });
}

// ═══════════════════════════════════════════════
//  INIT — PUNTO DE ENTRADA PRINCIPAL
// ═══════════════════════════════════════════════

async function init() {
  // Efectos visuales del hero
  createEmberParticles();

  // UI interactions
  initHamburger();
  initScrollSpy();
  initHeaderScroll();
  initScrollAnimations();

  // Filtros y búsqueda del menú
  initCategoryFilters();
  initSearchInput();
  initFooterCategoryLinks();

  // Formulario de contacto
  initContactForm();

  // Modal de clientes: cerrar
  document.getElementById('modal-close')?.addEventListener('click', closeClientModal);
  document.getElementById('client-modal')?.addEventListener('click', (e) => {
    // Cerrar si se hace click en el overlay (fuera del box)
    if (e.target.id === 'client-modal') closeClientModal();
  });

  // Cerrar modal con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeClientModal();
  });

  // Cargar datos desde la API
  await Promise.all([
    loadAndRenderItems(),
    loadAndRenderClients()
  ]);
}

// Arrancar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);