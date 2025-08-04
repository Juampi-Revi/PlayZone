package com.reservapp.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.reservapp.service.CalendarioMaestroService;
import com.reservapp.service.ClubService;
import com.reservapp.service.UsuarioService;
import com.reservapp.entity.Club;
import com.reservapp.entity.Usuario;

@RestController
@RequestMapping("/api/calendario-maestro")
public class CalendarioMaestroController {
    
    @Autowired
    private CalendarioMaestroService calendarioMaestroService;
    
    @Autowired
    private ClubService clubService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    /**
     * Obtiene el calendario maestro completo del club (canchas agrupadas por deporte)
     */
    @GetMapping("/club/{clubId}")
    @PreAuthorize("hasAuthority('CLUB')")
    public ResponseEntity<Map<String, Object>> getCalendarioMaestro(
            @PathVariable Long clubId,
            @AuthenticationPrincipal String email) {
        
        try {
            // Verificar que el club pertenece al usuario autenticado
            Usuario usuario = usuarioService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            Optional<Club> clubUsuario = clubService.obtenerClubPorPropietario(usuario);
            if (clubUsuario.isEmpty() || !clubUsuario.get().getId().equals(clubId)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "No tienes permisos para acceder a este club");
                return ResponseEntity.status(403).body(errorResponse);
            }
            
            Map<String, Object> calendario = calendarioMaestroService.getCalendarioMaestroPorClub(clubId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", calendario);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Error al obtener el calendario maestro: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
    
    /**
     * Obtiene configuraciones consolidadas por deporte
     */
    @GetMapping("/configuraciones/club/{clubId}")
    @PreAuthorize("hasAuthority('CLUB')")
    public ResponseEntity<Map<String, Object>> getConfiguracionesPorDeporte(
            @PathVariable Long clubId,
            @AuthenticationPrincipal String email) {
        
        try {
            // Verificar que el club pertenece al usuario autenticado
            Usuario usuario = usuarioService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            Optional<Club> clubUsuario = clubService.obtenerClubPorPropietario(usuario);
            if (clubUsuario.isEmpty() || !clubUsuario.get().getId().equals(clubId)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "No tienes permisos para acceder a este club");
                return ResponseEntity.status(403).body(errorResponse);
            }
            
            Map<String, Object> configuraciones = calendarioMaestroService.getConfiguracionesPorDeporte(clubId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", configuraciones);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Error al obtener las configuraciones: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
    
    /**
     * Endpoint para obtener estadísticas rápidas del calendario maestro
     */
    @GetMapping("/estadisticas/club/{clubId}")
    @PreAuthorize("hasAuthority('CLUB')")
    public ResponseEntity<Map<String, Object>> getEstadisticasCalendario(
            @PathVariable Long clubId,
            @AuthenticationPrincipal String email) {
        
        try {
            // Verificar que el club pertenece al usuario autenticado
            Usuario usuario = usuarioService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            
            Optional<Club> clubUsuario = clubService.obtenerClubPorPropietario(usuario);
            if (clubUsuario.isEmpty() || !clubUsuario.get().getId().equals(clubId)) {
                Map<String, Object> errorResponse = new HashMap<>();
                errorResponse.put("error", "No tienes permisos para acceder a este club");
                return ResponseEntity.status(403).body(errorResponse);
            }
            
            Map<String, Object> calendario = calendarioMaestroService.getCalendarioMaestroPorClub(clubId);
            Map<String, Object> estadisticas = (Map<String, Object>) calendario.get("estadisticas");
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", estadisticas);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("error", "Error al obtener las estadísticas: " + e.getMessage());
            return ResponseEntity.status(500).body(errorResponse);
        }
    }
}