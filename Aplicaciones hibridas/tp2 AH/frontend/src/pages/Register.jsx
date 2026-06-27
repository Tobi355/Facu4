import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { UserPlus, Mail, Lock, User, Phone, AlertCircle } from 'lucide-react';
import Toast from '../components/Toast';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name || form.name.length < 2) errs.name = 'El nombre debe tener al menos 2 caracteres';
    else if (form.name.length > 50) errs.name = 'El nombre no debe exceder 50 caracteres';
    if (!form.email) errs.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email inválido';
    if (!form.password) errs.password = 'La contraseña es obligatoria';
    else if (form.password.length < 6) errs.password = 'Mínimo 6 caracteres';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Las contraseñas no coinciden';
    if (form.phone && !/^[\d\s\-\+\(\)]{7,20}$/.test(form.phone)) errs.phone = 'Formato de teléfono inválido';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast({ message: '', type: '' });
    if (!validate()) return;
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      setToast({ message: 'Cuenta creada correctamente', type: 'success' });
      navigate('/');
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error al registrarse', type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="container py-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      <div className="row justify-content-center" style={{ minHeight: '80vh' }}>
        <div className="col-md-5 d-flex align-items-center">
          <div className="w-100">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-center mb-4">
                <div className="feature-icon mb-2 text-primary">
                  <UserPlus size={36} />
                </div>
                <h2 className="fw-bold mb-1">Crear cuenta</h2>
                <p className="text-muted">Unite a Harmony Studio</p>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><User size={18} /></span>
                  <input
                    type="text"
                    name="name"
                    className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><Mail size={18} /></span>
                  <input
                    type="email"
                    name="email"
                    className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tucorreo@ejemplo.com"
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono (opcional)</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><Phone size={18} /></span>
                  <input
                    type="text"
                    name="phone"
                    className={`form-control form-control-lg ${errors.phone ? 'is-invalid' : ''}`}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+54 11 1234-5678"
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><Lock size={18} /></span>
                  <input
                    type="password"
                    name="password"
                    className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
              </div>
              <div className="mb-4">
                <label className="form-label">Confirmar Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><Lock size={18} /></span>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Repetí tu contraseña"
                    minLength={6}
                  />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100 btn-lg rounded-pill"
                disabled={loading}
              >
                {loading ? (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <span className="spinner-border spinner-border-sm" />
                    Creando cuenta...
                  </span>
                ) : (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <UserPlus size={18} />
                    Registrarse
                  </span>
                )}
              </button>
            </form>

            <p className="text-center mt-4 mb-0">
              ¿Ya tenés cuenta?{' '}
              <Link to="/login" className="fw-semibold">Iniciar Sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
