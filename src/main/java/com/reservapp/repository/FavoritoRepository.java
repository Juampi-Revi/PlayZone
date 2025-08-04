package com.reservapp.repository;

import com.reservapp.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    
    // Buscar favoritos por usuario
    @Query("SELECT f FROM Favorito f WHERE f.usuario.id = :usuarioId")
    List<Favorito> findByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    // Buscar favoritos por email de usuario
    @Query("SELECT f FROM Favorito f WHERE f.usuario.email = :email")
    List<Favorito> findByUsuarioEmail(@Param("email") String email);
    
    // Verificar si una cancha es favorita de un usuario
    @Query("SELECT f FROM Favorito f WHERE f.usuario.id = :usuarioId AND f.cancha.id = :canchaId")
    Optional<Favorito> findByUsuarioIdAndCanchaId(@Param("usuarioId") Long usuarioId, @Param("canchaId") Long canchaId);
    
    // Verificar si una cancha es favorita por email de usuario
    @Query("SELECT f FROM Favorito f WHERE f.usuario.email = :email AND f.cancha.id = :canchaId")
    Optional<Favorito> findByUsuarioEmailAndCanchaId(@Param("email") String email, @Param("canchaId") Long canchaId);
    
    // Contar favoritos de un usuario
    @Query("SELECT COUNT(f) FROM Favorito f WHERE f.usuario.id = :usuarioId")
    Long countByUsuarioId(@Param("usuarioId") Long usuarioId);
    
    // Obtener favoritos con información de cancha y club
    @Query("SELECT f FROM Favorito f JOIN FETCH f.cancha c JOIN FETCH c.club WHERE f.usuario.id = :usuarioId ORDER BY f.fechaAgregado DESC")
    List<Favorito> findFavoritosWithCanchaAndClub(@Param("usuarioId") Long usuarioId);
    
    // Eliminar favorito por usuario y cancha
    @Query("DELETE FROM Favorito f WHERE f.usuario.id = :usuarioId AND f.cancha.id = :canchaId")
    void deleteByUsuarioIdAndCanchaId(@Param("usuarioId") Long usuarioId, @Param("canchaId") Long canchaId);
} 