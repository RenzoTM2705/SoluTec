package com.solutec.controller;

import com.solutec.entity.CategoriaIncidencia;
import com.solutec.repository.CategoriaIncidenciaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categorias")
@PreAuthorize("hasAnyRole('ADMIN','SOPORTE')")
public class CategoriaIncidenciaController {

    @Autowired
    private CategoriaIncidenciaRepository categoriaRepository;

    @GetMapping
    public List<CategoriaIncidencia> listAll() {
        return categoriaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<CategoriaIncidencia> create(@RequestBody CategoriaIncidencia categoria) {
        return ResponseEntity.ok(categoriaRepository.save(categoria));
    }
}
