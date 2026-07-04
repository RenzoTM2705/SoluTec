-- Seleccionar la base de datos
CREATE DATABASE IF NOT EXISTS solutec_db;
USE solutec_db;

-- Eliminar tablas si existen (en orden inverso por las dependencias)
DROP TABLE IF EXISTS asignaciones;
DROP TABLE IF EXISTS notificaciones;
DROP TABLE IF EXISTS historial_incidencias;
DROP TABLE IF EXISTS derivaciones;
DROP TABLE IF EXISTS diagnosticos;
DROP TABLE IF EXISTS comentarios;
DROP TABLE IF EXISTS incidencias;
DROP TABLE IF EXISTS proveedores;
DROP TABLE IF EXISTS categorias_incidencia;
DROP TABLE IF EXISTS prioridades;
DROP TABLE IF EXISTS estados;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS departamentos;
DROP TABLE IF EXISTS roles;

-- Crear tablas
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS departamentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS usuarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    correo VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    aprobado TINYINT(1) NOT NULL DEFAULT 0,
    departamento_id BIGINT,
    rol_id BIGINT,
    CONSTRAINT fk_usuario_departamento FOREIGN KEY (departamento_id) REFERENCES departamentos(id),
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS estados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS prioridades (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS categorias_incidencia (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS proveedores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    contacto VARCHAR(150),
    telefono VARCHAR(50),
    email VARCHAR(150)
);

CREATE TABLE IF NOT EXISTS incidencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    creado_en DATETIME,
    estado_id BIGINT,
    prioridad_id BIGINT,
    categoria_id BIGINT,
    creador_id BIGINT,
    asignado_id BIGINT,
    CONSTRAINT fk_incidencia_estado FOREIGN KEY (estado_id) REFERENCES estados(id),
    CONSTRAINT fk_incidencia_prioridad FOREIGN KEY (prioridad_id) REFERENCES prioridades(id),
    CONSTRAINT fk_incidencia_categoria FOREIGN KEY (categoria_id) REFERENCES categorias_incidencia(id),
    CONSTRAINT fk_incidencia_creador FOREIGN KEY (creador_id) REFERENCES usuarios(id),
    CONSTRAINT fk_incidencia_asignado FOREIGN KEY (asignado_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS comentarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT NOT NULL,
    creado_en DATETIME,
    usuario_id BIGINT,
    incidencia_id BIGINT,
    CONSTRAINT fk_com_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    CONSTRAINT fk_com_incidencia FOREIGN KEY (incidencia_id) REFERENCES incidencias(id)
);

CREATE TABLE IF NOT EXISTS diagnosticos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    creado_en DATETIME,
    incidencia_id BIGINT,
    usuario_id BIGINT,
    CONSTRAINT fk_diag_incidencia FOREIGN KEY (incidencia_id) REFERENCES incidencias(id),
    CONSTRAINT fk_diag_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS derivaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    incidencia_id BIGINT,
    proveedor_id BIGINT,
    motivo TEXT,
    creado_en DATETIME,
    CONSTRAINT fk_der_incidencia FOREIGN KEY (incidencia_id) REFERENCES incidencias(id),
    CONSTRAINT fk_der_proveedor FOREIGN KEY (proveedor_id) REFERENCES proveedores(id)
);

CREATE TABLE IF NOT EXISTS historial_incidencias (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    accion VARCHAR(255) NOT NULL,
    fecha DATETIME,
    incidencia_id BIGINT,
    usuario_id BIGINT,
    CONSTRAINT fk_hist_incidencia FOREIGN KEY (incidencia_id) REFERENCES incidencias(id),
    CONSTRAINT fk_hist_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS notificaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mensaje VARCHAR(500) NOT NULL,
    leida BOOLEAN DEFAULT FALSE,
    creado_en DATETIME,
    usuario_id BIGINT,
    CONSTRAINT fk_not_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE IF NOT EXISTS asignaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    incidencia_id BIGINT,
    tecnico_id BIGINT,
    asignado_en DATETIME,
    CONSTRAINT fk_asig_incidencia FOREIGN KEY (incidencia_id) REFERENCES incidencias(id),
    CONSTRAINT fk_asig_tecnico FOREIGN KEY (tecnico_id) REFERENCES usuarios(id)
);

-- Insertar datos
INSERT INTO roles (nombre) VALUES ('ADMIN'), ('SOPORTE'), ('EMPLEADO');

INSERT INTO departamentos (nombre) VALUES ('TI'), ('Recursos Humanos'), ('Contabilidad'), ('Ventas'), ('Compras');

INSERT INTO usuarios (nombre, correo, password, aprobado, departamento_id, rol_id) VALUES
('Admin', 'admin@solutec.com', '$2b$12$MMUjCUFiAEAAWp6k.MW6FOaPXIhBSDxaVnyFQXxBYlNIvwqjcGeLa', 1, 1, 1),
('Soporte1', 'soporte1@solutec.com', '$2b$12$ohxCGsBpzxq2XxLIGbKLc.KOUJJRX0dhJkMyv1I6kp/n6AXl5M0Ge', 1, 1, 2),
('Empleado1', 'empleado1@solutec.com', '$2b$12$mwtWUKWZaFgB3SPPW6X0funRdnFQFOjyjBaAEOrrAgZJubi/PPmrO', 1, 2, 3),
('Empleado2', 'empleado2@solutec.com', '$2b$12$zNw2PIiprKomBjS4WYjwKuzK.3HjpHLfbZxAFxPn20GNtP1zvk0hK', 1, 3, 3),
('Empleado3', 'empleado3@solutec.com', '$2b$12$A.D1TILNwgTVywK.WJ/6IeSU4o2SoeZCJCL1WXBTjrznXBQry6CGm', 1, 4, 3);

