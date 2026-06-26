# Harmony Studio - Sistema de Gestión y Reservas

Plataforma web profesional para la gestión de clases y reservas de un estudio de Pilates. Harmony Studio permite a los usuarios explorar clases, ver detalle de cada clase, reservar turnos y administrar sus reservas, mientras que los administradores cuentan con un panel completo para gestionar clases, usuarios, reservas y visualizar métricas del estudio con gráficos interactivos.

## Stack Tecnológico

### Frontend
- **React 18** con Hooks y Context API
- **Bootstrap 5.3** para diseño responsive
- **Framer Motion** para animaciones
- **React Router 6** para navegación SPA
- **Lucide React** para iconografía
- **Recharts** para gráficos y visualización de métricas
- **Axios** para consumo de API
- **CSS personalizado** con variables y diseño premium

### Backend
- **Node.js + Express** para API REST
- **MongoDB + Mongoose** para persistencia
- **JWT + bcrypt** para autenticación y autorización
- **express-validator** para validación de datos
- **helmet** para seguridad de headers HTTP
- **express-rate-limit** para protección contra abusos
- **express-mongo-sanitize** para prevención de NoSQL injection
- **morgan** para logging

## Arquitectura

### Backend (API REST)

```
backend/
├── config/         # Conexión a MongoDB
├── controllers/    # Handlers de rutas (HTTP layer)
├── middlewares/    # Auth, admin, validación, errores, rate-limit
├── models/         # Mongoose schemas (User, Class, Reservation)
├── routes/         # Definición de rutas Express
├── scripts/        # Seed de datos iniciales
├── services/       # Lógica de negocio
├── utils/          # AppError helper
├── validations/    # Schemas de express-validator
├── server.js       # Punto de entrada
└── .env.example
```

### Frontend (SPA React)

```
frontend/
├── public/
├── src/
│   ├── api/                    # Instancia de Axios con interceptors
│   ├── components/             # Componentes reutilizables
│   │   ├── admin/              # Componentes del Dashboard admin
│   │   │   ├── MetricCard.jsx
│   │   │   ├── ActivityChart.jsx    # Gráficos con Recharts
│   │   │   ├── ActivityTimeline.jsx
│   │   │   ├── ClassesManager.jsx   # CRUD de clases
│   │   │   ├── ReservationsManager.jsx
│   │   │   └── UsersManager.jsx     # CRUD de usuarios
│   │   ├── AdminRoute.jsx
│   │   ├── AnimatedBackground.jsx
│   │   ├── EmptyState.jsx
│   │   ├── Loader.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Skeleton.jsx
│   │   └── Toast.jsx
│   ├── context/                # AuthContext con useAuth hook
│   ├── pages/                  # Páginas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Classes.jsx
│   │   ├── ClassDetail.jsx     # Detalle de clase (/classes/:id)
│   │   ├── MyReservations.jsx
│   │   └── Dashboard.jsx
│   ├── services/               # Lógica de llamadas API separada de vistas
│   │   ├── authService.js
│   │   ├── classService.js
│   │   ├── reservationService.js
│   │   └── userService.js
│   └── styles/                 # custom.css con diseño premium
└── .env
```

## Entidades

### User
| Campo    | Tipo   | Descripción                    |
|----------|--------|--------------------------------|
| name     | String | Nombre completo (2-50 chars)   |
| email    | String | Email único (validado)         |
| password | String | Hash bcrypt (min 6 chars)     |
| phone    | String | Teléfono (opcional)            |
| role     | Enum   | `user` o `admin`               |

### Class
| Campo         | Tipo     | Descripción                          |
|---------------|----------|--------------------------------------|
| name          | String   | Nombre de la clase (max 80 chars)   |
| description   | String   | Descripción (max 500 chars)          |
| instructor    | String   | Nombre del instructor                |
| schedule      | Array    | Días y horarios                      |
| duration      | Number   | Duración en minutos (15-180)        |
| capacity      | Number   | Cupo máximo (1-50)                   |
| enrolledCount | Number   | Inscriptos actuales                  |
| price         | Number   | Precio                               |
| image         | String   | URL de imagen (opcional)             |
| isActive      | Boolean  | Clase activa/inactiva                |

