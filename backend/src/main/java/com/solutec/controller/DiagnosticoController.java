package com.solutec.controller;

import com.solutec.entity.Diagnostico;
import com.solutec.repository.DiagnosticoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/diagnosticos")
@PreAuthorize("hasAnyRole('ADMIN','SOPORTE')")
public class DiagnosticoController {

    @Autowired
    private DiagnosticoRepository diagnosticoRepository;

    @GetMapping
    public List<Diagnostico> listAll() {
        return diagnosticoRepository.findAll();
    }

    @GetMapping("/incidencia/{id}")
    public List<Diagnostico> listByIncidencia(@PathVariable("id") Long id) {
        return diagnosticoRepository.findByIncidenciaIdOrderByCreadoEnDesc(id);
    }

    @PostMapping
    public ResponseEntity<Diagnostico> create(@RequestBody Diagnostico diagnostico) {
        return ResponseEntity.ok(diagnosticoRepository.save(diagnostico));
    }
}
