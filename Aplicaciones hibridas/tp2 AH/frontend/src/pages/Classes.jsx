import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllClasses } from '../services/classService';
import { createReservation } from '../services/reservationService';
import Loader from '../components/Loader';
import Skeleton from '../components/Skeleton';
import EmptyState from '../components/EmptyState';
import Toast from '../components/Toast';
import ReservationModal from '../components/ReservationModal';
import { buildReservationDate } from '../utils/reservationUtils';
import { BookOpen, Clock, User, Calendar, DollarSign, Users, Eye } from 'lucide-react';

const DAYS_ES = {
  Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles',
  Thursday: 'Jueves', Friday: 'Viernes', Saturday: 'Sábado', Sunday: 'Domingo',
};

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });
  const { user } = useAuth();

  const fetchClasses = useCallback(async () => {
    try {
      const classesData = await getAllClasses();
      setClasses(classesData);
    } catch {
      setToast({ message: 'No se pudieron cargar las clases', type: 'danger' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);

  const handleOpenReserve = (cls) => {
    if (!user) {
      setToast({ message: 'Ingresá a tu cuenta para reservar', type: 'warning' });
      return;
    }
    setSelectedClass(cls);
    setShowModal(true);
  };

  const handleConfirmReservation = async (classId, schedule) => {
    setBooking(true);
    try {
      const date = buildReservationDate(schedule);
      await createReservation(classId, date);
      setToast({ message: 'Reserva creada con éxito', type: 'success' });
      setShowModal(false);
      await fetchClasses();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'No se pudo crear la reserva', type: 'danger' });
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <Loader><Skeleton type="card" count={6} /></Loader>;

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

      <div className="text-center mb-5">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="feature-icon mb-2 text-primary">
            <BookOpen size={36} />
          </div>
          <h2 className="fw-bold">Nuestras Clases</h2>
          <p className="text-muted">Elegí la clase que mejor se adapte a vos</p>
        </motion.div>
      </div>

      {classes.length === 0 ? (
        <EmptyState icon={BookOpen} title="No hay clases disponibles" description="Pronto agregaremos nuevas clases. Volvé a consultar más tarde." />
      ) : (
        <div className="row g-4">
          {classes.map((cls, i) => (
            <motion.div className="col-md-6 col-lg-4" key={cls._id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <div className="class-card card border-0 h-100">
                <div className="class-bg-shape" style={{ background: `linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)` }} />
                <div className="card-body p-4 d-flex flex-column position-relative">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fw-semibold mb-0">{cls.name}</h5>
                    <span className="badge bg-primary-soft text-primary-dark rounded-pill">
                      <DollarSign size={12} className="me-1" />${cls.price}
                    </span>
                  </div>
                  <p className="card-text text-muted small flex-grow-1">{cls.description}</p>
                  <div className="mb-3">
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <User size={14} className="text-muted" />
                      <span className="small">{cls.instructor}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Clock size={14} className="text-muted" />
                      <span className="small">{cls.duration} min</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-1">
                      <Calendar size={14} className="text-muted" />
                      <span className="small">{cls.schedule?.map((s) => DAYS_ES[s.day] || s.day).join(', ')}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <Users size={14} className="text-muted" />
                      <span className="small">{cls.enrolledCount}/{cls.capacity} cupos</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-auto gap-2">
                    <div className="progress" style={{ height: 6, width: '40%', borderRadius: 3 }}>
                      <div className="progress-bar bg-primary" style={{ width: `${Math.min((cls.enrolledCount / cls.capacity) * 100, 100)}%` }} />
                    </div>
                    <Link to={`/classes/${cls._id}`} className="btn btn-outline-primary btn-sm rounded-pill px-3">
                      <Eye size={14} className="me-1" />Detalle
                    </Link>
                    <button className="btn btn-primary btn-sm rounded-pill px-4" onClick={() => handleOpenReserve(cls)} disabled={booking || cls.enrolledCount >= cls.capacity}>
                      {booking ? (
                        <span className="d-flex align-items-center gap-1">
                          <span className="spinner-border spinner-border-sm" />
                          Reservando...
                        </span>
                      ) : cls.enrolledCount >= cls.capacity ? (
                        'Completo'
                      ) : (
                        'Reservar'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedClass && (
        <ReservationModal
          cls={selectedClass}
          isOpen={showModal}
          onConfirm={handleConfirmReservation}
          onCancel={() => setShowModal(false)}
          loading={booking}
        />
      )}
    </motion.div>
  );
};

export default Classes;
