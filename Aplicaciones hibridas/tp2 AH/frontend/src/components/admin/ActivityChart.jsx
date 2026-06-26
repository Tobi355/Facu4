import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';

const COLORS = ['#6C63FF', '#FF6584', '#FFB347', '#47B8FF', '#51CF66'];

const ActivityChart = ({ reservations, classes }) => {
  const activeClasses = classes.filter((c) => c.isActive);
  const pieData = activeClasses.map((c) => ({
    name: c.name,
    value: c.enrolledCount,
  }));

  const barData = activeClasses.map((c) => ({
    name: c.name.length > 12 ? c.name.slice(0, 12) + '...' : c.name,
    Inscriptos: c.enrolledCount,
    Cupos: c.capacity,
  }));

  if (classes.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-4"
    >
      <div className="row g-3">
        <div className="col-md-6">
          <div className="dashboard-section">
            <h6 className="fw-semibold mb-3">Inscriptos por Clase</h6>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#999' }} />
                <YAxis tick={{ fontSize: 11, fill: '#999' }} />
                <Tooltip
                  contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="Inscriptos" fill="#6C63FF" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Cupos" fill="#47B8FF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-md-6">
          <div className="dashboard-section">
            <h6 className="fw-semibold mb-3">Distribución de Inscriptos</h6>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8 }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityChart;
