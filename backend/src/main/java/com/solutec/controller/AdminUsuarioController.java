package com.solutec.controller;

import com.solutec.dto.PendingUserDTO;
import com.solutec.entity.Usuario;
import com.solutec.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/usuarios")
@PreAuthorize("hasRole('ADMIN')") // Proteger todo el controlador
public class AdminUsuarioController {

    private static final Logger logger = LoggerFactory.getLogger(AdminUsuarioController.class);

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/pendientes")
    public ResponseEntity<List<PendingUserDTO>> pendientes() {
        logger.info("Obteniendo usuarios pendientes");
        List<Usuario> pendientes = usuarioService.getUsuariosPendientes();
        List<PendingUserDTO> dtos = pendientes.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/{id}/aprobar")
    public ResponseEntity<?> aprobar(@PathVariable Long id) {
        logger.info("Intentando aprobar usuario {}", id);
        try {
            Usuario usuarioAprobado = usuarioService.aprobarUsuario(id);
            logger.info("Usuario {} aprobado exitosamente", id);
            return ResponseEntity.ok(toDto(usuarioAprobado));
        } catch (RuntimeException e) {
            logger.error("Error al aprobar usuario {}: {}", id, e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    private PendingUserDTO toDto(Usuario usuario) {
        PendingUserDTO dto = new PendingUserDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setCorreo(usuario.getCorreo());
        dto.setAprobado(usuario.isAprobado());
        if (usuario.getDepartamento() != null) {
            dto.setDepartamentoNombre(usuario.getDepartamento().getNombre());
        }
        if (usuario.getRol() != null) {
            dto.setRol(usuario.getRol().getNombre());
        }
        return dto;
    }
}