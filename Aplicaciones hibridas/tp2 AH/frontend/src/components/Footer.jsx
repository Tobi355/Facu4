import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section bg-dark text-light mt-5 pt-5">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Sobre Harmony */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Harmony Studio</h5>
            <p className="text-muted small">
              Tu espacio de bienestar donde el movimiento consciente se encuentra con la serenidad.
            </p>
            <div className="d-flex gap-2 mt-3">
              <a href="#" className="text-muted text-decoration-none" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted text-decoration-none" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted text-decoration-none" title="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none" style={{ transition: '0.3s' }}>
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/classes" className="text-muted text-decoration-none">
                  Nuestras Clases
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/classes" className="text-muted text-decoration-none">
                  Reservar Clase
                </Link>
              </li>
              <li className="mb-2">
                <a href="#about" className="text-muted text-decoration-none">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Contacto</h5>
            <div className="d-flex gap-2 mb-2">
              <Phone size={16} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="small text-muted mb-0">+54 11 1234 5678</p>
              </div>
            </div>
            <div className="d-flex gap-2 mb-2">
              <Mail size={16} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="small text-muted mb-0">info@harmonystudio.com</p>
              </div>
            </div>
            <div className="d-flex gap-2">
              <MapPin size={16} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="small text-muted mb-0">Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div className="col-md-3">
            <h5 className="fw-bold mb-3">Horarios</h5>
            <ul className="list-unstyled small text-muted">
              <li className="mb-1">
                <span className="fw-500 text-light">Lunes - Viernes:</span><br /> 8:00 - 20:00
              </li>
              <li className="mb-1">
                <span className="fw-500 text-light">Sábado:</span><br /> 9:00 - 15:00
              </li>
              <li>
                <span className="fw-500 text-light">Domingo:</span><br /> Cerrado
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <hr className="bg-secondary-soft" />

        {/* Copyright */}
        <div className="row align-items-center py-3">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-muted small mb-0">
              &copy; {currentYear} Harmony Studio. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="text-muted text-decoration-none small me-3">Privacidad</a>
            <a href="#" className="text-muted text-decoration-none small">Términos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
