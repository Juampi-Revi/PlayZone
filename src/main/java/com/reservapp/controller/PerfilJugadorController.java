package com.reservapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservapp.entity.PerfilJugador;
import com.reservapp.security.JwtUtil;
import com.reservapp.service.PerfilJugadorService;
import com.reservapp.service.UsuarioService;

@RestController
@RequestMapping("/api/perfil-jugador")
public class PerfilJugadorController {

    @Autowired
    private PerfilJugadorService perfilJugadorService;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Obtener perfil del jugador actual
     */
    @GetMapping("/mi-perfil")
    public ResponseEntity<?> obtenerMiPerfil(@RequestHeader("Authorization") String token) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Optional<PerfilJugador> perfil = perfilJugadorService.obtenerPerfilPorEmail(email);
            
            Map<String, Object> response = new HashMap<>();
            if (perfil.isPresent()) {
                response.put("success", true);
                response.put("perfil", perfil.get());
            } else {
                response.put("success", false);
                response.put("message", "Perfil no encontrado");
            }
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al obtener perfil: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Crear o actualizar perfil
     */
    @PostMapping("/guardar")
    public ResponseEntity<?> guardarPerfil(@RequestHeader("Authorization") String token, 
                                          @RequestBody PerfilJugador perfilData) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            PerfilJugador perfil = perfilJugadorService.crearOActualizarPerfil(usuarioId, perfilData);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Perfil guardado exitosamente");
            response.put("perfil", perfil);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al guardar perfil: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Agregar deporte al perfil
     */
    @PostMapping("/deportes/agregar")
    public ResponseEntity<?> agregarDeporte(@RequestHeader("Authorization") String token,
                                           @RequestBody Map<String, Object> request) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            String deporte = (String) request.get("deporte");
            Double puntuacion = Double.valueOf(request.get("puntuacion").toString());
            String posicion = (String) request.get("posicion");
            Integer anosExperiencia = Integer.valueOf(request.get("anosExperiencia").toString());
            String nivel = (String) request.get("nivel");
            
            PerfilJugador perfil = perfilJugadorService.agregarDeporte(usuarioId, deporte, puntuacion, 
                                                                      posicion, anosExperiencia, nivel);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Deporte agregado exitosamente");
            response.put("perfil", perfil);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al agregar deporte: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Actualizar puntuación de un deporte
     */
    @PutMapping("/deportes/{deporte}/puntuacion")
    public ResponseEntity<?> actualizarPuntuacionDeporte(@RequestHeader("Authorization") String token,
                                                        @PathVariable String deporte,
                                                        @RequestBody Map<String, Object> request) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            Double nuevaPuntuacion = Double.valueOf(request.get("puntuacion").toString());
            PerfilJugador perfil = perfilJugadorService.actualizarPuntuacionDeporte(usuarioId, deporte, nuevaPuntuacion);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Puntuación actualizada exitosamente");
            response.put("perfil", perfil);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al actualizar puntuación: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Actualizar deporte completo
     */
    @PutMapping("/deportes/{deporte}")
    public ResponseEntity<?> actualizarDeporte(@RequestHeader("Authorization") String token,
                                              @PathVariable String deporte,
                                              @RequestBody Map<String, Object> request) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            String nuevoDeporte = (String) request.get("deporte");
            Double puntuacion = Double.valueOf(request.get("puntuacion").toString());
            String posicion = (String) request.get("posicion");
            Integer anosExperiencia = Integer.valueOf(request.get("anosExperiencia").toString());
            String nivel = (String) request.get("nivel");
            
