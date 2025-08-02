package com.reservapp.service;

import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reservapp.entity.Cancha;
import com.reservapp.entity.ConfiguracionHorario;

@Service
public class CalendarioMaestroService {
    
    @Autowired
    private CanchaService canchaService;
    
    @Autowired
    private ConfiguracionHorarioService configuracionHorarioService;
    
    /**
     * Obtiene todas las canchas agrupadas por deporte con sus configuraciones
     */
    public Map<String, Object> getCalendarioMaestroPorClub(Long clubId) {
        // Obtener todas las canchas del club
        List<Cancha> canchas = canchaService.getCanchasByClub(clubId);
        
        // Agrupar por deporte
        Map<String, List<Map<String, Object>>> canchasPorDeporte = canchas.stream()
            .collect(Collectors.groupingBy(
                Cancha::getDeporte,
                Collectors.mapping(this::mapearCanchaConConfiguracion, Collectors.toList())
            ));
        
        // Obtener estadísticas generales
        Map<String, Object> estadisticas = calcularEstadisticas(canchas);
        
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("canchasPorDeporte", canchasPorDeporte);
        resultado.put("estadisticas", estadisticas);
        resultado.put("deportesDisponibles", new ArrayList<>(canchasPorDeporte.keySet()));
        
        return resultado;
    }
    
    /**
     * Obtiene configuraciones consolidadas por deporte
     */
    public Map<String, Object> getConfiguracionesPorDeporte(Long clubId) {
        List<Cancha> canchas = canchaService.getCanchasByClub(clubId);
        
        Map<String, List<Map<String, Object>>> configuracionesPorDeporte = new HashMap<>();
        
        for (Cancha cancha : canchas) {
            String deporte = cancha.getDeporte();
            
            if (!configuracionesPorDeporte.containsKey(deporte)) {
                configuracionesPorDeporte.put(deporte, new ArrayList<>());
            }
            
            Map<String, Object> canchaConConfig = mapearCanchaConConfiguracion(cancha);
            configuracionesPorDeporte.get(deporte).add(canchaConConfig);
        }
        
        // Calcular configuraciones típicas por deporte
        Map<String, Map<String, Object>> configuracionesTipicas = calcularConfiguracionesTipicas(configuracionesPorDeporte);
        
        Map<String, Object> resultado = new HashMap<>();
        resultado.put("configuracionesPorDeporte", configuracionesPorDeporte);
        resultado.put("configuracionesTipicas", configuracionesTipicas);
        
        return resultado;
    }
    
    /**
     * Mapea una cancha con su configuración de horarios
     */
    private Map<String, Object> mapearCanchaConConfiguracion(Cancha cancha) {
        Map<String, Object> canchaMap = new HashMap<>();
        canchaMap.put("id", cancha.getId());
        canchaMap.put("nombre", cancha.getNombre());
        canchaMap.put("descripcion", cancha.getDescripcion());
        canchaMap.put("deporte", cancha.getDeporte());
        canchaMap.put("ubicacion", cancha.getUbicacion());
        canchaMap.put("precioPorHora", cancha.getPrecioPorHora());
        canchaMap.put("disponible", cancha.getDisponible());
        
        // Obtener configuración de horarios
        Optional<ConfiguracionHorario> configOpt = configuracionHorarioService.getConfiguracionPorCancha(cancha.getId());
        
        if (configOpt.isPresent()) {
            ConfiguracionHorario config = configOpt.get();
            Map<String, Object> configuracion = new HashMap<>();
            configuracion.put("id", config.getId());
            configuracion.put("horaApertura", config.getHoraApertura().toString());
            configuracion.put("horaCierre", config.getHoraCierre().toString());
            configuracion.put("duracionTurnoMinutos", config.getDuracionTurnoMinutos());
            configuracion.put("diasDisponibles", config.getDiasDisponibles());
            configuracion.put("anticipacionMinimaHoras", config.getAnticipacionMinimaHoras());
            configuracion.put("anticipacionMaximaDias", config.getAnticipacionMaximaDias());
            configuracion.put("configurada", true);
            
            canchaMap.put("configuracion", configuracion);
        } else {
            // Configuración por defecto si no existe
            Map<String, Object> configuracion = new HashMap<>();
            configuracion.put("configurada", false);
            configuracion.put("mensaje", "Sin configuración - Se usarán valores por defecto");
            canchaMap.put("configuracion", configuracion);
        }
        
        return canchaMap;
    }
    
