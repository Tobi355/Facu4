const reservasModal = document.getElementById('reserveDetailsModal');
const reservaDetailButtons = document.querySelectorAll('.btn-reserva-details');

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function buildReservaHtml(reserva) {
  const fechaFormato = formatDate(reserva.fecha);
  const createdAt = formatDateTime(reserva.created_at);

  return `
    <div class="reserve-details-grid">
      <div class="reserve-details-card">
        <p class="reserve-details-label">ID Reserva</p>
        <p class="reserve-details-value">#${reserva.id}</p>
      </div>
      <div class="reserve-details-card">
        <p class="reserve-details-label">Estado</p>
        <p class="reserve-details-value status-${reserva.estado}">${reserva.estado}</p>
      </div>
    </div>
    <div class="reserve-details-divider"></div>
    <div class="reserve-details-group">
      <p class="reserve-details-label">Cliente</p>
      <p class="reserve-details-value">${reserva.usuario.name}</p>
      <p class="reserve-details-meta">${reserva.usuario.email}</p>
      <p class="reserve-details-meta">📱 ${reserva.usuario.telefono || 'N/A'}</p>
    </div>
    <div class="reserve-details-group">
      <p class="reserve-details-label">Servicio</p>
      <p class="reserve-details-value">${reserva.servicio.nombre}</p>
      <p class="reserve-details-meta">$${parseFloat(reserva.servicio.precio).toFixed(2)}</p>
    </div>
    <div class="reserve-details-grid">
      <div class="reserve-details-card">
        <p class="reserve-details-label">Fecha</p>
        <p class="reserve-details-value">📅 ${fechaFormato}</p>
      </div>
      <div class="reserve-details-card">
        <p class="reserve-details-label">Hora</p>
        <p class="reserve-details-value">🕐 ${reserva.hora || 'N/A'}</p>
      </div>
    </div>
    ${reserva.observaciones ? `
    <div class="reserve-details-group">
      <p class="reserve-details-label">Observaciones</p>
      <p class="reserve-details-value reserve-details-note">${reserva.observaciones}</p>
    </div>
    ` : ''}
    <div class="reserve-details-meta">
      Creada: ${createdAt}
    </div>
  `;
}

function getReservasData() {
  if (!reservasModal) return {};
  try {
    const raw = reservasModal.dataset.reservas;
    return raw ? JSON.parse(raw) : {};
  } catch (error) {
    console.error('Error parseando reservasData:', error);
    return {};
  }
}

function openReserveDetails(reservaId) {
  const reservasData = getReservasData();
  const reserva = reservasData[reservaId];

  if (!reserva) {
    console.error('Reserva no encontrada', reservaId);
    return;
  }

  const detailsContainer = document.getElementById('reserveDetailsContent');
  if (!detailsContainer) return;

  detailsContainer.innerHTML = buildReservaHtml(reserva);
  reservasModal.classList.add('active');
}

function closeReserveDetails() {
  if (!reservasModal) return;
  reservasModal.classList.remove('active');
}

function initAdminReservasModal() {
  if (!reservasModal) return;

  document.querySelectorAll('.btn-reserva-details').forEach(button => {
    button.addEventListener('click', () => {
      const reservaId = button.dataset.reservaId;
      if (reservaId) {
        openReserveDetails(reservaId);
      }
    });
  });

  document.querySelectorAll('.estado-select').forEach(select => {
    select.addEventListener('change', () => {
      const form = select.closest('form');
      if (form) {
        form.submit();
      }
    });
  });

  const closeButton = reservasModal.querySelector('.modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', closeReserveDetails);
  }

  reservasModal.addEventListener('click', (event) => {
    if (event.target === reservasModal) {
      closeReserveDetails();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeReserveDetails();
    }
  });
}

initAdminReservasModal();
