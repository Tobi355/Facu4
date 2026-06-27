import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Home, BookOpen, CalendarDays, LayoutDashboard, LogOut, User, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span className="brand-icon">✦</span> Harmony Studio
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/">
                <Home size={15} /> Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-1" to="/classes">
                <BookOpen size={15} /> Clases
              </Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-1" to="/my-reservations">
                    <CalendarDays size={15} /> Mis Reservas
                  </Link>
                </li>
                {isAdmin && (
                  <li className="nav-item">
                    <Link className="nav-link d-flex align-items-center gap-1 link-light border-bottom border-white" to="/admin">
                      <LayoutDashboard size={15} /> Dashboard
                    </Link>
                  </li>
                )}
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link text-white text-decoration-none d-flex align-items-center gap-1"
                    data-bs-toggle="dropdown"
                  >
                    <User size={15} /> {user.name}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item d-flex align-items-center gap-2" onClick={handleLogout}>
                        <LogOut size={15} /> Cerrar Sesión
                      </button>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center gap-1" to="/login">
                    <LogIn size={15} /> Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-outline-light btn-sm rounded-pill px-4 d-flex align-items-center gap-1" to="/register">
                    <UserPlus size={15} /> Registrarse
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
