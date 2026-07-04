package com.solutec.controller;

import com.solutec.dto.HistorialDTO;
import com.solutec.entity.HistorialIncidencia;
import com.solutec.service.HistorialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/historial")
@PreAuthorize("hasAnyRole('ADMIN','SOPORTE')")
public class HistorialController {

    @Autowired
    private HistorialService historialService;

    @GetMapping
    public List<HistorialDTO> listAll() { return historialService.findAll(); }

    @PostMapping
    public ResponseEntity<HistorialDTO> create(@RequestBody HistorialIncidencia h) { return ResponseEntity.ok(historialService.create(h)); }
}
