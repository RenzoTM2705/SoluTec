package com.solutec.repository;

import com.solutec.entity.Incidencia;
import com.solutec.entity.Estado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface IncidenciaRepository extends JpaRepository<Incidencia, Long> {
    List<Incidencia> findByEstado(Estado estado);
    List<Incidencia> findByTituloContainingIgnoreCase(String texto);
    List<Incidencia> findByAsignadoId(Long usuarioId);
    List<Incidencia> findByCreadorId(Long usuarioId);
    List<Incidencia> findByCategoriaId(Long categoriaId);
    long countByEstadoId(Long estadoId);

    // Consulta para el gráfico de dona por estado
    @Query("SELECT e.nombre, COUNT(i) FROM Incidencia i JOIN i.estado e GROUP BY e.nombre")
    List<Object[]> countIncidenciasByEstado();

    // Consulta para el gráfico de barras por departamento
    @Query("SELECT d.nombre, COUNT(i) FROM Incidencia i JOIN i.creador.departamento d GROUP BY d.nombre")
    List<Object[]> countIncidenciasByDepartamento();

}
