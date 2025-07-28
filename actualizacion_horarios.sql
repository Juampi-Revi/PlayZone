-- Script para actualizar la base de datos con configuración de horarios

-- 1. Agregar columna propietario_id a la tabla canchas
ALTER TABLE canchas ADD COLUMN propietario_id BIGINT;

-- 2. Agregar foreign key constraint
ALTER TABLE canchas ADD CONSTRAINT fk_cancha_propietario 
FOREIGN KEY (propietario_id) REFERENCES usuarios(id);

-- 3. Crear tabla configuracion_horarios
CREATE TABLE configuracion_horarios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    cancha_id BIGINT NOT NULL,
    hora_apertura TIME NOT NULL,
    hora_cierre TIME NOT NULL,
    duracion_turno_minutos INT NOT NULL CHECK (duracion_turno_minutos >= 30 AND duracion_turno_minutos <= 240),
    dias_disponibles VARCHAR(20) DEFAULT '1,2,3,4,5,6,7',
    anticipacion_minima_horas INT DEFAULT 1 CHECK (anticipacion_minima_horas >= 0),
    anticipacion_maxima_dias INT DEFAULT 30 CHECK (anticipacion_maxima_dias >= 1 AND anticipacion_maxima_dias <= 365),
    FOREIGN KEY (cancha_id) REFERENCES canchas(id) ON DELETE CASCADE,
    UNIQUE KEY uk_configuracion_cancha (cancha_id)
);

-- 4. Asignar propietarios a las canchas existentes (asumiendo que hay usuarios tipo CLUB)
-- Esto es opcional y depende de tus datos existentes
UPDATE canchas c 
SET propietario_id = (
    SELECT u.id 
    FROM usuarios u 
    WHERE u.tipo = 'CLUB' 
    LIMIT 1
) 
WHERE c.propietario_id IS NULL;

-- 5. Crear configuraciones por defecto para canchas existentes
INSERT INTO configuracion_horarios (cancha_id, hora_apertura, hora_cierre, duracion_turno_minutos, dias_disponibles, anticipacion_minima_horas, anticipacion_maxima_dias)
SELECT 
    c.id,
    '09:00:00' as hora_apertura,
    '22:00:00' as hora_cierre,
    60 as duracion_turno_minutos,
    '1,2,3,4,5,6,7' as dias_disponibles,
    1 as anticipacion_minima_horas,
    30 as anticipacion_maxima_dias
FROM canchas c
WHERE NOT EXISTS (
    SELECT 1 FROM configuracion_horarios ch WHERE ch.cancha_id = c.id
);

-- 6. Crear índices para mejorar el rendimiento
CREATE INDEX idx_canchas_propietario ON canchas(propietario_id);
CREATE INDEX idx_configuracion_cancha ON configuracion_horarios(cancha_id);