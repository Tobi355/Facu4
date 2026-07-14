# Iniciar proyecto WhiteRoad

## 1. Instalar dependencias

```bash
composer install
npm install (recomiendo usar pnpm install)
```

## 2. Configurar el entorno

Crea la copia de archivos de entorno y genera la llave de aplicación:

```bash
cp .env.example .env
php artisan key:generate
```

## 3. Configurar la base de datos

De hacer falta edita el archivo `.env` con tus credenciales de MySQL. En este proyecto la configuración por defecto ya configurada es:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=whiteroad_db
DB_USERNAME=root
DB_PASSWORD=
```

Si utilizas otro usuario o nombre de base de datos, actualiza estos valores.

## 4. Crear la base de datos

Antes de migrar, crea la base de datos en MySQL si no existe:

```sql
CREATE DATABASE whiteroad_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 5. Migrar y sembrar datos

```bash
php artisan migrate --seed
```

## 6. Vincular el almacenamiento público

```bash
php artisan storage:link
```

## 7. Iniciar el servidor

```bash
php artisan serve
```

Luego abre:

http://127.0.0.1:8000

## Notas

- Si ya existe un `.env`, no es necesario copiarlo de nuevo.
- El proyecto usa MySQL según la configuración actual de `.env`.
- Si quieres importar una base de datos existente, el archivo SQL disponible es `whiteroad_db.sql`.


### Usuarios utilizables

# -Usuario con rol admin:

-mail: admin@whiteroad.com
contraseña: admin123

# -Usuario con rol usuario:

-mail: usuario@whiteroad.com
contraseña: usuario123
