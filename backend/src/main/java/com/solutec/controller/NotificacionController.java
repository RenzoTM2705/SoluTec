package com.solutec.controller;

import com.solutec.dto.NotificacionDTO;
import com.solutec.entity.Notificacion;
import com.solutec.service.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
@PreAuthorize("hasAnyRole('ADMIN','SOPORTE','EMPLEADO')")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    @GetMapping
    public List<NotificacionDTO> listAll() { return notificacionService.findAll(); }

    @PostMapping
    public ResponseEntity<NotificacionDTO> create(@RequestBody Notificacion n) { return ResponseEntity.ok(notificacionService.create(n)); }
}
