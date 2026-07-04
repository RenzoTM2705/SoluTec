package com.solutec.repository;

import com.solutec.entity.Diagnostico;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DiagnosticoRepository extends JpaRepository<Diagnostico, Long> {
    List<Diagnostico> findByIncidenciaIdOrderByCreadoEnDesc(Long incidenciaId);
}