### Reservation
| Campo  | Tipo     | Descripción                          |
|--------|----------|--------------------------------------|
| user   | ObjectId | Referencia al usuario                |
| class  | ObjectId | Referencia a la clase                |
| date   | Date     | Fecha de la reserva                  |
| status | Enum     | `confirmed` o `cancelled`            |

## API Endpoints

### Auth
| Método | Ruta                | Auth     | Descripción               |
|--------|---------------------|----------|---------------------------|
| POST   | `/api/auth/register`| No       | Registro de usuario       |
| POST   | `/api/auth/login`   | No       | Inicio de sesión          |
| GET    | `/api/auth/profile` | Sí       | Perfil del usuario auth   |
| PUT    | `/api/auth/profile` | Sí       | Actualizar perfil         |

### Clases
| Método | Ruta                   | Auth  | Rol    | Descripción               |
|--------|------------------------|-------|--------|---------------------------|
| GET    | `/api/classes`         | No    | -      | Listar clases activas     |
| GET    | `/api/classes/admin`   | Sí    | admin  | Todas las clases          |
| GET    | `/api/classes/:id`     | No    | -      | Detalle de clase          |
| POST   | `/api/classes`         | Sí    | admin  | Crear clase               |
| PUT    | `/api/classes/:id`     | Sí    | admin  | Actualizar clase          |
| DELETE | `/api/classes/:id`     | Sí    | admin  | Eliminar clase            |

### Reservas
| Método | Ruta                           | Auth | Rol    | Descripción               |
|--------|--------------------------------|------|--------|---------------------------|
| GET    | `/api/reservations`            | Sí   | -      | Mis reservas              |
| GET    | `/api/reservations/admin/all`  | Sí   | admin  | Todas las reservas        |
| POST   | `/api/reservations`            | Sí   | -      | Crear reserva             |
| PUT    | `/api/reservations/:id`        | Sí   | -      | Actualizar reserva        |
| DELETE | `/api/reservations/:id`        | Sí   | -      | Cancelar reserva          |

### Usuarios (admin)
| Método | Ruta              | Auth | Rol   | Descripción          |
|--------|-------------------|------|-------|----------------------|
| GET    | `/api/users`      | Sí   | admin | Listar usuarios      |
| GET    | `/api/users/:id`  | Sí   | admin | Detalle de usuario   |
| PUT    | `/api/users/:id`  | Sí   | admin | Actualizar usuario   |
| DELETE | `/api/users/:id`  | Sí   | admin | Eliminar usuario     |

### Health
| Método | Ruta          | Descripción                |
|--------|---------------|----------------------------|
| GET    | `/api/health` | Estado de la API           |

## Instalación y Setup

