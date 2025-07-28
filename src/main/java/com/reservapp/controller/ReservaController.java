package com.reservapp.controller;

import com.reservapp.entity.Reserva;
import com.reservapp.service.ReservaService;
import com.reservapp.service.StripeService;
import com.reservapp.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5175", "http://127.0.0.1:5175", "http://localhost:3000", "http://127.0.0.1:3000"})
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @Autowired
    private StripeService stripeService;

    @Autowired
    private UsuarioService usuarioService;

    // DTOs para las peticiones
    public static class CreateReservaRequest {
        private Long canchaId;
        private String fechaInicio;
        private String fechaFin;

        // Getters y setters
        public Long getCanchaId() { return canchaId; }
        public void setCanchaId(Long canchaId) { this.canchaId = canchaId; }
        public String getFechaInicio() { return fechaInicio; }
        public void setFechaInicio(String fechaInicio) { this.fechaInicio = fechaInicio; }
        public String getFechaFin() { return fechaFin; }
        public void setFechaFin(String fechaFin) { this.fechaFin = fechaFin; }
    }

    /**
     * Obtiene las reservas del usuario autenticado
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getReservas() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            List<Reserva> reservas = reservaService.getReservasByUsuario(usuarioId);
            
            List<Map<String, Object>> response = reservas.stream()
                    .map(this::convertirReservaAMap)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Crea una nueva reserva (sin pago aún)
     */
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Map<String, Object>> createReserva(@RequestBody CreateReservaRequest request) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            // Parsear las fechas
            LocalDateTime fechaInicio = LocalDateTime.parse(request.getFechaInicio());
            LocalDateTime fechaFin = LocalDateTime.parse(request.getFechaFin());
            
            // Crear la reserva
            Reserva reserva = reservaService.crearReserva(usuarioId, request.getCanchaId(), fechaInicio, fechaFin);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Reserva creada exitosamente. Procede al pago.");
            response.put("reserva", convertirReservaAMap(reserva));
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Obtiene una reserva específica
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getReservaById(@PathVariable Long id) {
        try {
            Reserva reserva = reservaService.getReservaById(id)
                    .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("reserva", convertirReservaAMap(reserva));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Cancela una reserva
     */
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> cancelarReserva(@PathVariable Long id) {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            reservaService.cancelarReserva(id, usuarioId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Reserva cancelada exitosamente");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Verifica disponibilidad de una cancha
     */
    @GetMapping("/disponibilidad")
    public ResponseEntity<Map<String, Object>> verificarDisponibilidad(
            @RequestParam Long canchaId,
            @RequestParam String fechaInicio,
            @RequestParam String fechaFin) {
        try {
            LocalDateTime inicio = LocalDateTime.parse(fechaInicio);
            LocalDateTime fin = LocalDateTime.parse(fechaFin);
            
            boolean disponible = reservaService.isCanchaDisponible(canchaId, inicio, fin);
            
            Map<String, Object> response = new HashMap<>();
            response.put("disponible", disponible);
            response.put("canchaId", canchaId);
            response.put("fechaInicio", fechaInicio);
            response.put("fechaFin", fechaFin);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Convierte una entidad Reserva a Map para la respuesta JSON
     */
    private Map<String, Object> convertirReservaAMap(Reserva reserva) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", reserva.getId());
        map.put("canchaId", reserva.getCancha().getId());
        map.put("canchaNombre", reserva.getCancha().getNombre());
        map.put("fechaInicio", reserva.getFechaHoraInicio().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        map.put("fechaFin", reserva.getFechaHoraFin().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        map.put("montoTotal", reserva.getMontoTotal());
        map.put("estado", reserva.getEstado().toString());
        map.put("estadoPago", reserva.getEstadoPago().toString());
        map.put("fechaCreacion", reserva.getFechaCreacion().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        map.put("stripePaymentIntentId", reserva.getStripePaymentIntentId());
        map.put("stripeSessionId", reserva.getStripeSessionId());
        
        // Información del usuario
        map.put("usuarioNombre", reserva.getUsuario().getNombre());
        map.put("usuarioEmail", reserva.getUsuario().getEmail());
        
        // Información de la cancha
        map.put("canchaDeporte", reserva.getCancha().getDeporte());
        map.put("canchaUbicacion", reserva.getCancha().getUbicacion());
        map.put("canchaPrecioPorHora", reserva.getCancha().getPrecioPorHora());
        
        return map;
    }
}