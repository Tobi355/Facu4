import React, { useState } from 'react';
import { CalendarDays, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { updateReservation, deleteReservation } from '../../services/reservationService';
import EmptyState from '../EmptyState';
import ConfirmModal from '../ConfirmModal';

const ReservationsManager = ({ reservations, onRefresh, setToast }) => {
  const [cancellingId, setCancellingId] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(null);

  const handleCancel = async () => {
    setCancellingId(confirmCancel);
    try {
      await deleteReservation(confirmCancel);
      setToast({ message: 'Reserva eliminada', type: 'success' });
      setConfirmCancel(null);
      onRefresh();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error al eliminar', type: 'danger' });
    } finally {
      setCancellingId(null);
    }
  };

  const handleToggleStatus = async (res) => {
    const newStatus = res.status === 'confirmed' ? 'cancelled' : 'confirmed';
    try {
      await updateReservation(res._id, { status: newStatus });
      setToast({ message: `Reserva ${newStatus === 'confirmed' ? 'confirmada' : 'cancelada'}`, type: 'success' });
      onRefresh();
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error al actualizar', type: 'danger' });
    }
  };

  if (reservations.length === 0) {
    return (
      <EmptyState icon={CalendarDays} title="Sin reservas" description="No hay reservas registradas aún." />
    );
  }

  return (
    <>
      <ConfirmModal
        isOpen={Boolean(confirmCancel)}
        title="Eliminar reserva"
        message="¿Querés eliminar esta reserva de forma permanente?"
        confirmLabel="Eliminar reserva"
        cancelLabel="Volver"
        confirmVariant="warning"
        onConfirm={handleCancel}
        onCancel={() => setConfirmCancel(null)}
      />
      <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            <th>Clase</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Creada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res._id}>
              <td className="fw-medium">{res.user?.name || 'N/A'}</td>
              <td><small className="text-muted">{res.user?.email || ''}</small></td>
              <td>{res.class?.name || 'N/A'}</td>
              <td>{new Date(res.date).toLocaleDateString('es-AR')}</td>
              <td>
                <span className={`badge ${res.status === 'confirmed' ? 'bg-success' : 'bg-secondary'}`}>
                  {res.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}
                </span>
              </td>
              <td><small className="text-muted">{new Date(res.createdAt).toLocaleDateString('es-AR')}</small></td>
              <td>
                <div className="d-flex gap-1">
                  <button
                    className={`btn btn-sm ${res.status === 'confirmed' ? 'btn-outline-warning' : 'btn-outline-success'}`}
                    title={res.status === 'confirmed' ? 'Cancelar' : 'Confirmar'}
                    onClick={() => handleToggleStatus(res)}
                  >
                    {res.status === 'confirmed' ? <XCircle size={14} /> : <CheckCircle size={14} />}
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    title="Eliminar"
                    onClick={() => setConfirmCancel(res._id)}
                    disabled={cancellingId === res._id}
                  >
                    {cancellingId === res._id ? (
                      <span className="spinner-border spinner-border-sm" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
};

export default ReservationsManager;
