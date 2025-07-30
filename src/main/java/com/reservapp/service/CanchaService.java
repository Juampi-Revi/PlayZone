package com.reservapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.reservapp.dto.CreateCanchaRequest;
import com.reservapp.dto.UpdateCanchaRequest;
import com.reservapp.entity.Cancha;
import com.reservapp.entity.Club;
import com.reservapp.repository.CanchaRepository;

@Service
public class CanchaService {
    private final CanchaRepository canchaRepository;
    private final ClubService clubService;

    public CanchaService(CanchaRepository canchaRepository, ClubService clubService) {
        this.canchaRepository = canchaRepository;
        this.clubService = clubService;
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

    public Optional<Cancha> updateCancha(Long id, Cancha canchaDetails) {
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
            return Optional.of(canchaRepository.save(cancha));
        }
        return Optional.empty();
    }

    public boolean deleteCancha(Long id) {
        if (canchaRepository.existsById(id)) {
            canchaRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Cancha> toggleDisponibilidad(Long id) {
        Optional<Cancha> canchaOptional = canchaRepository.findById(id);
        if (canchaOptional.isPresent()) {
            Cancha cancha = canchaOptional.get();
            cancha.setDisponible(!cancha.getDisponible());
            return Optional.of(canchaRepository.save(cancha));
        }
        return Optional.empty();
    }

    public List<String> getDeportesDisponibles() {
        List<Cancha> canchas = canchaRepository.findAll();
        return canchas.stream()
                .map(Cancha::getDeporte)
                .distinct()
                .sorted()
                .toList();
    }

    public List<Cancha> getCanchasByClub(Long clubId) {
        return canchaRepository.findByClubId(clubId);
    }

    public List<Cancha> getCanchasByPropietario(Long propietarioId) {
        return canchaRepository.findByClubPropietarioId(propietarioId);
    }

    public Optional<Cancha> updateCanchaConClub(Long id, Cancha canchaDetails) {
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
            if (canchaDetails.getClub() != null) {
                cancha.setClub(canchaDetails.getClub());
            }
            return Optional.of(canchaRepository.save(cancha));
        }
        return Optional.empty();
    }

    // Métodos que usan DTOs
    public Cancha createCanchaFromDTO(CreateCanchaRequest request) {
        Optional<Club> clubOptional = clubService.obtenerClubPorId(request.getClubId());
        if (clubOptional.isEmpty()) {
            throw new RuntimeException("Club no encontrado con ID: " + request.getClubId());
        }
        
        Club club = clubOptional.get();
        if (!club.getActivo()) {
            throw new RuntimeException("No se puede crear una cancha para un club inactivo");
        }
        
        // Convertir String de imágenes a List<String>
        List<String> imagenesList = request.getImagenes() != null ? 
            List.of(request.getImagenes().split(",")) : 
            List.of();
        
        Cancha cancha = new Cancha(
            request.getNombre(),
            request.getDescripcion(),
            request.getDeporte(),
            request.getUbicacion(),
            request.getPrecioPorHora(),
            request.getHorario(),
            imagenesList,
            club
        );
        
        if (request.getDisponible() != null) {
            cancha.setDisponible(request.getDisponible());
        }
        
        return canchaRepository.save(cancha);
    }
    
    public Optional<Cancha> updateCanchaFromDTO(Long id, UpdateCanchaRequest request) {
        Optional<Cancha> canchaOptional = canchaRepository.findById(id);
        if (canchaOptional.isPresent()) {
            Cancha cancha = canchaOptional.get();
            
            if (request.getNombre() != null) {
                cancha.setNombre(request.getNombre());
            }
            if (request.getDescripcion() != null) {
                cancha.setDescripcion(request.getDescripcion());
            }
            if (request.getDeporte() != null) {
                cancha.setDeporte(request.getDeporte());
            }
            if (request.getUbicacion() != null) {
                cancha.setUbicacion(request.getUbicacion());
            }
            if (request.getPrecioPorHora() != null) {
                cancha.setPrecioPorHora(request.getPrecioPorHora());
            }
            if (request.getHorario() != null) {
                cancha.setHorario(request.getHorario());
            }
            if (request.getImagenes() != null) {
                List<String> imagenesList = List.of(request.getImagenes().split(","));
                cancha.setImagenes(imagenesList);
            }
            if (request.getDisponible() != null) {
                cancha.setDisponible(request.getDisponible());
            }
            
            return Optional.of(canchaRepository.save(cancha));
        }
        return Optional.empty();
    }
}