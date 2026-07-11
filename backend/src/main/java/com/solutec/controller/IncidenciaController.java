package com.solutec.controller;


import com.solutec.dto.IncidenciaDTO;
import com.solutec.entity.Estado;
import com.solutec.entity.Incidencia;
import com.solutec.entity.Notificacion;
import com.solutec.entity.Usuario;
import com.solutec.service.IncidenciaService;
import com.solutec.repository.EstadoRepository;
import com.solutec.repository.IncidenciaRepository;
import com.solutec.repository.NotificacionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/incidencias")
public class IncidenciaController {

    @Autowired
    private IncidenciaService incidenciaService;

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Autowired
    private EstadoRepository estadoRepository;

    @Autowired
    private NotificacionRepository notificacionRepository;
    
    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN','SOPORTE','EMPLEADO')")
    public List<IncidenciaDTO> listAll() { return incidenciaService.findAll(); }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SOPORTE','EMPLEADO')")
    public ResponseEntity<IncidenciaDTO> getOne(@PathVariable("id") Long id) {
        IncidenciaDTO dto = incidenciaService.findById(id);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','SOPORTE','EMPLEADO')")
    public ResponseEntity<IncidenciaDTO> create(@RequestBody Incidencia incidencia) {
        return ResponseEntity.ok(incidenciaService.create(incidencia));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','SOPORTE')")
    public ResponseEntity<IncidenciaDTO> update(@PathVariable("id") Long id, @RequestBody Incidencia incidencia) {
        IncidenciaDTO dto = incidenciaService.update(id, incidencia);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @PatchMapping("/{id}/estado/{estadoNombre}")
    @PreAuthorize("hasAnyRole('ADMIN','SOPORTE')")
    public ResponseEntity<IncidenciaDTO> changeEstado(@PathVariable("id") Long id, @PathVariable("estadoNombre") String estadoNombre) {
        IncidenciaDTO dto = incidenciaService.changeEstado(id, estadoNombre);
        if (dto == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        incidenciaService.delete(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(@PathVariable("id") Long id, @RequestBody Map<String, String> payload) {
        String nuevoEstado = payload.get("estado");
        String solucion = payload.get("solucion");
        
        Incidencia incidencia = incidenciaRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Ticket no encontrado"));
            
        // Se obtiene el estado de la base de datos según el nombre proporcionado
        Estado estadoDb = estadoRepository.findByNombre(nuevoEstado)
            .orElseThrow(() -> new IllegalArgumentException("Estado no válido"));
            
        incidencia.setEstado(estadoDb);
        incidencia.setSolucion(solucion);
        incidenciaRepository.save(incidencia);
        
    Usuario dueñoDelTicket = incidencia.getCreador(); 
        
        if (dueñoDelTicket != null) {
            Notificacion alerta = new Notificacion();
            alerta.setUsuario(dueñoDelTicket);
            alerta.setLeida(false);
            
            if ("RESUELTO".equals(nuevoEstado)) {
                alerta.setMensaje("Tu ticket #" + id + " ha sido RESUELTO por el equipo de Soporte.");
            } else {
                alerta.setMensaje("El estado de tu ticket #" + id + " cambió a: " + nuevoEstado);
            }
                        
            notificacionRepository.save(alerta);
        }
        
        return ResponseEntity.ok().build();
    }
}
