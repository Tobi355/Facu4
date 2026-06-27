import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getMyReservations, deleteReservation, updateReservation } from '../services/reservationService';
import Loader from '../components/Loader';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import Toast from '../components/Toast';
import { Calendar, Clock, User, XCircle, CalendarDays, Edit3, Save } from 'lucide-react';
import ConfirmModal from '../components/ConfirmModal';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editDate, setEditDate] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  const [confirmCancel, setConfirmCancel] = useState(null);

  const fetchReservations = useCallback(async () => {
    try {
      const reservationsData = await getMyReservations();
      setReservations(reservationsData);
    } catch {
      setToast({ message: 'Error al cargar tus reservas', type: 'danger' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const handleCancel = async () => {
    setCancellingId(confirmCancel);
    try {
      await deleteReservation(confirmCancel);
      setToast({ message: 'Reserva eliminada', type: 'success' });
      setConfirmCancel(null);
      fetchReservations();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error al eliminar', type: 'danger' });
    } finally {
      setCancellingId(null);
    }
  };

  const startEdit = (res) => {
    setEditingId(res._id);
    setEditDate(new Date(res.date).toISOString().split('T')[0]);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditDate('');
  };

  const handleUpdate = async (id) => {
    try {
      await updateReservation(id, { date: new Date(editDate).toISOString() });
      setToast({ message: 'Reserva actualizada', type: 'success' });
      setEditingId(null);
      fetchReservations();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error al actualizar', type: 'danger' });
    }
  };

  if (loading) return <Loader><Skeleton type="card" count={3} /></Loader>;

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      <ConfirmModal
        isOpen={Boolean(confirmCancel)}
        title="Eliminar reserva"
        message="¿Querés eliminar esta reserva de forma permanente?"
        confirmLabel="Eliminar reserva"
        cancelLabel="Volver"
        confirmVariant="warning"
        onConfirm={handleCancel}
        onCancel={() => setConfirmCancel(null)}
      />

      <div className="text-center mb-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="feature-icon mb-2 text-primary">
            <CalendarDays size={36} />
          </div>
          <h2 className="fw-bold">Mis Reservas</h2>
          <p className="text-muted">Administrá tus reservas activas</p>
        </motion.div>
      </div>

      {reservations.length === 0 ? (
        <EmptyState
          icon={CalendarDays}
          title="No tenés reservas activas"
          description="Explorá nuestras clases y reservá tu primera experiencia."
          action={
            <Link to="/classes" className="btn btn-primary rounded-pill px-4">
              Ver Clases
            </Link>
          }
        />
      ) : (
        <div className="row g-4">
          {reservations.map((res, i) => (
            <motion.div
              className="col-md-6 col-lg-4"
              key={res._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <div className={`reservation-card card border-0 h-100 ${res.status === 'cancelled' ? 'cancelled' : ''}`}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-semibold mb-0">{res.class?.name || 'Clase'}</h5>
                    <span className={`badge rounded-pill ${res.status === 'confirmed' ? 'bg-success' : 'bg-secondary'}`}>
                      {res.status === 'confirmed' ? 'Activa' : 'Cancelada'}
                    </span>
                  </div>

                  {editingId === res._id ? (
                    <div className="mb-3">
                      <label className="form-label">Nueva fecha</label>
                      <input
                        type="date"
                        className="form-control form-control-sm"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <div className="d-flex gap-2 mt-2">
                        <button className="btn btn-sm btn-primary rounded-pill" onClick={() => handleUpdate(res._id)}>
                          <Save size={14} className="me-1" />Guardar
                        </button>
                        <button className="btn btn-sm btn-outline-secondary rounded-pill" onClick={cancelEdit}>
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <Calendar size={14} className="text-muted" />
                        <span className="small text-muted">
                          {new Date(res.date).toLocaleDateString('es-AR', {
                            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="d-flex align-items-center gap-2 mb-1">
                        <Clock size={14} className="text-muted" />
                        <span className="small text-muted">
                          {new Date(res.date).toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {res.class?.instructor && (
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <User size={14} className="text-muted" />
                          <span className="small text-muted">{res.class.instructor}</span>
                        </div>
                      )}
                    </>
                  )}

                  {res.status === 'confirmed' && editingId !== res._id && (
                    <div className="d-flex gap-2 mt-3">
                      <button
                        className="btn btn-outline-primary btn-sm rounded-pill"
                        onClick={() => startEdit(res)}
                      >
                        <Edit3 size={14} className="me-1" />Editar
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm rounded-pill"
                        onClick={() => setConfirmCancel(res._id)}
                        disabled={cancellingId === res._id}
                      >
                        {cancellingId === res._id ? (
                          <span className="d-flex align-items-center gap-1">
                            <span className="spinner-border spinner-border-sm" />
                            Eliminando...
                          </span>
                        ) : (
                          <span className="d-flex align-items-center gap-1">
                            <XCircle size={14} />
                            Eliminar
                          </span>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyReservations;