    /**
     * Calcula estadísticas generales del club
     */
    private Map<String, Object> calcularEstadisticas(List<Cancha> canchas) {
        Map<String, Object> estadisticas = new HashMap<>();
        
        long totalCanchas = canchas.size();
        long canchasDisponibles = canchas.stream().filter(Cancha::getDisponible).count();
        long canchasConfiguradas = canchas.stream()
            .filter(cancha -> configuracionHorarioService.getConfiguracionPorCancha(cancha.getId()).isPresent())
            .count();
        
        Map<String, Long> canchasPorDeporte = canchas.stream()
            .collect(Collectors.groupingBy(Cancha::getDeporte, Collectors.counting()));
        
        estadisticas.put("totalCanchas", totalCanchas);
        estadisticas.put("canchasDisponibles", canchasDisponibles);
        estadisticas.put("canchasConfiguradas", canchasConfiguradas);
        estadisticas.put("canchasPorDeporte", canchasPorDeporte);
        estadisticas.put("porcentajeConfiguradas", totalCanchas > 0 ? (canchasConfiguradas * 100.0 / totalCanchas) : 0);
        
        return estadisticas;
    }
    
    /**
     * Calcula configuraciones típicas por deporte (valores más comunes)
     */
    private Map<String, Map<String, Object>> calcularConfiguracionesTipicas(
            Map<String, List<Map<String, Object>>> configuracionesPorDeporte) {
        
        Map<String, Map<String, Object>> configuracionesTipicas = new HashMap<>();
        
        for (Map.Entry<String, List<Map<String, Object>>> entry : configuracionesPorDeporte.entrySet()) {
            String deporte = entry.getKey();
            List<Map<String, Object>> canchas = entry.getValue();
            
            // Filtrar solo canchas configuradas
            List<Map<String, Object>> canchasConfiguradas = canchas.stream()
                .filter(cancha -> {
                    Map<String, Object> config = (Map<String, Object>) cancha.get("configuracion");
                    return config != null && Boolean.TRUE.equals(config.get("configurada"));
                })
                .collect(Collectors.toList());
            
            if (!canchasConfiguradas.isEmpty()) {
                Map<String, Object> configTipica = calcularValoresTipicos(canchasConfiguradas);
                configuracionesTipicas.put(deporte, configTipica);
            }
        }
        
        return configuracionesTipicas;
    }
    
    /**
     * Calcula valores típicos (moda) para un conjunto de configuraciones
     */
    private Map<String, Object> calcularValoresTipicos(List<Map<String, Object>> canchasConfiguradas) {
        Map<String, Object> valoresTipicos = new HashMap<>();
        
        // Obtener valores más comunes
        Map<String, Long> duraciones = canchasConfiguradas.stream()
            .collect(Collectors.groupingBy(
                cancha -> {
                    Map<String, Object> config = (Map<String, Object>) cancha.get("configuracion");
                    return config.get("duracionTurnoMinutos").toString();
                },
                Collectors.counting()
            ));
        
        Map<String, Long> horasApertura = canchasConfiguradas.stream()
            .collect(Collectors.groupingBy(
                cancha -> {
                    Map<String, Object> config = (Map<String, Object>) cancha.get("configuracion");
                    return config.get("horaApertura").toString();
                },
                Collectors.counting()
            ));
        
        Map<String, Long> horasCierre = canchasConfiguradas.stream()
            .collect(Collectors.groupingBy(
                cancha -> {
                    Map<String, Object> config = (Map<String, Object>) cancha.get("configuracion");
                    return config.get("horaCierre").toString();
                },
                Collectors.counting()
            ));
        
        // Encontrar valores más frecuentes
        valoresTipicos.put("duracionTurnoMinutos", 
            duraciones.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("60"));
        
        valoresTipicos.put("horaApertura", 
            horasApertura.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("09:00:00"));
        
        valoresTipicos.put("horaCierre", 
            horasCierre.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("22:00:00"));
        
        valoresTipicos.put("totalCanchas", canchasConfiguradas.size());
        
        return valoresTipicos;
    }
}