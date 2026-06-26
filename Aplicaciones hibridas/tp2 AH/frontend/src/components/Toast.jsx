import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

const icons = {
  success: CheckCircle,
  danger: AlertCircle,
  warning: AlertCircle,
  info: Info,
};

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  const Icon = icons[type] || Info;

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="position-fixed top-0 end-0 p-3"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className={`toast-custom toast-${type} d-flex align-items-center gap-3 px-4 py-3 shadow-lg`}>
            <Icon size={22} className="flex-shrink-0" />
            <span className="flex-grow-1">{message}</span>
            <button className="btn-close btn-close-white ms-2" onClick={onClose} aria-label="Cerrar" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
