package com.reservapp.repository;

import com.reservapp.entity.Reserva;
import com.reservapp.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
    List<Reserva> findByUsuarioId(Long usuarioId);
    
    List<Reserva> findByCanchaId(Long canchaId);
    
    List<Reserva> findByEstado(Reserva.EstadoReserva estado);
    
    List<Reserva> findByEstadoPago(Reserva.EstadoPago estadoPago);
    
    Optional<Reserva> findByStripePaymentIntentId(String paymentIntentId);
    
    Optional<Reserva> findByStripeSessionId(String sessionId);
    
    @Query("SELECT r FROM Reserva r WHERE r.cancha.id = :canchaId AND " +
           "((r.fechaHoraInicio <= :fechaFin AND r.fechaHoraFin >= :fechaInicio)) AND " +
           "r.estado IN ('CONFIRMADA', 'PENDIENTE')")
    List<Reserva> findReservasConflicto(@Param("canchaId") Long canchaId, 
                                       @Param("fechaInicio") LocalDateTime fechaInicio,
                                       @Param("fechaFin") LocalDateTime fechaFin);
    
    @Query("SELECT r FROM Reserva r WHERE r.usuario = :usuario ORDER BY r.fechaCreacion DESC")
    List<Reserva> findByUsuarioOrderByFechaCreacionDesc(@Param("usuario") Usuario usuario);
    
    @Query("SELECT r FROM Reserva r WHERE r.cancha.id IN " +
           "(SELECT c.id FROM Cancha c WHERE c.id = :clubId) " +
           "ORDER BY r.fechaCreacion DESC")
    List<Reserva> findReservasByClubId(@Param("clubId") Long clubId);
}