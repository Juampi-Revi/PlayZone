package com.reservapp.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservapp.entity.Usuario;
import com.reservapp.security.JwtUtil;
import com.reservapp.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5175", "http://127.0.0.1:5175", "http://localhost:3000", "http://127.0.0.1:3000"})
public class AuthController {
    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;

    public AuthController(UsuarioService usuarioService, JwtUtil jwtUtil) {
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
    }

    public static class LoginRequest {
        public String email;
        public String password;
    }

    public static class RegisterRequest {
        public String nombre;
        public String email;
        public String password;
        public String tipo; // "CLUB" o "JUGADOR"
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginRequest request) {
        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(request.email);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "Usuario o contraseña incorrectos"));
        }
        Usuario usuario = usuarioOpt.get();
        if (!usuario.getActivo() || !usuarioService.checkPassword(request.password, usuario.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "Usuario o contraseña incorrectos"));
        }
        String token = jwtUtil.generateToken(usuario.getEmail(), usuario.getTipo(), usuario.getId());
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Login exitoso");
        response.put("token", token);
        response.put("user", Map.of(
                "id", usuario.getId(),
                "nombre", usuario.getNombre(),
                "email", usuario.getEmail(),
                "tipo", usuario.getTipo()
        ));
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRequest request) {
        if (usuarioService.existsByEmail(request.email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "El email ya está registrado"));
        }
        if (!request.tipo.equalsIgnoreCase("CLUB") && !request.tipo.equalsIgnoreCase("JUGADOR")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("success", false, "message", "El tipo debe ser 'CLUB' o 'JUGADOR'"));
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(request.nombre);
        usuario.setEmail(request.email);
        usuario.setPassword(request.password);
        usuario.setTipo(request.tipo.toUpperCase());
        usuario.setActivo(true);
        Usuario nuevo = usuarioService.registerUsuario(usuario);
        String token = jwtUtil.generateToken(nuevo.getEmail(), nuevo.getTipo(), nuevo.getId());
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Usuario registrado exitosamente");
        response.put("token", token);
        response.put("user", Map.of(
                "id", nuevo.getId(),
                "nombre", nuevo.getNombre(),
                "email", nuevo.getEmail(),
                "tipo", nuevo.getTipo()
        ));
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // No hace nada real, solo responde OK (JWT es stateless)
        return ResponseEntity.ok(Map.of("success", true, "message", "Logout exitoso"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal String email) {
        if (email == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "No autenticado"));
        }
        
        Optional<Usuario> usuarioOpt = usuarioService.findByEmail(email);
        if (usuarioOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false, "message", "Usuario no encontrado"));
        }
        
        Usuario usuario = usuarioOpt.get();
        return ResponseEntity.ok(Map.of(
            "success", true,
            "user", Map.of(
                "id", usuario.getId(),
                "nombre", usuario.getNombre(),
                "email", usuario.getEmail(),
                "tipo", usuario.getTipo()
            )
        ));
    }
}