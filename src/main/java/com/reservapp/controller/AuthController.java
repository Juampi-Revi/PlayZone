package com.reservapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5175", "http://127.0.0.1:5175", "http://localhost:3000", "http://127.0.0.1:3000"})
public class AuthController {

    // DTOs para las peticiones
    public static class LoginRequest {
        private String email;
        private String password;

        // Getters y setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        private String nombre;
        private String email;
        private String password;
        private String tipo; // "club" o "jugador"

        // Getters y setters
        public String getNombre() { return nombre; }
        public void setNombre(String nombre) { this.nombre = nombre; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getTipo() { return tipo; }
        public void setTipo(String tipo) { this.tipo = tipo; }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        // TODO: Implementar lógica de autenticación real
        // Por ahora, simulamos una respuesta exitosa
        
        Map<String, Object> response = new HashMap<>();
        
        // Validación básica
        if (request.getEmail() == null || request.getEmail().isEmpty() ||
            request.getPassword() == null || request.getPassword().isEmpty()) {
            response.put("success", false);
            response.put("message", "Email y contraseña son requeridos");
            return ResponseEntity.badRequest().body(response);
        }

        // Simulación de autenticación exitosa
        response.put("success", true);
        response.put("message", "Login exitoso");
        response.put("token", "jwt_token_simulado_" + System.currentTimeMillis());
        response.put("user", Map.of(
            "id", 1L,
            "nombre", "Usuario Demo",
            "email", request.getEmail(),
            "tipo", "club"
        ));
        
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest request) {
        // TODO: Implementar lógica de registro real
        // Por ahora, simulamos una respuesta exitosa
        
        Map<String, Object> response = new HashMap<>();
        
        // Validación básica
        if (request.getNombre() == null || request.getNombre().isEmpty() ||
            request.getEmail() == null || request.getEmail().isEmpty() ||
            request.getPassword() == null || request.getPassword().isEmpty() ||
            request.getTipo() == null || request.getTipo().isEmpty()) {
            response.put("success", false);
            response.put("message", "Todos los campos son requeridos");
            return ResponseEntity.badRequest().body(response);
        }

        if (!request.getTipo().equals("club") && !request.getTipo().equals("jugador")) {
            response.put("success", false);
            response.put("message", "El tipo debe ser 'club' o 'jugador'");
            return ResponseEntity.badRequest().body(response);
        }

        // Simulación de registro exitoso
        response.put("success", true);
        response.put("message", "Usuario registrado exitosamente");
        response.put("token", "jwt_token_simulado_" + System.currentTimeMillis());
        response.put("user", Map.of(
            "id", 1L,
            "nombre", request.getNombre(),
            "email", request.getEmail(),
            "tipo", request.getTipo()
        ));
        
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout() {
        // TODO: Implementar lógica de logout real
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logout exitoso");
        return ResponseEntity.ok(response);
    }
} 