            PerfilJugador perfil = perfilJugadorService.actualizarDeporte(
                usuarioId, deporte, nuevoDeporte, puntuacion, posicion, anosExperiencia, nivel);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Deporte actualizado exitosamente");
            response.put("perfil", perfil);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al actualizar deporte: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Eliminar deporte
     */
    @DeleteMapping("/deportes/{deporte}")
    public ResponseEntity<?> eliminarDeporte(@RequestHeader("Authorization") String token,
                                            @PathVariable String deporte) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            PerfilJugador perfil = perfilJugadorService.eliminarDeporte(usuarioId, deporte);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Deporte eliminado exitosamente");
            response.put("perfil", perfil);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al eliminar deporte: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Agregar adjetivo al perfil
     */
    @PostMapping("/adjetivos/agregar")
    public ResponseEntity<?> agregarAdjetivo(@RequestHeader("Authorization") String token,
                                            @RequestBody Map<String, Object> request) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            String adjetivo = (String) request.get("adjetivo");
            PerfilJugador perfil = perfilJugadorService.agregarAdjetivo(usuarioId, adjetivo);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Adjetivo agregado exitosamente");
            response.put("perfil", perfil);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al agregar adjetivo: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Remover adjetivo del perfil
     */
    @DeleteMapping("/adjetivos/{adjetivo}")
    public ResponseEntity<?> removerAdjetivo(@RequestHeader("Authorization") String token,
                                            @PathVariable String adjetivo) {
        try {
            String email = jwtUtil.getEmailFromToken(token.replace("Bearer ", ""));
            Long usuarioId = usuarioService.getUsuarioIdByEmail(email);
            
            PerfilJugador perfil = perfilJugadorService.removerAdjetivo(usuarioId, adjetivo);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Adjetivo removido exitosamente");
            response.put("perfil", perfil);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al remover adjetivo: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Buscar jugadores por deporte
     */
    @GetMapping("/buscar/deporte/{deporte}")
    public ResponseEntity<?> buscarPorDeporte(@PathVariable String deporte) {
        try {
            List<PerfilJugador> jugadores = perfilJugadorService.buscarPorDeporte(deporte);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("jugadores", jugadores);
            response.put("total", jugadores.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al buscar jugadores: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Buscar jugadores por adjetivo
     */
    @GetMapping("/buscar/adjetivo/{adjetivo}")
    public ResponseEntity<?> buscarPorAdjetivo(@PathVariable String adjetivo) {
        try {
            List<PerfilJugador> jugadores = perfilJugadorService.buscarPorAdjetivo(adjetivo);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("jugadores", jugadores);
            response.put("total", jugadores.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al buscar jugadores: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Obtener top jugadores por rating
     */
    @GetMapping("/top/rating")
    public ResponseEntity<?> obtenerTopJugadoresPorRating() {
        try {
            List<PerfilJugador> jugadores = perfilJugadorService.obtenerTopJugadoresPorRating();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("jugadores", jugadores);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al obtener top jugadores: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Obtener estadísticas generales
     */
    @GetMapping("/estadisticas")
    public ResponseEntity<?> obtenerEstadisticas() {
        try {
            Object[] stats = perfilJugadorService.obtenerEstadisticasGenerales();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("ratingPromedio", stats[0]);
            response.put("totalJugadores", stats[1]);
            response.put("partidosPromedio", stats[2]);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al obtener estadísticas: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Obtener lista de adjetivos disponibles
     */
    @GetMapping("/adjetivos-disponibles")
    public ResponseEntity<?> obtenerAdjetivosDisponibles() {
        try {
            // Lista predefinida de adjetivos disponibles
            String[] adjetivos = {
                "Buen compañero", "Rápido", "Alto", "Fuerte", "Técnico", "Estratégico", 
                "Líder", "Puntual", "Responsable", "Competitivo", "Deportivo", "Respetuoso",
                "Comunicativo", "Organizado", "Flexible", "Perseverante", "Optimista",
                "Colaborativo", "Decidido", "Energético", "Calmado", "Focalizado"
            };
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("adjetivos", adjetivos);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al obtener adjetivos: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    /**
     * Obtener lista de deportes disponibles
     */
    @GetMapping("/deportes-disponibles")
    public ResponseEntity<?> obtenerDeportesDisponibles() {
        try {
            // Lista predefinida de deportes disponibles
            String[] deportes = {
                "Fútbol", "Pádel", "Tenis", "Basketball", "Voleyball", "Hockey", 
                "Rugby", "Handball", "Fútbol 5", "Fútbol 7", "Fútbol 11"
            };
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("deportes", deportes);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Error al obtener deportes: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
} 