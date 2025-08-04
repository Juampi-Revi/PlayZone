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
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservas")
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
     * Obtiene las reservas del usuario autenticado (endpoint específico)
     */
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/mis-reservas")
    public ResponseEntity<Map<String, Object>> getMisReservas() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            List<Reserva> reservas = reservaService.getReservasByUsuario(usuarioId);
            
            List<Map<String, Object>> reservasResponse = reservas.stream()
                    .map(this::convertirReservaAMap)
                    .collect(Collectors.toList());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("reservas", reservasResponse);
            response.put("total", reservasResponse.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al obtener reservas: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
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
     * Confirma una reserva (solo para administradores)
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/confirmar")
    public ResponseEntity<Map<String, Object>> confirmarReserva(@PathVariable Long id) {
        try {
            reservaService.confirmarReserva(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Reserva confirmada exitosamente");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Completa una reserva (solo para administradores)
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/completar")
    public ResponseEntity<Map<String, Object>> completarReserva(@PathVariable Long id) {
        try {
            reservaService.completarReserva(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Reserva completada exitosamente");
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Obtiene todas las reservas del club del administrador autenticado
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/todas")
    public ResponseEntity<Map<String, Object>> getAllReservasAdmin() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            // Obtener el club del administrador
            Long clubId = usuarioService.getClubIdByUsuarioId(usuarioId);
            if (clubId == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("success", false);
                error.put("message", "No tienes un club asociado");
                return ResponseEntity.badRequest().body(error);
            }
            
            List<Reserva> reservas = reservaService.getReservasByClub(clubId);
            
            List<Map<String, Object>> reservasData = reservas.stream()
                    .map(this::convertirReservaAMapAdmin)
                    .collect(Collectors.toList());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("data", reservasData);
            response.put("total", reservasData.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("success", false);
            error.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
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

    /**
     * Convierte una entidad Reserva a Map para administradores con información adicional
     */
    private Map<String, Object> convertirReservaAMapAdmin(Reserva reserva) {
        Map<String, Object> map = new HashMap<>();
        map.put("id", reserva.getId());
        
        // Información del jugador
        map.put("jugador", reserva.getUsuario().getNombre());
        map.put("email", reserva.getUsuario().getEmail());
        map.put("telefono", reserva.getUsuario().getTelefono() != null ? reserva.getUsuario().getTelefono() : "");
        
        // Información de la cancha
        map.put("cancha", reserva.getCancha().getNombre());
        map.put("canchaId", reserva.getCancha().getId());
        
        // Información de fecha y hora
        LocalDateTime inicio = reserva.getFechaHoraInicio();
        LocalDateTime fin = reserva.getFechaHoraFin();
        map.put("fecha", inicio.toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        map.put("horaInicio", inicio.toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")));
        map.put("horaFin", fin.toLocalTime().format(DateTimeFormatter.ofPattern("HH:mm")));
        
        // Calcular duración en minutos
        long duracionMinutos = ChronoUnit.MINUTES.between(inicio, fin);
        map.put("duracion", duracionMinutos);
        
        // Información financiera
        map.put("precio", reserva.getMontoTotal());
        
        // Estado
        String estado = reserva.getEstado().toString().toLowerCase();
        map.put("estado", estado);
        
        // Fecha de reserva (cuándo se hizo la reserva)
        map.put("fechaReserva", reserva.getFechaCreacion().toLocalDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
        
        // Método de pago (basado en si tiene stripe info)
        String metodoPago = "Efectivo";
        if (reserva.getStripePaymentIntentId() != null || reserva.getStripeSessionId() != null) {
            metodoPago = "Tarjeta de crédito";
        }
        map.put("metodoPago", metodoPago);
        
        // Observaciones (por ahora vacío, se puede agregar campo en el futuro)
        map.put("observaciones", "");
        
        return map;
    }
}