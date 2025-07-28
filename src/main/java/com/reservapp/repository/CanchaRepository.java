package com.reservapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reservapp.entity.Cancha;

@Repository
public interface CanchaRepository extends JpaRepository<Cancha, Long> {
    List<Cancha> findByDeporte(String deporte);
    List<Cancha> findByDisponibleTrue();
    List<Cancha> findByDeporteAndDisponibleTrue(String deporte);
    List<Cancha> findByPropietarioId(Long propietarioId);
}