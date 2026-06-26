import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CalendarDays, Users, TrendingUp } from 'lucide-react';

const MetricCard = ({ classes, confirmedReservations, users, totalRevenue }) => (
  <motion.div
    className="row g-3 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div className="col-6 col-md-3">
      <div className="metric-card metric-primary h-100">
        <div className="d-flex align-items-center gap-3 mb-2">
          <div className="metric-icon bg-primary-soft text-primary">
            <BookOpen size={22} />
          </div>
        </div>
        <div className="metric-number">{classes.length}</div>
        <div className="metric-label">Clases</div>
      </div>
    </div>
    <div className="col-6 col-md-3">
      <div className="metric-card metric-secondary h-100">
        <div className="d-flex align-items-center gap-3 mb-2">
          <div className="metric-icon bg-secondary-soft" style={{ color: 'var(--secondary)' }}>
            <CalendarDays size={22} />
          </div>
        </div>
        <div className="metric-number">{confirmedReservations.length}</div>
        <div className="metric-label">Reservas Activas</div>
      </div>
    </div>
    <div className="col-6 col-md-3">
      <div className="metric-card metric-accent h-100">
        <div className="d-flex align-items-center gap-3 mb-2">
          <div className="metric-icon bg-accent-soft" style={{ color: 'var(--accent)' }}>
            <Users size={22} />
          </div>
        </div>
        <div className="metric-number">{users.length}</div>
        <div className="metric-label">Usuarios</div>
      </div>
    </div>
    <div className="col-6 col-md-3">
      <div className="metric-card metric-info h-100">
        <div className="d-flex align-items-center gap-3 mb-2">
          <div className="metric-icon" style={{ background: 'var(--info-light)', color: 'var(--info)' }}>
            <TrendingUp size={22} />
          </div>
        </div>
        <div className="metric-number">${totalRevenue.toLocaleString()}</div>
        <div className="metric-label">Ingresos Potenciales</div>
      </div>
    </div>
  </motion.div>
);

export default MetricCard;
