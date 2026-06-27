import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Plus, Trash2, XCircle, CheckCircle, BookOpen } from 'lucide-react';
import { createClass, updateClass, deleteClass } from '../../services/classService';
import EmptyState from '../EmptyState';
import ConfirmModal from '../ConfirmModal';

const DAYS_ES = {
  Monday: 'Lunes', Tuesday: 'Martes', Wednesday: 'Miércoles',
  Thursday: 'Jueves', Friday: 'Viernes', Saturday: 'Sábado', Sunday: 'Domingo',
};

const emptyClass = {
  name: '', description: '', instructor: '', duration: 60,
  capacity: 15, price: 0, schedule: [{ day: 'Monday', startTime: '08:00', endTime: '09:00' }],
  isActive: true, image: '',
};

const ClassesManager = ({ classes, onRefresh, setToast }) => {
  const [editingClass, setEditingClass] = useState(null);
  const [form, setForm] = useState(emptyClass);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleEditClass = (cls) => {
    setEditingClass(cls._id);
    setForm({
      name: cls.name, description: cls.description, instructor: cls.instructor,
      duration: cls.duration, capacity: cls.capacity, price: cls.price,
      schedule: cls.schedule, isActive: cls.isActive, image: cls.image || '',
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

  const validateClassForm = () => {
    const errs = [];
    if (!form.name || form.name.length < 2) errs.push('El nombre debe tener al menos 2 caracteres');
    if (!form.instructor) errs.push('El instructor es obligatorio');
    if (!form.description) errs.push('La descripción es obligatoria');
    if (!form.duration || form.duration < 15 || form.duration > 180) errs.push('La duración debe ser entre 15 y 180 minutos');
    if (!form.capacity || form.capacity < 1 || form.capacity > 50) errs.push('La capacidad debe ser entre 1 y 50');
    if (form.price < 0) errs.push('El precio no puede ser negativo');
    if (errs.length) {
      setToast({ message: errs.join('. '), type: 'danger' });
      return false;
    }
    return true;
  };

  const handleSaveClass = async (e) => {
    e.preventDefault();
    if (!validateClassForm()) return;
    try {
      if (editingClass) {
        await updateClass(editingClass, form);
        setToast({ message: 'Clase actualizada', type: 'success' });
      } else {
        await createClass(form);
        setToast({ message: 'Clase creada', type: 'success' });
      }
      setEditingClass(null);
      setForm(emptyClass);
      onRefresh();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error al guardar', type: 'danger' });
    }
  };

  const handleDeleteClass = async () => {
    try {
      await deleteClass(confirmDelete);
      setToast({ message: 'Clase eliminada', type: 'success' });
      setConfirmDelete(null);
      onRefresh();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error al eliminar', type: 'danger' });
    }
  };

  const handleToggleActive = async (cls) => {
    try {
      await updateClass(cls._id, { isActive: !cls.isActive });
      setToast({ message: `Clase ${cls.isActive ? 'desactivada' : 'activada'}`, type: 'success' });
      onRefresh();
    } catch {
      setToast({ message: 'Error al actualizar', type: 'danger' });
    }
  };

  const cancelForm = () => {
    setEditingClass(null);
    setForm(emptyClass);
  };

  if (classes.length === 0 && !editingClass) {
    return (
      <div>
        <EmptyState
          icon={BookOpen}
          title="No hay clases"
          description="Creá la primera clase para comenzar."
          action={
            <button className="btn btn-primary rounded-pill px-4" onClick={() => setEditingClass('new')}>
              <Plus size={16} className="me-1" />Crear Clase
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div>
      <motion.div
        className="d-flex justify-content-between align-items-center mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h5 className="fw-semibold mb-0 d-flex align-items-center gap-2">
          {editingClass ? <Edit3 size={18} /> : <Plus size={18} />}
          {editingClass ? 'Editar Clase' : 'Nueva Clase'}
        </h5>
        {editingClass && (
          <button className="btn btn-sm btn-outline-primary rounded-pill" onClick={cancelForm}>
            <Plus size={14} className="me-1" />Nueva
          </button>
        )}
      </motion.div>

      {(editingClass || !editingClass) && (
        <form onSubmit={handleSaveClass} className="card border-0 p-4 mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input name="name" className="form-control" value={form.name} onChange={handleFormChange} required minLength={2} />
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
              <input name="duration" type="number" className="form-control" value={form.duration} onChange={handleFormChange} required min={15} max={180} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Capacidad</label>
              <input name="capacity" type="number" className="form-control" value={form.capacity} onChange={handleFormChange} required min={1} max={50} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Precio ($)</label>
              <input name="price" type="number" className="form-control" value={form.price} onChange={handleFormChange} required min={0} />
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
                      {Object.entries(DAYS_ES).map(([val, label]) => (
                        <option key={val} value={val}>{label}</option>
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
                    <button type="button" className="btn btn-outline-danger w-100" onClick={() => removeScheduleEntry(idx)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" className="btn btn-sm btn-outline-primary mt-1 rounded-pill" onClick={addScheduleEntry}>
                <Plus size={14} className="me-1" />Agregar horario
              </button>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary rounded-pill px-4">
                {editingClass ? 'Actualizar' : 'Crear'} Clase
              </button>
            </div>
          </div>
        </form>
      )}

      <ConfirmModal
        isOpen={Boolean(confirmDelete)}
        title="Eliminar clase"
        message="¿Querés eliminar esta clase? Esta acción también cancelará las reservas confirmadas asociadas."
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmVariant="danger"
        onConfirm={handleDeleteClass}
        onCancel={() => setConfirmDelete(null)}
      />

      {classes.length > 0 && (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Instructor</th>
                <th>Precio</th>
                <th>Cupos</th>
                <th>Ocupación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => {
                const pct = cls.capacity > 0 ? Math.round((cls.enrolledCount / cls.capacity) * 100) : 0;
                return (
                  <tr key={cls._id}>
                    <td className="fw-medium">{cls.name}</td>
                    <td>{cls.instructor}</td>
                    <td>${cls.price}</td>
                    <td>{cls.enrolledCount}/{cls.capacity}</td>
                    <td style={{ minWidth: 100 }}>
                      <div className="d-flex align-items-center gap-2">
                        <div className="progress flex-grow-1" style={{ height: 6, borderRadius: 3 }}>
                          <div
                            className={`progress-bar ${pct >= 80 ? 'bg-danger' : pct >= 50 ? 'bg-warning' : 'bg-success'}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <small className="text-muted">{pct}%</small>
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${cls.isActive ? 'bg-success' : 'bg-secondary'}`}>
                        {cls.isActive ? 'Activa' : 'Inactiva'}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-outline-primary" title="Editar" onClick={() => handleEditClass(cls)}>
                          <Edit3 size={14} />
                        </button>
                        <button className={`btn btn-sm ${cls.isActive ? 'btn-outline-warning' : 'btn-outline-success'}`} title={cls.isActive ? 'Desactivar' : 'Activar'} onClick={() => handleToggleActive(cls)}>
                          {cls.isActive ? <XCircle size={14} /> : <CheckCircle size={14} />}
                        </button>
                        <button className="btn btn-sm btn-outline-danger" title="Eliminar" onClick={() => setConfirmDelete(cls._id)}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClassesManager;
