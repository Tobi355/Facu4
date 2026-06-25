# Harmony Studio - Sistema de Gestión y Reservas

Plataforma web para la gestión de clases y reservas de un estudio de Pilates.

## Stack

- **Frontend:** React 18, Bootstrap 5, Framer Motion, React Router 6, Context API
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Auth:** JWT + bcrypt

## Requisitos

- Node.js >= 18
- MongoDB >= 6

## Instalación

```bash
# Backend
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev

# Frontend (otra terminal)
cd frontend
npm install
npm start
```

## Variables de Entorno

### Backend (`backend/.env`)

| Variable | Descripción | Default |
|---|---|---|
| `PORT` | Puerto del servidor | `5000` |
| `MONGODB_URI` | URI de MongoDB | `mongodb://localhost:27017/harmony-studio` |
| `JWT_SECRET` | Secreto JWT | — |
| `JWT_EXPIRES_IN` | Expiración del token | `7d` |
| `ADMIN_EMAIL` | Email del admin semilla | `admin@harmonystudio.com` |
| `ADMIN_PASSWORD` | Contraseña del admin semilla | `Admin123!` |

### Frontend (`frontend/.env`)

| Variable | Descripción | Default |
|---|---|---|
| `REACT_APP_API_URL` | URL de la API | `http://localhost:5000/api` |

## Admin Default

- Email: `admin@harmonystudio.com`
- Password: `Admin123!`

Ejecutar `npm run seed` para crear el admin y clases de ejemplo.

## API Endpoints

### Auth
| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/auth/register` | Registro de usuario |
| POST | `/api/auth/login` | Inicio de sesión |
| GET | `/api/auth/profile` | Perfil del usuario autenticado |
| PUT | `/api/auth/profile` | Actualizar perfil |

### Clases
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/classes` | Listar clases activas |
| GET | `/api/classes/admin` | Todas las clases (admin) |
| GET | `/api/classes/:id` | Detalle de clase |
| POST | `/api/classes` | Crear clase (admin) |
| PUT | `/api/classes/:id` | Actualizar clase (admin) |
| DELETE | `/api/classes/:id` | Eliminar clase (admin) |

### Reservas
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/reservations` | Mis reservas |
| GET | `/api/reservations/admin/all` | Todas las reservas (admin) |
| POST | `/api/reservations` | Crear reserva |
| DELETE | `/api/reservations/:id` | Cancelar reserva |

### Usuarios (admin)
| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/users` | Listar usuarios |
| GET | `/api/users/:id` | Detalle de usuario |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |

## Estructura del Proyecto

```
tp2 AH/
├── backend/
│   ├── config/         # Conexión a MongoDB
│   ├── controllers/    # Handlers de rutas
│   ├── middlewares/    # Auth, admin, validación, errores
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Definición de rutas
│   ├── scripts/        # Seed de datos
│   ├── services/       # Lógica de negocio
│   ├── utils/          # AppError
│   ├── validations/    # Express-validator schemas
│   ├── server.js       # Punto de entrada
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/        # Axios instance
│   │   ├── components/ # Navbar, Loader, ProtectedRoute, AdminRoute
│   │   ├── context/    # AuthContext
│   │   ├── pages/      # Home, Login, Register, Classes, MyReservations, Dashboard
│   │   └── styles/     # custom.css
│   └── .env
├── .gitignore
└── README.md
```
