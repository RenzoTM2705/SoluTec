package com.solutec.repository;

import com.solutec.entity.Incidencia;
import com.solutec.entity.Estado;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
    List<Incidencia> findByEstado(Estado estado);
    List<Incidencia> findByTituloContainingIgnoreCase(String texto);
    List<Incidencia> findByAsignadoId(Long usuarioId);
    List<Incidencia> findByCreadorId(Long usuarioId);
    List<Incidencia> findByCategoriaId(Long categoriaId);
    long countByEstadoId(Long estadoId);
}
