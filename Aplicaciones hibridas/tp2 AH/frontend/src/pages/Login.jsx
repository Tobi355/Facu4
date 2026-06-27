import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import Toast from '../components/Toast';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email inválido';
    if (!form.password) errs.password = 'La contraseña es obligatoria';
    else if (form.password.length < 6) errs.password = 'La contraseña debe tener al menos 6 caracteres';
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
      await login(form.email, form.password);
      setToast({ message: 'Inicio de sesión exitoso', type: 'success' });
      navigate('/');
    } catch (err) {
      setToast({ message: err.response?.data?.message || 'Error al iniciar sesión', type: 'danger' });
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
                  <LogIn size={36} />
                </div>
                <h2 className="fw-bold mb-1">Bienvenida de vuelta</h2>
                <p className="text-muted">Ingresá a tu cuenta de Harmony Studio</p>
              </div>
            </motion.div>

            <form onSubmit={handleSubmit} noValidate>
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
              <div className="mb-4">
                <label className="form-label">Contraseña</label>
                <div className="input-group">
                  <span className="input-group-text bg-white"><Lock size={18} /></span>
                  <input
                    type="password"
                    name="password"
                    className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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
                    Ingresando...
                  </span>
                ) : (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <LogIn size={18} />
                    Iniciar Sesión
                  </span>
                )}
              </button>
            </form>

            <p className="text-center mt-4 mb-0">
              ¿No tenés cuenta?{' '}
              <Link to="/register" className="fw-semibold">Registrate</Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
