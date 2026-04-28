const API_BASE = 'http://localhost:3333';

const CUSTOM_ITEM_IMAGE = '';

const state = {
  allItems:         [],
  activeCategories: new Set(),
  searchTerm:       '',
  isLoading:        false
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

  // Enviar una entrada ?category= por cada categoría seleccionada
  // Express las leerá como array en req.query.category
  if (filters.categories && filters.categories.size > 0) {
    filters.categories.forEach(cat => params.append('category', cat));
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
//  RESERVA — PAGE-SPECIFIC
// ═══════════════════════════════════════════════

const reservationUrlParams = new URLSearchParams(window.location.search);
const reservationMainItemId = reservationUrlParams.get('id');
const reservationPrePoint = reservationUrlParams.get('punto');
const reservationPreExtras = reservationUrlParams.get('extras');

const reservationState = {
  mainItem: null,
  extraItems: [],
  selectedExtras: new Set(),
  persons: 2
};

function showState(stateId) {
  ['page-loading', 'page-error', 'page-content'].forEach(id => {
    document.getElementById(id)?.classList.toggle('hidden', id !== stateId);
  });
}

function generateRequestId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let id = 'MS-';
  for (let i = 0; i < 8; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

function formatDate(dateStr, timeStr) {
  if (!dateStr) return 'Sin fecha asignada';
  const [year, month, day] = dateStr.split('-').map(Number);
  const months = [
    'enero','febrero','marzo','abril','mayo','junio',
    'julio','agosto','septiembre','octubre','noviembre','diciembre'
  ];
  const days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  const date = new Date(year, month - 1, day);
  const dayName = days[date.getDay()];
  const base = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${day} de ${months[month - 1]} de ${year}`;
  return timeStr ? `${base} a las ${timeStr}hs` : base;
}

async function fetchItemById(id) {
  const response = await fetch(`${API_BASE}/items/${id}`);
  if (!response.ok) throw new Error('Plato no encontrado');
  const data = await response.json();
  if (!data.success || !data.data) throw new Error('Respuesta inválida al cargar plato');
  return data.data;
}

async function fetchAllItems() {
  const response = await fetch(`${API_BASE}/items`);
  if (!response.ok) throw new Error('Error al cargar el menú');
  const data = await response.json();
  return data.data || [];
}

function renderMainDish(item) {
  const imgSrc = item.image && item.image.trim()
    ? item.image
    : `https://picsum.photos/seed/${item._id}/400/300`;

  const img = document.getElementById('cart-main-img');
  img.src = imgSrc;
  img.alt = item.name;
  img.onerror = () => {
    img.src = `https://picsum.photos/seed/fallback_${item.category}/400/300`;
  };

  document.getElementById('cart-main-cat').textContent = item.category || '';
  document.getElementById('cart-main-name').textContent = item.name || '';

  const desc = item.description
    ? (item.description.length > 90 ? item.description.slice(0, 90) + '…' : item.description)
    : '';
  document.getElementById('cart-main-desc').textContent = desc;

  const metaRow = document.getElementById('cart-main-meta');
  metaRow.innerHTML = '';

  if (item.weight) {
    const pill = document.createElement('span');
    pill.className = 'meta-pill-sm';
    pill.innerHTML = `⚖️ ${item.weight}`;
    metaRow.appendChild(pill);
  }

  if (item.servings) {
    const pill = document.createElement('span');
    pill.className = 'meta-pill-sm';
    pill.innerHTML = `👥 ${item.servings}`;
    metaRow.appendChild(pill);
  }

  if (item.price) {
    const pill = document.createElement('span');
    pill.className = 'meta-pill-sm meta-pill-sm--price';
    pill.innerHTML = `💰 $${item.price.toLocaleString('es-AR')}`;
    metaRow.appendChild(pill);
  }

  const optsRow = document.getElementById('cart-selected-opts');
  optsRow.innerHTML = '';

  if (reservationPrePoint || reservationPreExtras) {
    optsRow.classList.remove('hidden');
    if (reservationPrePoint) {
      const tag = document.createElement('span');
      tag.className = 'selected-opt-tag';
      tag.textContent = `🔥 ${reservationPrePoint}`;
      optsRow.appendChild(tag);
    }
    if (reservationPreExtras) {
      const tag = document.createElement('span');
      tag.className = 'selected-opt-tag';
      tag.textContent = `🫙 ${reservationPreExtras}`;
      optsRow.appendChild(tag);
    }
  } else {
    optsRow.classList.add('hidden');
  }
}

function renderExtrasList(items, filterTerm = '') {
  const container = document.getElementById('extras-list');
  if (!container) return;

  const filtered = items.filter(item => {
    if (String(item._id) === String(reservationMainItemId)) return false;
    if (!filterTerm.trim()) return true;
    return item.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(filterTerm.toLowerCase());
  });

  container.innerHTML = '';

  if (filtered.length === 0) {
    const msg = document.createElement('p');
    msg.className = 'empty-state-text';
    msg.textContent = filterTerm ? 'No hay platos que coincidan.' : 'No hay otros platos disponibles.';
    container.appendChild(msg);
    return;
  }

  filtered.forEach(item => {
    const isSelected = reservationState.selectedExtras.has(String(item._id));

    const el = document.createElement('div');
    el.className = `extras-list-item${isSelected ? ' selected-extra' : ''}`;
    el.dataset.itemId = item._id;

    const imgSrc = item.image && item.image.trim()
      ? item.image
      : `https://picsum.photos/seed/${item._id}/48/48`;

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = item.name;
    img.onerror = () => { img.src = `https://picsum.photos/seed/fallback/48/48`; };

    const info = document.createElement('div');
    info.className = 'extras-list-item-info';
    info.innerHTML = `
      <div class="extras-list-item-name">${item.name}</div>
      <div class="extras-list-item-cat">${item.category}${item.weight ? ` · ${item.weight}` : ''}</div>
    `;

    const check = document.createElement('div');
    check.className = 'extras-check';
    check.textContent = '✓';

    el.appendChild(img);
    el.appendChild(info);
    el.appendChild(check);

    el.addEventListener('click', () => toggleExtra(item, el, check));
    container.appendChild(el);
  });
}

function toggleExtra(item, el, check) {
  const id = String(item._id);

  if (reservationState.selectedExtras.has(id)) {
    reservationState.selectedExtras.delete(id);
    el.classList.remove('selected-extra');
    check.textContent = '';
  } else {
    reservationState.selectedExtras.add(id);
    el.classList.add('selected-extra');
    check.textContent = '✓';
  }

  updateExtrasCountBadge();
  updateCartSummary();
}

function updateExtrasCountBadge() {
  const badge = document.getElementById('extras-count-badge');
  const count = reservationState.selectedExtras.size;
  if (!badge) return;
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function updateCartSummary() {
  const wrap = document.getElementById('cart-summary-wrap');
  const list = document.getElementById('cart-summary-list');
  if (!wrap || !list) return;

  if (reservationState.selectedExtras.size === 0) {
    wrap.classList.add('hidden');
    return;
  }

  wrap.classList.remove('hidden');
  list.innerHTML = '';

  const mainRow = document.createElement('div');
  mainRow.className = 'cart-summary-row';
  mainRow.innerHTML = `
    <span class="cart-summary-main-label">🔥 ${reservationState.mainItem ? reservationState.mainItem.name : 'Plato principal'}</span>
    <span class="cart-summary-note">Principal</span>
  `;
  list.appendChild(mainRow);

  reservationState.selectedExtras.forEach(id => {
    const item = reservationState.extraItems.find(i => String(i._id) === id);
    if (!item) return;

    const row = document.createElement('div');
    row.className = 'cart-summary-row';
    row.innerHTML = `
      <span class="cart-summary-item-name">${item.name}</span>
      <button class="cart-remove-btn" data-remove-id="${id}" title="Quitar">✕</button>
    `;

    row.querySelector('.cart-remove-btn')?.addEventListener('click', () => {
      reservationState.selectedExtras.delete(id);
      const listEl = document.querySelector(`.extras-list-item[data-item-id="${id}"]`);
      if (listEl) {
        listEl.classList.remove('selected-extra');
        const check = listEl.querySelector('.extras-check');
        if (check) check.textContent = '';
      }
      updateExtrasCountBadge();
      updateCartSummary();
    });

    list.appendChild(row);
  });
}

function initPersonsCounter() {
  const display  = document.getElementById('counter-num');
  const btnMinus = document.getElementById('btn-minus');
  const btnPlus  = document.getElementById('btn-plus');
  if (!display || !btnMinus || !btnPlus) return;

  const MIN = 1;
  const MAX = 30;

  function update() {
    display.textContent = reservationState.persons;
    btnMinus.disabled = reservationState.persons <= MIN;
    btnPlus.disabled = reservationState.persons >= MAX;
  }

  btnMinus.addEventListener('click', () => {
    if (reservationState.persons > MIN) {
      reservationState.persons -= 1;
      update();
    }
  });

  btnPlus.addEventListener('click', () => {
    if (reservationState.persons < MAX) {
      reservationState.persons += 1;
      update();
    }
  });

  update();
}

function setDefaultDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const iso = tomorrow.toISOString().slice(0, 10);
  const fFecha = document.getElementById('f-fecha');
  if (fFecha) {
    fFecha.value = iso;
    fFecha.min = iso;
  }
  const fHora = document.getElementById('f-hora');
  if (fHora) {
    fHora.value = '13:00';
  }
}

function initForm() {
  const form = document.getElementById('reserva-form');
  const checkbox = document.getElementById('f-confirm');
  const btnSubmit = document.getElementById('btn-submit');
  if (!form || !checkbox || !btnSubmit) return;

  checkbox.addEventListener('change', () => {
    btnSubmit.disabled = !checkbox.checked;
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const nombre = document.getElementById('f-nombre')?.value.trim() || '';
    const apellido = document.getElementById('f-apellido')?.value.trim() || '';
    const email = document.getElementById('f-email')?.value.trim() || '';
    const fecha = document.getElementById('f-fecha')?.value || '';
    const hora = document.getElementById('f-hora')?.value || '';

    let hasError = false;
    const required = [
      { id: 'f-nombre', val: nombre },
      { id: 'f-apellido', val: apellido },
      { id: 'f-email', val: email },
      { id: 'f-fecha', val: fecha }
    ];

    required.forEach(({ id, val }) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!val) {
        el.classList.add('input-error');
        hasError = true;
      } else {
        el.classList.remove('input-error');
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      document.getElementById('f-email')?.classList.add('input-error');
      hasError = true;
    }

    if (hasError) {
      showToast('⚠️ Completá todos los campos obligatorios.');
      return;
    }

    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `
      <div class="btn-spinner"></div>
      Enviando...
    `;

    await new Promise(resolve => setTimeout(resolve, 1400));

    const platosSeleccionados = [];
    if (reservationState.mainItem) {
      platosSeleccionados.push(reservationState.mainItem.name);
    }
    reservationState.selectedExtras.forEach(id => {
      const item = reservationState.extraItems.find(i => String(i._id) === id);
      if (item) platosSeleccionados.push(item.name);
    });

    document.getElementById('sc-nombre').textContent = `${nombre} ${apellido}`;
    document.getElementById('sc-email').textContent = email;
    document.getElementById('sc-datetime').textContent = formatDate(fecha, hora);
    document.getElementById('sc-personas').textContent = `${reservationState.persons} persona${reservationState.persons > 1 ? 's' : ''}`;
    document.getElementById('sc-platos').textContent = platosSeleccionados.join(', ') || 'Sin especificar';
    document.getElementById('sc-id').textContent = generateRequestId();

    form.classList.add('hidden');
    document.getElementById('reserva-success')?.classList.remove('hidden');

    document.getElementById('reserva-success')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    showToast('✅ ¡Reserva enviada con éxito!', 4000);
  });

  ['f-nombre', 'f-apellido', 'f-email', 'f-fecha'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      document.getElementById(id)?.classList.remove('input-error');
    });
  });
}

