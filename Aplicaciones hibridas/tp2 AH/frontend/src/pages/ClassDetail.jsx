import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getClassById } from '../services/classService';
import { createReservation } from '../services/reservationService';
import Loader from '../components/Loader';
import Toast from '../components/Toast';
import ReservationModal from '../components/ReservationModal';
import { BookOpen, Clock, User, Calendar, DollarSign, Users, ArrowLeft, MapPin } from 'lucide-react';

const DAYS_ES = {
  Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles',
  Thursday: 'Jueves', Friday: 'Viernes', Saturday: 'Sábado', Sunday: 'Domingo',
};

const ClassDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cls, setCls] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const data = await getClassById(id);
        if (!data) {
          setToast({ message: 'Clase no encontrada', type: 'danger' });
          return;
        }
        setCls(data);
      } catch {
        setToast({ message: 'Error al cargar la clase', type: 'danger' });
      } finally {
        setLoading(false);
      }
    };
    fetchClass();
  }, [id]);
() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setShowModal(true);
  };

  const handleConfirmReservation = async (classId, date) => {
    setBooking(true);
    try {
      await createReservation(classId, date);
      setToast({ message: '¡Reserva confirmada! Revisa tu email para los detalles.', type: 'success' });
      setShowModal(false);
      setTimeout(() => navigate('/my-reservations'), 2000,);
      setToast({ message: '¡Reserva confirmada!', type: 'success' });}
    catch (err) {
      setToast({ message: err.response?.data?.message || 'Error al reservar', type: 'danger' });
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <Loader />;

  if (!cls) {
    return (
      <div className="container py-5 text-center">
        <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
        <h3>Clase no encontrada</h3>
        <Link to="/classes" className="btn btn-primary mt-3 rounded-pill">Volver a Clases</Link>
      </div>
    );
  }

  const isFull = cls.enrolledCount >= cls.capacity;
  const pct = cls.capacity > 0 ? Math.round((cls.enrolledCount / cls.capacity) * 100) : 0;

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

      <Link to="/classes" className="btn btn-sm btn-outline-primary rounded-pill mb-4">
        <ArrowLeft size={16} className="me-1" />Volver a Clases
      </Link>

      <motion.div
        className="row g-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="col-lg-8">
          <div className="card border-0 p-4 h-100">
            <div className="d-flex align-items-center gap-2 mb-1">
              <BookOpen size={20} className="text-primary" />
              <span className="badge bg-primary-soft text-primary-dark rounded-pill">{cls.duration} min</span>
              <span className={`badge ${cls.isActive ? 'bg-success-soft text-success' : 'bg-secondary-soft text-secondary'} rounded-pill`}>
                {cls.isActive ? 'Activa' : 'Inactiva'}
              </span>
            </div>
            <h2 className="fw-bold mt-2">{cls.name}</h2>
            <p className="text-muted lead">{cls.description}</p>

            <div className="row g-3 mt-2">
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <User size={18} className="text-primary" />
                  <div>
                    <small className="text-muted d-block">Instructor</small>
                    <span className="fw-medium">{cls.instructor}</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Clock size={18} className="text-primary" />
                  <div>
                    <small className="text-muted d-block">Duración</small>
                    <span className="fw-medium">{cls.duration} minutos</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <DollarSign size={18} className="text-primary" />
                  <div>
                    <small className="text-muted d-block">Precio</small>
                    <span className="fw-medium">${cls.price}</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Users size={18} className="text-primary" />
                  <div>
                    <small className="text-muted d-block">Cupos</small>
                    <span className="fw-medium">{cls.enrolledCount}/{cls.capacity}</span>
                  </div>
                </div>
              </div>
            </div>

            {cls.schedule && cls.schedule.length > 0 && (
              <div className="mt-3">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <Calendar size={18} className="text-primary" />
                  <small className="text-muted">Horarios</small>
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {cls.schedule.map((s, i) => (
                    <span key={i} className="badge bg-light text-dark border px-3 py-2">
                      {DAYS_ES[s.day] || s.day}: {s.startTime} - {s.endTime}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className="small text-muted mb-1">Ocupación</label>
              <div className="d-flex align-items-center gap-3">
                <div className="progress flex-grow-1" style={{ height: 10, borderRadius: 5 }}>
                  <div
                    className={`progress-bar ${pct >= 80 ? 'bg-danger' : pct >= 50 ? 'bg-warning' : 'bg-success'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="fw-semibold">{pct}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 p-4">
            <h5 className="fw-semibold mb-3">Reservá esta clase</h5>
            <p className="small text-muted mb-3">
              {isFull
                ? 'Esta clase está completa. Consultá otras opciones disponibles.'
                : 'Reservá tu lugar y empezá a disfrutar de esta clase.'}
            </p>
            {user ? (
              <button
                className="btn btn-primary w-100 btn-lg rounded-pill"
                onClick={handleReserve}
                disabled={booking || isFull}
              >
                {booking ? (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <span className="spinner-border spinner-border-sm" />
                    Reservando...
                  </span>
                ) : isFull ? (
                  'Clase Completa'
                ) : (
                  'Reservar Ahora'
                )}
              </button>
            ) : (
              <Link to="/login" className="btn btn-outline-primary w-100 btn-lg rounded-pill">
                Iniciar Sesión para Reservar
              </Link>
            )}
            {user && !isFull && (
              <p className="text-center mt-2 mb-0">
                <small className="text-muted">
                  Quedan {cls.capacity - cls.enrolledCount} cupos disponibles
                </small>
              </p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Reservation Modal */}
      {cls && (
        <ReservationModal
          cls={cls}
          isOpen={showModal}
          onConfirm={handleConfirmReservation}
          onCancel={() => setShowModal(false)}
          loading={booking}
        />
      )}
    </motion.div>
  );
};

export default ClassDetail;
