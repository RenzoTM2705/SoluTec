package com.solutec.controller;

import com.solutec.dto.RolDTO;
import com.solutec.entity.Rol;
import com.solutec.service.RolService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
@PreAuthorize("hasRole('ADMIN')")
public class RolController {

    @Autowired
    private RolService rolService;

    @GetMapping
    public List<RolDTO> listAll() { return rolService.findAll(); }

    @PostMapping
    public ResponseEntity<RolDTO> create(@RequestBody Rol rol) { return ResponseEntity.ok(rolService.create(rol)); }
}