### Requisitos Previos
- **Node.js** >= 18 ([descargar](https://nodejs.org/))
- **MongoDB** >= 6 (opción 1: local | opción 2: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - gratuito)
- **npm** >= 9 (incluido con Node.js)
- **Git** (opcional, para clonar el repositorio)

### Paso 1: Configurar MongoDB

**Opción A - MongoDB Local:**
```bash
# Windows: descargar desde https://www.mongodb.com/try/download/community
# macOS: brew install mongodb-community
# Linux: sudo apt-get install -y mongodb
```

**Opción B - MongoDB Atlas (Cloud):**
1. Ir a https://www.mongodb.com/cloud/atlas
2. Crear cuenta gratuita
3. Crear cluster M0 (gratuito)
4. Obtener connection string: `mongodb+srv://usuario:password@cluster.mongodb.net/harmony-studio`

### Paso 2: Backend - Configuración

```bash
# 1. Abrir terminal en la carpeta backend
cd backend

# 2. Copiar variables de entorno
cp .env.example .env

# 3. Editar .env con tu configuración
# - Si usas MongoDB local: dejarlo como está
# - Si usas MongoDB Atlas: cambiar MONGODB_URI
# - Cambiar JWT_SECRET a algo seguro en producción

# Ejemplo de .env:
# MONGODB_URI=mongodb://localhost:27017/harmony-studio
# JWT_SECRET=mi_clave_super_secreta_2026
# JWT_EXPIRES_IN=7d
# ADMIN_EMAIL=admin@harmonystudio.com
# ADMIN_PASSWORD=Admin123!

# 4. Instalar dependencias
npm install

# 5. Cargar datos iniciales (admin + clases de ejemplo)
npm run seed

# 6. Iniciar servidor en modo desarrollo
npm run dev
# ✅ Servidor corriendo en http://localhost:5000
```

### Paso 3: Frontend - Configuración

```bash
# 1. Abrir NEW terminal en la carpeta frontend
cd frontend

# 2. (Opcional) Editar .env si el backend está en otro puerto/host
# Default: REACT_APP_API_URL=http://localhost:5000/api

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor en modo desarrollo
npm start
# ✅ Navegador abre automáticamente en http://localhost:3000
```

### Estado de Servicios

Después de seguir los pasos:
- ✅ Backend (API): http://localhost:5000/api
- ✅ Frontend (Web): http://localhost:3000
- ✅ MongoDB: conectado y listo

---

## Variables de Entorno

### Backend (`backend/.env`)

| Variable         | Descripción                              | Ejemplo                                    |
|------------------|------------------------------------------|--------------------------------------------|
| `PORT`           | Puerto del servidor Express              | `5000`                                     |
| `MONGODB_URI`    | URI de conexión a MongoDB                | `mongodb://localhost:27017/harmony-studio` |
| `JWT_SECRET`     | Clave secreta para firmar tokens JWT     | `mi_clave_super_segura_cambiar_en_prod`   |
| `JWT_EXPIRES_IN` | Duración del token JWT                   | `7d`                                       |
| `ADMIN_EMAIL`    | Email del usuario admin (para seed)      | `admin@harmonystudio.com`                  |
| `ADMIN_PASSWORD` | Contraseña del admin (para seed)         | `Admin123!`                                |

### Frontend (`frontend/.env`)

| Variable            | Descripción              | Ejemplo                          |
|---------------------|--------------------------|----------------------------------|
| `REACT_APP_API_URL` | URL base de la API       | `http://localhost:5000/api`      |

---

## Credenciales de Prueba

Después de ejecutar `npm run seed`, accede con:

- **Email:** `admin@harmonystudio.com`
- **Password:** `Admin123!`
- **Rol:** Administrator (acceso a panel admin en `/admin`)

- **Email:** `usuario@prueba.com`
- **Password:** `prueba123`
- **Rol:** usuario comun (acceso a panel admin en `/admin`)

---

## Solución de Problemas

### Puerto 5000/3000 ya en uso
```bash
# Backend: cambiar puerto en .env
PORT=5001

# Frontend: cambiar puerto automáticamente
PORT=3001 npm start
```

### MongoDB connection refused
- Verificar que MongoDB está corriendo: `mongosh` (o `mongo` en versiones viejas)
- Si usas Atlas: revisar IP whitelist y credenciales en MONGODB_URI

### Token inválido al iniciar sesión
- Verificar JWT_SECRET está definido en .env
- Limpiar localStorage en DevTools > Application > Storage
- Hacer logout e intentar nuevamente

### CORS errors
- Verificar que frontend URL no tenga puerto errado
- Backend espera requests desde http://localhost:3000

## Características

- Autenticación JWT con roles (user/admin)
- CRUD completo de clases, usuarios y reservas
- Creación de usuarios desde el panel admin
- Actualización y cancelación de reservas desde el panel admin
- Dashboard admin con métricas en tiempo real
- Gráficos interactivos con Recharts (barras y donut)
- Página de detalle de clase con información completa (/classes/:id)
- Diseño responsive y mobile-first
- Animaciones fluidas con Framer Motion
- Fondo animado 3D con canvas
- Notificaciones toast animadas
- Estados de carga con skeletons
- Validaciones en frontend y backend
- Separación de lógica API en servicios (services/)
- Componentización del Dashboard admin
- Seguridad: Helmet, rate limiting, NoSQL injection prevention
