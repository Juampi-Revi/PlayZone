-- Script para insertar datos de prueba en PlayZone

-- Insertar usuarios de prueba
INSERT INTO usuario (nombre, email, password, tipo, activo, fecha_registro) VALUES
('Juan Deportista', 'juan@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.Ik.KzAWR.2roN6.B3n9otIZOFIXe4e', 'DEPORTISTA', true, NOW()),
('María Deportista', 'maria@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.Ik.KzAWR.2roN6.B3n9otIZOFIXe4e', 'DEPORTISTA', true, NOW()),
('Club Premium', 'club@test.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.Ik.KzAWR.2roN6.B3n9otIZOFIXe4e', 'CLUB', true, NOW());

-- Insertar canchas de prueba
INSERT INTO cancha (nombre, descripcion, deporte, ubicacion, precio_por_hora, horario, imagenes, disponible, usuario_id) VALUES
('Cancha de Pádel Premium', 'Cancha de pádel con césped sintético de última generación', 'Pádel', 'Palermo, Buenos Aires', 2500.00, '08:00-22:00', '["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]', true, 3),
('Cancha de Tenis Profesional', 'Cancha de tenis con superficie de polvo de ladrillo', 'Tenis', 'Belgrano, Buenos Aires', 3000.00, '07:00-21:00', '["https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]', true, 3),
('Cancha de Fútbol 5', 'Cancha de fútbol 5 con césped sintético', 'Fútbol', 'Villa Crespo, Buenos Aires', 4000.00, '09:00-23:00', '["https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]', true, 3),
('Cancha de Básquet Cubierta', 'Cancha de básquet cubierta con piso de parquet', 'Básquet', 'Recoleta, Buenos Aires', 3500.00, '08:00-22:00', '["https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"]', true, 3);

-- Nota: La contraseña para todos los usuarios de prueba es "password123"