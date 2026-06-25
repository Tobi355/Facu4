import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import API from '../api/axios';
import Loader from '../components/Loader';

const TABS = ['Clases', 'Reservas', 'Usuarios'];

const emptyClass = {
  name: '', description: '', instructor: '', duration: 60,
  capacity: 15, price: 0, schedule: [{ day: 'Monday', startTime: '08:00', endTime: '09:00' }],
  isActive: true, image: '',
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Clases');
  const [classes, setClasses] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingClass, setEditingClass] = useState(null);
  const [form, setForm] = useState(emptyClass);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [clsRes, resRes, usrRes] = await Promise.all([
        API.get('/classes/admin'),
        API.get('/reservations/admin/all'),
        API.get('/users'),
      ]);
      setClasses(clsRes.data.classes);
      setReservations(resRes.data.reservations);
      setUsers(usrRes.data.users);
    } catch {
      showMessage('Error al cargar datos', 'danger');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleEditClass = (cls) => {
    setEditingClass(cls._id);
    setForm({
      name: cls.name,
      description: cls.description,
      instructor: cls.instructor,
      duration: cls.duration,
      capacity: cls.capacity,
      price: cls.price,
      schedule: cls.schedule,
      isActive: cls.isActive,
      image: cls.image || '',
    });
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleScheduleChange = (idx, field, value) => {
    const updated = [...form.schedule];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm({ ...form, schedule: updated });
  };

  const addScheduleEntry = () => {
    setForm({
      ...form,
      schedule: [...form.schedule, { day: 'Monday', startTime: '08:00', endTime: '09:00' }],
    });
  };

  const removeScheduleEntry = (idx) => {
    const updated = form.schedule.filter((_, i) => i !== idx);
    setForm({ ...form, schedule: updated.length ? updated : emptyClass.schedule });
  };

  const handleSaveClass = async (e) => {
    e.preventDefault();
    try {
      if (editingClass) {
        await API.put(`/classes/${editingClass}`, form);
        showMessage('Clase actualizada', 'success');
      } else {
        await API.post('/classes', form);
        showMessage('Clase creada', 'success');
      }
      setEditingClass(null);
      setForm(emptyClass);
      fetchData();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Error al guardar', 'danger');
    }
  };

  const handleDeleteClass = async (id) => {
    if (!window.confirm('¿Eliminar esta clase?')) return;
    try {
      await API.delete(`/classes/${id}`);
      showMessage('Clase eliminada', 'success');
      fetchData();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Error al eliminar', 'danger');
    }
  };

  const handleToggleActive = async (cls) => {
    try {
      await API.put(`/classes/${cls._id}`, { isActive: !cls.isActive });
      showMessage(`Clase ${cls.isActive ? 'desactivada' : 'activada'}`, 'success');
      fetchData();
    } catch (err) {
      showMessage('Error al actualizar', 'danger');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await API.put(`/users/${userId}`, { role: newRole });
      showMessage('Rol actualizado', 'success');
      fetchData();
    } catch (err) {
      showMessage(err.response?.data?.message || 'Error', 'danger');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return;
    try {
      await API.delete(`/users/${id}`);
      showMessage('Usuario eliminado', 'success');
      fetchData();
    } catch (err) {
      showMessage('Error al eliminar', 'danger');
    }
  };

  if (loading) return <Loader />;

  const cancelForm = () => {
    setEditingClass(null);
    setForm(emptyClass);
  };

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="fw-bold mb-1">Dashboard Admin</h2>
      <p className="text-muted mb-4">Gestión completa del estudio</p>

      {message && (
        <div className={`alert alert-${messageType} alert-dismissible fade show py-2`}>
          {message}
          <button className="btn-close" onClick={() => setMessage('')}></button>
        </div>
      )}

      <ul className="nav nav-tabs mb-4">
        {TABS.map((tab) => (
          <li className="nav-item" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>

      {activeTab === 'Clases' && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-semibold mb-0">
              {editingClass ? 'Editar Clase' : 'Nueva Clase'}
            </h5>
            {editingClass && (
              <button className="btn btn-sm btn-outline-secondary" onClick={cancelForm}>
                + Nueva
              </button>
            )}
          </div>

          <form onSubmit={handleSaveClass} className="card border-0 p-4 mb-4">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nombre</label>
                <input name="name" className="form-control" value={form.name} onChange={handleFormChange} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Instructor</label>
                <input name="instructor" className="form-control" value={form.instructor} onChange={handleFormChange} required />
              </div>
              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea name="description" className="form-control" rows="2" value={form.description} onChange={handleFormChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Duración (min)</label>
                <input name="duration" type="number" className="form-control" value={form.duration} onChange={handleFormChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Capacidad</label>
                <input name="capacity" type="number" className="form-control" value={form.capacity} onChange={handleFormChange} required />
              </div>
              <div className="col-md-3">
                <label className="form-label">Precio ($)</label>
                <input name="price" type="number" className="form-control" value={form.price} onChange={handleFormChange} required />
              </div>
              <div className="col-md-3 d-flex align-items-end">
                <div className="form-check">
                  <input name="isActive" type="checkbox" className="form-check-input" checked={form.isActive} onChange={handleFormChange} id="activeCheck" />
                  <label className="form-check-label" htmlFor="activeCheck">Activa</label>
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Horarios</label>
                {form.schedule.map((entry, idx) => (
                  <div className="row g-2 mb-2" key={idx}>
                    <div className="col-md-4">
                      <select className="form-select" value={entry.day} onChange={(e) => handleScheduleChange(idx, 'day', e.target.value)}>
                        {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <input type="time" className="form-control" value={entry.startTime} onChange={(e) => handleScheduleChange(idx, 'startTime', e.target.value)} />
                    </div>
                    <div className="col-md-3">
                      <input type="time" className="form-control" value={entry.endTime} onChange={(e) => handleScheduleChange(idx, 'endTime', e.target.value)} />
                    </div>
                    <div className="col-md-2">
                      <button type="button" className="btn btn-outline-danger w-100" onClick={() => removeScheduleEntry(idx)}>✕</button>
                    </div>
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-outline-primary mt-1" onClick={addScheduleEntry}>+ Agregar horario</button>
              </div>
              <div className="col-12">
                <button type="submit" className="btn btn-primary rounded-pill px-4">
                  {editingClass ? 'Actualizar' : 'Crear'} Clase
                </button>
              </div>
            </div>
          </form>

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Nombre</th>
                  <th>Instructor</th>
                  <th>Precio</th>
                  <th>Cupos</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls._id}>
                    <td className="fw-medium">{cls.name}</td>
                    <td>{cls.instructor}</td>
                    <td>${cls.price}</td>
                    <td>{cls.enrolledCount}/{cls.capacity}</td>
                    <td>
                      <span className={`badge ${cls.isActive ? 'bg-success' : 'bg-secondary'}`}>
                        {cls.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditClass(cls)}>Editar</button>
                        <button className="btn btn-sm btn-outline-warning" onClick={() => handleToggleActive(cls)}>
                          {cls.isActive ? 'Desactivar' : 'Activar'}
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteClass(cls._id)}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'Reservas' && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Usuario</th>
                <th>Clase</th>
                <th>Fecha</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res._id}>
                  <td>{res.user?.name || 'N/A'}</td>
                  <td>{res.class?.name || 'N/A'}</td>
                  <td>{new Date(res.date).toLocaleDateString('es-AR')}</td>
                  <td>
                    <span className={`badge ${res.status === 'confirmed' ? 'bg-success' : 'bg-secondary'}`}>
                      {res.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'Usuarios' && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td className="fw-medium">{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'admin' ? 'bg-primary' : 'bg-secondary'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString('es-AR')}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <select
                        className="form-select form-select-sm"
                        style={{ width: 120 }}
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteUser(u._id)}>Eliminar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default Dashboard;