function initExtrasSearch() {
  const input = document.getElementById('extras-search');
  if (!input) return;
  let debounce;

  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
      renderExtrasList(reservationState.extraItems, input.value);
    }, 250);
  });
}

async function initReservationPage() {
  initHamburger();
  initHeaderScroll();

  if (!reservationMainItemId) {
    showState('page-error');
    return;
  }

  try {
    const [mainItem, allItems] = await Promise.all([
      fetchItemById(reservationMainItemId),
      fetchAllItems()
    ]);

    reservationState.mainItem = mainItem;
    reservationState.extraItems = allItems;

    renderMainDish(mainItem);
    renderExtrasList(allItems);
    initPersonsCounter();
    setDefaultDate();
    initForm();
    initExtrasSearch();

    showState('page-content');
  } catch (error) {
    console.error('Error iniciando reserva:', error);
    showToast('⚠️ No se pudo cargar la información');
    showState('page-error');
  }
}

// ═══════════════════════════════════════════════
//  RENDER — ITEMS
// ═══════════════════════════════════════════════

/**
 * Construye el HTML de una card de producto
 * @param {Object} item - Documento de MongoDB
 * @returns {string} HTML string
 */
function buildItemCard(item, index = 0) {
  const imageSrc = CUSTOM_ITEM_IMAGE || (item.image && item.image.trim()
    ? item.image
    : `https://picsum.photos/seed/${item._id}/400/300`);

  const desc = item.description && item.description.length > 110
    ? item.description.substring(0, 110) + '…'
    : (item.description || 'Un plato especial de nuestra parrilla.');

  // ARTICLE
  const article = document.createElement('article');
  article.className = 'item-card';
  article.style.animationDelay = `${index * 0.07}s`;
  article.dataset.id = item._id;

  // IMG WRAP
  const imgWrap = document.createElement('div');
  imgWrap.className = 'item-card__img-wrap';

  const img = document.createElement('img');
  img.className = 'item-card__img loading';
  img.src = imageSrc;
  img.alt = item.name;
  img.loading = 'lazy';

  img.onload = () => img.classList.remove('loading');
  img.onerror = () => {
    img.src = 'data:image/svg+xml;base64,...';
    img.classList.remove('loading');
  };

  const category = document.createElement('span');
  category.className = 'item-card__category';
  category.textContent = item.category;

  imgWrap.appendChild(img);
  imgWrap.appendChild(category);

  // BODY
  const body = document.createElement('div');
  body.className = 'item-card__body';

  const title = document.createElement('h3');
  title.className = 'item-card__name';
  title.textContent = item.name;

  const paragraph = document.createElement('p');
  paragraph.className = 'item-card__desc';
  paragraph.textContent = desc;

  const footer = document.createElement('div');
  footer.className = 'item-card__footer';

  const btn = document.createElement('button');
  btn.className = 'item-card__link item-detail-btn';
  btn.dataset.itemId = item._id;
  btn.setAttribute('aria-label', `Ver detalle de ${item.name}`);
  btn.textContent = 'Ver plato';

  const dot = document.createElement('div');
  dot.className = 'item-card__dot';
  dot.title = 'Disponible ahora';

  footer.appendChild(btn);
  footer.appendChild(dot);

  body.appendChild(title);
  body.appendChild(paragraph);
  body.appendChild(footer);

  article.appendChild(imgWrap);
  article.appendChild(body);

  return article;
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

  // limpiar contenido anterior
  grid.innerHTML = '';

  if (items.length === 0) {
    emptyState?.classList.remove('hidden');
    if (counter) counter.textContent = '';
    return;
  }

  emptyState?.classList.add('hidden');

  if (counter) {
    const label = items.length === 1 ? 'plato encontrado' : 'platos encontrados';
    counter.textContent = `${items.length} ${label}`;
  }

  // 👇 clave: crear nodos reales
  items.forEach((item, index) => {
    const card = buildItemCard(item, index);
    grid.appendChild(card);
  });
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
      categories: state.activeCategories,
      name:       state.searchTerm
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
function buildClientCard(client, index = 0) {
  const imageSrc = client.image && client.image.trim()
    ? client.image
    : `https://picsum.photos/seed/client${client._id}/400/300`;

  const desc = client.description && client.description.length > 100
    ? client.description.substring(0, 100) + '…'
    : (client.description || 'Cliente frecuente de Merco Sur.');

  // CARD
  const card = document.createElement('div');
  card.className = 'client-card';
  card.style.animationDelay = `${index * 0.1}s`;
  card.dataset.clientId = client._id;
  card.dataset.clientName = client.name;
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.title = `Ver pedidos de ${client.name}`;

  // IMG
  const img = document.createElement('img');
  img.className = 'client-card__img';
  img.src = imageSrc;
  img.alt = client.name;
  img.loading = 'lazy';

  img.onerror = () => {
    img.src = 'data:image/svg+xml;base64,...';
  };

  // BODY
  const body = document.createElement('div');
  body.className = 'client-card__body';

  const title = document.createElement('h3');
  title.className = 'client-card__name';
  title.textContent = client.name;

  const paragraph = document.createElement('p');
  paragraph.className = 'client-card__desc';
  paragraph.textContent = desc;

  const cta = document.createElement('span');
  cta.className = 'client-card__cta';
  cta.textContent = 'Ver sus pedidos';

  body.appendChild(title);
  body.appendChild(paragraph);
  body.appendChild(cta);

  card.appendChild(img);
  card.appendChild(body);

  return card;
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

    // limpiar grid
    grid.innerHTML = '';

    if (clients.length === 0) {
      grid.innerHTML = `
        <div class="loading-state">
          <span style="font-size:2rem">👥</span>
          <p>Aún no hay clientes registrados.</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    clients.forEach((client, index) => {
      const card = buildClientCard(client, index);

      // 👇 eventos directamente acá (mejor que después)
      card.addEventListener('click', () => openClientModal(card));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          openClientModal(card);
        }
      });

      fragment.appendChild(card);
    });

    grid.appendChild(fragment);

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
            onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmMyZjFhIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZpbGw9IiM4YTdhNmEiIGZvbnQtc2l6ZT0iOCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5OPC90ZXh0Pjwvc3ZnPg=='"
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
//  MODAL DE DETALLE DE ITEM
// ═══════════════════════════════════════════════

/**
 * Abre el modal de detalle con los datos del item clickeado
 * @param {string} itemId - _id del item en MongoDB
 */
function openItemModal(itemId) {
  // Buscar el item en el estado local (ya cargado, sin otro fetch)
  const item = state.allItems.find(i => String(i._id) === String(itemId));
  if (!item) {
    showToast('⚠️ No se encontró el plato');
    return;
  }

  const modal = document.getElementById('item-modal');
  if (!modal) return;

  // Imagen
  const imgEl  = document.getElementById('item-modal-img');
  const imgSrc  = CUSTOM_ITEM_IMAGE || (item.image && item.image.trim()
    ? item.image
    : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmMyZjFhIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZpbGw9IiM4YTdhNmEiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2VuIG5vIGRpc3BvbmlibGU8L3RleHQ+PC9zdmc+');
  imgEl.src = imgSrc;
  imgEl.alt = item.name;
  imgEl.onerror = function() {
    this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjgwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMmMyZjFhIi8+PHRleHQgeD0iNTAlIiB5PSI0NSUiIGZpbGw9IiM4YTdhNmEiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW1hZ2VuIG5vIGRpc3BvbmlibGU8L3RleHQ+PC9zdmc+';
  };

  // Textos
  document.getElementById('item-modal-category').textContent  = item.category;
  document.getElementById('item-modal-name').textContent      = item.name;
  document.getElementById('item-modal-desc').textContent      = item.description || 'Un plato especial de nuestra parrilla.';
  document.getElementById('item-modal-cat-value').textContent = item.category;

  // Link del botón de consulta (WhatsApp, mail, o el link propio del item)
  const reservaBtn = document.getElementById('item-modal-reserva');
  const detailBtn  = document.getElementById('item-modal-detail');

  // URL con ID
  const itemIdFromItem = item._id;

  // 👉 Botón reserva
  if (reservaBtn) {
    reservaBtn.href = `/reserva.html?id=${itemIdFromItem}`;
  }

  // 👉 Botón detalle
  if (detailBtn) {
    detailBtn.href = `/item.html?id=${itemIdFromItem}`;
  }
  const linkHref = item.link && item.link.trim() && item.link !== '#menu'
    ? item.link
    : `mailto:hola@mercosur.com.ar?subject=Consulta sobre: ${encodeURIComponent(item.name)}`;
  const linkEl = document.getElementById('item-modal-link');
  if (linkEl) {
    linkEl.href = linkHref;
  }

  // Mostrar
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

/**
 * Cierra el modal de detalle de item
 */
function closeItemModal() {
  const modal = document.getElementById('item-modal');
  if (!modal) return;
  modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/**
 * Delega el click de los botones "Ver plato" del grid al modal
 * Se llama cada vez que se re-renderiza el grid
 */
function initItemModalDelegation() {
  const grid = document.getElementById('items-grid');
  if (!grid) return;

  // Delegation: un solo listener en el grid padre
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.item-detail-btn');
    if (!btn) return;
    const itemId = btn.dataset.itemId;
    if (itemId) openItemModal(itemId);
  });
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

  const todosBtn = filterContainer.querySelector('.filter-btn[data-category=""]');

  filterContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    const category = btn.dataset.category;

    // ── Click en "Todos" ──────────────────────────────────────
    if (category === '') {
      // Limpiar todas las selecciones y marcar solo "Todos"
      state.activeCategories.clear();
      filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadAndRenderItems();
      return;
    }

    // ── Click en una categoría específica ─────────────────────
    if (state.activeCategories.has(category)) {
      // Ya estaba seleccionada → deseleccionar
      state.activeCategories.delete(category);
      btn.classList.remove('active');
    } else {
      // No estaba → agregar a la selección
      state.activeCategories.add(category);
      btn.classList.add('active');
    }

    // Si quedan categorías seleccionadas, desactivar "Todos"
    // Si no queda ninguna, activar "Todos" automáticamente
    if (state.activeCategories.size > 0) {
      todosBtn?.classList.remove('active');
    } else {
      todosBtn?.classList.add('active');
    }

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
  // Modal de items: cerrar
  document.getElementById('item-modal-close')?.addEventListener('click', closeItemModal);
  document.getElementById('item-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'item-modal') closeItemModal();
  });

  // Delegar clicks del grid al modal de item
  initItemModalDelegation();
  document.getElementById('client-modal')?.addEventListener('click', (e) => {
    // Cerrar si se hace click en el overlay (fuera del box)
    if (e.target.id === 'client-modal') closeClientModal();
  });

  // Cerrar modal con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeClientModal();
      closeItemModal();
    }
  });

  // Cargar datos desde la API
  await Promise.all([
    loadAndRenderItems(),
    loadAndRenderClients()
  ]);

  if (document.getElementById('reserva-form')) {
    await initReservationPage();
  }
}

// Arrancar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);