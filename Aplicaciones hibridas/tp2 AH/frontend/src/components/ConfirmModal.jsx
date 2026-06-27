import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
  confirmVariant = 'danger',
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-backdrop show"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
        onClick={onCancel}
      >
        <motion.div
          className="modal-dialog modal-dialog-centered"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: 420 }}
        >
          <div className="modal-content border-0 shadow-lg">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-semibold">{title}</h5>
              <button type="button" className="btn-close" onClick={onCancel} disabled={loading} />
            </div>
            <div className="modal-body">
              <p className="mb-0 text-muted">{message}</p>
            </div>
            <div className="modal-footer border-0">
              <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={onCancel} disabled={loading}>
                {cancelLabel}
              </button>
              <button type="button" className={`btn btn-${confirmVariant} rounded-pill`} onClick={onConfirm} disabled={loading}>
                {loading ? (
                  <span className="d-flex align-items-center gap-2">
                    <span className="spinner-border spinner-border-sm" />
                    Procesando...
                  </span>
                ) : (
                  confirmLabel
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
