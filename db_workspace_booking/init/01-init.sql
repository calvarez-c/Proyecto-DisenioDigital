-- Asegurar el uso de la base de datos configurada
USE `db_workspace_booking`;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('CLIENT', 'ADMIN') NOT NULL DEFAULT 'CLIENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Recursos (Espacios)
CREATE TABLE IF NOT EXISTS resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    capacity INT NOT NULL,
    price_per_hour DECIMAL(10, 2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Reservas
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    resource_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    status ENUM('CONFIRMED', 'CANCELLED') NOT NULL DEFAULT 'CONFIRMED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (resource_id) REFERENCES resources(id) ON DELETE CASCADE
);

-- Registros Iniciales de Prueba (Passwords corresponden a "123456")
INSERT INTO users (id, name, email, password_hash, role) VALUES
(1, 'Admin CoWork', 'admin@cowork.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'ADMIN'),
(2, 'Carlos Mendoza', 'carlos@cliente.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CLIENT'),
(3, 'Ana Gómez', 'ana@cliente.com', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6L6s58G8L85aY6Ke', 'CLIENT');

INSERT INTO resources (id, name, description, capacity, price_per_hour, is_active) VALUES
(1, 'Sala de Juntas A', 'Equipada con proyector 4K, pizarra y videoconferencia.', 10, 25.00, TRUE),
(2, 'Oficina Privada B', 'Espacio individual insonorizado ideal para llamadas.', 2, 12.50, TRUE),
(3, 'Auditorio Principal', 'Auditorio amplio para presentaciones y talleres.', 50, 80.00, TRUE);

INSERT INTO bookings (id, user_id, resource_id, start_time, end_time, total_price, status) VALUES
(1, 2, 1, '2026-08-01 10:00:00', '2026-08-01 12:00:00', 50.00, 'CONFIRMED');

