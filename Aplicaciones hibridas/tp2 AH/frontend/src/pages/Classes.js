import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import Loader from '../components/Loader';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingId, setBookingId] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data } = await API.get('/classes');
        setClasses(data.classes);
      } catch {
        setMessage('Error al cargar las clases');
        setMessageType('danger');
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  const handleReserve = async (classId) => {
    if (!user) {
      setMessage('Debés iniciar sesión para reservar');
      setMessageType('warning');
      return;
    }
    setBookingId(classId);
    setMessage('');
    try {
      await API.post('/reservations', {
        classId,
        date: new Date().toISOString(),
      });
      setMessage('¡Reserva confirmada!');
      setMessageType('success');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error al reservar');
      setMessageType('danger');
    } finally {
      setBookingId(null);
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
        <h2 className="fw-bold">Nuestras Clases</h2>
        <p className="text-muted">Elegí la clase que mejor se adapte a vos</p>
      </div>

      {message && (
        <div className={`alert alert-${messageType} alert-dismissible fade show`}>
          {message}
          <button className="btn-close" onClick={() => setMessage('')}></button>
        </div>
      )}

      <div className="row g-4">
        {classes.map((cls, i) => (
          <motion.div
            className="col-md-6 col-lg-4"
            key={cls._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="class-card card border-0 h-100">
              <div className="card-body p-4 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title fw-semibold mb-0">{cls.name}</h5>
                  <span className="badge bg-success-subtle text-success rounded-pill">
                    ${cls.price}
                  </span>
                </div>
                <p className="card-text text-muted small flex-grow-1">{cls.description}</p>
                <div className="mb-3">
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="fw-semibold small">👤 {cls.instructor}</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="small">⏱ {cls.duration} min</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="small">
                      📅{' '}
                      {cls.schedule?.map((s) => s.day).join(', ')}
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <small className="text-muted">
                    {cls.enrolledCount}/{cls.capacity} cupos
                  </small>
                  <button
                    className="btn btn-primary btn-sm rounded-pill px-4"
                    onClick={() => handleReserve(cls._id)}
                    disabled={bookingId === cls._id || cls.enrolledCount >= cls.capacity}
                  >
                    {bookingId === cls._id
                      ? 'Reservando...'
                      : cls.enrolledCount >= cls.capacity
                      ? 'Completo'
                      : 'Reservar'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Classes;
