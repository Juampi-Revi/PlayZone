package com.reservapp.service;

import com.reservapp.entity.Favorito;
import com.reservapp.entity.Usuario;
import com.reservapp.entity.Cancha;
import com.reservapp.repository.FavoritoRepository;
import com.reservapp.repository.UsuarioRepository;
import com.reservapp.repository.CanchaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FavoritoService {
    
    @Autowired
    private FavoritoRepository favoritoRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;
    
    @Autowired
    private CanchaRepository canchaRepository;
    
    /**
     * Agregar cancha a favoritos
     */
    public Favorito agregarFavorito(Long usuarioId, Long canchaId, String notas) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        Cancha cancha = canchaRepository.findById(canchaId)
            .orElseThrow(() -> new RuntimeException("Cancha no encontrada"));
        
        // Verificar si ya es favorito
        Optional<Favorito> favoritoExistente = favoritoRepository.findByUsuarioIdAndCanchaId(usuarioId, canchaId);
        if (favoritoExistente.isPresent()) {
            throw new RuntimeException("Esta cancha ya está en tus favoritos");
        }
        
        Favorito favorito = new Favorito(usuario, cancha, notas);
        return favoritoRepository.save(favorito);
    }
    
    /**
     * Agregar cancha a favoritos sin notas
     */
    public Favorito agregarFavorito(Long usuarioId, Long canchaId) {
        return agregarFavorito(usuarioId, canchaId, null);
    }
    
    /**
     * Remover cancha de favoritos
     */
    public void removerFavorito(Long usuarioId, Long canchaId) {
        Optional<Favorito> favorito = favoritoRepository.findByUsuarioIdAndCanchaId(usuarioId, canchaId);
        if (favorito.isPresent()) {
            favoritoRepository.delete(favorito.get());
        } else {
            throw new RuntimeException("Esta cancha no está en tus favoritos");
        }
    }
    
    /**
     * Obtener favoritos de un usuario
     */
    public List<Favorito> obtenerFavoritos(Long usuarioId) {
        return favoritoRepository.findFavoritosWithCanchaAndClub(usuarioId);
    }
    
    /**
     * Obtener favoritos por email de usuario
     */
    public List<Favorito> obtenerFavoritosPorEmail(String email) {
        return favoritoRepository.findByUsuarioEmail(email);
    }
    
    /**
     * Verificar si una cancha es favorita
     */
    public boolean esFavorito(Long usuarioId, Long canchaId) {
        return favoritoRepository.findByUsuarioIdAndCanchaId(usuarioId, canchaId).isPresent();
    }
    
    /**
     * Verificar si una cancha es favorita por email
     */
    public boolean esFavoritoPorEmail(String email, Long canchaId) {
        return favoritoRepository.findByUsuarioEmailAndCanchaId(email, canchaId).isPresent();
    }
    
    /**
     * Contar favoritos de un usuario
     */
    public Long contarFavoritos(Long usuarioId) {
        return favoritoRepository.countByUsuarioId(usuarioId);
    }
    
    /**
     * Actualizar notas de un favorito
     */
    public Favorito actualizarNotas(Long usuarioId, Long canchaId, String notas) {
        Optional<Favorito> favoritoOpt = favoritoRepository.findByUsuarioIdAndCanchaId(usuarioId, canchaId);
        if (favoritoOpt.isPresent()) {
            Favorito favorito = favoritoOpt.get();
            favorito.setNotas(notas);
            return favoritoRepository.save(favorito);
        } else {
            throw new RuntimeException("Favorito no encontrado");
        }
    }
    
    /**
     * Obtener favorito específico
     */
    public Optional<Favorito> obtenerFavorito(Long usuarioId, Long canchaId) {
        return favoritoRepository.findByUsuarioIdAndCanchaId(usuarioId, canchaId);
    }
} 