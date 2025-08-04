package com.reservapp.service;

import com.reservapp.entity.PerfilJugador;
import com.reservapp.entity.Usuario;
import com.reservapp.entity.DeporteJugador;
import com.reservapp.repository.PerfilJugadorRepository;
import com.reservapp.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PerfilJugadorService {

    @Autowired
    private PerfilJugadorRepository perfilJugadorRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    /**
     * Crear o actualizar perfil de jugador
     */
    public PerfilJugador crearOActualizarPerfil(Long usuarioId, PerfilJugador perfilData) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(usuarioId);
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }

        Usuario usuario = usuarioOpt.get();
        if (!"JUGADOR".equals(usuario.getTipo())) {
            throw new RuntimeException("El usuario no es de tipo JUGADOR");
        }

        // Buscar perfil existente o crear uno nuevo
        Optional<PerfilJugador> perfilExistente = perfilJugadorRepository.findByUsuarioId(usuarioId);
        PerfilJugador perfil;

        if (perfilExistente.isPresent()) {
            perfil = perfilExistente.get();
            // Actualizar datos básicos
            if (perfilData.getFechaNacimiento() != null) {
                perfil.setFechaNacimiento(perfilData.getFechaNacimiento());
            }
            if (perfilData.getAltura() != null) {
                perfil.setAltura(perfilData.getAltura());
            }
            if (perfilData.getPeso() != null) {
                perfil.setPeso(perfilData.getPeso());
            }
            if (perfilData.getDeportes() != null) {
                perfil.setDeportes(perfilData.getDeportes());
            }
            if (perfilData.getAdjetivos() != null) {
                perfil.setAdjetivos(perfilData.getAdjetivos());
            }
        } else {
            perfil = new PerfilJugador(usuario);
            perfil.setFechaNacimiento(perfilData.getFechaNacimiento());
            perfil.setAltura(perfilData.getAltura());
            perfil.setPeso(perfilData.getPeso());
            perfil.setDeportes(perfilData.getDeportes());
            perfil.setAdjetivos(perfilData.getAdjetivos());
        }

        return perfilJugadorRepository.save(perfil);
    }

    /**
     * Obtener perfil por ID de usuario
     */
    public Optional<PerfilJugador> obtenerPerfilPorUsuarioId(Long usuarioId) {
        return perfilJugadorRepository.findByUsuarioId(usuarioId);
    }

    /**
     * Obtener perfil por email de usuario
     */
    public Optional<PerfilJugador> obtenerPerfilPorEmail(String email) {
        return perfilJugadorRepository.findByUsuarioEmail(email);
    }

    /**
     * Agregar deporte al perfil
     */
    public PerfilJugador agregarDeporte(Long usuarioId, String deporte, Double puntuacion, 
                                       String posicion, Integer anosExperiencia, String nivel) {
        Optional<PerfilJugador> perfilOpt = perfilJugadorRepository.findByUsuarioId(usuarioId);
        if (perfilOpt.isEmpty()) {
            throw new RuntimeException("Perfil no encontrado");
        }

        PerfilJugador perfil = perfilOpt.get();
        perfil.agregarDeporte(deporte, puntuacion, posicion, anosExperiencia, nivel);
        return perfilJugadorRepository.save(perfil);
    }

    /**
     * Actualizar puntuación de un deporte
     */
    public PerfilJugador actualizarPuntuacionDeporte(Long usuarioId, String deporte, Double nuevaPuntuacion) {
        Optional<PerfilJugador> perfilOpt = perfilJugadorRepository.findByUsuarioId(usuarioId);
        if (perfilOpt.isEmpty()) {
            throw new RuntimeException("Perfil no encontrado");
        }

        PerfilJugador perfil = perfilOpt.get();
        if (perfil.getDeportes() != null) {
            for (DeporteJugador deporteJugador : perfil.getDeportes()) {
                if (deporte.equals(deporteJugador.getDeporte())) {
                    deporteJugador.setPuntuacion(nuevaPuntuacion);
                    break;
                }
            }
        }

        return perfilJugadorRepository.save(perfil);
    }

    /**
     * Actualizar deporte completo
     */
    public PerfilJugador actualizarDeporte(Long usuarioId, String deporteOriginal, String nuevoDeporte, 
                                          Double puntuacion, String posicion, Integer anosExperiencia, String nivel) {
        Optional<PerfilJugador> perfilOpt = perfilJugadorRepository.findByUsuarioId(usuarioId);
        if (perfilOpt.isEmpty()) {
            throw new RuntimeException("Perfil no encontrado");
        }

        PerfilJugador perfil = perfilOpt.get();
        if (perfil.getDeportes() != null) {
            for (DeporteJugador deporteJugador : perfil.getDeportes()) {
                if (deporteOriginal.equals(deporteJugador.getDeporte())) {
                    deporteJugador.setDeporte(nuevoDeporte);
                    deporteJugador.setPuntuacion(puntuacion);
                    deporteJugador.setPosicion(posicion);
                    deporteJugador.setAnosExperiencia(anosExperiencia);
                    deporteJugador.setNivel(nivel);
                    break;
                }
            }
        }

        return perfilJugadorRepository.save(perfil);
    }

    /**
     * Eliminar deporte
     */
    public PerfilJugador eliminarDeporte(Long usuarioId, String deporte) {
        Optional<PerfilJugador> perfilOpt = perfilJugadorRepository.findByUsuarioId(usuarioId);
        if (perfilOpt.isEmpty()) {
            throw new RuntimeException("Perfil no encontrado");
        }

        PerfilJugador perfil = perfilOpt.get();
        if (perfil.getDeportes() != null) {
            perfil.getDeportes().removeIf(d -> deporte.equals(d.getDeporte()));
        }

        return perfilJugadorRepository.save(perfil);
    }

    /**
     * Agregar adjetivo al perfil
     */
    public PerfilJugador agregarAdjetivo(Long usuarioId, String adjetivo) {
        Optional<PerfilJugador> perfilOpt = perfilJugadorRepository.findByUsuarioId(usuarioId);
        if (perfilOpt.isEmpty()) {
            throw new RuntimeException("Perfil no encontrado");
        }

        PerfilJugador perfil = perfilOpt.get();
        perfil.agregarAdjetivo(adjetivo);
        return perfilJugadorRepository.save(perfil);
    }

    /**
     * Remover adjetivo del perfil
     */
    public PerfilJugador removerAdjetivo(Long usuarioId, String adjetivo) {
        Optional<PerfilJugador> perfilOpt = perfilJugadorRepository.findByUsuarioId(usuarioId);
        if (perfilOpt.isEmpty()) {
            throw new RuntimeException("Perfil no encontrado");
        }

        PerfilJugador perfil = perfilOpt.get();
        perfil.removerAdjetivo(adjetivo);
        return perfilJugadorRepository.save(perfil);
    }

    /**
     * Buscar jugadores por deporte
     */
    public List<PerfilJugador> buscarPorDeporte(String deporte) {
        return perfilJugadorRepository.findByDeporte(deporte);
    }

    /**
     * Buscar jugadores por nivel en un deporte
     */
    public List<PerfilJugador> buscarPorDeporteYNivel(String deporte, String nivel) {
        return perfilJugadorRepository.findByDeporteAndNivel(deporte, nivel);
    }

    /**
     * Buscar jugadores por adjetivo
     */
    public List<PerfilJugador> buscarPorAdjetivo(String adjetivo) {
        return perfilJugadorRepository.findByAdjetivo(adjetivo);
    }

    /**
     * Obtener top jugadores por rating
     */
    public List<PerfilJugador> obtenerTopJugadoresPorRating() {
        return perfilJugadorRepository.findTopByRatingPromedio();
    }

    /**
     * Obtener top jugadores por partidos jugados
     */
    public List<PerfilJugador> obtenerTopJugadoresPorPartidos() {
        return perfilJugadorRepository.findTopByPartidosJugados();
    }

    /**
     * Actualizar estadísticas de partidos
     */
    public PerfilJugador actualizarEstadisticasPartidos(Long usuarioId, boolean victoria, boolean empate) {
        Optional<PerfilJugador> perfilOpt = perfilJugadorRepository.findByUsuarioId(usuarioId);
        if (perfilOpt.isEmpty()) {
            throw new RuntimeException("Perfil no encontrado");
        }

        PerfilJugador perfil = perfilOpt.get();
        perfil.setPartidosJugados(perfil.getPartidosJugados() + 1);
        
        if (victoria) {
            perfil.setPartidosGanados(perfil.getPartidosGanados() + 1);
        } else if (empate) {
            perfil.setPartidosEmpatados(perfil.getPartidosEmpatados() + 1);
        } else {
            perfil.setPartidosPerdidos(perfil.getPartidosPerdidos() + 1);
        }

        return perfilJugadorRepository.save(perfil);
    }

    /**
     * Actualizar rating promedio
     */
    public PerfilJugador actualizarRatingPromedio(Long usuarioId, Double nuevoRating) {
        Optional<PerfilJugador> perfilOpt = perfilJugadorRepository.findByUsuarioId(usuarioId);
        if (perfilOpt.isEmpty()) {
            throw new RuntimeException("Perfil no encontrado");
        }

        PerfilJugador perfil = perfilOpt.get();
        perfil.setRatingPromedio(nuevoRating);
        return perfilJugadorRepository.save(perfil);
    }

    /**
     * Verificar si existe perfil
     */
    public boolean existePerfil(Long usuarioId) {
        return perfilJugadorRepository.existsByUsuarioId(usuarioId);
    }

    /**
     * Obtener estadísticas generales
     */
    public Object[] obtenerEstadisticasGenerales() {
        return perfilJugadorRepository.getEstadisticasGenerales();
    }

    /**
     * Contar jugadores por deporte
     */
    public Long contarJugadoresPorDeporte(String deporte) {
        return perfilJugadorRepository.countByDeporte(deporte);
    }
} 