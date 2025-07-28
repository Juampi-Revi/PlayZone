package com.reservapp.service;

import com.reservapp.entity.Cancha;
import com.reservapp.entity.Reserva;
import com.reservapp.entity.Usuario;
import com.reservapp.repository.CanchaRepository;
import com.reservapp.repository.ReservaRepository;
import com.reservapp.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    @Autowired
    private CanchaRepository canchaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ConfiguracionHorarioService configuracionHorarioService;

    /**
     * Crea una nueva reserva
     */
    public Reserva crearReserva(Long usuarioId, Long canchaId, LocalDateTime fechaInicio, LocalDateTime fechaFin) {
        // Validar que el usuario existe
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Validar que la cancha existe
        Cancha cancha = canchaRepository.findById(canchaId)
                .orElseThrow(() -> new RuntimeException("Cancha no encontrada"));

        // Validar que la cancha está disponible
        if (!cancha.getDisponible()) {
            throw new RuntimeException("La cancha no está disponible");
        }

        // Validar horario según configuración de la cancha
        if (!configuracionHorarioService.validarHorario(canchaId, fechaInicio, fechaFin)) {
            throw new RuntimeException("El horario seleccionado no está disponible según la configuración de la cancha");
        }

        // Validar que no hay conflictos de horario
        List<Reserva> conflictos = reservaRepository.findReservasConflicto(canchaId, fechaInicio, fechaFin);
        if (!conflictos.isEmpty()) {
            throw new RuntimeException("Ya existe una reserva en ese horario");
        }

        // Calcular el monto total basado en la duración del turno configurado
        long minutos = ChronoUnit.MINUTES.between(fechaInicio, fechaFin);
        if (minutos <= 0) {
            throw new RuntimeException("La duración de la reserva debe ser mayor a 0 minutos");
        }
        
        // Convertir minutos a horas para el cálculo del precio
        double horas = minutos / 60.0;
        Double montoTotal = cancha.getPrecioPorHora() * horas;

        // Crear la reserva
        Reserva reserva = new Reserva(usuario, cancha, fechaInicio, fechaFin, montoTotal);
        
        return reservaRepository.save(reserva);
    }

    /**
     * Obtiene las reservas de un usuario
     */
    public List<Reserva> getReservasByUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        return reservaRepository.findByUsuarioOrderByFechaCreacionDesc(usuario);
    }

    /**
     * Obtiene las reservas de un club
     */
    public List<Reserva> getReservasByClub(Long clubId) {
        return reservaRepository.findReservasByClubId(clubId);
    }

    /**
     * Obtiene una reserva por ID
     */
    public Optional<Reserva> getReservaById(Long id) {
        return reservaRepository.findById(id);
    }

    /**
     * Cancela una reserva
     */
    public void cancelarReserva(Long reservaId, Long usuarioId) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        // Verificar que el usuario es el dueño de la reserva
        if (!reserva.getUsuario().getId().equals(usuarioId)) {
            throw new RuntimeException("No tienes permisos para cancelar esta reserva");
        }

        // Solo se pueden cancelar reservas pendientes o confirmadas
        if (reserva.getEstado() == Reserva.EstadoReserva.CANCELADA || 
            reserva.getEstado() == Reserva.EstadoReserva.COMPLETADA) {
            throw new RuntimeException("No se puede cancelar una reserva en estado " + reserva.getEstado());
        }

        reserva.setEstado(Reserva.EstadoReserva.CANCELADA);
        reservaRepository.save(reserva);
    }

    /**
     * Confirma una reserva después del pago
     */
    public void confirmarReserva(Long reservaId) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        reserva.setEstado(Reserva.EstadoReserva.CONFIRMADA);
        reserva.setEstadoPago(Reserva.EstadoPago.PAGADO);
        reservaRepository.save(reserva);
    }

    /**
     * Marca una reserva como completada
     */
    public void completarReserva(Long reservaId) {
        Reserva reserva = reservaRepository.findById(reservaId)
                .orElseThrow(() -> new RuntimeException("Reserva no encontrada"));

        reserva.setEstado(Reserva.EstadoReserva.COMPLETADA);
        reservaRepository.save(reserva);
    }

    /**
     * Verifica si una cancha está disponible en un horario específico
     */
    public boolean isCanchaDisponible(Long canchaId, LocalDateTime fechaInicio, LocalDateTime fechaFin) {
        List<Reserva> conflictos = reservaRepository.findReservasConflicto(canchaId, fechaInicio, fechaFin);
        return conflictos.isEmpty();
    }
}