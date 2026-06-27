import React, { useState } from 'react';
import { Users, Trash2, Plus, UserPlus } from 'lucide-react';
import { updateUser, deleteUser } from '../../services/userService';
import { register } from '../../services/authService';
import EmptyState from '../EmptyState';
import ConfirmModal from '../ConfirmModal';

const UsersManager = ({ users, onRefresh, setToast }) => {
  const [showCreate, setShowCreate] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', phone: '' });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUser(userId, { role: newRole });
      setToast({ message: 'Rol actualizado', type: 'success' });
      onRefresh();
    } catch {
      setToast({ message: 'Error al actualizar rol', type: 'danger' });
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(confirmDelete);
      setToast({ message: 'Usuario eliminado', type: 'success' });
      setConfirmDelete(null);
      onRefresh();
    } catch {
      setToast({ message: 'Error al eliminar', type: 'danger' });
    }
  };

  const validateUserForm = () => {
    const errs = [];
    if (!newUser.name || newUser.name.length < 2) errs.push('El nombre debe tener al menos 2 caracteres');
    if (!newUser.email) errs.push('El email es obligatorio');
    else if (!/\S+@\S+\.\S+/.test(newUser.email)) errs.push('Email inválido');
    if (!newUser.password || newUser.password.length < 6) errs.push('La contraseña debe tener al menos 6 caracteres');
    if (errs.length) {
      setToast({ message: errs.join('. '), type: 'danger' });
      return false;
    }
    return true;
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!validateUserForm()) return;
    try {
      await register(newUser.name, newUser.email, newUser.password, newUser.phone);
      setToast({ message: 'Usuario creado exitosamente', type: 'success' });
      setShowCreate(false);
      setNewUser({ name: '', email: '', password: '', phone: '' });
      onRefresh();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error al crear usuario', type: 'danger' });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="fw-semibold mb-0 d-flex align-items-center gap-2">
          <Plus size={18} />
          {showCreate ? 'Nuevo Usuario' : 'Usuarios'}
        </h5>
        {!showCreate && (
          <button className="btn btn-primary btn-sm rounded-pill" onClick={() => setShowCreate(true)}>
            <UserPlus size={14} className="me-1" />Crear Usuario
          </button>
        )}
        {showCreate && (
          <button className="btn btn-sm btn-outline-secondary rounded-pill" onClick={() => setShowCreate(false)}>
            Cancelar
          </button>
        )}
      </div>

      {showCreate && (
        <form onSubmit={handleCreateUser} className="card border-0 p-4 mb-4">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Nombre</label>
              <input
                name="name"
                className="form-control"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
                minLength={2}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                required
                minLength={6}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Teléfono (opcional)</label>
              <input
                name="phone"
                className="form-control"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary rounded-pill px-4">
                Crear Usuario
              </button>
            </div>
          </div>
        </form>
      )}

      <ConfirmModal
        isOpen={Boolean(confirmDelete)}
        title="Eliminar usuario"
        message="¿Querés eliminar este usuario?"
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        confirmVariant="danger"
        onConfirm={handleDeleteUser}
        onCancel={() => setConfirmDelete(null)}
      />

      {users.length === 0 ? (
        <EmptyState icon={Users} title="Sin usuarios" description="No hay usuarios registrados aún." />
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
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
                  <td><small className="text-muted">{u.email}</small></td>
                  <td>
                    <span className={`badge ${u.role === 'admin' ? 'bg-primary' : 'bg-secondary'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td><small className="text-muted">{new Date(u.createdAt).toLocaleDateString('es-AR')}</small></td>
                  <td>
                    <div className="d-flex gap-2">
                      <select
                        className="form-select form-select-sm"
                        style={{ width: 100 }}
                        value={u.role}
                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                      <button className="btn btn-sm btn-outline-danger" title="Eliminar" onClick={() => setConfirmDelete(u._id)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersManager;
