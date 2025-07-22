package com.reservapp.controller;

import java.util.List;
import java.util.Optional;

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
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"})
public class CanchaController {
    private final CanchaService canchaService;

    public CanchaController(CanchaService canchaService) {
        this.canchaService = canchaService;
    }

    @GetMapping
    public ResponseEntity<List<Cancha>> getAllCanchas() {
        List<Cancha> canchas = canchaService.getAllCanchas();
        return ResponseEntity.ok(canchas);
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Cancha>> getCanchasDisponibles() {
        List<Cancha> canchas = canchaService.getCanchasDisponibles();
        return ResponseEntity.ok(canchas);
    }

    @GetMapping("/deporte/{deporte}")
    public ResponseEntity<List<Cancha>> getCanchasByDeporte(@PathVariable String deporte) {
        List<Cancha> canchas = canchaService.getCanchasByDeporte(deporte);
        return ResponseEntity.ok(canchas);
    }

    @GetMapping("/deporte/{deporte}/disponibles")
    public ResponseEntity<List<Cancha>> getCanchasDisponiblesByDeporte(@PathVariable String deporte) {
        List<Cancha> canchas = canchaService.getCanchasDisponiblesByDeporte(deporte);
        return ResponseEntity.ok(canchas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cancha> getCanchaById(@PathVariable Long id) {
        Optional<Cancha> cancha = canchaService.getCanchaById(id);
        return cancha.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Cancha> createCancha(@Valid @RequestBody Cancha cancha) {
        Cancha createdCancha = canchaService.createCancha(cancha);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdCancha);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cancha> updateCancha(@PathVariable Long id, @Valid @RequestBody Cancha cancha) {
        Cancha updatedCancha = canchaService.updateCancha(id, cancha);
        if (updatedCancha != null) {
            return ResponseEntity.ok(updatedCancha);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCancha(@PathVariable Long id) {
        boolean deleted = canchaService.deleteCancha(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/{id}/toggle-disponibilidad")
    public ResponseEntity<Cancha> toggleDisponibilidad(@PathVariable Long id) {
        boolean toggled = canchaService.toggleDisponibilidad(id);
        if (toggled) {
            Optional<Cancha> cancha = canchaService.getCanchaById(id);
            return cancha.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/deportes")
    public ResponseEntity<List<String>> getDeportesDisponibles() {
        List<Cancha> canchas = canchaService.getAllCanchas();
        List<String> deportes = canchas.stream()
                .map(Cancha::getDeporte)
                .distinct()
                .sorted()
                .toList();
        return ResponseEntity.ok(deportes);
    }
} 