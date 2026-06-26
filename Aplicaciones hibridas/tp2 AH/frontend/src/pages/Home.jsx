import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Clock, Heart, ArrowRight, Mail, Phone, MapPin, Users, Award, Zap } from 'lucide-react';
import Toast from '../components/Toast';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' },
  }),
};

const Home = () => {
  const { user } = useAuth();
  const [toast, setToast] = useState({ message: '', type: '' });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      setToast({ message: 'Por favor completa todos los campos', type: 'warning' });
      return;
    }
    setToast({ message: '¡Mensaje enviado! Nos pondremos en contacto pronto.', type: 'success' });
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      <section className="hero-section d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center min-vh-80">
            <div className="col-lg-6">
              <motion.span
                className="hero-badge"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles size={14} className="me-1" />
                Bienestar y Movimiento
              </motion.span>
              <motion.h1
                className="display-3 fw-bold hero-title mt-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                Encuentra tu <span className="text-gradient">equilibrio</span>
              </motion.h1>
              <motion.p
                className="lead text-muted mt-3"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                En Harmony Studio combinamos técnicas de Pilates con un ambiente pensado para
                tu bienestar físico y mental.
              </motion.p>
              <motion.div
                className="mt-4 d-flex gap-3 flex-wrap"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <Link to="/classes" className="btn btn-primary btn-lg rounded-pill px-5">
                  Explorar Clases
                  <ArrowRight size={18} className="ms-2" />
                </Link>
                {!user && (
                  <Link to="/register" className="btn btn-outline-primary btn-lg rounded-pill px-5">
                    Comenzar Ahora
                  </Link>
                )}
              </motion.div>
            </div>
            <div className="col-lg-6 d-none d-lg-flex justify-content-center">
              <motion.div
                className="hero-circle"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="hero-circle-inner">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}  
                  />
                  <span className="hero-circle-text" style={{ position: 'relative', zIndex: 1 }}>
                    Harmony
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            {[
              { icon: <Heart size={40} />, title: 'Pilates Mat', desc: 'Fortalece tu core con ejercicios en colchoneta.' },
              { icon: <Clock size={40} />, title: 'Reformer', desc: 'Trabajo profundo con máquinas especializadas.' },
              { icon: <Sparkles size={40} />, title: 'Bienestar Integral', desc: 'Conecta cuerpo y mente en cada sesión.' },
            ].map((item, i) => (
              <motion.div
                className="col-md-4"
                key={item.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="feature-card card border-0 h-100">
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3 text-primary">{item.icon}</div>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-primary-soft">
        <div className="container text-center">
          <motion.h2
            className="display-6 fw-semibold mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            ¿Listo para empezar tu práctica?
          </motion.h2>
          <motion.p
            className="text-muted mb-4 mx-auto"
            style={{ maxWidth: 500 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Reservá tu primera clase hoy y descubrí una nueva forma de moverte.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/classes" className="btn btn-primary btn-lg rounded-pill px-5">
              Ver Clases
              <ArrowRight size={18} className="ms-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section id="about" className="py-5 bg-light">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="display-6 fw-bold mb-3">Sobre Harmony Studio</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: 600 }}>
              Somos un estudio de Pilates dedicado a transformar vidas a través del movimiento consciente y el bienestar integral.
            </p>
          </motion.div>

          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="card border-0 shadow-sm p-4 mb-3">
                  <div className="d-flex gap-3 mb-3">
                    <div className="text-primary flex-shrink-0">
                      <Award size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold">Profesionales Certificados</h5>
                      <p className="text-muted small">Nuestros instructores cuentan con certificaciones internacionales en Pilates.</p>
                    </div>
                  </div>
                </div>
                <div className="card border-0 shadow-sm p-4 mb-3">
                  <div className="d-flex gap-3 mb-3">
                    <div className="text-primary flex-shrink-0">
                      <Users size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold">Comunidad Inclusiva</h5>
                      <p className="text-muted small">Trabajamos con grupos reducidos para brindarte atención personalizada.</p>
                    </div>
                  </div>
                </div>
                <div className="card border-0 shadow-sm p-4">
                  <div className="d-flex gap-3 mb-3">
                    <div className="text-primary flex-shrink-0">
                      <Zap size={24} />
                    </div>
                    <div>
                      <h5 className="fw-bold">Resultados Reales</h5>
                      <p className="text-muted small">Miles de estudiantes han transformado su vida en Harmony Studio.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="mb-3">
                  Harmony Studio nació con la misión de ofrecerte un espacio donde puedas reconectarte contigo mismo a través del Pilates. Nuestro enfoque combina la precisión del movimiento con la atención al detalle que mereces.
                </p>
                <p className="mb-3">
                  Cada clase es diseñada para adaptarse a tu nivel y objetivos, desde principiantes hasta practicantes avanzados. Contamos con diferentes disciplinas que complementan tu bienestar:
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">✓ Pilates Mat clásico</li>
                  <li className="mb-2">✓ Reformer con máquinas especializadas</li>
                  <li className="mb-2">✓ Yoga y Pilates Flow</li>
                  <li className="mb-2">✓ Clases para embarazadas</li>
                  <li className="mb-2">✓ Stretching y movilidad</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contact" className="py-5">
        <div className="container">
          <motion.div
            className="text-center mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="display-6 fw-bold mb-3">Ponte en Contacto</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: 600 }}>
              ¿Tienes preguntas? Nos encantaría escucharte. Envíanos un mensaje y te responderemos pronto.
            </p>
          </motion.div>

          <div className="row g-4">
            <div className="col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="card border-0 text-center p-4">
                  <div className="mb-3 text-primary">
                    <Phone size={32} className="mx-auto" />
                  </div>
                  <h5 className="fw-bold">Teléfono</h5>
                  <p className="text-muted">+54 11 1234 5678</p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="card border-0 text-center p-4">
                  <div className="mb-3 text-primary">
                    <Mail size={32} className="mx-auto" />
                  </div>
                  <h5 className="fw-bold">Email</h5>
                  <p className="text-muted">info@harmonystudio.com</p>
                </div>
              </motion.div>
            </div>
            <div className="col-lg-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="card border-0 text-center p-4">
                  <div className="mb-3 text-primary">
                    <MapPin size={32} className="mx-auto" />
                  </div>
                  <h5 className="fw-bold">Ubicación</h5>
                  <p className="text-muted">Buenos Aires, Argentina</p>
                </div>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="row mt-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="col-lg-6 mx-auto">
              <div className="card border-0 shadow-sm p-4">
                <h5 className="fw-bold mb-4">Envíanos tu Consulta</h5>
                <form onSubmit={handleContactSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Tu nombre"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Tu email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Mensaje</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="Tu mensaje"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100 rounded-pill">
                    Enviar Mensaje
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;

