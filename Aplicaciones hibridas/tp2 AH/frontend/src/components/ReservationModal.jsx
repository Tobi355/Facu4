import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, CheckCircle2, Sparkles } from 'lucide-react';

const DAYS_ES = {
  Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles',
  Thursday: 'Jueves', Friday: 'Viernes', Saturday: 'Sábado', Sunday: 'Domingo',
};

const ReservationModal = ({ cls, isOpen, onConfirm, onCancel, loading }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setSelectedSchedule(null);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (selectedSchedule !== null) {
      onConfirm(cls._id, selectedSchedule);
    }
  };

  const handleClose = () => {
    setSelectedSchedule(null);
    onCancel();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}
          />

          <motion.div
            className="modal-dialog"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000, maxWidth: 540, width: '92%' }}
          >
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <div>
                  <h5 className="modal-title fw-bold">Confirmar Reserva</h5>
                  <p className="text-muted small mb-0">Elegí el horario que mejor te funcione.</p>
                </div>
                <button type="button" className="btn-close" onClick={handleClose} disabled={loading} />
              </div>

              <div className="modal-body">
                <div className="bg-primary-soft rounded-3 p-3 mb-4">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-primary" />
                    <h6 className="fw-semibold mb-0">{cls.name}</h6>
                  </div>
                  <p className="text-muted small mb-1">Instructor: <strong>{cls.instructor}</strong></p>
                  <p className="text-muted small mb-1">Duración: <strong>{cls.duration} minutos</strong></p>
                  <p className="text-muted small mb-0">Precio: <strong>${cls.price}</strong></p>
                </div>

                {cls.schedule && cls.schedule.length > 0 && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold mb-3">Seleccioná un horario</label>
                    <div className="d-flex flex-column gap-2">
                      {cls.schedule.map((schedule, idx) => (
                        <motion.button
                          key={idx}
                          type="button"
                          className={`btn rounded-3 text-start p-3 ${selectedSchedule === schedule ? 'btn-primary' : 'btn-outline-primary'}`}
                          onClick={() => setSelectedSchedule(schedule)}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="d-flex align-items-center gap-2">
                            <Calendar size={18} />
                            <div>
                              <div className="fw-semibold">{DAYS_ES[schedule.day] || schedule.day}</div>
                              <div className="small">
                                <Clock size={14} className="me-1" style={{ display: 'inline' }} />
                                {schedule.startTime} - {schedule.endTime}
                              </div>
                            </div>
                            {selectedSchedule === schedule && <CheckCircle2 size={18} className="ms-auto" />}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-muted small mb-0">La reserva se enviará al confirmar y se cerrará el modal solo si fue exitosa.</p>
              </div>

              <div className="modal-footer border-0 gap-2">
                <button type="button" className="btn btn-outline-secondary rounded-pill" onClick={handleClose} disabled={loading}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary rounded-pill" onClick={handleConfirm} disabled={selectedSchedule === null || loading}>
                  {loading ? (
                    <span className="d-flex align-items-center justify-content-center gap-2">
                      <span className="spinner-border spinner-border-sm" />
                      Confirmando...
                    </span>
                  ) : (
                    'Confirmar Reserva'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;
