package com.reservapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reservapp.entity.Cancha;
import com.reservapp.service.CanchaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/canchas")
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://127.0.0.1:5174", "http://localhost:5175", "http://127.0.0.1:5175", "http://localhost:3000", "http://127.0.0.1:3000"})
public class CanchaController {

    private final CanchaService canchaService;

    @Autowired
    public CanchaController(CanchaService canchaService) {
        this.canchaService = canchaService;
    }

    // Endpoints públicos
    @GetMapping
    public ResponseEntity<List<Cancha>> getAllCanchas() {
        return ResponseEntity.ok(canchaService.getAllCanchas());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Cancha>> getCanchasDisponibles() {
        return ResponseEntity.ok(canchaService.getCanchasDisponibles());
    }

    @GetMapping("/deporte/{deporte}")
    public ResponseEntity<List<Cancha>> getCanchasByDeporte(@PathVariable String deporte) {
        return ResponseEntity.ok(canchaService.getCanchasByDeporte(deporte));
    }

    @GetMapping("/deporte/{deporte}/disponibles")
    public ResponseEntity<List<Cancha>> getCanchasDisponiblesByDeporte(@PathVariable String deporte) {
        return ResponseEntity.ok(canchaService.getCanchasDisponiblesByDeporte(deporte));
    }

    @GetMapping("/deportes")
    public ResponseEntity<List<String>> getDeportesDisponibles() {
        return ResponseEntity.ok(canchaService.getDeportesDisponibles());
    }

    // Endpoints de administración (deben ir antes que /{id})
    @GetMapping("/admin")
    public ResponseEntity<List<Cancha>> getAllCanchasAdmin() {
        // Aquí podrías agregar validación de roles/permisos
        return ResponseEntity.ok(canchaService.getAllCanchas());
    }

    @PostMapping("/admin")
    public ResponseEntity<Cancha> createCanchaAdmin(@Valid @RequestBody Cancha cancha) {
        // Aquí podrías agregar validación de roles/permisos
        Cancha nuevaCancha = canchaService.createCancha(cancha);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCancha);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<Cancha> updateCanchaAdmin(@PathVariable Long id, @Valid @RequestBody Cancha cancha) {
        // Aquí podrías agregar validación de roles/permisos
        return canchaService.updateCancha(id, cancha)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteCanchaAdmin(@PathVariable Long id) {
        // Aquí podrías agregar validación de roles/permisos
        if (canchaService.deleteCancha(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Endpoints con parámetros (deben ir después de los específicos)
    @GetMapping("/{id}")
    public ResponseEntity<Cancha> getCanchaById(@PathVariable Long id) {
        return canchaService.getCanchaById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}/toggle-disponibilidad")
    public ResponseEntity<Cancha> toggleDisponibilidad(@PathVariable Long id) {
        return canchaService.toggleDisponibilidad(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Endpoints públicos (mantener compatibilidad)
    @PostMapping
    public ResponseEntity<Cancha> createCancha(@Valid @RequestBody Cancha cancha) {
        Cancha nuevaCancha = canchaService.createCancha(cancha);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaCancha);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cancha> updateCancha(@PathVariable Long id, @Valid @RequestBody Cancha cancha) {
        return canchaService.updateCancha(id, cancha)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCancha(@PathVariable Long id) {
        if (canchaService.deleteCancha(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
} 