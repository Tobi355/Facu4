
### Paso 2: Backend - Configuración

```bash
# 1. Abrir terminal en la carpeta backend
cd backend

# 2. Copiar variables de entorno
cp .env.example .env

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


## Credenciales de Prueba

Después de ejecutar `npm run seed`, accede con:

- **Email:** `admin@harmonystudio.com`
- **Password:** `Admin123!`
- **Rol:** Administrator (acceso a panel admin en `/admin`)

- **Email:** `usuario@prueba.com`
- **Password:** `prueba123`
- **Rol:** usuario comun (acceso a panel admin en `/admin`)
