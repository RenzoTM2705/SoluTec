package com.solutec.controller;


import com.solutec.dto.IncidenciaDTO;
import com.solutec.entity.Incidencia;
import com.solutec.service.IncidenciaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/incidencias")
public class IncidenciaController {

    @Autowired
    private IncidenciaService incidenciaService;

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
}
