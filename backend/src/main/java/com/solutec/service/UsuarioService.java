package com.solutec.service;

import com.solutec.dto.UsuarioDTO;
import com.solutec.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    List<UsuarioDTO> findAll();

    UsuarioDTO findById(Long id);

    UsuarioDTO create(Usuario usuario);

    UsuarioDTO update(Long id, Usuario usuario);

    void delete(Long id);

    // Métodos adicionales para la aprobación
    Usuario aprobarUsuario(Long id);

    List<Usuario> getUsuariosPendientes();

    Optional<Usuario> findByCorreo(String correo);
}