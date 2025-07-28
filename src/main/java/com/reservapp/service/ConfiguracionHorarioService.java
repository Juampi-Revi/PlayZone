package com.reservapp.service;

import java.time.LocalTime;
import java.time.LocalDateTime;
import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reservapp.entity.Cancha;
import com.reservapp.entity.ConfiguracionHorario;
import com.reservapp.repository.ConfiguracionHorarioRepository;
import com.reservapp.repository.CanchaRepository;

@Service
public class ConfiguracionHorarioService {

    @Autowired
    private ConfiguracionHorarioRepository configuracionHorarioRepository;

    @Autowired
    private CanchaRepository canchaRepository;

    /**
     * Obtiene la configuración de horarios de una cancha
     */
    public Optional<ConfiguracionHorario> getConfiguracionPorCancha(Long canchaId) {
        return configuracionHorarioRepository.findByCanchaId(canchaId);
    }

    /**
     * Crea o actualiza la configuración de horarios de una cancha
     */
    @Transactional
    public ConfiguracionHorario guardarConfiguracion(Long canchaId, ConfiguracionHorario configuracion) {
        Optional<Cancha> canchaOpt = canchaRepository.findById(canchaId);
        if (canchaOpt.isEmpty()) {
            throw new RuntimeException("Cancha no encontrada");
        }

        Cancha cancha = canchaOpt.get();
        
        // Buscar configuración existente
        Optional<ConfiguracionHorario> existente = configuracionHorarioRepository.findByCanchaId(canchaId);
        
        ConfiguracionHorario config;
        if (existente.isPresent()) {
            // Actualizar existente
            config = existente.get();
            config.setHoraApertura(configuracion.getHoraApertura());
            config.setHoraCierre(configuracion.getHoraCierre());
            config.setDuracionTurnoMinutos(configuracion.getDuracionTurnoMinutos());
            config.setDiasDisponibles(configuracion.getDiasDisponibles());
            config.setAnticipacionMinimaHoras(configuracion.getAnticipacionMinimaHoras());
            config.setAnticipacionMaximaDias(configuracion.getAnticipacionMaximaDias());
        } else {
            // Crear nueva
            config = configuracion;
            config.setCancha(cancha);
        }

        return configuracionHorarioRepository.save(config);
    }

    /**
     * Genera los horarios disponibles para una fecha específica
     */
    public List<String> getHorariosDisponibles(Long canchaId, LocalDateTime fecha) {
        Optional<ConfiguracionHorario> configOpt = getConfiguracionPorCancha(canchaId);
        if (configOpt.isEmpty()) {
            return new ArrayList<>(); // Sin configuración, sin horarios
        }

        ConfiguracionHorario config = configOpt.get();
        List<String> horarios = new ArrayList<>();

        // Verificar si el día de la semana está disponible
        DayOfWeek diaSemana = fecha.getDayOfWeek();
        int diaNumero = diaSemana.getValue(); // 1=Lunes, 7=Domingo
        
        if (!config.esDiaDisponible(diaNumero)) {
            return horarios; // Día no disponible
        }

        // Verificar anticipación mínima y máxima
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime fechaMinima = ahora.plusHours(config.getAnticipacionMinimaHoras());
        LocalDateTime fechaMaxima = ahora.plusDays(config.getAnticipacionMaximaDias());

        if (fecha.isBefore(fechaMinima) || fecha.isAfter(fechaMaxima)) {
            return horarios; // Fuera del rango de anticipación
        }

        // Generar horarios del día
        LocalTime horaActual = config.getHoraApertura();
        LocalTime horaCierre = config.getHoraCierre();
        int duracionMinutos = config.getDuracionTurnoMinutos();

        while (horaActual.plusMinutes(duracionMinutos).isBefore(horaCierre) || 
               horaActual.plusMinutes(duracionMinutos).equals(horaCierre)) {
            
            LocalTime horaFin = horaActual.plusMinutes(duracionMinutos);
            String horario = horaActual.toString() + " - " + horaFin.toString();
            horarios.add(horario);
            
            horaActual = horaFin;
        }

        return horarios;
    }

    /**
     * Crea una configuración por defecto para una cancha
     */
    @Transactional
    public ConfiguracionHorario crearConfiguracionPorDefecto(Long canchaId) {
        Optional<Cancha> canchaOpt = canchaRepository.findById(canchaId);
        if (canchaOpt.isEmpty()) {
            throw new RuntimeException("Cancha no encontrada");
        }

        ConfiguracionHorario config = new ConfiguracionHorario();
        config.setCancha(canchaOpt.get());
        config.setHoraApertura(LocalTime.of(9, 0)); // 9:00 AM
        config.setHoraCierre(LocalTime.of(22, 0)); // 10:00 PM
        config.setDuracionTurnoMinutos(60); // 1 hora por defecto
        config.setDiasDisponibles("1,2,3,4,5,6,7"); // Todos los días
        config.setAnticipacionMinimaHoras(1); // 1 hora mínima
        config.setAnticipacionMaximaDias(30); // 30 días máximo

        return configuracionHorarioRepository.save(config);
    }

    /**
     * Elimina la configuración de una cancha
     */
    @Transactional
    public void eliminarConfiguracion(Long canchaId) {
        configuracionHorarioRepository.deleteByCanchaId(canchaId);
    }

    /**
     * Valida si un horario específico está dentro de la configuración
     */
    public boolean validarHorario(Long canchaId, LocalDateTime inicio, LocalDateTime fin) {
        Optional<ConfiguracionHorario> configOpt = getConfiguracionPorCancha(canchaId);
        if (configOpt.isEmpty()) {
            // Si no hay configuración, crear una por defecto y permitir la reserva
            crearConfiguracionPorDefecto(canchaId);
            return true;
        }

        ConfiguracionHorario config = configOpt.get();
        
        // Verificar día de la semana
        DayOfWeek diaSemana = inicio.getDayOfWeek();
        if (!config.esDiaDisponible(diaSemana.getValue())) {
            return false;
        }

        // Verificar horarios
        LocalTime horaInicio = inicio.toLocalTime();
        LocalTime horaFin = fin.toLocalTime();
        
        if (horaInicio.isBefore(config.getHoraApertura()) || 
            horaFin.isAfter(config.getHoraCierre())) {
            return false;
        }

        // Verificar duración del turno (más flexible - debe ser múltiplo de la duración configurada)
        long duracionMinutos = java.time.Duration.between(inicio, fin).toMinutes();
        if (duracionMinutos <= 0) {
            return false;
        }
        
        // Permitir duraciones que sean múltiplos de la duración configurada
        int duracionConfigMinutos = config.getDuracionTurnoMinutos();
        if (duracionMinutos % duracionConfigMinutos != 0) {
            return false;
        }

        // Verificar anticipación
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime fechaMinima = ahora.plusHours(config.getAnticipacionMinimaHoras());
        LocalDateTime fechaMaxima = ahora.plusDays(config.getAnticipacionMaximaDias());

        return !inicio.isBefore(fechaMinima) && !inicio.isAfter(fechaMaxima);
    }
}