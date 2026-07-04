package com.solutec.controller;

import com.solutec.repository.IncidenciaRepository;
import com.solutec.repository.EstadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@PreAuthorize("hasAnyRole('ADMIN','SOPORTE')")
public class DashboardController {

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Autowired
    private EstadoRepository estadoRepository;

    @GetMapping
    public Map<String, Object> stats() {
        Map<String, Object> m = new HashMap<>();
        long total = incidenciaRepository.count();
        m.put("total", total);
        // buscar por nombres de estado comunes
        estadoRepository.findAll().forEach(e -> {
            long count = incidenciaRepository.findByEstado(e).size();
            m.put(e.getNombre().toLowerCase(), count);
        });
        return m;
    }
}
