package com.reservapp.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/clubes")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5175", "http://127.0.0.1:5175", "http://localhost:3000", "http://127.0.0.1:3000"})
public class ClubController {

    // DTOs para las peticiones
    public static class CreateClubRequest {
        private String nombre;
        private String descripcion;
        private String direccion;
        private String telefono;
        private String email;
        private String horario;
        private String deportes;
        private String imagen;

        // Getters y setters
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public String getDescripcion() { return descripcion; }
        public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
        public String getDireccion() { return direccion; }
        public void setDireccion(String direccion) { this.direccion = direccion; }
        public String getTelefono() { return telefono; }
        public void setTelefono(String telefono) { this.telefono = telefono; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getHorario() { return horario; }
        public void setHorario(String horario) { this.horario = horario; }
        public String getDeportes() { return deportes; }
        public void setDeportes(String deportes) { this.deportes = deportes; }
        public String getImagen() { return imagen; }
        public void setImagen(String imagen) { this.imagen = imagen; }
    }

    // Simulación de datos de clubes (en una implementación real, esto sería una base de datos)
    private static final List<Map<String, Object>> clubesSimulados = new ArrayList<>();

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getClubes() {
        // TODO: Implementar lógica real para obtener clubes
        // Por ahora, retornamos todos los clubes simulados
        
        List<Map<String, Object>> response = new ArrayList<>();
        
        if (clubesSimulados.isEmpty()) {
            // Agregar algunos clubes de ejemplo
            Map<String, Object> club1 = new HashMap<>();
            club1.put("id", 1L);
            club1.put("nombre", "Club Deportivo Central");
            club1.put("descripcion", "Club deportivo con instalaciones de primer nivel para múltiples deportes");
            club1.put("direccion", "Av. Libertador 1234, Buenos Aires");
            club1.put("telefono", "+54 11 1234-5678");
            club1.put("email", "info@clubcentral.com");
            club1.put("horario", "Lunes a Domingo 6:00 - 24:00");
            club1.put("deportes", "Pádel, Tenis, Fútbol, Básquet");
            club1.put("imagen", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop");
            club1.put("rating", 4.8);
            club1.put("numCanchas", 8);
            club1.put("fechaRegistro", LocalDateTime.now().minusMonths(2).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            
            Map<String, Object> club2 = new HashMap<>();
            club2.put("id", 2L);
            club2.put("nombre", "Tennis Club Buenos Aires");
            club2.put("descripcion", "Club especializado en tenis con canchas profesionales");
            club2.put("direccion", "Calle Florida 567, Buenos Aires");
            club2.put("telefono", "+54 11 9876-5432");
            club2.put("email", "info@tennisclubba.com");
            club2.put("horario", "Lunes a Domingo 7:00 - 22:00");
            club2.put("deportes", "Tenis, Squash");
            club2.put("imagen", "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800&h=600&fit=crop");
            club2.put("rating", 4.9);
            club2.put("numCanchas", 6);
            club2.put("fechaRegistro", LocalDateTime.now().minusMonths(1).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            
            Map<String, Object> club3 = new HashMap<>();
            club3.put("id", 3L);
            club3.put("nombre", "Complejo Deportivo La Boca");
            club3.put("descripcion", "Complejo deportivo popular con canchas de fútbol 5 y 11");
            club3.put("direccion", "Av. Almirante Brown 890, Buenos Aires");
            club3.put("telefono", "+54 11 5555-1234");
            club3.put("email", "info@complejolaboca.com");
            club3.put("horario", "Lunes a Domingo 9:00 - 24:00");
            club3.put("deportes", "Fútbol, Fútbol 5");
            club3.put("imagen", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop");
            club3.put("rating", 4.5);
            club3.put("numCanchas", 12);
            club3.put("fechaRegistro", LocalDateTime.now().minusWeeks(2).format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            
            clubesSimulados.add(club1);
            clubesSimulados.add(club2);
            clubesSimulados.add(club3);
        }
        
        response.addAll(clubesSimulados);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createClub(@RequestBody CreateClubRequest request) {
        // TODO: Implementar lógica real de creación de clubes
        // Por ahora, simulamos la creación
        
        Map<String, Object> response = new HashMap<>();
        
        // Validación básica
        if (request.getNombre() == null || request.getNombre().isEmpty() ||
            request.getDireccion() == null || request.getDireccion().isEmpty() ||
            request.getTelefono() == null || request.getTelefono().isEmpty()) {
            response.put("success", false);
            response.put("message", "Nombre, dirección y teléfono son requeridos");
            return ResponseEntity.badRequest().body(response);
        }

        // Simulación de creación exitosa
        Map<String, Object> nuevoClub = new HashMap<>();
        nuevoClub.put("id", (long) (clubesSimulados.size() + 1));
        nuevoClub.put("nombre", request.getNombre());
        nuevoClub.put("descripcion", request.getDescripcion());
        nuevoClub.put("direccion", request.getDireccion());
        nuevoClub.put("telefono", request.getTelefono());
        nuevoClub.put("email", request.getEmail());
        nuevoClub.put("horario", request.getHorario());
        nuevoClub.put("deportes", request.getDeportes());
        nuevoClub.put("imagen", request.getImagen());
        nuevoClub.put("rating", 0.0);
        nuevoClub.put("numCanchas", 0);
        nuevoClub.put("fechaRegistro", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        
        clubesSimulados.add(nuevoClub);
        
        response.put("success", true);
        response.put("message", "Club registrado exitosamente");
        response.put("club", nuevoClub);
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getClubById(@PathVariable Long id) {
        // TODO: Implementar lógica real para obtener un club específico
        
        Map<String, Object> response = new HashMap<>();
        
        // Buscar el club en la lista simulada
        for (Map<String, Object> club : clubesSimulados) {
            if (club.get("id").equals(id)) {
                response.put("success", true);
                response.put("club", club);
                return ResponseEntity.ok(response);
            }
        }
        
        response.put("success", false);
        response.put("message", "Club no encontrado");
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateClub(@PathVariable Long id, @RequestBody CreateClubRequest request) {
        // TODO: Implementar lógica real para actualizar un club
        
        Map<String, Object> response = new HashMap<>();
        
        // Validación básica
        if (request.getNombre() == null || request.getNombre().isEmpty() ||
            request.getDireccion() == null || request.getDireccion().isEmpty() ||
            request.getTelefono() == null || request.getTelefono().isEmpty()) {
            response.put("success", false);
            response.put("message", "Nombre, dirección y teléfono son requeridos");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Buscar y actualizar el club en la lista simulada
        for (Map<String, Object> club : clubesSimulados) {
            if (club.get("id").equals(id)) {
                club.put("nombre", request.getNombre());
                club.put("descripcion", request.getDescripcion());
                club.put("direccion", request.getDireccion());
                club.put("telefono", request.getTelefono());
                club.put("email", request.getEmail());
                club.put("horario", request.getHorario());
                club.put("deportes", request.getDeportes());
                if (request.getImagen() != null && !request.getImagen().isEmpty()) {
                    club.put("imagen", request.getImagen());
                }
                
                response.put("success", true);
                response.put("message", "Club actualizado exitosamente");
                response.put("club", club);
                return ResponseEntity.ok(response);
            }
        }
        
        response.put("success", false);
        response.put("message", "Club no encontrado");
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteClub(@PathVariable Long id) {
        // TODO: Implementar lógica real para eliminar un club
        
        Map<String, Object> response = new HashMap<>();
        
        // Buscar y eliminar el club de la lista simulada
        for (int i = 0; i < clubesSimulados.size(); i++) {
            if (clubesSimulados.get(i).get("id").equals(id)) {
                clubesSimulados.remove(i);
                response.put("success", true);
                response.put("message", "Club eliminado exitosamente");
                return ResponseEntity.ok(response);
            }
        }
        
        response.put("success", false);
        response.put("message", "Club no encontrado");
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Map<String, Object>>> buscarClubes(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) String deporte,
            @RequestParam(required = false) String ubicacion) {
        
        // TODO: Implementar lógica real de búsqueda de clubes
        
        List<Map<String, Object>> resultados = new ArrayList<>();
        
        for (Map<String, Object> club : clubesSimulados) {
            boolean matches = true;
            
            if (nombre != null && !nombre.isEmpty()) {
                if (!club.get("nombre").toString().toLowerCase().contains(nombre.toLowerCase())) {
                    matches = false;
                }
            }
            
            if (deporte != null && !deporte.isEmpty()) {
                if (!club.get("deportes").toString().toLowerCase().contains(deporte.toLowerCase())) {
                    matches = false;
                }
            }
            
            if (ubicacion != null && !ubicacion.isEmpty()) {
                if (!club.get("direccion").toString().toLowerCase().contains(ubicacion.toLowerCase())) {
                    matches = false;
                }
            }
            
            if (matches) {
                resultados.add(club);
            }
        }
        
        return ResponseEntity.ok(resultados);
    }
} 