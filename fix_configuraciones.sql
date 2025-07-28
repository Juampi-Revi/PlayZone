-- Script para crear configuraciones de horarios faltantes

-- Crear configuraciones por defecto para canchas que no las tienen
INSERT IGNORE INTO configuracion_horarios (cancha_id, hora_apertura, hora_cierre, duracion_turno_minutos, dias_disponibles, anticipacion_minima_horas, anticipacion_maxima_dias)
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