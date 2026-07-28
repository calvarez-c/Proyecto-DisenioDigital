# Servidor de Base de Datos - Sistema de Reservas y Espacios

## Instrucciones para Poner en Marcha

1. Abre tu terminal y navega hasta esta carpeta (`db_workspace_booking`).
2. Ejecuta el siguiente comando para construir y levantar el contenedor en segundo plano:

   docker compose up -d

3. Una vez que el contenedor esté corriendo, puedes conectarte a la base de datos usando las siguientes credenciales:

   - **Host:** localhost
   - **Puerto:** 3308
   - **Usuario:** workspace_booking
   - **Contraseña:** admin123
   - **Base de datos:** db_workspace_booking

## Estructura de la Base de Datos

La base de datos `db_workspace_booking` contiene las siguientes tablas:

- **users**: Gestiona el acceso y roles de los usuarios (id, name, email, password_hash, role, created_at).
- **resources**: Lista de espacios de trabajo y salas de conferencias disponibles (id, name, description, capacity, price_per_hour, is_active, created_at).
- **bookings**: Registro de reservas y control de solapamientos (id, user_id, resource_id, start_time, end_time, total_price, status, created_at).

## Datos de Prueba (Seed)

Se incluyen datos iniciales para pruebas rápidas:
- **Usuarios de prueba** (Contraseña: `123456`):
  - Admin: `admin@cowork.com` (Rol: ADMIN)
  - Clientes: `carlos@cliente.com`, `ana@cliente.com` (Rol: CLIENT)
- **Recursos**:
  - `Sala de Juntas A` (Capacidad: 10, Precio por hora: $25.00)
  - `Oficina Privada B` (Capacidad: 2, Precio por hora: $12.50)
  - `Auditorio Principal` (Capacidad: 50, Precio por hora: $80.00)
- **Reservas**:
  - Una reserva confirmada para Carlos Mendoza en la Sala de Juntas A el 01/08/2026 de 10:00 a 12:00.
