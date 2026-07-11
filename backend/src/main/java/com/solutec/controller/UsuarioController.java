package com.solutec.controller;

import com.solutec.dto.UsuarioDTO;
import com.solutec.entity.Rol;
import com.solutec.entity.Usuario;
import com.solutec.repository.RolRepository;
import com.solutec.repository.UsuarioRepository;
import com.solutec.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@PreAuthorize("hasRole('ADMIN')")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private RolRepository rolRepository;

    @GetMapping
    public List<UsuarioDTO> listAll() { return usuarioService.findAll(); }

    @GetMapping("/{id}")
    public UsuarioDTO getOne(@PathVariable("id") Long id) { return usuarioService.findById(id); }

    @GetMapping("/pendientes")
    public ResponseEntity<List<Usuario>> getUsuariosPendientes() {
        // Usamos el nuevo método que busca por el nombre del rol
        return ResponseEntity.ok(usuarioRepository.findByRolNombre("PENDIENTE"));
    }

    @PutMapping("/{id}/aprobar")
    public ResponseEntity<?> aprobarUsuario(@PathVariable("id") Long id, @RequestParam("rol") String nombreRol) {
        
        // Se obtiene el usuario de la base de datos
        Usuario u = usuarioRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        
        //  Se obtiene el rol de la base de datos según el nombre proporcionado
        Rol rolAsignado = rolRepository.findByNombre(nombreRol)
            .orElseThrow(() -> new IllegalArgumentException("Rol no válido: " + nombreRol));
        
        // Asigna el rol al usuario y lo marca como aprobado
        u.setRol(rolAsignado);
        u.setAprobado(true); 
        
        // Se guarda el usuario actualizado en la base de datos
        usuarioRepository.save(u);
        
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<UsuarioDTO> create(@RequestBody Usuario usuario) {
        return ResponseEntity.ok(usuarioService.create(usuario));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> update(@PathVariable("id") Long id, @RequestBody Usuario usuario) {
        UsuarioDTO dto = usuarioService.update(id, usuario);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        
        // Se obtiene el usuario de la base de datos
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
            
        // Se cambia el estado del usuario a inactivo y se marca como no aprobado
        usuario.setAprobado(false);
        
        // Se cambia el nombre del usuario para reflejar que está inactivo
        if(!usuario.getNombre().contains("(Inactivo)")) {
            usuario.setNombre(usuario.getNombre() + " (Inactivo)");
        }
        

        usuarioRepository.save(usuario);
        
        return ResponseEntity.ok().build();
    }

}
