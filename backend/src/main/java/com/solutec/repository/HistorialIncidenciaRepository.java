package com.solutec.repository;

import com.solutec.entity.HistorialIncidencia;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HistorialIncidenciaRepository extends JpaRepository<HistorialIncidencia, Long> {
    List<HistorialIncidencia> findByIncidenciaIdOrderByFechaDesc(Long incidenciaId);
}
