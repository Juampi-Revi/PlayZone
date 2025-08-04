package com.reservapp.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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

import com.reservapp.dto.ClubResponseDTO;
import com.reservapp.dto.CreateClubRequest;
import com.reservapp.dto.UpdateClubRequest;
import com.reservapp.entity.Club;
import com.reservapp.entity.Usuario;
import com.reservapp.service.ClubService;
import com.reservapp.service.UsuarioService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/clubes")
public class ClubController {

    @Autowired
    private ClubService clubService;

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Obtener todos los clubes activos
     */
    @GetMapping
    public ResponseEntity<List<Club>> getClubes() {
        try {
            List<Club> clubes = clubService.obtenerClubesActivos();
            return ResponseEntity.ok(clubes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Crear un nuevo club
     */
    @PostMapping
    public ResponseEntity<Map<String, Object>> createClub(@Valid @RequestBody CreateClubRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Obtener el propietario
            Usuario propietario = usuarioService.findById(request.getPropietarioId())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            // Crear el club
            Club club = new Club(
                request.getNombre(),
                request.getDescripcion(),
                request.getDireccion(),
                request.getTelefono(),
                request.getEmail(),
                request.getSitioWeb(),
                request.getHorarioAtencion(),
                propietario
            );

            club.setServicios(request.getServicios());
            club.setPoliticasCancelacion(request.getPoliticasCancelacion());
            club.setReglasGenerales(request.getReglasGenerales());

            Club clubCreado = clubService.crearClub(club);

            response.put("success", true);
            response.put("message", "Club creado exitosamente");
            response.put("club", clubCreado);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Obtener club del usuario autenticado
     */
    @GetMapping("/mi-club")
    public ResponseEntity<Map<String, Object>> getMiClub() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String email = auth.getName();
            
            Usuario usuario = usuarioService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

            Optional<Club> club = clubService.obtenerClubPorPropietario(usuario);
            
            if (club.isPresent()) {
                ClubResponseDTO clubDTO = new ClubResponseDTO(club.get());
                response.put("success", true);
                response.put("club", clubDTO);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "No tienes un club registrado");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Obtener club por ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getClubById(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Optional<Club> club = clubService.obtenerClubPorId(id);
            
            if (club.isPresent()) {
                response.put("success", true);
                response.put("club", club.get());
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("message", "Club no encontrado");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Actualizar club
     */
    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> updateClub(@PathVariable Long id, @Valid @RequestBody UpdateClubRequest request) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Crear objeto Club con los datos actualizados
            Club clubActualizado = new Club();
            clubActualizado.setNombre(request.getNombre());
            clubActualizado.setDescripcion(request.getDescripcion());
            clubActualizado.setDireccion(request.getDireccion());
            clubActualizado.setTelefono(request.getTelefono());
            clubActualizado.setEmail(request.getEmail());
            clubActualizado.setSitioWeb(request.getSitioWeb());
            clubActualizado.setHorarioAtencion(request.getHorarioAtencion());
            clubActualizado.setServicios(request.getServicios());
            clubActualizado.setPoliticasCancelacion(request.getPoliticasCancelacion());
            clubActualizado.setReglasGenerales(request.getReglasGenerales());

            Club club = clubService.actualizarClub(id, clubActualizado);

            response.put("success", true);
            response.put("message", "Club actualizado exitosamente");
            response.put("club", club);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Transferir propiedad del club
     */
    @PutMapping("/{id}/transferir")
    public ResponseEntity<Map<String, Object>> transferirPropiedad(@PathVariable Long id, @RequestParam Long nuevoPropietarioId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Club club = clubService.transferirPropiedad(id, nuevoPropietarioId);

            response.put("success", true);
            response.put("message", "Propiedad transferida exitosamente");
            response.put("club", club);
            
            return ResponseEntity.ok(response);
            
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Desactivar club (soft delete)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteClub(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            clubService.desactivarClub(id);

            response.put("success", true);
            response.put("message", "Club desactivado exitosamente");
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Reactivar club
     */
    @PutMapping("/{id}/reactivar")
    public ResponseEntity<Map<String, Object>> reactivarClub(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            Club club = clubService.reactivarClub(id);

            response.put("success", true);
            response.put("message", "Club reactivado exitosamente");
            response.put("club", club);
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    /**
     * Buscar clubes por nombre
     */
    @GetMapping("/buscar")
    public ResponseEntity<List<Club>> buscarClubes(@RequestParam(required = false) String nombre,
                                                   @RequestParam(required = false) String ciudad) {
        try {
            List<Club> clubes;
            
            if (nombre != null && !nombre.trim().isEmpty()) {
                clubes = clubService.buscarClubsPorNombre(nombre.trim());
            } else if (ciudad != null && !ciudad.trim().isEmpty()) {
                clubes = clubService.buscarClubsPorCiudad(ciudad.trim());
            } else {
                clubes = clubService.obtenerClubesActivos();
            }
            
            return ResponseEntity.ok(clubes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Obtener estadísticas de clubes
     */
    @GetMapping("/estadisticas")
    public ResponseEntity<Map<String, Object>> getEstadisticas() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            long totalClubes = clubService.contarClubesActivos();
            
            response.put("success", true);
            response.put("totalClubes", totalClubes);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("message", "Error interno del servidor");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}