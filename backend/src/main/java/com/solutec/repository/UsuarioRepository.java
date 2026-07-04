package com.solutec.repository;

import com.solutec.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByCorreo(String correo);

    List<Usuario> findByAprobadoFalseOrderByIdAsc();

    List<Usuario> findByAprobadoTrue();

    boolean existsByCorreo(String correo);
}