package com.reservapp.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reservas")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5175", "http://127.0.0.1:5175", "http://localhost:3000", "http://127.0.0.1:3000"})
public class ReservaController {

    // DTOs para las peticiones
    public static class CreateReservaRequest {
        private Long canchaId;
        private String fecha;
        private String horaInicio;
        private String horaFin;
        private String nombreJugador;
        private String telefono;

        // Getters y setters
        public Long getCanchaId() { return canchaId; }
        public void setCanchaId(Long canchaId) { this.canchaId = canchaId; }
        public String getFecha() { return fecha; }
        public void setFecha(String fecha) { this.fecha = fecha; }
        public String getHoraInicio() { return horaInicio; }
        public void setHoraInicio(String horaInicio) { this.horaInicio = horaInicio; }
        public String getHoraFin() { return horaFin; }
        public void setHoraFin(String horaFin) { this.horaFin = horaFin; }
        public String getNombreJugador() { return nombreJugador; }
        public void setNombreJugador(String nombreJugador) { this.nombreJugador = nombreJugador; }
        public String getTelefono() { return telefono; }
        public void setTelefono(String telefono) { this.telefono = telefono; }
    }

    // Simulación de datos de reservas (en una implementación real, esto sería una base de datos)
    private static final List<Map<String, Object>> reservasSimuladas = new ArrayList<>();

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getReservas() {
        // TODO: Implementar lógica real para obtener reservas del usuario autenticado
        // Por ahora, retornamos todas las reservas simuladas
        
        List<Map<String, Object>> response = new ArrayList<>();
        
        if (reservasSimuladas.isEmpty()) {
            // Agregar algunas reservas de ejemplo
            Map<String, Object> reserva1 = new HashMap<>();
            reserva1.put("id", 1L);
            reserva1.put("canchaId", 1L);
            reserva1.put("canchaNombre", "Cancha de Pádel Premium");
            reserva1.put("fecha", "2024-01-15");
            reserva1.put("horaInicio", "14:00");
            reserva1.put("horaFin", "16:00");
            reserva1.put("nombreJugador", "Juan Pérez");
            reserva1.put("telefono", "+54 9 11 1234-5678");
            reserva1.put("estado", "confirmada");
            reserva1.put("precioTotal", 5000.0);
            reserva1.put("fechaCreacion", LocalDateTime.now().minusDays(2).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            
            Map<String, Object> reserva2 = new HashMap<>();
            reserva2.put("id", 2L);
            reserva2.put("canchaId", 2L);
            reserva2.put("canchaNombre", "Cancha de Tenis Profesional");
            reserva2.put("fecha", "2024-01-20");
            reserva2.put("horaInicio", "10:00");
            reserva2.put("horaFin", "11:00");
            reserva2.put("nombreJugador", "María García");
            reserva2.put("telefono", "+54 9 11 9876-5432");
            reserva2.put("estado", "pendiente");
            reserva2.put("precioTotal", 3000.0);
            reserva2.put("fechaCreacion", LocalDateTime.now().minusDays(1).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            
            reservasSimuladas.add(reserva1);
            reservasSimuladas.add(reserva2);
        }
        
        response.addAll(reservasSimuladas);
        return ResponseEntity.ok(response);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ResponseEntity<Map<String, Object>> createReserva(@RequestBody CreateReservaRequest request) {
        // TODO: Implementar lógica real de creación de reservas
        // Por ahora, simulamos la creación
        
        Map<String, Object> response = new HashMap<>();
        
        // Validación básica
        if (request.getCanchaId() == null || request.getFecha() == null || 
            request.getHoraInicio() == null || request.getHoraFin() == null ||
            request.getNombreJugador() == null || request.getNombreJugador().isEmpty()) {
            response.put("success", false);
            response.put("message", "Todos los campos son requeridos");
            return ResponseEntity.badRequest().body(response);
        }

        // Simulación de creación exitosa
        Map<String, Object> nuevaReserva = new HashMap<>();
        nuevaReserva.put("id", (long) (reservasSimuladas.size() + 1));
        nuevaReserva.put("canchaId", request.getCanchaId());
        nuevaReserva.put("canchaNombre", "Cancha #" + request.getCanchaId());
        nuevaReserva.put("fecha", request.getFecha());
        nuevaReserva.put("horaInicio", request.getHoraInicio());
        nuevaReserva.put("horaFin", request.getHoraFin());
        nuevaReserva.put("nombreJugador", request.getNombreJugador());
        nuevaReserva.put("telefono", request.getTelefono());
        nuevaReserva.put("estado", "confirmada");
        nuevaReserva.put("precioTotal", 2500.0);
        nuevaReserva.put("fechaCreacion", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        
        reservasSimuladas.add(nuevaReserva);
        
        response.put("success", true);
        response.put("message", "Reserva creada exitosamente");
        response.put("reserva", nuevaReserva);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getReservaById(@PathVariable Long id) {
        // TODO: Implementar lógica real para obtener una reserva específica
        
        Map<String, Object> response = new HashMap<>();
        
        // Buscar la reserva en la lista simulada
        for (Map<String, Object> reserva : reservasSimuladas) {
            if (reserva.get("id").equals(id)) {
                response.put("success", true);
                response.put("reserva", reserva);
                return ResponseEntity.ok(response);
            }
        }
        
        response.put("success", false);
        response.put("message", "Reserva no encontrada");
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> cancelarReserva(@PathVariable Long id) {
        // TODO: Implementar lógica real para cancelar una reserva
        
        Map<String, Object> response = new HashMap<>();
        
        // Buscar y eliminar la reserva de la lista simulada
        for (int i = 0; i < reservasSimuladas.size(); i++) {
            if (reservasSimuladas.get(i).get("id").equals(id)) {
                reservasSimuladas.remove(i);
                response.put("success", true);
                response.put("message", "Reserva cancelada exitosamente");
                return ResponseEntity.ok(response);
            }
        }
        
        response.put("success", false);
        response.put("message", "Reserva no encontrada");
        return ResponseEntity.notFound().build();
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Map<String, Object>> cambiarEstadoReserva(
            @PathVariable Long id, 
            @RequestBody Map<String, String> request) {
        
        String nuevoEstado = request.get("estado");
        
        // TODO: Implementar lógica real para cambiar el estado de una reserva
        
        Map<String, Object> response = new HashMap<>();
        
        // Validación del estado
        if (nuevoEstado == null || (!nuevoEstado.equals("confirmada") && 
            !nuevoEstado.equals("cancelada") && !nuevoEstado.equals("completada"))) {
            response.put("success", false);
            response.put("message", "Estado inválido. Debe ser 'confirmada', 'cancelada' o 'completada'");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Buscar y actualizar la reserva en la lista simulada
        for (Map<String, Object> reserva : reservasSimuladas) {
            if (reserva.get("id").equals(id)) {
                reserva.put("estado", nuevoEstado);
                response.put("success", true);
                response.put("message", "Estado de reserva actualizado exitosamente");
                response.put("reserva", reserva);
                return ResponseEntity.ok(response);
            }
        }
        
        response.put("success", false);
        response.put("message", "Reserva no encontrada");
        return ResponseEntity.notFound().build();
    }
} 