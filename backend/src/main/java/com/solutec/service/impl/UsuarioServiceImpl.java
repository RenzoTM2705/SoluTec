package com.solutec.service.impl;

import com.solutec.dto.UsuarioDTO;
import com.solutec.entity.Rol;
import com.solutec.entity.Usuario;
import com.solutec.repository.RolRepository;
import com.solutec.repository.UsuarioRepository;
import com.solutec.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
        return usuarioRepository.findById(id).map(this::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
    }

    @Override
    @Transactional
    public UsuarioDTO create(Usuario usuario) {
        // 1. Manejo de errores: Validar correo duplicado
        if (usuarioRepository.findByCorreo(usuario.getCorreo()).isPresent()) {
            throw new IllegalArgumentException("El correo ya está registrado en el sistema");
        }

        usuario.setPassword(encoder.encode(usuario.getPassword()));
        
        // 2. Si es creado por el Admin, se aprueba por default
        usuario.setAprobado(true); 

        // 3. Validar Rol: se asigna el valor de empleado si es null
        if (usuario.getRol() == null || usuario.getRol().getNombre() == null) {
            Rol rolEmpleado = rolRepository.findByNombre("EMPLEADO")
                    .orElseThrow(() -> new RuntimeException("Rol EMPLEADO no encontrado en la BD"));
            usuario.setRol(rolEmpleado);
        } else {
            // Asegurar que el rol enviado existe en la BD
            Rol rolAsignado = rolRepository.findByNombre(usuario.getRol().getNombre())
                    .orElseThrow(() -> new IllegalArgumentException("El rol especificado no es válido"));
            usuario.setRol(rolAsignado);
        }

        return toDto(usuarioRepository.save(usuario));
    }

    @Override
    @Transactional
    public UsuarioDTO update(Long id, Usuario usuarioActualizado) {
        return usuarioRepository.findById(id).map(u -> {
            
            // 1. Validar que el nuevo correo no pertenezca a OTRO usuario
            Optional<Usuario> usuarioExistente = usuarioRepository.findByCorreo(usuarioActualizado.getCorreo());
            if (usuarioExistente.isPresent() && !usuarioExistente.get().getId().equals(id)) {
                throw new IllegalArgumentException("El correo proporcionado ya está en uso por otro usuario");
            }

            u.setNombre(usuarioActualizado.getNombre());
            u.setCorreo(usuarioActualizado.getCorreo());
            
            // Actualizar password solo si se envió uno nuevo
            if (usuarioActualizado.getPassword() != null && !usuarioActualizado.getPassword().trim().isEmpty()) {
                u.setPassword(encoder.encode(usuarioActualizado.getPassword()));
            }
            
            // Actualizar rol si viene especificado
            if (usuarioActualizado.getRol() != null && usuarioActualizado.getRol().getNombre() != null) {
                Rol nuevoRol = rolRepository.findByNombre(usuarioActualizado.getRol().getNombre())
                        .orElseThrow(() -> new IllegalArgumentException("El rol especificado no es válido"));
                u.setRol(nuevoRol);
            }
            
            // Mantener el estado de aprobación
            u.setAprobado(usuarioActualizado.isAprobado());

            return toDto(usuarioRepository.save(u));
        }).orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado para actualizar"));
    }

    @Override
    @Transactional
    public void delete(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
                
        try {
            usuarioRepository.delete(usuario);
        } catch (DataIntegrityViolationException e) {
            // 3. Manejo de error por foreign keys
            // Si el usuario tiene incidencias creadas o asignadas, no se puede borrar de la BD.
            throw new IllegalArgumentException("No se puede eliminar el usuario porque tiene incidencias o historiales asociados en el sistema. Considere inhabilitarlo (desaprobarlo).");
        }
    }

    @Override
    @Transactional
    public Usuario aprobarUsuario(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
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