INSERT INTO estados (nombre) VALUES ('PENDIENTE'), ('EN_PROCESO'), ('RESUELTO'), ('CANCELADO'), ('CERRADO');

INSERT INTO prioridades (nombre) VALUES ('BAJA'), ('MEDIA'), ('ALTA'), ('CRITICA'), ('URGENTE');

INSERT INTO categorias_incidencia (nombre, descripcion) VALUES
('Hardware', 'Problemas con equipos o periféricos'),
('Software', 'Errores de aplicaciones o sistemas'),
('Red', 'Problemas de conectividad'),
('Correo', 'Errores con correo electrónico'),
('Acceso', 'Problemas de acceso o credenciales');

INSERT INTO proveedores (nombre, contacto, telefono, email) VALUES
('Proveedor TI Norte', 'Juan Pérez', '999111222', 'juan@proveedorti.com'),
('Proveedor Redes SAC', 'Lucía Silva', '999333444', 'lucia@redes.com'),
('Proveedor Hardware SRL', 'Carlos Ruiz', '999555666', 'carlos@hardware.com'),
('Proveedor Software Perú', 'María Torres', '999777888', 'maria@software.com'),
('Proveedor Asistencia Extrema', 'Pedro Gómez', '999999000', 'pedro@asistencia.com');

INSERT INTO incidencias (titulo, descripcion, creado_en, estado_id, prioridad_id, categoria_id, creador_id, asignado_id) VALUES
('No enciende PC', 'El equipo no enciende al iniciar', NOW(), 1, 3, 1, 3, 2),
('Correo no funciona', 'No puedo enviar correos', NOW(), 2, 2, 4, 4, 2),
('Impresora bloqueada', 'La cola de impresión quedó detenida', NOW(), 1, 2, 1, 5, 2),
('Error en sistema', 'Aparece un mensaje de error crítico', NOW(), 3, 4, 2, 3, 2),
('VPN fallando', 'No conecta a la VPN corporativa', NOW(), 1, 5, 3, 4, 2);

INSERT INTO comentarios (texto, creado_en, usuario_id, incidencia_id) VALUES
('Se revisará el hardware del equipo', NOW(), 2, 1),
('Se está validando la configuración del correo', NOW(), 2, 2),
('Reemplazado el driver de la impresora', NOW(), 2, 3),
('Se requiere reinicio del sistema', NOW(), 2, 4),
('Se revisan credenciales de VPN', NOW(), 2, 5);

INSERT INTO diagnosticos (descripcion, creado_en, incidencia_id, usuario_id) VALUES
('Posible falla de fuente de poder', NOW(), 1, 2),
('Problema con configuración de cliente de correo', NOW(), 2, 2),
('Buffer de impresión atascado', NOW(), 3, 2),
('Conflicto de software al iniciar', NOW(), 4, 2),
('Token de VPN vencido', NOW(), 5, 2);

INSERT INTO derivaciones (incidencia_id, proveedor_id, motivo, creado_en) VALUES
(1, 1, 'Necesidad de cambio de hardware', NOW()),
(2, 4, 'Requiere apoyo externo de correo', NOW()),
(3, 3, 'Derivado por pieza de impresora', NOW()),
(4, 2, 'Se requiere soporte de red', NOW()),
(5, 5, 'Necesidad de asistencia externa de VPN', NOW());

INSERT INTO historial_incidencias (accion, fecha, incidencia_id, usuario_id) VALUES
('Creada', NOW(), 1, 3),
('Asignada a soporte', NOW(), 1, 2),
('Estado cambiado a EN_PROCESO', NOW(), 2, 2),
('Comentario agregado', NOW(), 3, 2),
('Resuelta', NOW(), 4, 2);

INSERT INTO notificaciones (mensaje, leida, creado_en, usuario_id) VALUES
('Nueva incidencia asignada', FALSE, NOW(), 2),
('Incidencia resuelta', FALSE, NOW(), 3),
('Comentario en tu incidencia', FALSE, NOW(), 4),
('Cambio de estado', FALSE, NOW(), 5),
('Recordatorio', FALSE, NOW(), 3);

INSERT INTO asignaciones (incidencia_id, tecnico_id, asignado_en) VALUES
(1, 2, NOW()),
(2, 2, NOW()),
(3, 2, NOW()),
(4, 2, NOW()),
(5, 2, NOW());

-- Verificar que los datos se insertaron correctamente
SELECT '=== USUARIOS ===' as '';
SELECT u.id, u.nombre, u.correo, u.aprobado, r.nombre as rol, d.nombre as departamento
FROM usuarios u
JOIN roles r ON u.rol_id = r.id
LEFT JOIN departamentos d ON u.departamento_id = d.id;

SELECT '=== ROLES ===' as '';
SELECT * FROM roles;

SELECT '=== TOTAL DE TABLAS CREADAS ===' as '';
