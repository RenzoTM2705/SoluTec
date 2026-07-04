package com.solutec.controller;


import com.solutec.entity.Derivacion;
import com.solutec.repository.DerivacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/derivaciones")
@PreAuthorize("hasAnyRole('ADMIN','SOPORTE')")
public class DerivacionController {

    @Autowired
    private DerivacionRepository derivacionRepository;

    @GetMapping
    public List<Derivacion> listAll() {
        return derivacionRepository.findAll();
    }

    @GetMapping("/incidencia/{id}")
    public List<Derivacion> listByIncidencia(@PathVariable("id") Long id) {
        return derivacionRepository.findByIncidenciaIdOrderByCreadoEnDesc(id);
    }

    @PostMapping
    public ResponseEntity<Derivacion> create(@RequestBody Derivacion derivacion) {
        return ResponseEntity.ok(derivacionRepository.save(derivacion));
    }
}
