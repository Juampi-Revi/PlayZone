package com.reservapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.reservapp.entity.Club;
import com.reservapp.entity.Usuario;
import com.reservapp.repository.ClubRepository;

@Service
@Transactional
public class ClubService {

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private UsuarioService usuarioService;

    /**
     * Crear un nuevo club
     */
    public Club crearClub(Club club) {
        // Validar que el propietario sea de tipo CLUB
        Usuario propietario = club.getPropietario();
        if (propietario == null || !"CLUB".equals(propietario.getTipo())) {
            throw new IllegalArgumentException("El propietario debe ser un usuario de tipo CLUB");
        }

        // Verificar que el usuario no tenga ya un club
        if (clubRepository.existsByPropietarioAndActivoTrue(propietario)) {
            throw new IllegalArgumentException("El usuario ya tiene un club registrado");
        }

        // Verificar que no exista un club con el mismo nombre
        if (clubRepository.existsByNombreIgnoreCaseAndActivoTrue(club.getNombre())) {
            throw new IllegalArgumentException("Ya existe un club con ese nombre");
        }

        return clubRepository.save(club);
    }

    /**
     * Obtener club por ID
     */
    @Transactional(readOnly = true)
    public Optional<Club> obtenerClubPorId(Long id) {
        return clubRepository.findById(id);
    }

    /**
     * Obtener club por propietario
     */
    @Transactional(readOnly = true)
    public Optional<Club> obtenerClubPorPropietario(Usuario propietario) {
        return clubRepository.findByPropietario(propietario);
    }

    /**
     * Obtener club por propietario ID
     */
    @Transactional(readOnly = true)
    public Optional<Club> obtenerClubPorPropietarioId(Long propietarioId) {
        return clubRepository.findByPropietarioId(propietarioId);
    }

    /**
     * Obtener todos los clubes activos
     */
    @Transactional(readOnly = true)
    public List<Club> obtenerClubesActivos() {
        return clubRepository.findByActivoTrue();
    }

    /**
     * Buscar clubes por nombre
     */
    @Transactional(readOnly = true)
    public List<Club> buscarClubsPorNombre(String nombre) {
        return clubRepository.findByNombreContainingIgnoreCaseAndActivoTrue(nombre);
    }

    /**
     * Buscar clubes por ciudad
     */
    @Transactional(readOnly = true)
    public List<Club> buscarClubsPorCiudad(String ciudad) {
        return clubRepository.findByCiudadContainingIgnoreCaseAndActivoTrue(ciudad);
    }

    /**
     * Actualizar información del club
     */
    public Club actualizarClub(Long id, Club clubActualizado) {
        Club club = clubRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Club no encontrado"));

        // Verificar que el nombre no esté en uso por otro club
        if (!club.getNombre().equalsIgnoreCase(clubActualizado.getNombre()) &&
            clubRepository.existsByNombreIgnoreCaseAndActivoTrue(clubActualizado.getNombre())) {
            throw new IllegalArgumentException("Ya existe un club con ese nombre");
        }

        // Actualizar campos
        club.setNombre(clubActualizado.getNombre());
        club.setDescripcion(clubActualizado.getDescripcion());
        club.setDireccion(clubActualizado.getDireccion());
        club.setTelefono(clubActualizado.getTelefono());
        club.setEmail(clubActualizado.getEmail());
        club.setSitioWeb(clubActualizado.getSitioWeb());
        club.setHorarioAtencion(clubActualizado.getHorarioAtencion());
        club.setServicios(clubActualizado.getServicios());
        club.setPoliticasCancelacion(clubActualizado.getPoliticasCancelacion());
        club.setReglasGenerales(clubActualizado.getReglasGenerales());

        return clubRepository.save(club);
    }

    /**
     * Transferir propiedad del club a otro usuario
     */
    public Club transferirPropiedad(Long clubId, Long nuevoPropietarioId) {
        Club club = clubRepository.findById(clubId)
            .orElseThrow(() -> new RuntimeException("Club no encontrado"));

        Usuario nuevoPropietario = usuarioService.findById(nuevoPropietarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        // Validar que el nuevo propietario sea de tipo CLUB
        if (!"CLUB".equals(nuevoPropietario.getTipo())) {
            throw new IllegalArgumentException("El nuevo propietario debe ser un usuario de tipo CLUB");
        }

        // Verificar que el nuevo propietario no tenga ya un club
        if (clubRepository.existsByPropietarioAndActivoTrue(nuevoPropietario)) {
            throw new IllegalArgumentException("El nuevo propietario ya tiene un club registrado");
        }

        club.setPropietario(nuevoPropietario);
        return clubRepository.save(club);
    }

    /**
     * Desactivar club (soft delete)
     */
    public void desactivarClub(Long id) {
        Club club = clubRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Club no encontrado"));
        
        club.setActivo(false);
        clubRepository.save(club);
    }

    /**
     * Reactivar club
     */
    public Club reactivarClub(Long id) {
        Club club = clubRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Club no encontrado"));
        
        club.setActivo(true);
        return clubRepository.save(club);
    }

    /**
     * Verificar si un usuario tiene un club
     */
    @Transactional(readOnly = true)
    public boolean usuarioTieneClub(Usuario usuario) {
        return clubRepository.existsByPropietarioAndActivoTrue(usuario);
    }

    /**
     * Contar clubes activos
     */
    @Transactional(readOnly = true)
    public long contarClubesActivos() {
        return clubRepository.countByActivoTrue();
    }
}