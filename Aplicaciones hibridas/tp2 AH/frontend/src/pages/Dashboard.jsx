import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getAdminClasses } from '../services/classService';
import { getAllReservations } from '../services/reservationService';
import { getUsers } from '../services/userService';
import Loader from '../components/Loader';
import Skeleton from '../components/Skeleton';
import Toast from '../components/Toast';
import { LayoutDashboard, BookOpen, CalendarDays, Users } from 'lucide-react';
import MetricCard from '../components/admin/MetricCard';
import ActivityTimeline from '../components/admin/ActivityTimeline';
import ActivityChart from '../components/admin/ActivityChart';
import ClassesManager from '../components/admin/ClassesManager';
import ReservationsManager from '../components/admin/ReservationsManager';
import UsersManager from '../components/admin/UsersManager';

const TABS = [
  { key: 'Clases', label: 'Clases', icon: BookOpen },
  { key: 'Reservas', label: 'Reservas', icon: CalendarDays },
  { key: 'Usuarios', label: 'Usuarios', icon: Users },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Clases');
  const [classes, setClasses] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [clsData, resData, usrData] = await Promise.all([
        getAdminClasses(),
        getAllReservations(),
        getUsers(),
      ]);
      setClasses(clsData);
      setReservations(resData);
      setUsers(usrData);
    } catch {
      setToast({ message: 'Error al cargar datos', type: 'danger' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loader><Skeleton type="table" count={5} /></Loader>;

  const confirmedReservations = reservations.filter((r) => r.status === 'confirmed');
  const totalRevenue = classes.reduce((sum, c) => sum + c.price * c.enrolledCount, 0);

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="d-flex align-items-center gap-2 mb-1">
          <LayoutDashboard size={28} className="text-primary" />
          <h2 className="fw-bold mb-0">Dashboard Admin</h2>
        </div>
        <p className="text-muted mb-4">Panel de control completo del estudio</p>
      </motion.div>

      <MetricCard
        classes={classes}
        confirmedReservations={confirmedReservations}
        users={users}
        totalRevenue={totalRevenue}
      />

      <ActivityChart reservations={reservations} classes={classes} />

      <ActivityTimeline reservations={reservations} classes={classes} />

      <ul className="nav nav-tabs mb-4">
        {TABS.map(({ key, label, icon: Icon }) => (
          <li className="nav-item" key={key}>
            <button
              className={`nav-link d-flex align-items-center gap-2 ${activeTab === key ? 'active' : ''}`}
              onClick={() => setActiveTab(key)}
            >
              <Icon size={16} />
              {label}
            </button>
          </li>
        ))}
      </ul>

      {activeTab === 'Clases' && (
        <ClassesManager classes={classes} onRefresh={fetchData} setToast={setToast} />
      )}

      {activeTab === 'Reservas' && (
        <ReservationsManager reservations={reservations} onRefresh={fetchData} setToast={setToast} />
      )}

      {activeTab === 'Usuarios' && (
        <UsersManager users={users} onRefresh={fetchData} setToast={setToast} />
      )}
    </motion.div>
  );
};

export default Dashboard;
