import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../api/axios';
import Loader from '../components/Loader';

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const fetchReservations = async () => {
    try {
      const { data } = await API.get('/reservations');
      setReservations(data.reservations);
    } catch {
      setMessage('Error al cargar tus reservas');
      setMessageType('danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('¿Cancelar esta reserva?')) return;
    setCancellingId(id);
    setMessage('');
    try {
      await API.delete(`/reservations/${id}`);
      setMessage('Reserva cancelada');
      setMessageType('success');
      fetchReservations();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error al cancelar');
      setMessageType('danger');
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return <Loader />;

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-center mb-5">
        <h2 className="fw-bold">Mis Reservas</h2>
        <p className="text-muted">Administrá tus reservas activas</p>
      </div>

      {message && (
        <div className={`alert alert-${messageType} alert-dismissible fade show`}>
          {message}
          <button className="btn-close" onClick={() => setMessage('')}></button>
        </div>
      )}

      {reservations.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No tenés reservas activas.</p>
        </div>
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
              <div className={`card border-0 h-100 ${res.status === 'cancelled' ? 'bg-light' : ''}`}>
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="fw-semibold mb-0">{res.class?.name || 'Clase'}</h5>
                    <span className={`badge rounded-pill ${res.status === 'confirmed' ? 'bg-success' : 'bg-secondary'}`}>
                      {res.status === 'confirmed' ? 'Activa' : 'Cancelada'}
                    </span>
                  </div>
                  <p className="text-muted small mb-1">
                    📅 {new Date(res.date).toLocaleDateString('es-AR')}
                  </p>
                  <p className="text-muted small mb-3">
                    👤 {res.class?.instructor || ''}
                  </p>
                  {res.status === 'confirmed' && (
                    <button
                      className="btn btn-outline-danger btn-sm rounded-pill"
                      onClick={() => handleCancel(res._id)}
                      disabled={cancellingId === res._id}
                    >
                      {cancellingId === res._id ? 'Cancelando...' : 'Cancelar Reserva'}
                    </button>
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
