package com.reservapp.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.reservapp.entity.Cancha;
import com.reservapp.entity.ConfiguracionHorario;
import com.reservapp.entity.Usuario;
import com.reservapp.security.JwtUtil;
import com.reservapp.service.CanchaService;
import com.reservapp.service.ConfiguracionHorarioService;
import com.reservapp.service.UsuarioService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/configuracion-horarios")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5175", "http://127.0.0.1:5175", "http://localhost:3000", "http://127.0.0.1:3000"})
public class ConfiguracionHorarioController {

    @Autowired
    private ConfiguracionHorarioService configuracionHorarioService;

    @Autowired
    private CanchaService canchaService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Obtiene la configuración de horarios de una cancha
     */
    @GetMapping("/cancha/{canchaId}")
    public ResponseEntity<Map<String, Object>> getConfiguracionPorCancha(@PathVariable Long canchaId) {
        try {
            Optional<ConfiguracionHorario> config = configuracionHorarioService.getConfiguracionPorCancha(canchaId);
            
            Map<String, Object> response = new HashMap<>();
            if (config.isPresent()) {
                ConfiguracionHorario configuracion = config.get();
                response.put("id", configuracion.getId());
                response.put("horaApertura", configuracion.getHoraApertura().toString());
                response.put("horaCierre", configuracion.getHoraCierre().toString());
                response.put("duracionTurnoMinutos", configuracion.getDuracionTurnoMinutos());
                response.put("diasDisponibles", configuracion.getDiasDisponibles());
                response.put("anticipacionMinimaHoras", configuracion.getAnticipacionMinimaHoras());
                response.put("anticipacionMaximaDias", configuracion.getAnticipacionMaximaDias());
                response.put("existe", true);
            } else {
                response.put("existe", false);
                response.put("mensaje", "No hay configuración de horarios para esta cancha");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener configuración: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Crea o actualiza la configuración de horarios (solo propietarios)
     */
    @PostMapping("/cancha/{canchaId}")
    @PreAuthorize("hasAuthority('CLUB')")
    public ResponseEntity<Map<String, Object>> guardarConfiguracion(
            @PathVariable Long canchaId,
            @RequestBody ConfiguracionHorario configuracion,
            @AuthenticationPrincipal String email) {
        try {
            // Verificar que el usuario es el propietario de la cancha
            Usuario usuario = usuarioService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            Optional<Cancha> canchaOpt = canchaService.getCanchaById(canchaId);
            if (canchaOpt.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Cancha no encontrada");
                return ResponseEntity.badRequest().body(error);
            }

            Cancha cancha = canchaOpt.get();
            if (cancha.getClub() == null || cancha.getClub().getPropietario() == null || !cancha.getClub().getPropietario().getId().equals(usuario.getId())) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "No tienes permisos para configurar esta cancha");
                return ResponseEntity.status(403).body(error);
            }

            ConfiguracionHorario configGuardada = configuracionHorarioService.guardarConfiguracion(canchaId, configuracion);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", configGuardada.getId());
            response.put("mensaje", "Configuración guardada exitosamente");
            response.put("horaApertura", configGuardada.getHoraApertura().toString());
            response.put("horaCierre", configGuardada.getHoraCierre().toString());
            response.put("duracionTurnoMinutos", configGuardada.getDuracionTurnoMinutos());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al guardar configuración: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Obtiene los horarios disponibles para una fecha específica
     */
    @GetMapping("/cancha/{canchaId}/horarios-disponibles")
    public ResponseEntity<Map<String, Object>> getHorariosDisponibles(
            @PathVariable Long canchaId,
            @RequestParam String fecha) {
        try {
            LocalDateTime fechaDateTime = LocalDateTime.parse(fecha + "T00:00:00");
            List<String> horarios = configuracionHorarioService.getHorariosDisponibles(canchaId, fechaDateTime);
            
            Map<String, Object> response = new HashMap<>();
            response.put("horarios", horarios);
            response.put("fecha", fecha);
            response.put("canchaId", canchaId);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener horarios: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Crea configuración por defecto para una cancha
     */
    @PostMapping("/cancha/{canchaId}/por-defecto")
    @PreAuthorize("hasAuthority('CLUB')")
    public ResponseEntity<Map<String, Object>> crearConfiguracionPorDefecto(
            @PathVariable Long canchaId,
            @AuthenticationPrincipal String email) {
        try {
            // Verificar que el usuario es el propietario de la cancha
            Usuario usuario = usuarioService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            Optional<Cancha> canchaOpt = canchaService.getCanchaById(canchaId);
            if (canchaOpt.isEmpty()) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Cancha no encontrada");
                return ResponseEntity.badRequest().body(error);
            }

            Cancha cancha = canchaOpt.get();
            if (cancha.getClub() == null || cancha.getClub().getPropietario() == null || !cancha.getClub().getPropietario().getId().equals(usuario.getId())) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "No tienes permisos para configurar esta cancha");
                return ResponseEntity.status(403).body(error);
            }

            ConfiguracionHorario config = configuracionHorarioService.crearConfiguracionPorDefecto(canchaId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("mensaje", "Configuración por defecto creada");
            response.put("id", config.getId());
            response.put("horaApertura", config.getHoraApertura().toString());
            response.put("horaCierre", config.getHoraCierre().toString());
            response.put("duracionTurnoMinutos", config.getDuracionTurnoMinutos());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al crear configuración: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Valida un horario específico
     */
    @GetMapping("/cancha/{canchaId}/validar-horario")
    public ResponseEntity<Map<String, Object>> validarHorario(
            @PathVariable Long canchaId,
            @RequestParam String fechaInicio,
            @RequestParam String fechaFin) {
        try {
            LocalDateTime inicio = LocalDateTime.parse(fechaInicio);
            LocalDateTime fin = LocalDateTime.parse(fechaFin);
            
            boolean valido = configuracionHorarioService.validarHorario(canchaId, inicio, fin);
            
            Map<String, Object> response = new HashMap<>();
            response.put("valido", valido);
            response.put("mensaje", valido ? "Horario válido" : "Horario no válido según la configuración");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al validar horario: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Obtiene las canchas del propietario autenticado con sus configuraciones de horarios
     */
    @GetMapping("/mis-canchas")
    @PreAuthorize("hasAuthority('CLUB')")
    public ResponseEntity<Map<String, Object>> getMisCanchas(HttpServletRequest request) {
        try {
            // Obtener el token del header Authorization
            String authHeader = request.getHeader("Authorization");
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Token de autorización requerido");
                return ResponseEntity.status(401).body(error);
            }
            
            String token = authHeader.substring(7);
            Long usuarioId = jwtUtil.getUserIdFromToken(token);
            
            List<Cancha> canchas = canchaService.getCanchasByPropietario(usuarioId);
            
            // Crear lista de canchas con configuraciones incluidas
            List<Map<String, Object>> canchasConConfiguracion = new ArrayList<>();
            
            for (Cancha cancha : canchas) {
                Map<String, Object> canchaData = new HashMap<>();
                canchaData.put("id", cancha.getId());
                canchaData.put("nombre", cancha.getNombre());
                canchaData.put("descripcion", cancha.getDescripcion());
                canchaData.put("deporte", cancha.getDeporte());
                // La ubicación de la cancha es la dirección del club
                String ubicacion = null;
                if (cancha.getClub() != null && cancha.getClub().getDireccion() != null && !cancha.getClub().getDireccion().trim().isEmpty()) {
                    ubicacion = cancha.getClub().getDireccion();
                } else if (cancha.getUbicacion() != null && !cancha.getUbicacion().trim().isEmpty()) {
                    ubicacion = cancha.getUbicacion();
                } else {
                    // Ubicación por defecto si no hay datos
                    ubicacion = "Ubicación no especificada";
                }
                
                canchaData.put("ubicacion", ubicacion);
                canchaData.put("precioPorHora", cancha.getPrecioPorHora());
                canchaData.put("horario", cancha.getHorario());
                canchaData.put("disponible", cancha.getDisponible());
                
                // Debug: Log información sobre imágenes
                System.out.println("=== DEBUG IMAGENES ===");
                System.out.println("Cancha: " + cancha.getNombre());
                System.out.println("Deporte: " + cancha.getDeporte());
                
                // Mapear imágenes manualmente para evitar problemas de serialización
                List<String> imagenesUrls = new ArrayList<>();
                try {
                    List<String> imagenesOriginales = cancha.getImagenes();
                    System.out.println("Imágenes originales: " + (imagenesOriginales != null ? "not null" : "null"));
                    System.out.println("Imágenes size: " + (imagenesOriginales != null ? imagenesOriginales.size() : "null"));
                    
                    if (imagenesOriginales != null && !imagenesOriginales.isEmpty()) {
                        // Forzar la carga de la colección iterando sobre ella
                        for (String imagen : imagenesOriginales) {
                            if (imagen != null && !imagen.trim().isEmpty()) {
                                imagenesUrls.add(imagen);
                                System.out.println("Imagen agregada: " + imagen);
                            }
                        }
                    }
                    System.out.println("Imágenes copiadas: " + imagenesUrls.size());
                } catch (Exception e) {
                    System.out.println("Error al acceder a imágenes: " + e.getMessage());
                    e.printStackTrace();
                }
                
                // Si es una cancha de fútbol y no tiene imágenes, agregar imagen por defecto
                if ((imagenesUrls == null || imagenesUrls.isEmpty()) && 
                    cancha.getDeporte() != null && 
                    cancha.getDeporte().toLowerCase().contains("futbol")) {
                    System.out.println("Aplicando imagen por defecto para cancha de fútbol");
                    imagenesUrls = new ArrayList<>();
                    imagenesUrls.add("https://grupohec.com/wp-content/uploads/2023/01/Grama-sintetica-altura.webp");
                } else {
                    System.out.println("No se aplica imagen por defecto. Condiciones:");
                    System.out.println("- Imágenes vacías: " + (imagenesUrls == null || imagenesUrls.isEmpty()));
                    System.out.println("- Es fútbol: " + (cancha.getDeporte() != null && cancha.getDeporte().toLowerCase().contains("futbol")));
                }
                
                System.out.println("Imágenes finales: " + imagenesUrls);
                System.out.println("======================");
                
                canchaData.put("imagenes", imagenesUrls);
                
                // Mapear club manualmente para evitar problemas de serialización
                if (cancha.getClub() != null) {
                    Map<String, Object> clubData = new HashMap<>();
                    clubData.put("id", cancha.getClub().getId());
                    clubData.put("nombre", cancha.getClub().getNombre());
                    clubData.put("direccion", cancha.getClub().getDireccion());
                    clubData.put("telefono", cancha.getClub().getTelefono());
                    clubData.put("email", cancha.getClub().getEmail());
                    clubData.put("descripcion", cancha.getClub().getDescripcion());
                    
                    // Mapear servicios manualmente
                    List<String> servicios = cancha.getClub().getServicios();
                    clubData.put("servicios", servicios != null ? servicios : new ArrayList<>());
                    
                    canchaData.put("club", clubData);
                }
                
                // Obtener configuración de horarios para esta cancha
                Optional<ConfiguracionHorario> config = configuracionHorarioService.getConfiguracionPorCancha(cancha.getId());
                if (config.isPresent()) {
                    ConfiguracionHorario configuracion = config.get();
                    Map<String, Object> configData = new HashMap<>();
                    configData.put("id", configuracion.getId());
                    configData.put("horaApertura", configuracion.getHoraApertura().toString());
                    configData.put("horaCierre", configuracion.getHoraCierre().toString());
                    configData.put("duracionTurnoMinutos", configuracion.getDuracionTurnoMinutos());
                    configData.put("diasDisponibles", configuracion.getDiasDisponibles());
                    configData.put("anticipacionMinimaHoras", configuracion.getAnticipacionMinimaHoras());
                    configData.put("anticipacionMaximaDias", configuracion.getAnticipacionMaximaDias());
                    canchaData.put("configuracionHorario", configData);
                } else {
                    canchaData.put("configuracionHorario", null);
                }
                
                canchasConConfiguracion.add(canchaData);
            }
            
            Map<String, Object> response = new HashMap<>();
            response.put("canchas", canchasConConfiguracion);
            response.put("total", canchas.size());
            response.put("usuarioId", usuarioId); // Para debug
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", "Error al obtener canchas: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}