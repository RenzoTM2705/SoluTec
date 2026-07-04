package com.solutec.service.impl;

import com.solutec.dto.UsuarioDTO;
import com.solutec.entity.Rol;
import com.solutec.entity.Usuario;
import com.solutec.repository.RolRepository;
import com.solutec.repository.UsuarioRepository;
import com.solutec.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public UsuarioDTO findById(Long id) {
        return usuarioRepository.findById(id).map(this::toDto).orElse(null);
    }

    @Override
    @Transactional
    public UsuarioDTO create(Usuario usuario) {
        usuario.setPassword(encoder.encode(usuario.getPassword()));
        usuario.setAprobado(false);

        // Asignar rol EMPLEADO por defecto si no tiene rol
        if (usuario.getRol() == null) {
            Rol rolEmpleado = rolRepository.findByNombre("EMPLEADO")
                    .orElseThrow(() -> new RuntimeException("Rol EMPLEADO no encontrado"));
            usuario.setRol(rolEmpleado);
        }

        return toDto(usuarioRepository.save(usuario));
    }

    @Override
    public UsuarioDTO update(Long id, Usuario usuario) {
        return usuarioRepository.findById(id).map(u -> {
            u.setNombre(usuario.getNombre());
            u.setCorreo(usuario.getCorreo());
            if (usuario.getPassword() != null && !usuario.getPassword().trim().isEmpty()) {
                u.setPassword(encoder.encode(usuario.getPassword()));
            }
            if (usuario.getRol() != null) {
                u.setRol(usuario.getRol());
            }
            return toDto(usuarioRepository.save(u));
        }).orElse(null);
    }

    @Override
    public void delete(Long id) {
        usuarioRepository.deleteById(id);
    }

    @Override
    @Transactional
    public Usuario aprobarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        usuario.setAprobado(true);
        return usuarioRepository.save(usuario);
    }

    @Override
    public List<Usuario> getUsuariosPendientes() {
        return usuarioRepository.findByAprobadoFalseOrderByIdAsc();
    }

    @Override
    public Optional<Usuario> findByCorreo(String correo) {
        return usuarioRepository.findByCorreo(correo);
    }

    private UsuarioDTO toDto(Usuario u) {
        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(u.getId());
        dto.setNombre(u.getNombre());
        dto.setCorreo(u.getCorreo());
        dto.setAprobado(u.isAprobado());
        if (u.getRol() != null) {
            dto.setRol(u.getRol().getNombre());
        }
        if (u.getDepartamento() != null) {
            dto.setDepartamentoNombre(u.getDepartamento().getNombre());
        }
        return dto;
    }
}