import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

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

  return (
    <>
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
                ✦ Bienestar y Movimiento
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
                  <span className="hero-circle-text">Harmony</span>
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
              { icon: '🧘', title: 'Pilates Mat', desc: 'Fortalece tu core con ejercicios en colchoneta.' },
              { icon: '⚙️', title: 'Reformer', desc: 'Trabajo profundo con máquinas especializadas.' },
              { icon: '🌸', title: 'Bienestar Integral', desc: 'Conecta cuerpo y mente en cada sesión.' },
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
                    <div className="feature-icon mb-3">{item.icon}</div>
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
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
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home;
