package com.solutec.controller;

import com.solutec.dto.NotificacionDTO;
import com.solutec.entity.Notificacion;
import com.solutec.service.NotificacionService;
import com.solutec.service.impl.NotificacionServiceImpl;
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
    private NotificacionServiceImpl notificacionService;

    @GetMapping
    public ResponseEntity<List<Notificacion>> getMisNotificaciones() {
        return ResponseEntity.ok(notificacionService.getMisNotificaciones());
    }

    @PutMapping("/{id}/leer")
    public ResponseEntity<?> marcarComoLeida(@PathVariable("id") Long id) {
        notificacionService.marcarComoLeida(id);
        return ResponseEntity.ok().build();
    }
}