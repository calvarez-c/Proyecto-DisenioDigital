# Proyecto Diseño Digital - III PAC - UNAH 

## API de Reservas
Este proyecto consiste en una API REST desarrollada con Node.js y Express, diseñada para la gestión de recursos y reservas. La aplicación implementa validación de datos mediante la biblioteca Zod, autenticación basada en JSON Web Tokens (JWT) y cifrado seguro de contraseñas utilizando Argon2.

La API permite:
- Registrar y autenticar usuarios.
- Gestionar recursos mediante operaciones de creación, consulta y actualización.
- Administrar reservas asociadas a los recursos, garantizando un control centralizado de su disponibilidad.

Para facilitar el proceso de desarrollo y garantizar un entorno de trabajo consistente entre todos los integrantes del equipo, el proyecto utiliza Docker. Mediante una configuración compartida, fue posible estandarizar el entorno de ejecución, simplificar la instalación de dependencias y reducir problemas derivados de diferencias entre los equipos de desarrollo, mejorando así la colaboración y la productividad del equipo.


## Integrantes
- Bryan Noe Cruz Izaguirre – 20192000205
- Carlos Alfredo Alvarez Colindres – 20222030195 
- Jose Daniel Mejia Cuellar – 20212030242 


## ENDPOINTS

### AUTENTICACIÓN (/api/v1/auth) 
* POST /register
  - Public. Body: { "name", "email", "password" }. Crea usuario con rol CLIENT.
* POST /login
  - Public. Body: { "email", "password" }. Retorna token JWT con payload { id, email, role }.


### RECURSOS (/api/v1/resources) 
* GET /
  - Public/Autenticado. Lista recursos activos (`is_active = true`).
* POST /
  - Protegido (Solo ADMIN). Body Ejemplo: {
        "name": "Sala de Juegos",
        "description": "Sala de juegos familiar con capacidad para 10 personas",
        "capacity": 10,
        "price_per_hour": 32.63
    }
* PUT /:id
  - Protegido (Solo ADMIN). Body Ejemplo: {
        "name": "Sala de Juegos editada"
    }


### RESERVAS (/api/v1/bookings) 
* GET /availability?resource_id=1&date=YYYY-MM-DD
  - Public/Autenticado. Devuelve las franjas horarias ocupadas del recurso.

* GET /my-bookings
  - Protegido (CLIENT). Lista reservas pertenecientes al user_id del token.

* GET /
  - Protegido (Solo ADMIN). Lista global de todas las reservas del sistema.

* POST /
  - Protegido (CLIENT/ADMIN). Body Ejemplo: {
        "resource_id": 2,
        "start_time": "2026-08-07 13:00:00",
        "end_time": "2026-08-07 15:30:00"
    }
  - Ejecuta validación anti-solapamiento. 

* PATCH /:id/cancel
  - Protegido (CLIENT/ADMIN). Cancela reserva si faltan más de 12 horas.
