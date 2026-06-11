document.addEventListener('DOMContentLoaded', function() {
  try {
    if (typeof UI === 'undefined') return;
    var el = document.getElementById('contacto-messages');
    if (!el) return;

    var success = el.getAttribute('data-success') || '';
    var error = el.getAttribute('data-error') || '';
    var errors = [];
    try { errors = JSON.parse(el.getAttribute('data-errors') || '[]'); } catch(e){ errors = []; }

    if (success) {
      UI.success(success);
    }
    if (error) {
      UI.error(error);
    }
    if (errors && errors.length) {
      errors.forEach(function(err){ UI.error(err); });
    }
  } catch (e) {
    console.error('contacto.js error', e);
  }
});
