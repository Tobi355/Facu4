import React from 'react';
import { motion } from 'framer-motion';
import { Activity, BarChart3 } from 'lucide-react';
import ActivityChart from './ActivityChart';

const ActivityTimeline = ({ reservations, classes }) => (
  <motion.div
    className="row g-3 mb-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.25 }}
  >
    <div className="col-md-6">
      <div className="dashboard-section">
        <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
          <Activity size={18} className="text-primary" />
          Actividad Reciente
        </h6>
        {reservations.length === 0 ? (
          <p className="text-muted small mb-0">Sin actividad reciente</p>
        ) : (
          reservations.slice(0, 5).map((r) => (
            <div className="timeline-item" key={r._id}>
              <small>
                <span className="fw-medium">{r.user?.name || 'Usuario'}</span>
                {' '}reservó{' '}
                <span className="fw-medium">{r.class?.name || 'clase'}</span>
                <br />
                <span className="text-muted">
                  {new Date(r.createdAt).toLocaleDateString('es-AR', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              </small>
            </div>
          ))
        )}
      </div>
    </div>
    <div className="col-md-6">
      <div className="dashboard-section">
        <h6 className="fw-semibold mb-3 d-flex align-items-center gap-2">
          <BarChart3 size={18} className="text-primary" />
          Ocupación de Clases
        </h6>
        {classes.length === 0 ? (
          <p className="text-muted small mb-0">Sin clases disponibles</p>
        ) : (
          classes.filter((c) => c.isActive).slice(0, 6).map((c) => {
            const pct = c.capacity > 0 ? Math.round((c.enrolledCount / c.capacity) * 100) : 0;
            return (
              <div className="mb-2" key={c._id}>
                <div className="d-flex justify-content-between small mb-1">
                  <span className="text-truncate me-2">{c.name}</span>
                  <span className="text-muted flex-shrink-0">{pct}%</span>
                </div>
                <div className="progress" style={{ height: 4, borderRadius: 2 }}>
                  <div
                    className={`progress-bar ${pct >= 80 ? 'bg-danger' : pct >= 50 ? 'bg-warning' : 'bg-success'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  </motion.div>
);

export default ActivityTimeline;
