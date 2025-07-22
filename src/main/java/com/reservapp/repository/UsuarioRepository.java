package com.reservapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.reservapp.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByEmail(String email);
    boolean existsByEmail(String email);
} 