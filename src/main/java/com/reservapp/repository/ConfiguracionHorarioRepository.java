package com.reservapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reservapp.entity.ConfiguracionHorario;

@Repository
public interface ConfiguracionHorarioRepository extends JpaRepository<ConfiguracionHorario, Long> {
    
    Optional<ConfiguracionHorario> findByCanchaId(Long canchaId);
    
    void deleteByCanchaId(Long canchaId);
}