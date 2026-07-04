package com.solutec.controller;

import com.solutec.dto.ComentarioDTO;
import com.solutec.entity.Comentario;
import com.solutec.service.ComentarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/comentarios")
@PreAuthorize("isAuthenticated()")
public class ComentarioController {

    @Autowired
    private ComentarioService comentarioService;

    @GetMapping
    public List<ComentarioDTO> listAll() { return comentarioService.findAll(); }

    @PostMapping
    public ResponseEntity<ComentarioDTO> create(@RequestBody Comentario comentario) { return ResponseEntity.ok(comentarioService.create(comentario)); }
}
