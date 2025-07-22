package com.reservapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.reservapp.entity.Cancha;
import com.reservapp.repository.CanchaRepository;

@Service
public class CanchaService {
    private final CanchaRepository canchaRepository;

    public CanchaService(CanchaRepository canchaRepository) {
        this.canchaRepository = canchaRepository;
    }

    public List<Cancha> getAllCanchas() {
        return canchaRepository.findAll();
    }

    public List<Cancha> getCanchasDisponibles() {
        return canchaRepository.findByDisponibleTrue();
    }

    public List<Cancha> getCanchasByDeporte(String deporte) {
        return canchaRepository.findByDeporte(deporte);
    }

    public List<Cancha> getCanchasDisponiblesByDeporte(String deporte) {
        return canchaRepository.findByDeporteAndDisponibleTrue(deporte);
    }

    public Optional<Cancha> getCanchaById(Long id) {
        return canchaRepository.findById(id);
    }

    public Cancha createCancha(Cancha cancha) {
        if (cancha.getDisponible() == null) {
            cancha.setDisponible(true);
        }
        return canchaRepository.save(cancha);
    }

    public Cancha updateCancha(Long id, Cancha canchaDetails) {
        Optional<Cancha> canchaOptional = canchaRepository.findById(id);
        if (canchaOptional.isPresent()) {
            Cancha cancha = canchaOptional.get();
            cancha.setNombre(canchaDetails.getNombre());
            cancha.setDescripcion(canchaDetails.getDescripcion());
            cancha.setDeporte(canchaDetails.getDeporte());
            cancha.setUbicacion(canchaDetails.getUbicacion());
            cancha.setPrecioPorHora(canchaDetails.getPrecioPorHora());
            cancha.setHorario(canchaDetails.getHorario());
            cancha.setImagenes(canchaDetails.getImagenes());
            cancha.setDisponible(canchaDetails.getDisponible());
            return canchaRepository.save(cancha);
        }
        return null;
    }

    public boolean deleteCancha(Long id) {
        if (canchaRepository.existsById(id)) {
            canchaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean toggleDisponibilidad(Long id) {
        Optional<Cancha> canchaOptional = canchaRepository.findById(id);
        if (canchaOptional.isPresent()) {
            Cancha cancha = canchaOptional.get();
            cancha.setDisponible(!cancha.getDisponible());
            canchaRepository.save(cancha);
            return true;
        }
        return false;
    }
} 