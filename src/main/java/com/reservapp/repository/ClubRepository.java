package com.reservapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.reservapp.entity.Club;
import com.reservapp.entity.Usuario;

@Repository
public interface ClubRepository extends JpaRepository<Club, Long> {
    
    // Buscar club por propietario
    Optional<Club> findByPropietario(Usuario propietario);
    
    // Buscar club por propietario ID
    Optional<Club> findByPropietarioId(Long propietarioId);
    
    // Buscar clubes activos
    List<Club> findByActivoTrue();
    
    // Buscar clubes por nombre (búsqueda parcial, case insensitive)
    @Query("SELECT c FROM Club c WHERE LOWER(c.nombre) LIKE LOWER(CONCAT('%', :nombre, '%')) AND c.activo = true")
    List<Club> findByNombreContainingIgnoreCaseAndActivoTrue(@Param("nombre") String nombre);
    
    // Buscar clubes por ciudad/dirección
    @Query("SELECT c FROM Club c WHERE LOWER(c.direccion) LIKE LOWER(CONCAT('%', :ciudad, '%')) AND c.activo = true")
    List<Club> findByCiudadContainingIgnoreCaseAndActivoTrue(@Param("ciudad") String ciudad);
    
    // Verificar si existe un club con el mismo nombre
    boolean existsByNombreIgnoreCaseAndActivoTrue(String nombre);
    
    // Verificar si un usuario ya tiene un club
    boolean existsByPropietarioAndActivoTrue(Usuario propietario);
    
    // Contar clubes activos
    long countByActivoTrue();
}