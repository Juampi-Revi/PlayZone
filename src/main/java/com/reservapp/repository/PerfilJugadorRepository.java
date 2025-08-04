package com.reservapp.repository;

import com.reservapp.entity.PerfilJugador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PerfilJugadorRepository extends JpaRepository<PerfilJugador, Long> {
    
    /**
     * Buscar perfil por ID de usuario
     */
    Optional<PerfilJugador> findByUsuarioId(Long usuarioId);
    
    /**
     * Buscar perfil por email de usuario
     */
    @Query("SELECT pj FROM PerfilJugador pj WHERE pj.usuario.email = :email")
    Optional<PerfilJugador> findByUsuarioEmail(@Param("email") String email);
    
    /**
     * Buscar jugadores por deporte específico
     */
    @Query("SELECT pj FROM PerfilJugador pj JOIN pj.deportes d WHERE d.deporte = :deporte")
    List<PerfilJugador> findByDeporte(@Param("deporte") String deporte);
    
    /**
     * Buscar jugadores por nivel en un deporte específico
     */
    @Query("SELECT pj FROM PerfilJugador pj JOIN pj.deportes d WHERE d.deporte = :deporte AND d.nivel = :nivel")
    List<PerfilJugador> findByDeporteAndNivel(@Param("deporte") String deporte, @Param("nivel") String nivel);
    
    /**
     * Buscar jugadores por rango de puntuación en un deporte
     */
    @Query("SELECT pj FROM PerfilJugador pj JOIN pj.deportes d WHERE d.deporte = :deporte AND d.puntuacion BETWEEN :minPuntuacion AND :maxPuntuacion")
    List<PerfilJugador> findByDeporteAndPuntuacionRange(
        @Param("deporte") String deporte, 
        @Param("minPuntuacion") Double minPuntuacion, 
        @Param("maxPuntuacion") Double maxPuntuacion
    );
    
    /**
     * Buscar jugadores por adjetivo específico
     */
    @Query("SELECT pj FROM PerfilJugador pj WHERE :adjetivo MEMBER OF pj.adjetivos")
    List<PerfilJugador> findByAdjetivo(@Param("adjetivo") String adjetivo);
    
    /**
     * Buscar jugadores con mejor rating promedio
     */
    @Query("SELECT pj FROM PerfilJugador pj ORDER BY pj.ratingPromedio DESC")
    List<PerfilJugador> findTopByRatingPromedio();
    
    /**
     * Buscar jugadores con más partidos jugados
     */
    @Query("SELECT pj FROM PerfilJugador pj ORDER BY pj.partidosJugados DESC")
    List<PerfilJugador> findTopByPartidosJugados();
    
    /**
     * Buscar jugadores por rango de edad
     */
    @Query("SELECT pj FROM PerfilJugador pj WHERE YEAR(CURRENT_DATE) - YEAR(pj.fechaNacimiento) BETWEEN :minEdad AND :maxEdad")
    List<PerfilJugador> findByRangoEdad(@Param("minEdad") Integer minEdad, @Param("maxEdad") Integer maxEdad);
    
    /**
     * Verificar si existe un perfil para un usuario
     */
    boolean existsByUsuarioId(Long usuarioId);
    
    /**
     * Contar jugadores por deporte
     */
    @Query("SELECT COUNT(DISTINCT pj) FROM PerfilJugador pj JOIN pj.deportes d WHERE d.deporte = :deporte")
    Long countByDeporte(@Param("deporte") String deporte);
    
    /**
     * Obtener estadísticas generales de jugadores
     */
    @Query("SELECT AVG(pj.ratingPromedio), COUNT(pj), AVG(pj.partidosJugados) FROM PerfilJugador pj")
    Object[] getEstadisticasGenerales();
} 