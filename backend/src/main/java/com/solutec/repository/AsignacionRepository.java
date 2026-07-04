package com.solutec.repository;

import com.solutec.entity.Asignacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AsignacionRepository extends JpaRepository<Asignacion, Long> {
    List<Asignacion> findByTecnicoIdOrderByAsignadoEnDesc(Long tecnicoId);
    List<Asignacion> findByIncidenciaId(Long incidenciaId);
}
