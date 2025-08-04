package com.reservapp.controller;

import com.reservapp.entity.Favorito;
import com.reservapp.service.FavoritoService;
import com.reservapp.service.UsuarioService;
import com.reservapp.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritoController {
    
    @Autowired
    private FavoritoService favoritoService;
    
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    /**
     * Obtener favoritos del usuario autenticado
     */
    @GetMapping("/mis-favoritos")
    public ResponseEntity<?> obtenerMisFavoritos(@RequestHeader("Authorization") String token) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            List<Favorito> favoritos = favoritoService.obtenerFavoritos(usuarioId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("favoritos", favoritos);
            response.put("total", favoritos.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al obtener favoritos: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Agregar cancha a favoritos
     */
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarFavorito(@RequestHeader("Authorization") String token,
                                            @RequestBody Map<String, Object> request) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            Long canchaId = Long.valueOf(request.get("canchaId").toString());
            String notas = (String) request.get("notas");
            
            Favorito favorito = favoritoService.agregarFavorito(usuarioId, canchaId, notas);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Cancha agregada a favoritos exitosamente");
            response.put("favorito", favorito);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al agregar favorito: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Remover cancha de favoritos
     */
    @DeleteMapping("/remover/{canchaId}")
    public ResponseEntity<?> removerFavorito(@RequestHeader("Authorization") String token,
                                            @PathVariable Long canchaId) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            favoritoService.removerFavorito(usuarioId, canchaId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Cancha removida de favoritos exitosamente");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al remover favorito: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Verificar si una cancha es favorita
     */
    @GetMapping("/verificar/{canchaId}")
    public ResponseEntity<?> verificarFavorito(@RequestHeader("Authorization") String token,
                                              @PathVariable Long canchaId) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            boolean esFavorito = favoritoService.esFavorito(usuarioId, canchaId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("esFavorito", esFavorito);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al verificar favorito: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Contar favoritos del usuario
     */
    @GetMapping("/contar")
    public ResponseEntity<?> contarFavoritos(@RequestHeader("Authorization") String token) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            Long total = favoritoService.contarFavoritos(usuarioId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("total", total);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al contar favoritos: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    /**
     * Actualizar notas de un favorito
     */
    @PutMapping("/actualizar-notas/{canchaId}")
    public ResponseEntity<?> actualizarNotas(@RequestHeader("Authorization") String token,
                                            @PathVariable Long canchaId,
                                            @RequestBody Map<String, Object> request) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            String notas = (String) request.get("notas");
            
            Favorito favorito = favoritoService.actualizarNotas(usuarioId, canchaId, notas);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Notas actualizadas exitosamente");
            response.put("favorito", favorito);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al actualizar notas: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 