import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, Check } from 'lucide-react';

const DAYS_ES = {
  Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles',
  Thursday: 'Jueves', Friday: 'Viernes', Saturday: 'Sábado', Sunday: 'Domingo',
};

const ReservationModal = ({ cls, isOpen, onConfirm, onCancel, loading }) => {
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (selectedSchedule !== null) {
      setConfirmed(true);
      setTimeout(() => {
        onConfirm(cls._id, new Date().toISOString());
        setConfirmed(false);
        setSelectedSchedule(null);
      }, 1000);
    }
  };

  const handleClose = () => {
    setConfirmed(false);
    setSelectedSchedule(null);
    onCancel();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 999 }}
          />

          {/* Modal */}
          <motion.div
            className="modal-dialog"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1000,
              maxWidth: 500,
              width: '90%',
            }}
          >
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">Confirmar Reserva</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  disabled={loading || confirmed}
                />
              </div>

              <div className="modal-body">
                {confirmed ? (
                  <motion.div
                    className="text-center py-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <motion.div
                      className="mb-3"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.6 }}
                    >
                      <div className="bg-success-soft rounded-circle p-3 d-inline-flex">
                        <Check size={40} className="text-success" />
                      </div>
                    </motion.div>
                    <h6 className="fw-bold">¡Reserva Confirmada!</h6>
                    <p className="text-muted small mb-0">
                      Tu reserva para <strong>{cls.name}</strong> ha sido confirmada exitosamente.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <div className="bg-light rounded-3 p-3 mb-4">
                      <h6 className="fw-bold mb-2">{cls.name}</h6>
                      <p className="text-muted small mb-0">
                        Instructor: <strong>{cls.instructor}</strong>
                      </p>
                      <p className="text-muted small mb-0">
                        Duración: <strong>{cls.duration} minutos</strong>
                      </p>
                      <p className="text-muted small mb-0">
                        Precio: <strong>${cls.price}</strong>
                      </p>
                    </div>

                    {cls.schedule && cls.schedule.length > 0 && (
                      <div className="mb-4">
                        <label className="form-label fw-semibold mb-3">Selecciona un Horario</label>
                        <div className="d-flex flex-column gap-2">
                          {cls.schedule.map((schedule, idx) => (
                            <motion.button
                              key={idx}
                              type="button"
                              className={`btn btn-outline-primary rounded-2 text-start p-3 transition-all ${
                                selectedSchedule === idx ? 'btn-primary' : ''
                              }`}
                              onClick={() => setSelectedSchedule(idx)}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="d-flex align-items-center gap-2">
                                <Calendar size={18} />
                                <div>
                                  <div className="fw-semibold">
                                    {DAYS_ES[schedule.day] || schedule.day}
                                  </div>
                                  <div className="small">
                                    <Clock size={14} className="me-1" style={{ display: 'inline' }} />
                                    {schedule.startTime} - {schedule.endTime}
                                  </div>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-muted small text-center mb-0">
                      Confirma tu reserva y recibirás un email de confirmación.
                    </p>
                  </>
                )}
              </div>

              {!confirmed && (
                <div className="modal-footer border-0 gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary rounded-pill"
                    onClick={handleClose}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill"
                    onClick={handleConfirm}
                    disabled={selectedSchedule === null || loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Confirmando...
                      </>
                    ) : (
                      'Confirmar Reserva'
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ReservationModal;
