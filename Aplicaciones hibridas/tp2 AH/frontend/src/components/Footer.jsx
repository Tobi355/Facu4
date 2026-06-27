import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section mt-5 pt-5 pb-4 position-relative z-1">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Sobre Harmony */}
          <div className="col-md-3">
            <h4 className="footer-title mb-3">Harmony Studio</h4>
            <p className="small mb-4">
              Tu espacio de bienestar donde el movimiento consciente se encuentra con la serenidad.
            </p>
            <div className="footer-social d-flex gap-2">
              <a href="#" className="text-decoration-none" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-decoration-none" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-decoration-none" title="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div className="col-md-3">
            <h4 className="footer-title mb-3">Enlaces Rápidos</h4>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link to="/" className="footer-link">
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/classes" className="footer-link">
                  Nuestras Clases
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/classes" className="footer-link">
                  Reservar Clase
                </Link>
              </li>
              <li className="mb-2">
                <a href="#about" className="footer-link">
                  Sobre Nosotros
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-md-3">
            <h4 className="footer-title mb-3">Contacto</h4>
            <div className="d-flex gap-2 align-items-start mb-2">
              <Phone size={16} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="small footer-copy mb-0">+54 11 1234 5678</p>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-start mb-2">
              <Mail size={16} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="small footer-copy mb-0">info@harmonystudio.com</p>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-start">
              <MapPin size={16} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="small footer-copy mb-0">Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div className="col-md-3">
            <h4 className="footer-title mb-3">Horarios</h4>
            <ul className="list-unstyled small footer-copy">
              <li className="mb-2">
                <span className="fw-semibold text-light">Lunes - Viernes:</span><br /> 8:00 - 20:00
              </li>
              <li className="mb-2">
                <span className="fw-semibold text-light">Sábado:</span><br /> 9:00 - 15:00
              </li>
              <li>
                <span className="fw-semibold text-light">Domingo:</span><br /> Cerrado
              </li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <hr className="footer-divider" />

        {/* Copyright */}
        <div className="row align-items-center py-3">
          <div className="col-md-6 text-center text-md-start">
            <p className="footer-copy mb-0">
              &copy; {currentYear} Harmony Studio. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <a href="#" className="footer-link small me-3">Privacidad</a>
            <a href="#" className="footer-link small">Términos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
