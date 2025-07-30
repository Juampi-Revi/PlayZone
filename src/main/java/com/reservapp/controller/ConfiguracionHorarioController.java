package com.reservapp.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
     * Obtiene las canchas del propietario autenticado
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
            
            Map<String, Object> response = new HashMap<>();
            response.put("canchas", canchas);
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