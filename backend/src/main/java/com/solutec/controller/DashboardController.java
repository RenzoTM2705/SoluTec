package com.solutec.controller;

import com.solutec.repository.IncidenciaRepository;
import com.solutec.repository.EstadoRepository;
import com.solutec.entity.Estado;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@PreAuthorize("hasAnyRole('ADMIN','SOPORTE')")
public class DashboardController {

    @Autowired
    private IncidenciaRepository incidenciaRepository;

    @Autowired
    private EstadoRepository estadoRepository;

    // Endpoint para obtener estadísticas generales de incidencias
    @GetMapping
    public Map<String, Object> stats() {
        Map<String, Object> m = new HashMap<>();
        long total = incidenciaRepository.count();
        m.put("total", total);
        estadoRepository.findAll().forEach(e -> {
            long count = incidenciaRepository.findByEstado(e).size();
            m.put(e.getNombre().toLowerCase(), count);
        });
        return m;
    }

    // Nuevo endpoint para estadísticas más detalladas
@GetMapping("/admin-stats")
    public ResponseEntity<Map<String, Object>> getAdminStats() {
        Map<String, Object> stats = new HashMap<>();

        // 1. Total
        long total = incidenciaRepository.count();
        stats.put("totalIncidencias", total);

        // 2. Contadores individuales y Mapa de Estados
        long pendientes = 0;
        long enProceso = 0;
        long resueltas = 0;
        Map<String, Long> incidenciasPorEstado = new HashMap<>();

        List<Estado> estados = estadoRepository.findAll();
        for (Estado e : estados) {
            long count = incidenciaRepository.findByEstado(e).size();
            String nombreEstado = e.getNombre().toUpperCase(); 
            
            incidenciasPorEstado.put(nombreEstado, count);

            if (nombreEstado.equals("PENDIENTE")) pendientes = count;
            else if (nombreEstado.equals("EN_PROCESO")) enProceso = count;
            else if (nombreEstado.equals("RESUELTO")) resueltas = count;
        }

        stats.put("pendientes", pendientes);
        stats.put("enProceso", enProceso);
        stats.put("resueltas", resueltas);
        stats.put("incidenciasPorEstado", incidenciasPorEstado);

        Map<String, Long> incidenciasPorDepartamento = new HashMap<>();
        List<com.solutec.entity.Incidencia> todasLasIncidencias = incidenciaRepository.findAll();
        
        for (com.solutec.entity.Incidencia i : todasLasIncidencias) {
            // Verificamos estrictamente que la incidencia tenga un creador con departamento válido
            if (i.getCreador() != null && 
                i.getCreador().getDepartamento() != null && 
                i.getCreador().getDepartamento().getNombre() != null) {
                
                // Extraemos el nombre y sumamos 1 al contador de ese departamento
                String nombreDepto = i.getCreador().getDepartamento().getNombre();
                incidenciasPorDepartamento.put(nombreDepto, incidenciasPorDepartamento.getOrDefault(nombreDepto, 0L) + 1L);
            }
            // Si no tiene departamento, el bucle simplemente lo ignora y pasa al siguiente
        }
        
        stats.put("incidenciasPorDepartamento", incidenciasPorDepartamento);

        return ResponseEntity.ok(stats);
}
}