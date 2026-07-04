package com.solutec.repository;

import com.solutec.entity.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {
    List<Comentario> findByIncidenciaIdOrderByCreadoEnDesc(Long incidenciaId);
}
